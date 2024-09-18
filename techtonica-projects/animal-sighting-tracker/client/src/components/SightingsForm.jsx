import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SightingsForm = ({ onSubmit }) => {
  const [sighting, setSighting] = useState({
    date_of_sighting: '',
    location: '',
    is_healthy: '',
    sighter_email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSighting({ ...sighting, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sighting);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Date of Sighting Field */}
      <Form.Group controlId="date_of_sighting">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date_of_sighting"
          value={sighting.date_of_sighting}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      {/* Location Field */}
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={sighting.location}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      {/* Healthy Status Field */}
      <Form.Group controlId="is_healthy">
        <Form.Label>Healthy?</Form.Label>
        <Form.Control
          type="text"
          name="is_healthy"
          value={sighting.is_healthy}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      {/* Scientist Contact Field */}
      <Form.Group controlId="sighter_email">
        <Form.Label>Scientist Contact</Form.Label>
        <Form.Control
          type="email"
          name="sighter_email"
          value={sighting.sighter_email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Sighting
      </Button>
    </Form>
  );
};

export default SightingsForm;
