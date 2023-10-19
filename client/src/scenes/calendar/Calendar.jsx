import { useState, useEffect } from "react";
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
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useStateContext } from '../../contexts/ContextProvider'; 
import axios from "axios"; // Import Axios

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const { token, logout, fetchEvents } = useStateContext(); // Access setToken from context

  

  // const fetchEvents = () => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/events/")
  //     .then((response) => {
  //       console.log("Response data:", response.data);
  //       setCurrentEvents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events data:", error);
  //     });
  // };


//   let fetchEvents = async() =>{
//     let response = await fetch('http://127.0.0.1:8000/api/events/', {
//         method:'GET',
//         headers:{
//             'Content-Type':'application/json',
//             'Authorization':'Bearer ' + String(token)
//         }
//     })
//     let data = await response.json()

//     if(response.status === 200){
//       setCurrentEvents(data)
//       console.log(data)
//       console.log("yey?")
//       console.log("hey" +  String(token))
//     }else if(response.statusText === 'Unauthorized'){
//         console.log("sad" + String(token))
//     }
// }



  useEffect(() => {
    fetchEvents(setCurrentEvents);
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  
    if (title) {
      const newEvent = {
        title,
        date: selected.startStr,
      };
  
      axios
        .post("http://127.0.0.1:8000/api/events/create", newEvent, {
          headers: {
            'Authorization':'Bearer ' + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Event saved to the database:", response.data);
          setCurrentEvents([...currentEvents, response.data]);
        })
        .catch((error) => {
          console.error("Error saving event to the database:", error);
        });
    }
  };
  


  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      axios
        .delete(`http://127.0.0.1:8000/events/${selected.event.id}/`)
        .then(() => {
          console.log("Event deleted from the database");
          fetchEvents(setCurrentEvents); // Refetch events after deletion
        })
        .catch((error) => {
          console.error("Error deleting event from the database:", error);
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
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
