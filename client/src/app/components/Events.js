import {Box, Grid} from '@mui/material';
import * as React from 'react';
import {useState, useEffect} from 'react';
import EventCard from './EventCard';
import '../stylesheets/Event.css';
import testImage from '../assets/UCSC_mascot.jpeg';
import MyPagination from './MyPagination';
/**
 * creates Events
 * @return {HTML} Events component
 */
export default function Events() {
  const dummyData =
  [
    {
      'id': 0,
      'title': '1 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 1,
      'title': '2 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 2,
      'title': '3 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 3,
      'title': '4 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 4,
      'title': '5 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 5,
      'title': '6 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
    {
      'id': 6,
      'title': '7 Beach Cleanup',
      'image': testImage,
      'location': 'Natural Bridge State Beach',
      'date': '07-08-2021',
      'time': '12:30:00',
      'owner': {
        'name': 'Baskin School of Engineering',
        'image': '',
      },
    },
  ];
  const [joinedEvents, setjoinedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage]= useState(3);
  useEffect(()=> {
    setjoinedEvents(dummyData);
  }, [currentPage]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEvents = joinedEvents.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(currentPage);
  return (
    <div className="opportunity-page">
      <Box
        spacing={2}
        sx={{
          m: 6,
          boxShadow: 2,
          borderRadius: 4,
          padding: 4,
        }}
        variant="contained"
        class="box"
      >
        <h2>Joined Event</h2>
        <Grid container spacing={3}>
          {currentEvents.map((event) => (
            <Grid item key={event.id} xs={6} md={4}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <MyPagination
        postsPerPage={postsPerPage}
        totalPosts={joinedEvents.length}
        paginate={paginate}
      />
    </div>
  );
}
