import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddSightingForm = ({ onSubmit }) => {
  //state management with form data
  const [sighting, setSighting] = useState({
    date_of_sighting: '',
    location: '',
    is_healthy: '',
    scientist: '',
    sighter_email: ''
  });

  //update sighting state with input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSighting({ ...sighting, [name]: value });
  };

  //call onSubmit prop with the input data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sighting);
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Form.Group controlId="is_healthy">
  <Form.Label>Healthy?</Form.Label>
  <div key={'inline-radio'}>
    <Form.Check
      inline
      type="radio"
      label="Yes"
      id="is_healthy_yes"
      name="is_healthy"
      value="true"
      checked={sighting.is_healthy === 'true'}
      onChange={handleInputChange}
      required
    />
    <Form.Check
      inline
      type="radio"
      label="No"
      id="is_healthy_no"
      name="is_healthy"
      value="false"
      checked={sighting.is_healthy === 'false'}
      onChange={handleInputChange}
      required
    />
  </div>
</Form.Group>

<Form.Group controlId="location">
        <Form.Label>Tracked by: </Form.Label>
        <Form.Control
          type="text"
          name="scientist"
          value={sighting.scientist}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="sighter_email">
        <Form.Label>Scientist Contact</Form.Label>
        <Form.Control
          type="email"
          name="sighter_email"
          placeholder="name@example.com"
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

export default AddSightingForm;
