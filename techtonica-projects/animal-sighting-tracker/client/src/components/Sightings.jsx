import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

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

     // Function to handle adding a new sighting (e.g., open form/modal)
    const handleAddSighting = () => {
        // Implement your form/modal to add a new sighting
        console.log('Add new sighting');
    };

    // Function to handle editing a sighting
    const handleEditSighting = (sighting) => {
        // Implement logic to edit a sighting (e.g., open form/modal with the sighting's details)
        console.log('Edit sighting:', sighting);
    };

    // Function to handle deleting a sighting
    const handleDeleteSighting = async (sightingId) => {
        if (window.confirm('Are you sure you want to delete this sighting?')) {
            try {
                const response = await fetch(`http://localhost:8080/sightings/${sightingId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the deleted sighting from the local state
                    setSightings(sightings.filter(sighting => sighting.id !== sightingId));
                    console.log('Sighting deleted:', sightingId);
                } else {
                    console.error('Error deleting sighting');
                }
            } catch (error) {
                console.error('Error deleting sighting:', error);
            }
        }
    };

    return (
        <>
         <div className="sightings-container">
                {/* Render sightings */}
                {sightings.map((item) => (
                    <Card key={item.id} style={{ width: '18rem', marginBottom: '1rem' }}>
                        <Card.Header> Nickname: {item.nickname}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Healthy: {item.is_healthy ? 'Yes' : 'No'}</ListGroup.Item>
                            <ListGroup.Item>Location: {item.location}</ListGroup.Item>
                            <ListGroup.Item>Scientist: {item.scientist}</ListGroup.Item>
                            <ListGroup.Item>Contact: {item.sighter_email}</ListGroup.Item>
                            <ListGroup.Item>Date: {new Date(item.date_of_sighting).toLocaleDateString()}</ListGroup.Item>
                        </ListGroup>

                        {/* Buttons for Edit and Delete */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                            <Button variant="primary" onClick={() => handleEditSighting(item)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteSighting(item.id)}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
                  {/* Add Sighting Button */}
                  <Button variant="success" onClick={handleAddSighting} style={{ marginBottom: '1rem' }}>
                    Add Sighting
                </Button>
            </div>
        </>
    );
};

export default Sightings;
