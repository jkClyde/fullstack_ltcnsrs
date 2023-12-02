// App.js

import React from "react";
import { Box, Paper, Button, IconButton, Grid } from "@mui/material";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";

const BackupRestore = () => {
  const handleBackup = async () => {
    try {
      const tablesToBackup = [
        "app_form_primarychild",
        "app_form_childhealthinfo",
      ];

      const response = await axios.get("http://127.0.0.1:8000/backup/", {
        params: {
          tables: tablesToBackup.join(","),
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup-child.sql");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Backup failed:", error);
      // Handle error or display an error message to the user
    }
  };

  const handleRestore = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("backup_file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/restore/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Restore successful:", response.data.message);
      // Handle successful restoration or display a success message to the user
    } catch (error) {
      console.error("Restore failed:", error);
      // Handle error or display an error message to the user
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" padding="0 20px" style={{ height: "80vh" }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ border: "2px solid", borderRadius: "20px", textAlign: "center", height: "100%"}}>
          <CloudDownloadOutlinedIcon style={{ fontSize: 100 }} />
          <Box style={{ padding: "10px 70px" }}>
            Clicking the Backup button creates a copy of the current Database of the Children's Records. Once the backup button is clicked, a download will start on your browser and is automatically saved on your <strong>Downloads Folder</strong> as a <strong>.sql</strong> file. You can then later on copy or move it to your desired storage.
          </Box>
          <Button
            onClick={handleBackup}
            style={{ backgroundColor: "#1E90FF", color: "white", borderRadius: "10px", fontSize: "20px", padding: "10px 20px", margin:"20px 0px"}}
          >
            Backup Now
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ border: "2px solid", borderRadius: "20px", textAlign: "center", height: "100%"}}>
          <RestoreIcon style={{ fontSize: 100 }} />
          <Box style={{ padding: "10px 70px" }}>
            Clicking the Restore button will open a new window for you to choose a <strong>.sql</strong> file. These .sql files are previous backups you have created. Once the desired backup file is selected, the current database of the system will then be replaced by the one you selected.
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
              style={{ backgroundColor: "red", color: "white", borderRadius: "10px", fontSize: "20px", padding: "10px 20px", margin:"20px 0px"}}
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
