import React from 'react';
import { Form, Button } from 'react-bootstrap';

const EditSightingForm = ({ onSubmit, formData, setFormData, setShowEditModal}) => {

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
  <div key={'inline-radio'}>
    <Form.Check
      inline
      type="radio"
      label="Yes"
      id="is_healthy_yes"
      name="is_healthy"
      value="true"
      checked={formData.is_healthy === 'true'}
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
      checked={formData.is_healthy === 'false'}
      onChange={handleInputChange}
      required
    />
  </div>
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

export default EditSightingForm;