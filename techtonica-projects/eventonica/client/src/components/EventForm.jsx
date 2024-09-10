import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"



const EventForm = ({ dispatch }) => {
    //state management
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    //handler for event post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = { name, date, category, location }

        try {
            const response = await fetch('api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent)
            })
            const addedEvent = await response.json()

            //useReducer dispatch to add the event to EventList
            dispatch({ type: 'ADD_EVENT', payload: addedEvent });
            //reset form fields
            setName('');
            setDate('');
            setCategory('');
            setLocation('');

        } catch (error) {
            console.error('Error adding event:', error);
        }
    }
    

    return (
        <Form className='col-md-4' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <input
                    type="text"
                    id="add-event-name"
                    placeholder="Event Name"
                    // required
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}

                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <input
                    type="text"
                    id="add-category"
                    placeholder="Category"
                    // required
                    value={category || ''}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    id="add-location"
                    placeholder="Location"
                    // required
                    value={location || ''}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date </Form.Label><br/>
                <input
                    type="date"
                    id="add-date"
                    placeholder="Date"
                    // required
                    value={date || ''}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group><br/>
            <Form.Group>
                <Button type="submit" variant="outline-success">Add Event</Button>
            </Form.Group>
        </Form>
    );
};

export default EventForm



// {event.id ? "Edit Event" : "Add Event"}
// {event.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}

// // This is the original State with not initial student 
// const [student, setStudent] = useState(editingStudent || {
//     firstname: "",
//     lastname: "",
//     is_current: false
// });

// //create functions that handle the event of the user typing into the form
// const handleNameChange = (event) => {
//     const firstname = event.target.value;
//     setStudent((student) => ({ ...student, firstname }));

// };

// const handleLastnameChange = (event) => {
//     const lastname = event.target.value;
//     setStudent((student) => ({ ...student, lastname }));
// };

// const handleCheckChange = (event) => {
//     const is_current = event.target.checked;
//     //console.log(iscurrent);
//     setStudent((student) => ({ ...student, is_current }));
// };

// const clearForm = () => {
//     setStudent({ firstname: "", lastname: "", is_current: false })
// }


// //A function to handle the post request
// const putStudent = (toEditStudent) => {
//     return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(toEditStudent),
//     })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             onUpdateStudent(data);
//             //this line just for cleaning the form
//             clearForm();
//         });
// };


// //A function to handle the submit in both cases - Post and Put request!
// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (student.id) {
//         putStudent(student);
//     } else {
//         postStudent(student);
//     }
// };