import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios, { isAxiosError } from "axios";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface AllTasks {
  task_id: string;
  task: string;
  created_at: string;
}

type TasksTableProps = {
  loading: boolean;
  allTasks: AllTasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<AllTasks[]>>;
};

function TasksTable({ loading, allTasks, setAllTasks }: TasksTableProps) {
  const handleDelete = async (taskId: string) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/task/delete-task/${taskId}`,
        { withCredentials: true }
      );
      console.log("deleting task...waiting response");
      console.log(response.data.message);
      setAllTasks((prevTasks) =>
        prevTasks.filter((task) => task.task_id !== taskId)
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.status, error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "Task ID", flex: 3 },
    { field: "task", headerName: "Task Name", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDelete(params.row.id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = allTasks.map((task) => ({
    id: task.task_id,
    task: task.task,
    created_at: task.created_at,
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
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
export default React.memo(TasksTable);
