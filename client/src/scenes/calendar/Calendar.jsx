import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {Box,List,ListItem,ListItemText,Typography,useTheme,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,} from "@mui/material";
import Header from "../../components/dashboard_components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import databaseURL from "../../databaseURL";
import { useDispatch, useSelector } from 'react-redux';
import { setMark } from "../../redux/actions";
import Legend from "./Legend";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [isMarked, setIsmarked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const globalMarked = useSelector((state) => state.refresher.isMarked);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('upcoming'); // Default to upcoming events

  const filteredEvents = currentEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();

    switch (filter) {
      case 'upcoming':
        return eventDate > currentDate;
      case 'finished':
        return event.isFinished;
      case 'missed':
        return eventDate < currentDate && !event.isFinished;
      default:
        return true;
    }
  });


  const [rescheduleConfirmationOpen, setRescheduleConfirmationOpen] = useState(false);
  const currentDate = new Date();


  const openRescheduleConfirmation = () => {
    setRescheduleConfirmationOpen(true);
  };
  const closeRescheduleConfirmation = () => {
    setRescheduleConfirmationOpen(false);
  };
  const handleRescheduleConfirmation = () => {
    handleRescheduleEvent();
    closeRescheduleConfirmation();
  };


  const fetchEvents = () => {
    axios
      .get(`${databaseURL}/calendar/`)
      .then((response) => {
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
    setNewEventTitle(""); 
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

  const openUpdateDialog = async (selected) => {
    const eventId = selected.event.id;
    try {
      const response = await fetch(`http://127.0.0.1:8000/calendar/${eventId}/`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch event details: ${response.status}`);
      }
      const eventData = await response.json();
      const isFinished = eventData.isFinished;
      setIsmarked(isFinished);
      setSelectedDate(eventData.date)
      dispatch(setMark(isFinished)); 
      setSelectedEvent(selected);
      setUpdatedTitle(selected.event.title);
      setUpdateDialogOpen(true);
      console.log(isFinished); // Log the updated value
      // console.log(globalMarked);
    } catch (error) {
      console.error(error);
    }
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
 
  const handleRescheduleEvent = () => {
    if (newEventDate) {
      const updatedEvent = {
        id: selectedEvent.event.id,
        title: selectedEvent.event.title,
        date: newEventDate,
      };
      axios
        .put(`${databaseURL}/calendar/${selectedEvent.event.id}/`, updatedEvent)
        .then(() => {
          console.log("Event rescheduled in the database");
          fetchEvents(); 
          closeUpdateDialog();
        })
        .catch((error) => {
          console.error("Error rescheduling event in the database:", error);
        });
    }
  };

  const handleMarkAsDone = async () => {
    try {
      const updatedIsMarked = !isMarked;
      setIsmarked(updatedIsMarked);
      dispatch(setMark(updatedIsMarked));
      const updatedEvent = {
        id: selectedEvent.event.id,
        title: selectedEvent.event.title,
        date: selectedEvent.event.startStr,
        isFinished: updatedIsMarked,
      };
      await axios.put(`${databaseURL}/calendar/${selectedEvent.event.id}/`, updatedEvent);
      fetchEvents();
      closeUpdateDialog();
    } catch (error) {
      console.error("Error marking event as done:", error);
    }
  };

  return (
    <Box m="20px">
      {/* Events List */}
      <Box display="flex" justifyContent="space-between">
      <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">

      {/* Dropdown for event filter */}
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        variant="outlined"
        sx={{
          marginBottom: '10px',
          backgroundColor: filter === 'upcoming' ? 'lightblue' : filter === 'finished' ? 'lightgreen' : 'lightcoral',
        }}
      >
        <MenuItem value="upcoming">Upcoming Events</MenuItem>
        <MenuItem value="finished">Finished Events</MenuItem>
        <MenuItem value="missed">Missed Events</MenuItem>
      </Select>
    

      <List>
        {filteredEvents.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              backgroundColor: colors.primary[900],
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
        
        
  
        {/* Calendar and Legend */}
        <Box flex="1 1 100%" ml="15px">
          <Legend />
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
            events={currentEvents.map((event) => {
              const isUpcoming = new Date(event.date) > currentDate;
              return {
                ...event,
                color: event.isFinished ? "lightgreen" : isUpcoming ? "lightblue" : "lightcoral",
                textColor: event.isFinished ? "black" : isUpcoming ? "black" : "white", // Set text color to black if isFinished

              };
            })}
          />
        </Box>
      </Box>
  
      {/* Update Event Dialog */}
      <Dialog open={updateDialogOpen} onClose={closeUpdateDialog}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {/* <Typography> Manage Event </Typography> */}
          <Button
            onClick={handleMarkAsDone}
            sx={{
              marginLeft: 'auto',
              backgroundColor: isMarked ? 'red' : 'green',
              color: 'white',
            }}
          >
            {isMarked ? 'Unmark' : 'Mark as Done'}
          </Button>
        </DialogTitle>
          
          
          <DialogContent sx={{ width: '500px' , marginTop : '2%'}}>
          {/* Update Event Form */}
          
          <Typography variant="subtitle1" sx={{ marginBottom: '10px', color: 'text.secondary' }}>
            Edit Event Title
          </Typography>
          <Box display="flex" alignItems="center">
            
            <TextField
              variant="outlined"
              fullWidth
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              sx={{ marginRight: '10px' }}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={handleUpdateEvent}
              sx={{ backgroundColor: colors.greenAccent[500], padding: '10px 25px' }}
            >
              Submit
            </Button>
          </Box>

          <Typography variant="subtitle1" sx={{ marginTop: '20px', marginBottom: '10px', color: 'text.secondary' }}>
            Re-schedule
          </Typography>

          {/* Re-schedule Form */}
          <Box display="flex" alignItems="center">
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              value={selectedDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              style={{ marginTop: '5px', marginRight: '10px' }}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={openRescheduleConfirmation}
              sx={{ backgroundColor: colors.greenAccent[500], padding: '10px 25px' }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeUpdateDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Confirmation Dialogs */}
      <Dialog open={rescheduleConfirmationOpen} onClose={closeRescheduleConfirmation}>
        <DialogTitle>
          Are you sure you want to reschedule this event?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeRescheduleConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRescheduleConfirmation} color="secondary">
            Confirm Reschedule
          </Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={newEventDialogOpen} onClose={closeNewEventDialog}>
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
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