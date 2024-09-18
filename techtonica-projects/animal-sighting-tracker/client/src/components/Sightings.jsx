import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import SightingsForm from './SightingsForm';

const Sightings = ({ individual, goBack, handleAddSighting, showSightingModal, setShowSightingModal }) => {
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

  // Handle form submission to add a new sighting
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sightings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, individual_id: individual.id }), // Include individual.id in the request body
      });

      if (response.ok) {
        const newSighting = await response.json();
        setSightings([...sightings, newSighting]); // Add new sighting to list
        setShowSightingModal(false); // Close modal after submission
      }
    } catch (error) {
      console.error('Error adding sighting:', error);
    }
  };

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
                <ListGroup.Item>Contact: {item.sighter_email}</ListGroup.Item>
                <ListGroup.Item>Date: {new Date(item.date_of_sighting).toLocaleDateString()}</ListGroup.Item>
              </ListGroup>
          
            </Card>
          ))
        ) : (
          <p>No sightings found for this individual.</p>
        )}

        <Button onClick={() => setShowSightingModal(true)} className="btn btn-success mt-3">
          Add New Sighting
        </Button>

        {/* Modal to add a new sighting */}
        <Modal show={showSightingModal} onHide={() => setShowSightingModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Sighting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Pass the form submit handler */}
            <SightingsForm onSubmit={handleFormSubmit} />
          </Modal.Body>
        </Modal>

        <Button onClick={goBack} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to Individual List
        </Button>
      </div>
    </>
  );
};

export default Sightings;
