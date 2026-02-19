import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Divider,
  Button,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { ThemeToggle } from "../component/ThemeToggle";
import { FocusSummaryChart } from "../component/FocusSummaryChart";
import { TaskForm } from "../component/TaskForm";
import { TaskList } from "../component/TaskList";
import { FocusTimer } from "../component/FocusTimer";

export const AppPage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FocusWave
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container columns={12} columnSpacing={4} rowSpacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box textAlign="center" my={4}>
              <Typography variant="h4" fontWeight="bold">
                Welcome, Ratu!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Ready to focus today?
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Task List
              </Typography>
              <TaskForm />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TaskList />
              </motion.div>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Weekly Focus Activity
              </Typography>
              <FocusSummaryChart />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "background.paper",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Focus Session
              </Typography>
              <FocusTimer />
            </Card>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  localStorage.removeItem("focuswave-stats");
                  localStorage.removeItem("focuswave-tasks");
                  window.location.reload();
                }}
              >
                Clear All Data (localStorage)
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
