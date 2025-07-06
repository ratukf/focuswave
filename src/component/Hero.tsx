import { Box, Typography, Button } from "@mui/material";

export const Hero = () => (
    <Box textAlign="center" py={10}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
            🧘‍♂️ FocusWave
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={4}>
            Build a 25-minute daily focus habit.<br />
            Minimalist. Mindful.
        </Typography>
        <Typography variant="h5" gutterBottom>
            Ready to focus today?
        </Typography>
        <Button variant="contained" size="large" href="/app">
            🚀 Start Now
        </Button>
    </Box>
);
