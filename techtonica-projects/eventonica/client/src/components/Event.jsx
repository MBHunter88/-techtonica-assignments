import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//import * as ioicons from 'react-icons/io5'



const Event = ({event}) => {
//format date 
const formatedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})


    return (
        <Card className='mb-3'>
            <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>
          Date: {formatedDate} <br />
          Category: {event.category || 'N/A'}
        </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default Event;

// <Button variant="outline-danger" onClick={()=>{onDelete(student)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
//             <Button variant="outline-info" onClick={()=>{onUpdate(student)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>