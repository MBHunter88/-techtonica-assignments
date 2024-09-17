import React, { useState, useEffect } from 'react'
import { Button, Card } from "react-bootstrap"

const Species = ({fetchSightings}) => {
    const [species, setSpecies] = useState([])
    //useEffect to render events on page load
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/species`);

                //error handling to check for response from server
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data = await response.json();
                setSpecies(data)
                // dispatch({ type: 'SET_EVENTS', payload: data });



            } catch (error) {
                console.error('Error fetching events:', error);
                //clears event list on error
                // dispatch({ type: 'CLEAR_EVENTS', payload: data })
            }
        };

        fetchSpecies()
    }, []);

    const handleShowSightings = (species) => {
        fetch(`/sightings/species/${species}`)
          .then(response => response.json())
          .then(data => setSightings(data))
          .catch(error => console.error('Error fetching sightings:', error));
      };


    return (
        <>
      
            <div>
                {species.map((item) => (
                    <Card key={item.id} style={{ width: '18rem' }}>
                        {console.log(`Image URL for ${item.common_name}:`, item.image_url)}
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
                            <Button className="btn btn-primary" onClick={() => fetchSightings(item.common_name)}>Sightings</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>

    );
};


export default Species