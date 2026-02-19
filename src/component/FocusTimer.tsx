import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  LinearProgress,
  TextField,
} from "@mui/material";
import confetti from "canvas-confetti";
import { BreathingCircle } from "./BreathingCircle";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import { useFocusStats } from "../hooks/useFocusStats";
import { useFocusStore } from "../store/focusAction";

export const FocusTimer = () => {
  const { minutes, seconds, isRunning, start, pause, reset, progress } =
    usePomodoroTimer();
  const { stats, completeFocus } = useFocusStats();
  const [sessionName, setSessionName] = useState("Focus Session");
  const setFocusMode = useFocusStore((s) => s.setFocusMode);
  const isFocusMode = useFocusStore((s) => s.isFocusMode);
  const quotes = [
    "Nice work! 🚀",
    "One session closer to mastery 💎",
    "Discipline > motivation 👊",
    "You're winning the day",
  ];
  const mood =
    stats.streak > 5
      ? "🔥🧠"
      : stats.streak > 2
        ? "😎"
        : stats.streak > 0
          ? "🙂"
          : "😴";

  // Syncs the focus mode state with the timer running state.
  // When the timer starts, focus mode is enabled; when it stops, focus mode is disabled.
  useEffect(() => {
    setFocusMode(isRunning);
    return () => setFocusMode(false);
  }, [isRunning]);

  // When the timer finishes (reaches 00:00),
  // show confetti, mark the focus session as complete, and display a random motivational quote.
  useEffect(() => {
    if (!isRunning && minutes === "00" && seconds === "00") {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          scalar: 1.2,
        });
      }, 100);
      completeFocus();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      alert(randomQuote);
    }
  }, [isRunning, minutes, seconds]);

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      {isFocusMode && (
        <Box sx={{ mt: 4 }}>
          <BreathingCircle />
          <Typography
            variant="caption"
            textAlign="center"
            display="block"
            mt={1}
          >
            Breathe in… breathe out…
          </Typography>
        </Box>
      )}
      {isFocusMode && sessionName ? (
        <Typography variant="h6" align="center">
          {sessionName}
        </Typography>
      ) : !isFocusMode ? (
        <TextField
          label="Focus Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              start();
            }
          }}
        />
      ) : null}

      {!isFocusMode && (
        <Typography variant="h5" gutterBottom>
          Focus Mode
        </Typography>
      )}
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        {minutes}:{seconds}
      </Typography>
      {isFocusMode && (
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={progress * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#6C63FF",
              },
            }}
          />
          <Typography variant="caption" textAlign="center" sx={{ mt: 1 }}>
            Focus: {Math.floor(progress * 100)}%
          </Typography>
        </Box>
      )}

      <Stack direction="row" spacing={2} justifyContent="center">
        {!isRunning ? (
          <Button variant="contained" color="primary" onClick={start}>
            Start
          </Button>
        ) : (
          <Button variant="outlined" color="warning" onClick={pause}>
            Pause
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={reset}>
          Reset
        </Button>
      </Stack>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
        Today's focus streak: <strong>{stats.streak} days in a row</strong>{" "}
        {mood}
      </Typography>
    </Box>
  );
};
