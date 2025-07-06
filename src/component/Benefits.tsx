import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const benefits = [
    "💡 Create tasks quickly and easily",
    "⏱️ 25-minute focus timer with progress bar",
    "🔥 Motivating daily streaks",
    "📊 Weekly productivity insights",
    "🎉 Confetti & breathing mode for mindfulness",
];

export const Benefits = () => (
    <Box py={4}>
        <Typography variant="h4" textAlign="center" gutterBottom>
            Why FocusWave?
        </Typography>
        <Grid container columns={12} spacing={2} justifyContent="center">
            {benefits.map((b, i) => (
                <Grid key={i} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
                    <Typography variant="body1" textAlign="center">
                        {b}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    </Box>
);
