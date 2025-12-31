import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

interface ScannedImage {
  originalFile: File;
  scannedImageUrl: string;
  isLoading: boolean;
  error: string | null;
}

interface ImageComparisonGalleryProps {
  scannedImages: ScannedImage[];
  onDownload: (scannedImage: ScannedImage) => void;
  onRemove: (index: number) => void;
}

export default function ImageComparisonGallery({
  scannedImages,
  onDownload,
  onRemove,
}: ImageComparisonGalleryProps) {
  if (scannedImages.length === 0) return null;

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{ marginBottom: 3, fontWeight: 600 }}
      >
        Scan Results:
      </Typography>
      <Stack spacing={3}>
        {scannedImages.map((scannedImage, index) => (
          <Card key={index} sx={{ overflow: "visible" }}>
            <CardContent sx={{ padding: 0 }}>
              <Grid container spacing={2} sx={{ height: "100%" }}>
                {/* Original Image */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      backgroundColor: "action.disabledBackground",
                      overflow: "hidden",
                      borderRadius: 1,
                    }}
                  >
                    {scannedImage.originalFile.type.startsWith("image/") ? (
                      <Box
                        component="img"
                        src={URL.createObjectURL(scannedImage.originalFile)}
                        alt="Original"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" color="textSecondary">
                          Not an image
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      display: "block",
                      marginTop: 1,
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    Original
                  </Typography>
                </Grid>

                {/* Scanned Image */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      backgroundColor: "action.disabledBackground",
                      overflow: "hidden",
                      borderRadius: 1,
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
                        <CircularProgress size={40} />
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
                          padding: 1,
                        }}
                      >
                        <Alert severity="error" sx={{ width: "100%" }}>
                          {scannedImage.error}
                        </Alert>
                      </Box>
                    )}
                    {scannedImage.scannedImageUrl &&
                      !scannedImage.isLoading && (
                        <Box
                          component="img"
                          src={scannedImage.scannedImageUrl}
                          alt="Scanned"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      )}
                  </Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      display: "block",
                      marginTop: 1,
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    Scanned
                  </Typography>
                </Grid>
              </Grid>

              {/* File name and actions */}
              <Box sx={{ padding: 2, borderTop: 1, borderColor: "divider" }}>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 1.5,
                  }}
                >
                  {scannedImage.originalFile.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {scannedImage.scannedImageUrl && !scannedImage.isLoading && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => onDownload(scannedImage)}
                      fullWidth
                    >
                      Download
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => onRemove(index)}
                    color="error"
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
