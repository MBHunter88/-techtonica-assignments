import React, { useState, useEffect, useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import EventForm from './EventForm';
import Event from './Event';

//use reducer to update event list when fetched 
const initialState = { events: [] };

function eventsReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    default:
      return state;
  }
}

function EventList() {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  useEffect(() => {
    const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/events`); //fetch data from server.js
    
          //error handling to check for response from server
          if (!response.ok) { //if not ok (codes 200-299) throw error
            throw new Error(`Error: ${response.status} ${response.statusText}`)
          }
    
          const data = await response.json();
          dispatch({ type: 'SET_EVENTS', payload: data }); //updates questions from parsed data api request
        //   console.log(state)
          
    
        } catch (error) {
          console.error('Error fetching trivia questions:', error);
         //clears data on error
        }
      };

      fetchEvents()
  }, []);

  return (
    <div>
    <div>
      {state.events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
    <EventForm />
    </div>
  );
}


export default EventList;