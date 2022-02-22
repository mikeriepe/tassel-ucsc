import React from 'react';
import {Card, Button, CardMedia, CardContent, CardActions} from '@mui/material';
import {Typography} from '@mui/material';
import '../stylesheets/EventCard.css';
/**
 * creates EventCard
 * @return {HTML} EventCard component
 */
function EventCard({event}) {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        maxWidth: 400,
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={event.image}
        alt="image"
        class="card-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.owner.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.time}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
