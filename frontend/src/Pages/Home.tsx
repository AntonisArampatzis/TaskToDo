import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SubmitTaskFrom from "../Components/SubmitTaskForm";
import TasksTable from "../Components/TasksTable";
import { AllTasks } from "../Types/AllTasks";
import SnackbarMessage from "../Components/SnackbarMessage";

export default function Home() {
  const [task, setTask] = useState<string>("");

  const [allTasks, setAllTasks] = useState<AllTasks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  // Fetch All Tasks from DB
  const fetchTasks = useCallback(async () => {
    // useCallback memoizes the function so it's not recreated on every render.
    // This prevents unnecessary re-renders in child components receiving it as a prop.
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
  }, []);

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
      setMessage(response.data.message);
      setTimeout(() => {
        fetchTasks();
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.status, error.message);
        setMessage(error.response?.data.error);
      } else {
        console.error("Unexpected error:", error);
        setMessage("Unknown error");
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography
          variant="h4"
          color="#15616d"
          fontWeight={800}
          textAlign="center"
          fontStyle="italic"
        >
          TASK TRACKER
        </Typography>

        {/* Form box */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#f7fff7",
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <SubmitTaskFrom
            task={task}
            setTask={setTask}
            handleSubmit={handleSubmit}
          />
        </Box>

        {/* Tasks table box */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: "#f7fff7",
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            gap: 3,
          }}
        >
          <TasksTable
            allTasks={allTasks}
            setAllTasks={setAllTasks}
            loading={loading}
            fetchTasks={fetchTasks}
            setMessage={setMessage}
          />
        </Box>
        <SnackbarMessage message={message} />
      </Box>
    </Container>
  );
}
