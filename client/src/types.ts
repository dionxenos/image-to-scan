export interface ScannedImage {
  originalFile: File;
  scannedImageUrl: string;
  isLoading: boolean;
  error: string | null;
}

export interface FileItem {
  name: string;
  size: number;
}
