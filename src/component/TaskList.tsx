import { useState } from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, Done } from "@mui/icons-material";
import { useTaskStore } from "../store/taskAction";
import { useFocusStore } from "../store/focusAction";

export const TaskList = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const toggle = useTaskStore((s) => s.toggleTask);
  const del = useTaskStore((s) => s.deleteTask);
  const edit = useTaskStore((s) => s.editTask);
  const isFocusMode = useFocusStore((s) => s.isFocusMode);

  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      edit(editingId, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <Box>
      {isFocusMode && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          You are in focus mode. Tasks cannot be modified temporarily.
        </Typography>
      )}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, val) => val && setFilter(val)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="done">Done</ToggleButton>
      </ToggleButtonGroup>

      <List>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              editingId === task.id ? (
                <IconButton disabled={isFocusMode} onClick={handleSaveEdit}>
                  <Done />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    disabled={isFocusMode}
                    onClick={() => {
                      setEditingId(task.id);
                      setEditText(task.title);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    disabled={isFocusMode}
                    onClick={() => del(task.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              )
            }
          >
            <Checkbox
              disabled={isFocusMode}
              checked={task.done}
              onChange={() => toggle(task.id)}
            />

            {editingId === task.id ? (
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") {
                    setEditingId(null);
                    setEditText("");
                  }
                }}
                fullWidth
                autoFocus
                size="small"
              />
            ) : (
              <ListItemText
                primary={task.title}
                sx={{
                  textDecoration: task.done ? "line-through" : "none",
                  userSelect: "none",
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
