// Initial state for form
export const initialState = {
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
export const formReducer = (state, action) => {
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
            case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

