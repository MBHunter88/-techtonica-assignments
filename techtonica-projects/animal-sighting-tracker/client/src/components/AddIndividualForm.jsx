import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddIndividualForm = ({ onSubmit }) => {
  const [individual, setIndividual] = useState({ nickname: '', scientist: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIndividual({ ...individual, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(individual); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          name="nickname"
          value={individual.nickname}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="scientist">
        <Form.Label>Tracking Scientist</Form.Label>
        <Form.Control
          type="text"
          name="scientist"
          value={individual.scientist}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Add Individual
      </Button>
    </Form>
  );
};

export default AddIndividualForm;
