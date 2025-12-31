import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface ScannedImage {
  originalFile: File;
  scannedImageUrl: string;
  isLoading: boolean;
  error: string | null;
}

interface ScannedImageCardProps {
  scannedImage: ScannedImage;
  onDownload: (scannedImage: ScannedImage) => void;
}

export default function ScannedImageCard({
  scannedImage,
  onDownload,
}: ScannedImageCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "100%",
          backgroundColor: "action.disabledBackground",
          overflow: "hidden",
        }}
      >
        {scannedImage.isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "action.hover",
            }}
          >
            <CircularProgress />
            <Typography variant="caption" sx={{ marginTop: 1 }}>
              Processing...
            </Typography>
          </Box>
        )}
        {scannedImage.error && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              backgroundColor: "error.lighter",
            }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {scannedImage.error}
            </Alert>
          </Box>
        )}
        {scannedImage.scannedImageUrl && !scannedImage.isLoading && (
          <>
            <CardMedia
              component="img"
              image={scannedImage.scannedImageUrl}
              alt="Scanned"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "action.disabledBackground",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                gap: 1,
                padding: 1,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                opacity: 0,
                transition: "opacity 0.2s ease",
                ".scanned-image-card:hover &": {
                  opacity: 1,
                },
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={() => onDownload(scannedImage)}
                fullWidth
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Download
              </Button>
            </Box>
          </>
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {scannedImage.originalFile.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
