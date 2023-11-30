// App.js

import React from "react";
import "./backupRestore.css";
import { Box } from "@mui/material";
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
          tables: tablesToBackup.join(","), // Send a comma-separated list of tables as a query parameter
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
    <div className="BackupRestore">
      <div className="center-container">
        <Box backgroundColor="Black" color="White" borderRadius="10px">
          <button onClick={handleBackup}>
            <Box m="5px">
              <CloudDownloadOutlinedIcon />
            </Box>
            Backup
          </button>
        </Box>
        <Box backgroundColor="Red" color="White" borderRadius="10px">
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleRestore}
            />
            <Box m="5px">
              <RestoreIcon />
            </Box>
            Restore
          </label>
        </Box>
      </div>
    </div>
  );
};

export default BackupRestore;
