import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Individual from './Individual';

const Species = () => {
  //state management
  const [species, setSpecies] = useState([]);
  const [activeSpecies, setActiveSpecies] = useState(null); // `activeSpecies`: stores selected species to display its individuals.
  const [titleText, setTitleText] = useState('an advocate')

  // Fetch species on page load
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/species`);
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error.message);
        throw error;
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
    if (commonName === 'Rusty Patched Bumble Bee') return 'the Hive';
    return '';
  }

  //function to iterate through text to change dynamically based on time
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      const newTitleText = ['a guardian', 'the difference', 'what they need']
      setTitleText(newTitleText[index]);
      index = (index + 1) % newTitleText.length
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  //if no species is selected then display all species, otherwise display the <Individual/> component
  return (
    <>
   {!activeSpecies && <div className='blurb'>
      <h2>Wolf, Bear, Bee...<span style={{fontFamily: 'Homemade Apple'}}>{titleText}</span></h2>
      <p>Join us in tracking and protecting endangered species! This app allows you to monitor sightings of
         the Red Wolf, Sloth Bear, and Rust Patched Bumble Bee. Explore detailed information on individual animals,
          add new sightings, and help us contribute to their conservation. Together, we can safeguard the future of these incredible creatures.</p>
    </div>}
      <div className="species-card">
        {!activeSpecies ? (
          species.map((item) => (
              <Card key={item.id || item.common_name} style={{ width: '27em', backgroundColor: 'beige' }}>
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
                <Card.Footer className="text-muted">{item.description}</Card.Footer>
              </Card>       
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
