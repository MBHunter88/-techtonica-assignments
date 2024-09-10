import React, { useState, useEffect, useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import EventForm from './EventForm';
import EventCard from './EventCard';

//use reducer to manage events state 
const initialState = { events: [] };

function eventsReducer(state, action) {
  switch (action.type) {
    //set list from database
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
      //set post request from EventForm
      case 'ADD_EVENT':
        return{...state, events:[...state.events, action.payload]};
        //set delete request
        case 'DELETE_EVENT':
            //debugging
            // console.log(state.events.filter(event => event.id !== action.payload))
            // console.log(action.payload)
            return{...state, events: state.events.filter(event => event.id !== action.payload )}
        
        case 'CLEAR_EVENTS':
      return { ...state, events: [] };
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
          dispatch({ type: 'SET_EVENTS', payload: data }); 
        
          
    
        } catch (error) {
          console.error('Error fetching trivia questions:', error);
         //clears event list on error
         dispatch({type:'CLEAR_EVENTS', payload: data})
        }
      };

      fetchEvents()
  }, []);

 

  return (
    <div>
        <EventForm dispatch={dispatch} /><br/>
    <div>
        <h2>Events</h2>
        </div>
        
        <div className='row'>
          {state.events.map((event) => {
            return (
              <div className='col-md-3' key={event.id}>
                <EventCard key={event.id}
                  event={event} dispatch={dispatch}
                />
              </div>
            );
          })}
        </div>   
    </div>
  );
}


export default EventList;