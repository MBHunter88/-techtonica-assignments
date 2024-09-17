import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Sightings = ({ species }) => {
    const [sightings, setSightings] = useState([]);

    // Fetch sightings by species name
    useEffect(() => {
        const fetchSightings = async () => {
            try {
                console.log("Fetching sightings for species:", species);

                const response = await fetch(`http://localhost:8080/sightings/species/${species}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Fetched sightings data:", data);

                setSightings(data.length > 0 ? data : []);

            } catch (error) {
                console.error('Error fetching sightings:', error);
                setSightings([]);
            }
        };

        if (species) {
            fetchSightings();
        }
    }, [species]);

    return (
        <>
            <div className="sightings-container">
                {sightings.length > 0 ? (
                    sightings.map((item) => (
                        <Card key={item.id} style={{ width: '18rem', marginBottom: '1rem' }}>
                            <Card.Header>Featured {item.common_name} Sighting</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    Nickname: <a href={`/individual/${item.nickname}`} className="text-decoration-none">
                                        {item.nickname}
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>Healthy: {item.is_healthy ? 'Yes' : 'No'}</ListGroup.Item>
                                <ListGroup.Item>Location: {item.location}</ListGroup.Item>
                                <ListGroup.Item>Date: {new Date(item.date_of_sighting).toLocaleDateString()}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))
                ) : (
                    <p>No sightings found for this species.</p>
                )}
            </div>
        </>
    );
};

export default Sightings;
