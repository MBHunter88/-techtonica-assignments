import React, { useState, useEffect, useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import EventForm from './EventForm';
import EventCard from './EventCard';

//initial state for event list
const initialState = { events: [] };

//Reducer to manage event list
function eventsReducer(state, action) {
    switch (action.type) {
        //set the event list fetched from server
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        //add new event to the state
        case 'ADD_EVENT':
            return { ...state, events: [...state.events, action.payload] };
        //removes event fromt the state by filtering deleted event 
        case 'DELETE_EVENT':
            return { ...state, events: state.events.filter(event => event.id !== action.payload) }
        //updates existing event in the state
        case 'UPDATE_EVENT':
            return { ...state, events: state.events.map(event => event.id === action.payload.id ? action.payload : event) }
        //clears events in case of an error    
        case 'CLEAR_EVENTS':
            return { ...state, events: [] };
        default:
            return state;
    }
}

//function to render event list 
function EventList() {
    const [state, dispatch] = useReducer(eventsReducer, initialState);
    const [searchQuery, setSearchQuery] = useState('') //tracks search
    const [selectedEvent, setSelectedEvent] = useState(null) //tracks selected event

    //useEffect to render events on page load
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/events`);

                //error handling to check for response from server
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data = await response.json();
                dispatch({ type: 'SET_EVENTS', payload: data });



            } catch (error) {
                console.error('Error fetching trivia questions:', error);
                //clears event list on error
                dispatch({ type: 'CLEAR_EVENTS', payload: data })
            }
        };

        fetchEvents()
    }, []);

    // Filter events based on case-insensitive search query
    const filteredEvents = state.events.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle event update (PUT REQUEST)
    const handleUpdate = async (updatedEvent) => {
        try {
            const response = await fetch(`/api/events/${updatedEvent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvent),
            });
            const data = await response.json();
            dispatch({ type: 'UPDATE_EVENT', payload: data });
            setSelectedEvent(null); // Clear the edit state after update
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };


    return (
        <div>
            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search events by name, category, or location"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Event form */}
            <EventForm
                dispatch={dispatch}
                existingEvent={selectedEvent}
                onUpdate={handleUpdate}
                clearEdit={() => setSelectedEvent(null)}
            />
            <br />
            <div>
                <h2>Events</h2>
            </div>
            <div className='row'>
                {filteredEvents.map((event) => (
                    <div className='col-md-3' key={event.id}>
                        <EventCard event={event} dispatch={dispatch} onEdit={setSelectedEvent} />
                    </div>
                ))}
            </div>
        </div>
    );
}




export default EventList;
