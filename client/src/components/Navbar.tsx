import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link as MuiLink,
} from "@mui/material";

interface NavbarProps {
  title?: string;
  links?: Array<{ label: string; href: string }>;
}

export default function Navbar({
  title = "Image Scanner",
  links = [],
}: NavbarProps) {
  return (
    <AppBar position="sticky" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Container
          maxWidth="md"
          sx={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            {title}
          </Typography>

          {links.length > 0 && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {links.map((link) => (
                <MuiLink
                  key={link.href}
                  href={link.href}
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "opacity 0.2s",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
