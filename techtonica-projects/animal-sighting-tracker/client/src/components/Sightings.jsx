import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const Sightings = ({ individual, goBack }) => {
  const [sightings, setSightings] = useState([]);

  // Fetch sightings by individual's nickname
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/sightings/individuals/${individual.nickname}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setSightings(data.length > 0 ? data : []);
      } catch (error) {
        console.error('Error fetching sightings:', error);
        setSightings([]);
      }
    };

    fetchSightings();
  }, [individual]);

  

  return (
    <>
      <div className="sightings-container">
        {sightings.length > 0 ? (
          sightings.map((item) => (
            <Card key={item.id} style={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Header>Nickname: {item.nickname}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Healthy: {item.is_healthy ? 'Yes' : 'No'}</ListGroup.Item>
                <ListGroup.Item>Location: {item.location}</ListGroup.Item>
                <ListGroup.Item>Scientist: {item.scientist}</ListGroup.Item>
                <ListGroup.Item>Contact: {item.sighter_email}</ListGroup.Item>
                <ListGroup.Item>Date: {new Date(item.date_of_sighting).toLocaleDateString()}</ListGroup.Item>
              </ListGroup>
            </Card>
          ))
        ) : (
          <p>No sightings found for this individual.</p>
        )}

        <Button onClick={goBack} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to Individual List
        </Button>
      </div>
    </>
  );
};

export default Sightings;
