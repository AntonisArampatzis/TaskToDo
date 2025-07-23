import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SubmitTaskFrom from "../Components/SubmitTaskForm";
import TasksTable from "../Components/TasksTable";
import { AllTasks } from "../Types/AllTasks";

export default function Home() {
  const [task, setTask] = useState<string>("");

  const [allTasks, setAllTasks] = useState<AllTasks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch All Tasks from DB
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/task/get-tasks", {
        withCredentials: true,
      });
      console.log("fetching tasks...waiting response");
      //   console.log("Backend response:", response.data);
      setAllTasks(response.data.all_tasks);
    } catch (error: any) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Submit Task Handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/task/add-task",
        { task },
        { withCredentials: true }
      );
      console.log("Posting task...waiting response");
      console.log(response.data.message);
      setTask("");
      await fetchTasks();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.status, error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          gap: 4,
          mt: 4,
          minWidth: "800px",
        }}
      >
        <Typography>TO DO TASK APP</Typography>

        <SubmitTaskFrom
          task={task}
          setTask={setTask}
          handleSubmit={handleSubmit}
        />

        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 30%" },
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "background.paper",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "",
            gap: 3,
          }}
        >
          <TasksTable
            allTasks={allTasks}
            setAllTasks={setAllTasks}
            loading={loading}
          />
        </Box>
      </Box>
    </Container>
  );
}
