import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface FileItem {
  name: string;
  size: number;
}

interface FileListProps {
  files: FileItem[];
  onRemove: (index: number) => void;
}

export default function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{ marginBottom: 2, fontWeight: 600 }}
      >
        Selected Files:
      </Typography>
      <List sx={{ width: "100%" }}>
        {files.map((file, index) => (
          <ListItem
            key={`${file.name}-${index}`}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onRemove(index)}
                size="small"
              >
                <ClearIcon />
              </IconButton>
            }
            sx={{
              borderRadius: 1,
              marginBottom: 1,
              border: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <ListItemText
              primary={file.name}
              secondary={`${(file.size / 1024).toFixed(2)} KB`}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
