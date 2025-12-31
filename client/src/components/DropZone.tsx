import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface DropZoneProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragActive: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DropZone({
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
  isDragActive,
  disabled = false,
  accept = "image/*",
  multiple = false,
  onChange,
}: DropZoneProps) {
  const theme = useTheme();

  return (
    <Paper
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        border: "2px dashed",
        borderColor: isDragActive ? theme.palette.primary.main : theme.palette.divider,
        borderRadius: 2,
        padding: 5,
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        backgroundColor: isDragActive
          ? theme.palette.action.hover
          : theme.palette.background.default,
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        "&:hover": !disabled && {
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.action.selected,
        },
      }}
    >
      <input
        type="file"
        id="file-input"
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-input"
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          display: "block",
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: theme.palette.primary.main,
            marginBottom: 1,
          }}
        />
        <Typography variant="body2" color="textSecondary">
          Drag files here or{" "}
          <Typography component="span" variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            click to select
          </Typography>
        </Typography>
      </label>
    </Paper>
  );
}
