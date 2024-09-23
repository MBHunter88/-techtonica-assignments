import React, { useState, useEffect } from 'react';

const ViewContact = ({ contactId }) => {
    const [contactDetails, setContactDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactDetails = async () => {
            console.log('Fetching details for contactId:', contactId);
            try {
                const response = await fetch(`http://localhost:8080/contacts/${contactId}`);
                if (response.status === 404) {
                    throw new Error('Contact not found');
                } else if (response.status >= 400) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setContactDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setError(false)
            }
        };

        fetchContactDetails();
    }, [contactId]);

    if (loading) {
        return <p>Loading contact details...</p>;
    }

    if (error) {
        return <p>Error fetching contact details: {error}</p>;
    }

    if (!contactDetails) {
        return <p>No contact details found.</p>;
    }

    return (
        <div>
            <ul>
                <li><p>Name: {contactDetails.name}</p></li>
                <li><p>Email: {contactDetails.email}</p></li>
                <li><p>Phone: {contactDetails.phone}</p></li>
                <li><p>Address: {contactDetails.address}</p></li>
                <li><p>City: {contactDetails.city}</p></li>
                <li><p>State: {contactDetails.state}</p></li>
                <li><p>Country: {contactDetails.country}</p></li>
                <li><p>Notes: {contactDetails.notes}</p></li>
                <button>Edit</button>
                <button>Delete</button>
            </ul>
            <button>Back</button>
        </div>
    );
}

export default ViewContact;
