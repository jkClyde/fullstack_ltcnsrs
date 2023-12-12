import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import axios from 'axios';
import databaseURL from '../../databaseURL';

function EventsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const fetchEvents = () => {
    axios
      .get(`${databaseURL}/calendar`)
      .then((response) => {
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setCurrentEvents(sortedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events data:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const currentDate = new Date();

  return (
    <Card sx={{ backgroundColor: colors.blueAccent[900] }}>
      <CardContent>
        <List>
          {currentEvents
            .filter((event) => new Date(event.date) > currentDate) // Filter only upcoming events
            .map((event) => (
              <ListItem key={event.id} sx={{ backgroundColor: colors.greenAccent[500] }}>
                <ListItemText
                  primary={event.title}
                  secondary={`Date: ${event.date}`}
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default EventsList;
