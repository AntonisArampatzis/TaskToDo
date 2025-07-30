import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueFormatter } from "@mui/x-data-grid";
import axios, { isAxiosError } from "axios";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AllTasks } from "../Types/AllTasks";

type TasksTableProps = {
  loading: boolean;
  allTasks: AllTasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<AllTasks[]>>;
  fetchTasks: () => Promise<void>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

function TasksTable({
  loading,
  allTasks,
  setAllTasks,
  fetchTasks,
  setMessage,
}: TasksTableProps) {
  const handleDelete = async (taskId: string) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/task/delete-task/${taskId}`,
        { withCredentials: true }
      );
      console.log("deleting task...waiting response");
      console.log(response.data.message);
      setAllTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.status, error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleCompleted = async (taskId: string) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:5000/task/completed/${taskId}`
      );
      console.log("completing task...waiting response");
      console.log(response.data.message);
      setMessage("Task Marked as Complete");
      setTimeout(() => {
        fetchTasks();
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.status, error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  const gridDateFormatter: GridValueFormatter = (value: string | null) => {
    if (!value) return "N/A";
    // Assumes the value is an ISO string like "2025-02-17T07:04:23.808321"
    return value.split("T")[0]; // returns "2025-02-17"
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "Task ID", flex: 3 },
    { field: "task", headerName: "Task Name", flex: 2 },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 2,
      valueFormatter: gridDateFormatter,
    },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="success"
            onClick={() => handleCompleted(params.row.id)}
            // if status completed be disabled
            disabled={params.row.status === "Completed"}
            aria-label="delete"
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = allTasks.map((task) => ({
    id: task.id,
    task: task.task,
    created_at: task.created_at,
    status: task.status,
  }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            sorting: {
              sortModel: [{ field: "created_at", sort: "asc" }],
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
export default React.memo(TasksTable);
