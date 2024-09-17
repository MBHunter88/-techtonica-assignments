import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import Sightings from './Sightings';
import IndividualForm from './IndividualForm';

const Individual = ({ species, goBack, getPackName }) => {
  const [individuals, setIndividuals] = useState([]);
  const [selectedIndividual, setSelectedIndividual] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  // Fetch individuals for the selected species
  useEffect(() => {
    const fetchIndividuals = async () => {
      try {
        const response = await fetch(`http://localhost:8080/individuals/species/${species.common_name}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setIndividuals(data);
      } catch (error) {
        console.error('Error fetching individuals:', error);
      }
    };

    fetchIndividuals();
  }, [species]);

  //handler for showing sightings for selected individual
  const handleShowSightings = (individual) => {
    setSelectedIndividual(individual); 
  };

   // Handle form submission to add a new individual
   const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/individuals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, species_id: species.id }),
      });

      if (response.ok) {
        const newIndividual = await response.json();
        setIndividuals([...individuals, newIndividual]); // Add new individual to list
        setShowModal(false); // Close modal after submission
      }
    } catch (error) {
      console.error('Error adding individual:', error);
    }
  };

  // Show the modal to add a new individual
  const handleAddIndividual = () => {
    setShowModal(true);
  };

  return (
    <>
    
      <div >
     
        {!selectedIndividual  ? (
            individuals.map((individual) => (
            <div key={individual.id}>
                  <Card className="individual-card" style={{ width: '27em' }}>
                      <Card.Body>
                          <Card.Title>{individual.nickname}</Card.Title>
                          <Button
                              className="btn btn-primary"
                              onClick={() => handleShowSightings(individual)}
                          >
                              View Sightings
                          </Button>
                      </Card.Body>
                  </Card>
                 
              </div>
              
          ))
        ) : (
         <Sightings
            individual={selectedIndividual}
            goBack={() => setSelectedIndividual(null)} 
          />
        )}
           <Button className="btn btn-primary" 
        onClick={handleAddIndividual}
        style={{ marginTop: '2rem', marginLeft: '6.8rem'}}>
            Add to {getPackName(species.common_name)}
            </Button>
            {/* Modal to add a new individual */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add to {getPackName(species.common_name)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IndividualForm onSubmit={handleFormSubmit} />
          </Modal.Body>
        </Modal>

        <Button onClick={goBack} className="btn btn-secondary" style={{ marginTop: '2rem', marginLeft: '6.8rem' }}>
          Back to Species List
        </Button>
       
      </div>
    </>
  );
};

export default Individual;
