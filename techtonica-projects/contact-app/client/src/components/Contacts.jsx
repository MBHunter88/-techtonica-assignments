import React, { useState, useEffect } from 'react';
import ViewContact from './ViewContact';
import ContactForm from './ContactForm';

const Contacts = () => {
    //state management 
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContactId, setSelectedContactId] = useState(null);

    

    //fetch contacts on page load
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/contacts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    // Add new contact
    const addContact = async (formInput) => {
        const response = await fetch('http://localhost:8080/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formInput),
        });
        const newContact = await response.json();
        console.log('New contact added:', newContact);
        setContacts([...contacts, newContact]);
    };


    // Delete contact
    const deleteContact = async (id) => {
        await fetch(`http://localhost:8080/contacts/${id}`, { method: 'DELETE' });
        setContacts(contacts.filter(contact => contact.id !== id));
    }
    const handleViewDetails = (id) => {
        setSelectedContactId(id);
    };

    if (loading) {
        return <p>Loading contacts...</p>;
    }

    if (error) {
        return <p>Error fetching contacts: {error}</p>;
    }

    return (
        <div>
          {selectedContactId == null && (
            <div className="button-container">
                <ContactForm addContact={addContact}  />
            </div>
        )}
             {!selectedContactId ? (
                <ul>
                    {contacts.map(contact => (
                        <><li key={contact.id}>
                            <p>Name: {contact.name}</p>
                            <p>Email: {contact.email}</p>
                            <p>Phone: {contact.phone}</p>
                            <button onClick={() => handleViewDetails(contact.id)}>View Details</button>
                        </li><button onClick={() => deleteContact(contact.id)}>Delete</button></>
                    ))}
                </ul>
                
            ) : (
                <ViewContact contactId={selectedContactId}
                setSelectedContactId={setSelectedContactId}
                setContacts={setContacts} />
            )}
           
        </div>
    );
}

export default Contacts;
