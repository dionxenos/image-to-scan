import { useState } from "react";
import "./FileUploader.css";

interface FileUploaderProps {
  onFileSelect?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export default function FileUploader({
  onFileSelect,
  accept = "*/*",
  multiple = false,
  disabled = false,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      onFileSelect?.(e.target.files);
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
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
  };

  return (
    <div className="file-uploader">
      <div
        className={`drop-zone ${isDragActive ? "active" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-icon">📁</div>
          <p className="upload-text">
            Drag files here or <span className="link">click to select</span>
          </p>
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                <span>{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="remove-btn"
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
