import React, { useReducer, useEffect } from 'react';

// Initial state for form
const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    notes: '',
    editing: false,
    contactId: null,
};

// Reducer function to handle form actions
const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'SET_EDIT_CONTACT':
            return {
                ...state,
                ...action.contact,  // Set form fields to the contact being edited
                editing: true,      // Set editing mode to true
                contactId: action.contact.id,
            };
        default:
            return state;
    }
};

// Form component for adding or editing contact
const ContactForm = ({ addContact, updateContact, contactToEdit, setContactDetails }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    // Handle input changes
    const handleInputChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        console.log('Submitting form with state:', state);
        e.preventDefault();
        if (state.editing) {
            await updateContact(state.contactId, state); // Update contact
            setContactDetails(state); 
        } else {
            await addContact(state); // Add new contact
           
        }
       
    };

    useEffect(() => {
        if (contactToEdit) {
            dispatch({ type: 'SET_EDIT_CONTACT', contact: contactToEdit });
        }
    }, [contactToEdit]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
            />
            <input
                type="tel"
                name="phone"
                value={state.phone}
                onChange={handleInputChange}
                placeholder="Phone"
            />
             <input
                type="text"
                name="address"
                value={state.address}
                onChange={handleInputChange}
                placeholder="Street Address"
                
            />
             <input
                type="text"
                name="city"
                value={state.city}
                onChange={handleInputChange}
                placeholder="City"
                
            />
             <input
                type="text"
                name="state"
                value={state.state}
                onChange={handleInputChange}
                placeholder="State"
                
            />
            <textarea
                name="notes"
                value={state.notes}
                onChange={handleInputChange}
                placeholder="Notes"
            />
            <button type="submit">{state.editing ? 'Update Contact' : 'Add Contact'}</button>
        </form>
    );
};

export default ContactForm;
