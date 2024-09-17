import React, { useState, useEffect } from 'react'
import { Button, Card } from "react-bootstrap"
import Sightings from './Sightings';

const Species = ({ fetchSightings, setSightings }) => {
    const [species, setSpecies] = useState([]);
    const [activeSpeciesName, setActiveSpeciesName] = useState(null);

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

    // Toggle sightings display for species by name
    const handleShowSightings = (speciesName) => {
        setActiveSpeciesName(prevName => (prevName === speciesName ? null : speciesName));
    };

    return (
        <>
            <div className='species-card'>
                {species.map((item) => (
                    <Card key={item.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top"
                            src={`http://localhost:8080${item.image_url}`}
                            alt={item.common_name}
                            style={{ width: '100%', height: '200px' }} />

                        <Card.Body>
                            <Card.Title>{item.common_name}</Card.Title>
                            <Card.Text>
                                Scientific Name: {item.scientific_name}
                                <br />
                                Conservation Status: {item.conservation_status_code}
                            </Card.Text>
                            <div>
                                <Button className="btn btn-primary"
                                    onClick={() => handleShowSightings(item.common_name)}>
                                    {activeSpeciesName === item.common_name ? 'Hide Sightings' : 'Show Sightings'}
                                </Button>
                                {/* Render Sightings component if this species is active */}
                                {activeSpeciesName === item.common_name && <Sightings species={item.common_name} />}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Species;
