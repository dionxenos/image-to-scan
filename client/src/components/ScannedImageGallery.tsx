import { Box, Grid, Typography } from "@mui/material";
import ScannedImageCard from "./ScannedImageCard";

interface ScannedImage {
  originalFile: File;
  scannedImageUrl: string;
  isLoading: boolean;
  error: string | null;
}

interface ScannedImageGalleryProps {
  scannedImages: ScannedImage[];
  onDownload: (scannedImage: ScannedImage) => void;
}

export default function ScannedImageGallery({
  scannedImages,
  onDownload,
}: ScannedImageGalleryProps) {
  if (scannedImages.length === 0) return null;

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{ marginBottom: 2, fontWeight: 600 }}
      >
        Scanned Images:
      </Typography>
      <Grid container spacing={2}>
        {scannedImages.map((scannedImage, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <ScannedImageCard
              scannedImage={scannedImage}
              onDownload={onDownload}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
