import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";

const benefits = [
  "Create tasks quickly and easily",
  "25-minute focus timer with progress bar",
  "Motivating daily streaks",
  "Weekly productivity insights",
  "Confetti & breathing mode for mindfulness",
];

export const Benefits = () => (
  <Box py={4}>
    <Typography variant="h4" textAlign="center" gutterBottom>
      Why FocusWave?
    </Typography>
    {benefits.map((b, i) => (
      <Stack>
        <Typography variant="body1" textAlign="center">
          {b}
        </Typography>
      </Stack>
    ))}
  </Box>
);
