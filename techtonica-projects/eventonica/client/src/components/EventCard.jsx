import React, { useState }  from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'




//displays individula event details and handles deletion and editing
const EventCard = ({ event, dispatch, onEdit }) => {
//state management
const [isFavorite, setIsFavorite] = useState(false);

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

//handler for favorite
const handleFavEvent = () => {
setIsFavorite((prevIsFavorite) => !prevIsFavorite) 
}


    return (
        <Card className='event-card mb-3 shawdow-sm'>
            <Card.Body>

                <Card.Title>{event.name}
                    <span className='float-end'>
                    <Button
              className={`btn ${isFavorite ? 'btn-outline-custom' : ''}`} 
              style={{
                color: isFavorite ? '#d6248f' : '#d0d0d0', 
                borderColor: isFavorite ? '#d6248f' : '#d0d0d0',
                backgroundColor: isFavorite ? '#ffff' : '#ffff',
                display: 'inline',
                padding: '0.3em',
                marginTop: '-0.9em',
              }}
              onClick={handleFavEvent} 
            >
                            <ioicons.IoHeart />
                        </Button>
                    </span>
                </Card.Title>
                <Card.Text>
                    Location: {event.location || 'N/A'}<br />
                    Category: {event.category || 'N/A'} <br />
                    Date: {formatedDate}
                    <span className='float-end'>
                        <Button 
                        variant="outline-danger" 
                        onClick={() => { handleDeleteEvent() }} 
                        style={{ padding: '0.6em', marginLeft: '0.99em' }}> 
                        Delete <ioicons.IoTrash />
                        </Button>
                        </span>
                        <span className='float-end'>
                         <Button 
                         variant="outline-warning" 
                         onClick={() => { onEdit(event) }} 
                         style={{ padding: '0.6em' }}>
                         Edit <ioicons.IoPencil />
                         </Button>
                         </span>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default EventCard;


