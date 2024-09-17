import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import Species from './Species';
import * as ioicons from 'react-icons/io5'


const Sightings = ({species}) => {
    const [sightings, setSightings] = useState([])
    useEffect(() => {
        const fetchSightings = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/sightings`);

                //error handling to check for response from server
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data = await response.json();
                console.log(data)
                setSightings(data)
                // dispatch({ type: 'SET_EVENTS', payload: data });



            } catch (error) {
                console.error('Error fetching events:', error);
                //clears event list on error
                // dispatch({ type: 'CLEAR_EVENTS', payload: data })
            }
        };

        fetchSightings()
    }, []);



    return (
        <>
             <div className="sightings-container">
                {sightings.map((item) => (
                    <Card key={item.id} style={{ width: '18rem', marginBottom: '1rem' }}>
                        <Card.Header>Featured {item.common_name} Sighting</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Nickname: <a href={`/individual/${item.nickname}`} className="text-decoration-none">
          {item.nickname}
        </a></ListGroup.Item>
                            <ListGroup.Item>Healthy: {item.is_healthy}</ListGroup.Item>
                            <ListGroup.Item>Location: {item.location}</ListGroup.Item>
                            <ListGroup.Item>Date: {item.date_of_sighting}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </div>
        </>
    );

}


export default Sightings;