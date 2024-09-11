import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'


//displays individula event details and handles deletion and editing
const EventCard = ({ event, dispatch, onEdit }) => {
    //format date 
    const formatedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    //handler for DELETE request
    const handleDeleteEvent = async () => {
        await fetch(`api/events/${event.id}`, {
            method: 'DELETE'
        })
        dispatch({ type: 'DELETE_EVENT', payload: event.id });

    }


    return (
        <Card className='event-card mb-3 shawdow-sm'>
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                    Date: {formatedDate} <br />
                    Category: {event.category || 'N/A'} <br />
                    Location: {event.location || 'N/A'}
                </Card.Text>
                <Button variant="outline-danger" onClick={() => { handleDeleteEvent() }} style={{ padding: '0.6em', marginRight: '0.9em' }}><ioicons.IoTrash /></Button>
                <Button variant="outline-warning" onClick={() => { onEdit(event) }} style={{ padding: '0.6em' }}> <ioicons.IoPencil /></Button>
            </Card.Body>
        </Card>
    )

}

export default EventCard;


