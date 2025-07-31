import { Snackbar, SnackbarCloseReason } from "@mui/material";
import React, { useEffect } from "react";

type SnackbarMessageProps = {
  message: string;
};
export default function SnackbarMessage({ message }: SnackbarMessageProps) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
    />
  );
}
