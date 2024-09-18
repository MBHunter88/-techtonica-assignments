import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Individual from './Individual';

const Species = () => {
  //state management
  const [species, setSpecies] = useState([]);
  const [activeSpecies, setActiveSpecies] = useState(null); // `activeSpecies`: stores selected species to display its individuals.

  // Fetch species on page load
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/species`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  // handle selecting a species to show individuals listed for species 
  const handleShowIndividuals = (species) => {
    setActiveSpecies(species); 
  };

  //funtion to return a collective name for button based on selected specie
  function getPackName(commonName) {
    if (commonName === 'Red Wolf') return 'the Pack';
    if (commonName === 'Sloth Bear') return 'the Sleuth';
    if (commonName === 'Rust Patched Bumble Bee') return 'the Hive';
    return '';
  }

  //if no species is selected then display all species, otherwise display the <Individual/> component
  return (
    <>
      <div className="species-card">
        {!activeSpecies ? (
          species.map((item) => (
            <React.Fragment key={item.id}>
              <Card style={{ width: '27em' }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080${item.image_url}`}
                  alt={item.common_name}
                  style={{ width: '100%', height: '100%', aspectRatio: '4/3', opacity: '100%' }}
                />
                <Card.Body>
                  <Card.Title>{item.common_name} 
                    <span style={{ fontStyle: 'italic' }} >({item.scientific_name})</span>
                 </Card.Title>
                  <Card.Text>
                    Status: {item.conservation_status_code}
                    <br />
                    Left in the wild: {item.number_in_wild}
                  </Card.Text>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleShowIndividuals(item)}
                  >
                    Meet {getPackName(item.common_name)}
                  </Button>
                </Card.Body>
              </Card>
            </React.Fragment>
          ))
        ) : (
          <Individual
            getPackName={getPackName}
            species={activeSpecies}
            goBack={() => setActiveSpecies(null)} 
          />
        )}
      </div>
    </>
  );
};

export default Species;
