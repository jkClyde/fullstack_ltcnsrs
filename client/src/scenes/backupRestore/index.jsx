// App.js

import React from "react";
import { Box, Paper, Button, IconButton, Grid } from "@mui/material";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";
import databaseURL from "../../databaseURL";

const BackupRestore = () => {
  const handleBackup = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/backup");
      // Trigger file download in the browser
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.sql");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Backup failed:", error);
    }
  };
  const handleRestore = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://127.0.0.1:8000/restore/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Notify the user or perform any necessary actions upon successful restore
      alert("Database restored successfully");
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      padding="0 20px"
      style={{ height: "80vh" }}
    >
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          style={{
            border: "2px solid",
            borderRadius: "20px",
            textAlign: "center",
            height: "100%",
          }}
        >
          <CloudDownloadOutlinedIcon style={{ fontSize: 100 }} />
          <Box style={{ padding: "10px 70px" }}>
            Clicking the Backup button creates a copy of the current Database of
            the Children's Records. Once the backup button is clicked, a
            download will start on your browser and is automatically saved on
            your <strong>Downloads Folder</strong> as a <strong>.sql</strong>{" "}
            file. You can then later on copy or move it to your desired storage.
          </Box>
          <Button
            onClick={handleBackup}
            style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "10px",
              fontSize: "20px",
              padding: "10px 20px",
              margin: "20px 0px",
            }}
          >
            Backup Now
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          style={{
            border: "2px solid",
            borderRadius: "20px",
            textAlign: "center",
            height: "100%",
          }}
        >
          <RestoreIcon style={{ fontSize: 100 }} />
          <Box style={{ padding: "10px 70px" }}>
            Clicking the Restore button will open a new window for you to choose
            a <strong>.sql</strong> file. These .sql files are previous backups
            you have created. Once the desired backup file is selected, the
            current database of the system will then be replaced by the one you
            selected.
          </Box>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleRestore}
          />
          <label htmlFor="file-upload">
            <Button
              component="div"
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                fontSize: "20px",
                padding: "10px 20px",
                margin: "20px 0px",
              }}
            >
              Restore
            </Button>
          </label>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BackupRestore;
