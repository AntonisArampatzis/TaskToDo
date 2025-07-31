import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type SubmitTaskFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
};

export default function SubmitTaskFrom({
  handleSubmit,
  task,
  setTask,
}: SubmitTaskFormProps) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flex: { xs: "1 1 100%", md: "0 0 30%" },
        p: { xs: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <TextField
        id="task"
        name="task"
        label="Add a new task"
        type="text"
        fullWidth
        // required
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ backgroundColor: "#006d77" }}
      >
        ADD TASK
      </Button>
    </Box>
  );
}
