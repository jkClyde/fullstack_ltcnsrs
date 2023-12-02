import { useEffect, useState } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ConfirmationPrompt from "../../components/dashboard_components/DeleteConfirm";
import Header from "../../components/dashboard_components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isPromptOpen, setPromptOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [refresher, setRefresher] = useState(1);


  const handleOpenPrompt = (userId) => {
    setSelectedUserId(userId);
    setPromptOpen(true);
  };

  const handleClosePrompt = () => {
    setSelectedUserId(null);
    setPromptOpen(false);
  };

  const handleDisableUser = async (userId) => {
    try {
      const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
      if (!storedToken) {
        console.error("No token found in local storage.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/users/${userId}/disable/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${storedToken.data.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        //---------------------------------------------------------------------------------------------------
        const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
          fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${storedToken.data.access}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const auditCreatePayload = {
                    user: data.first_name + " " + data.last_name,  
                    action: 'Disabled a User',  
                };
                fetch('http://127.0.0.1:8000/audit/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(auditCreatePayload),
                })
                    .then((auditResponse) => auditResponse.json())
                    .then((auditData) => {
                        console.log('Audit creation response:', auditData);
                    })
                    .catch((auditError) => {
                        console.error('Error creating audit:', auditError);
                    });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
            //--------------------------------------------------------------------------------------------
        toast.warning("Account has been DEACTIVATED!"); // Show a success toast

        // Update the user's status in the UI or refetch user data.
        setRefresher(refresher + 1);

      } else {
        console.error("Failed to disable user.");
      }
    } catch (error) {
      console.error("Error while disabling user:", error);
    }
  };

  const handleEnableUser = async (userId) => {
    try {
      const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
      if (!storedToken) {
        console.error("No token found in local storage.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/users/${userId}/enable/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${storedToken.data.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
        fetch('http://127.0.0.1:8000/auth/users/me/', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${storedToken.data.access}`,
          },
      })
          .then((response) => response.json())
          .then((data) => {
              const auditCreatePayload = {
                  user: data.first_name + " " + data.last_name,  // Assuming you want to send the user data as part of the payload
                  action: 'Enabled a user',  // Replace 'your_action_here' with the actual action
              };
              fetch('http://127.0.0.1:8000/audit/', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(auditCreatePayload),
              })
                  .then((auditResponse) => auditResponse.json())
                  .then((auditData) => {
                      console.log('Audit creation response:', auditData);
                  })
                  .catch((auditError) => {
                      console.error('Error creating audit:', auditError);
                  });
          })
          .catch((error) => {
              console.error('Error fetching user data:', error);
          });
        toast.warning("Account has been ACTIVATED!"); // Show a success toast

        setRefresher(refresher + 1);
      } else {
        console.error("Failed to enable user. Status:", response.status);
        const data = await response.json();
        console.error("Error details:", data);
      }
    } catch (error) {
      console.error("Error while enabling user:", error);
    }
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "barangay",
      headerName: "Barangay",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "Phone No.",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      
      renderCell: ({ row }) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
        >
           <Typography
              variant="body2"
              style={{
                color: row.is_disabled ? colors.redAccent[300] : colors.greenAccent[300], // Set the text color based on the condition
              }}
            >
            {row.is_disabled ? "Disabled" : "Active"}
          </Typography>
          
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            handleOpenPrompt(row.id);
          }}
        >
          <IconButton
            color={row.is_disabled ? "secondary" : "warning"}
            aria-label={row.is_disabled ? "enable user" : "disable user"}
          >
            {row.is_disabled ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
          </IconButton>
          <Typography variant="body2">
            {row.is_disabled ? "Activate" : "Deactivate "}
          </Typography>
        </div>
      ),
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
      if (!storedToken) {
        console.error("No token found in local storage.");
        return;
      }

      try {
        console.log("Token used for request:", storedToken.access);
        const response = await fetch("http://127.0.0.1:8000/api/users/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken.data.access}`,
          },
        });

        console.log("Fetch response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setUsers(data);
          console.log(users);
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error while fetching users:", error);
      }
    }

    fetchUsers();
  }, [refresher]);

  return (
    <Box m="20px">
      <Header title="Registered System Users" />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
      <ConfirmationPrompt
        open={isPromptOpen}
        onClose={handleClosePrompt}
        onConfirm={() => {
          if (selectedUserId !== null) {
            const selectedUser = users.find((user) => user.id === selectedUserId);
            if (selectedUser) {
              selectedUser.is_disabled
                ? handleEnableUser(selectedUserId)
                : handleDisableUser(selectedUserId);
              handleClosePrompt();
            }
          }
        }}
        message={
          selectedUserId !== null
            ? users.find((user) => user.id === selectedUserId).is_disabled
              ? "Are you sure you want to enable this user?"
              : "Are you sure you want to disable this user?"
            : ""
        }
      />
       <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Users;
