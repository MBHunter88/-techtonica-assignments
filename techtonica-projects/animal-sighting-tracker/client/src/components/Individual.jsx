import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Individual = () => {
    const { nickname } = useParams();
    const [individual, setIndividual] = useState(null);

    useEffect(() => {
        const fetchIndividual = async () => {
            try {
                console.log("Fetching individual data for nickname:", nickname);

                const response = await fetch(`http://localhost:8080/individuals/nickname/${nickname}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Fetched individual data:", data);

                setIndividual(data.length > 0 ? data[0] : null);  // Assuming you're fetching an array, set the first individual

            } catch (error) {
                console.error('Error fetching individual:', error);
                setIndividual(null);  // Set to null on error
            }
        };

        if (nickname) {
            fetchIndividual();
        }
    }, [nickname]);

    if (individual === null) return <p>Loading...</p>;
    if (!individual) return <p>No individual found</p>;

    return (
        <div>
            <h2>{individual.nickname}</h2>
            <p>Tracking Scientist: {individual.scientist}</p>
            <p>Species: {individual.common_name}</p>
        </div>
    );
}

export default Individual;
