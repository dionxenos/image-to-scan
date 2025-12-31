import { useState } from "react";
import { Container, Box } from "@mui/material";
import DropZone from "./DropZone";
import ImageComparisonGallery from "./ImageComparisonGallery";
import apiService from "../services/apiService";

interface FileUploaderProps {
  onFileSelect?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export interface ScannedImage {
  originalFile: File;
  scannedImageUrl: string;
  isLoading: boolean;
  error: string | null;
}

export default function FileUploader({
  onFileSelect,
  accept = "image/*",
  multiple = false,
  disabled = false,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [scannedImages, setScannedImages] = useState<ScannedImage[]>([]);

  const uploadAndScan = async (file: File) => {
    setScannedImages((prev) => [
      ...prev,
      {
        originalFile: file,
        scannedImageUrl: "",
        isLoading: true,
        error: null,
      },
    ]);

    try {
      const blob = await apiService.scanImage(file);
      const scannedImageUrl = URL.createObjectURL(blob);

      setScannedImages((prev) =>
        prev.map((img) =>
          img.originalFile === file
            ? { ...img, scannedImageUrl, isLoading: false, error: null }
            : img
        )
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to scan image";
      setScannedImages((prev) =>
        prev.map((img) =>
          img.originalFile === file
            ? { ...img, isLoading: false, error: errorMessage }
            : img
        )
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      onFileSelect?.(e.target.files);
      files.forEach((file) => uploadAndScan(file));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
      onFileSelect?.(e.dataTransfer.files);
      files.forEach((file) => uploadAndScan(file));
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    const fileToRemove = selectedFiles[index];
    setScannedImages((prev) =>
      prev.filter((img) => img.originalFile !== fileToRemove)
    );
  };

  const downloadScannedImage = (scannedImage: ScannedImage) => {
    const link = document.createElement("a");
    link.href = scannedImage.scannedImageUrl;
    link.download = `scanned_${scannedImage.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%" }}>
        <DropZone
          onDrop={handleDrop}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          isDragActive={isDragActive}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />

        <ImageComparisonGallery
          scannedImages={scannedImages}
          onDownload={downloadScannedImage}
          onRemove={removeFile}
        />
      </Box>
    </Container>
  );
}
