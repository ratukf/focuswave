import { Box, Typography, Link } from "@mui/material";

export const Footer = () => (
    <Box py={4} textAlign="center" borderTop="1px solid #ccc" mt={5}>
        <Typography variant="body2">
            Made by <strong>Ratu Kila</strong> ·{" "}
            <Link href="https://github.com/ratukf" target="_blank">GitHub</Link> ·{" "}
            <Link href="https://linkedin.com/in/ratukila" target="_blank">LinkedIn</Link>
        </Typography>
    </Box>
);
