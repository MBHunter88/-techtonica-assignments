import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

const ViewContact = ({ contactId, setSelectedContactId }) => {
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
            }
        };

        fetchContactDetails();
    }, [contactId]);

    // Update existing contact
    const updateContact = async (id, updatedContact) => {
        console.log('Updating contact with data:', updatedContact);
        try {
            const response = await fetch(`http://localhost:8080/contacts/${id}`, {  // Correct full URL
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedContact),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            const updated = await response.json();

            // Render the updated contact in the ViewContact component
            setContactDetails(updated);
        } catch (error) {
            console.error('Error updating contact:', error.message);
        }
    };

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
        <div className='contact-details-container'>
            <ul>
                <li><p>Name: {contactDetails.name}</p></li>
                <li><p>Email: {contactDetails.email}</p></li>
                <li><p>Phone: {contactDetails.phone}</p></li>
                <li><p>Address: {contactDetails.address}</p></li>
                <li><p>City: {contactDetails.city}</p></li>
                <li><p>State: {contactDetails.state}</p></li>
                <li><p>Notes: {contactDetails.notes}</p></li>
            </ul>
            {/* Pass the updateContact function and the current contact details to ContactForm */}
            <ContactForm updateContact={updateContact} contactToEdit={contactDetails} setContactDetails={setContactDetails}  />
            <button className='back-btn 'onClick={() => setSelectedContactId(null)}>Back</button>
        </div>
    );
}

export default ViewContact;
