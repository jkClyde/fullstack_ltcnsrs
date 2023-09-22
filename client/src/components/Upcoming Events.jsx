import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { tokens } from '../theme';



const initialEvents = {
  event1: {
    id: "12315",
    title: "Healthy Cooking Workshop",
    date: "2023-08-10",
  },
  event2: {
    id: "2231",
    title: "Nutrition Awareness Seminar",
    date: "2023-08-25",
  },
  event3: {
    id: "5123",
    title: "Farm-to-Table Festival",
    date: "2023-08-05",
  },
  event4: {
    id: "5112",
    title: "Fitness and Wellness Expo",
    date: "2023-10-15",
  },
  event5: {
    id: "5113",
    title: "Smoothie-Making Contest",
    date: "2023-10-28",
  },
  event6: {
    id: "5122",
    title: "Vegetarian Cooking Class",
    date: "2023-11-02",
  },
};

function EventsList() {
    
const theme = useTheme();
const colors = tokens(theme.palette.mode);

  return (
 
      <Card sx={{ backgroundColor: colors.blueAccent[900]}}>
        <CardContent>
          <List>
            {Object.values(initialEvents).map((event) => (
              <ListItem key={event.id}>
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
