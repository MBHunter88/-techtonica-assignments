import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import Sightings from './Sightings';
import AddIndividualForm from './AddIndividualForm';

const Individual = ({ species, goBack, getPackName }) => {
  const [individuals, setIndividuals] = useState([]);
  const [selectedIndividual, setSelectedIndividual] = useState(null); 
  const [showIndividualModal, setShowIndividualModal] = useState(false);
  const [showSightingModal, setShowSightingModal] = useState(false);

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

   // handler for adding a new individual
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
        setIndividuals([...individuals, newIndividual]); 
        setShowIndividualModal(false);  
      }
    } catch (error) {
      console.error('Error adding individual:', error);
    }
  };

  // show modal to add a new individual
  const handleAddIndividual = () => {
    setShowIndividualModal(true);
    setShowSightingModal(false);
  };

   // show modal to add a new sighting
   //TODO: move to sighting component for better organization 
   const handleAddSighting = () => {
    setShowSightingModal(true);
    setShowIndividualModal(false); 
  };

  return (
    <>
    
      <div >
     
        {!selectedIndividual  ? (
            individuals.map((individual) => (
            <div key={individual.id}>
                  <Card className="individual-card" style={{ width: '27em' }}>
                  <Card.Img
                  variant="top"
                  src={`http://localhost:8080${individual.image_url}`}
                  alt={individual.nickname}
                  style={{ width: '100%', height: '100%', aspectRatio: '4/3', opacity: '100%' }}
                />
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
            handleAddSighting={handleAddSighting}
            showSightingModal={showSightingModal}
            setShowSightingModal={setShowSightingModal}
            selectedIndividual={selectedIndividual}
          />
        )}
           <Button className="btn btn-primary" 
        onClick={handleAddIndividual}
        style={{ marginTop: '2rem', marginLeft: '6.8rem'}}>
            Add to {getPackName(species.common_name)}
            </Button>
            
        <Modal show={showIndividualModal} onHide={() => setShowIndividualModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add to {getPackName(species.common_name)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddIndividualForm onSubmit={handleFormSubmit} />
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
