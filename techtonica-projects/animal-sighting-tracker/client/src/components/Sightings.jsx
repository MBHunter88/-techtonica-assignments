import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import AddSightingForm from './AddSightingForm';
import * as ioicons from 'react-icons/io5'
import EditSightingForm from './EditSightingForm';

const Sightings = ({ individual, goBack, showSightingModal, setShowSightingModal }) => {
    //state management
  const [sightings, setSightings] = useState([]);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});

  
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

  // handle form submission to add a new sighting
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sightings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, individual_id: individual.id }), 
      });

      if (response.ok) {
        const newSighting = await response.json();
        setSightings([...sightings, newSighting]); // add the new sighting to list
        setShowSightingModal(false); // close modal after submit
      }
    } catch (error) {
      console.error('Error adding sighting:', error);
    }
  };

  

    // handler for UPDATEing sighting
    const handleEditFormSubmit = async () => {
        //add the individual_id from the JOINed table to the form data
        const updatedFormData = { ...formData, individual_id: individual.id };
    
        try {
          const response = await fetch(`http://localhost:8080/api/sightings/${selectedSighting.sighting_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFormData), // send with individual_id
          });
    
          if (response.ok) {
            const updatedSighting = await response.json();
           
    //return updated sightings mapped to update the sightings state 
    setSightings((prevSightings) =>
      prevSightings.map((sighting) =>
        sighting.id === updatedSighting.id ? updatedSighting : sighting
      )
    );
    
    
            setShowEditModal(false); // Close the edit modal after update
          } else {
            console.error("Failed to update sighting:", response.statusText);
          }
        } catch (error) {
          console.error('Error updating sighting:', error);
        }
    };
    



  // show edit modal and prefill edit modal for the selected sighting
  const handleEditClick = (sighting) => {
    setSelectedSighting(sighting); 
    setFormData(sighting); 
    setShowEditModal(true); 
  };

  //handler to DELETE sighting by id
  const handleDeleteSighting = async (sightingId) => {
    //window message to ensure user wants to delete
    const confirmDelete = window.confirm("Are you sure you want to delete this sighting?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/sightings/${sightingId}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          setSightings((prevSightings) => prevSightings.filter(sighting => sighting.sighting_id !== sightingId));
          alert('Sighting deleted successfully!');
        } else {
          alert('Failed to delete sighting');
        }
      } catch (error) {
        console.error('Error deleting sighting:', error);
      }
    }
  };


  //render sightings in cards for each sighting with edit and delete buttons, if no sighting display message 
  return (
    <>

      <div className="button-container">
          <Button 
            onClick={() => setShowSightingModal(true)} 
            className="btn btn-success"
            style={{ marginTop: '2rem', margin: 'auto'}} 
          >
            Add New Sighting
          </Button>
        </div>
        <br/>

        <div className="button-container">
          <Button 
            onClick={goBack} 
            className="btn btn-secondary"  
            style={{ marginTop: '2rem', margin: 'auto' }}
          >
            Back
          </Button>
        </div>
      

      <div className="sightings">
        {sightings.length > 0 ? (
          sightings.map((item) => (
            <Card className="sighting-card" key={item.sighting_id} style={{  width: '27em' }}>
              <Card.Header>Nickname: {item.nickname}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Healthy: {item.is_healthy ? 'Yes' : 'No'}</ListGroup.Item>
                <ListGroup.Item>Location: {item.location}</ListGroup.Item>
                <ListGroup.Item>Tracked by: {item.scientist}</ListGroup.Item>
                <ListGroup.Item>Contact: {item.sighter_email}</ListGroup.Item>
                <ListGroup.Item>Date: {new Date(item.date_of_sighting).toLocaleDateString()}</ListGroup.Item>
              </ListGroup>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6em 0', gap: '1em' }}>
                <Button 
                  variant="outline-warning" 
                  onClick={() => handleEditClick(item)} 
                  style={{ padding: '0.6em' }}
                >
                  Edit <ioicons.IoPencil />
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => handleDeleteSighting(item.sighting_id)} 
                  style={{ padding: '0.6em' }}
                >
                  Delete <ioicons.IoTrash />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p>No sightings found for this individual.</p>
        )}
  
      
  
        {/* Modal to add new sighting */}
        <Modal show={showSightingModal} onHide={() => setShowSightingModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Sighting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddSightingForm onSubmit={handleFormSubmit} />
          </Modal.Body>
        </Modal>
  
        {/* Modal to edit sighting */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sighting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditSightingForm 
              onSubmit={handleEditFormSubmit} 
              formData={formData} 
              setFormData={setFormData} 
              setShowEditModal={setShowEditModal} 
            />
          </Modal.Body>
        </Modal>
  
      </div>
    </>
  );
  
};

export default Sightings;
