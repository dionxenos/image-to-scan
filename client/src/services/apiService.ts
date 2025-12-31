import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// API Service object
const apiService = {
  /**
   * Upload an image file and get the scanned version
   * @param file - The image file to scan
   * @returns Promise<Blob> - The scanned image as a blob
   */
  scanImage: async (file: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<Blob>("/scan", formData, {
      responseType: "blob",
    });

    return response.data;
  },
};

export default apiService;
