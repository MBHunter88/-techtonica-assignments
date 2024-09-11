import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"


//adding and updating events
const EventForm = ({ dispatch, existingEvent, onUpdate, clearEdit }) => {
    //state management for form inputs
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    //prefill form when editing event
    useEffect(() => {
        if (existingEvent) {
            setName(existingEvent.name);
            setDate(formatDate(existingEvent.date));
            setCategory(existingEvent.category);
            setLocation(existingEvent.location);
        }
    }, [existingEvent]);

    // Function to format date to YYYY-MM-DD 
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    };

    //handler for POST and PUT request
    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = { name, date, category, location }

        //updating event (PUT request)
        if (existingEvent) {
            const updatedEvent = { ...existingEvent, ...event }
            onUpdate(updatedEvent)

        } else {
            try {
                //adding event (POST request)
                const response = await fetch('api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event)
                })
                const addedEvent = await response.json()

                //useReducer dispatch to add the event to EventList
                dispatch({ type: 'ADD_EVENT', payload: addedEvent });
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
        clearForm()
    }

    //clear and reset state
    const clearForm = () => {
        setName('');
        setDate('');
        setCategory('');
        setLocation('');
        if (clearEdit) clearEdit(); // Clear the edit state
    };

    return (
        <Form className='event-form col-md-4 shawdow p-3' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <input
                    type="text"
                    id="add-event-name"
                    placeholder="Event Name"
                    required
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}

                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <input
                    type="text"
                    id="add-category"
                    placeholder="Category"
                    required
                    value={category || ''}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    id="add-location"
                    placeholder="Location"
                    required
                    value={location || ''}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date </Form.Label><br />
                <input
                    type="date"
                    id="add-date"
                    placeholder="Date"
                    required
                    value={date || ''}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group><br />
            <Form.Group>
                <Button type="submit" variant="success">
                    {existingEvent ? 'Update Event' : 'Add Event'}
                </Button>
                {existingEvent && (
                    <Button variant="outline-dark" onClick={clearForm} style={{ marginLeft: '1rem' }}>
                        Cancel
                    </Button>
                )}
            </Form.Group>
        </Form>
    );
};

export default EventForm



