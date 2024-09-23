import React from 'react';
import { Form, Button } from 'react-bootstrap';

const EditIndividualForm = ({ onSubmit, formData, setFormData, setShowEditModal}) => {

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="nickname">
      <Form.Label>Nickname</Form.Label>
      <Form.Control
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="is_healthy">
      <Form.Label>Healthy?</Form.Label>
      <Form.Control
        type="text"
        name="is_healthy"
        value={formData.is_healthy}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="location">
      <Form.Label>Location</Form.Label>
      <Form.Control
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="sighter_email">
      <Form.Label>Contact</Form.Label>
      <Form.Control
        type="email"
        name="sighter_email"
        value={formData.sighter_email}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Button variant="success" type="submit">
      Save
    </Button>
    <Button variant="secondary" onClick={() => setShowEditModal(false)} style={{ marginLeft: '10px' }}>
      Cancel
    </Button>
  </Form>
  );
};

export default EditIndividualForm;
