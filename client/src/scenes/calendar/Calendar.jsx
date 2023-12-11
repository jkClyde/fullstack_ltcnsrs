import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import Header from "../../components/dashboard_components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import databaseURL from "../../databaseURL";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");

  const fetchEvents = () => {
    axios
      .get(`${databaseURL}/calendar/`)
      .then((response) => {
        console.log("Response data:", response.data);
        setCurrentEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events data:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (selected) => {
    setNewEventTitle(""); // Reset the title for the new event
    setSelectedEvent(selected);
    setNewEventDialogOpen(true);
  };

  const closeNewEventDialog = () => {
    setNewEventDialogOpen(false);
  };

  const handleCreateNewEvent = () => {
    if (selectedEvent && newEventTitle.trim()) {
      const newEvent = {
        title: newEventTitle.trim(),
        date: selectedEvent.startStr,
      };
  
      axios
        .post(`${databaseURL}/calendar/`, newEvent)
        .then((response) => {
          console.log("Event saved to the database:", response.data);
          setCurrentEvents([...currentEvents, response.data]);
          closeNewEventDialog();
        })
        .catch((error) => {
          console.error("Error saving event to the database:", error);
        });
    }
  };

  const openUpdateDialog = (selected) => {
    setSelectedEvent(selected);
    setUpdatedTitle(selected.event.title);
    setUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedEvent(null);
    setUpdatedTitle("");
  };

  const handleUpdateEvent = () => {
    if (updatedTitle.trim()) {
      const updatedEvent = {
        id: selectedEvent.event.id,
        title: updatedTitle.trim(),
        date: selectedEvent.event.startStr,
      };

      axios
        .put(`${databaseURL}/calendar/${selectedEvent.event.id}/`, updatedEvent)
        .then(() => {
          console.log("Event updated in the database");
          fetchEvents(); // Refetch events after updating
          closeUpdateDialog();
        })
        .catch((error) => {
          console.error("Error updating event in the database:", error);
        });
    }
  };

  return (
    <Box m="20px">
      <Header subtitle="Events Calendar" />

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
                onClick={() => openUpdateDialog({ event })}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={(selected) => openUpdateDialog(selected)}
            events={currentEvents}
          />
        </Box>
      </Box>

      <Dialog open={updateDialogOpen} onClose={closeUpdateDialog}>
      <DialogTitle sx={{  fontSize: '1.5rem', fontWeight: 'bold' }}>
        Edit Event
      </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateEvent} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={newEventDialogOpen} onClose={closeNewEventDialog}>
      <DialogTitle sx={{  fontSize: '1.5rem', fontWeight: 'bold' }}>
        Create new event
      </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            label="Event Title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewEventDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateNewEvent} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
