import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useTaskStore } from "../store/taskAction";

export const TaskForm = () => {
    const [value, setValue] = useState("");
    const addTask = useTaskStore((s) => s.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        addTask(value);
        setValue("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
                fullWidth
                label="Add a task..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="contained" type="submit">Add</Button>
        </Box>
    );
};
