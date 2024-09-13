# Eventonica

Eventonica is a web app built with React, Node.js, and PostgreSQL that allows users to manage events. Users can add, delete, search, and update events. The app also includes features like filtering events by category or location.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [API Routes](#api-routes)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)

## Technologies

The following technologies were used to build this app:

- **Frontend**: React (with Vite), Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Testing**: Vitest, React Testing Library (RTL)
- **Styling**: Bootstrap, Custom CSS

## Features

- **Event Management**: Add, delete, update, and search for events.
- **Search and Filter**: Search by event name, category, or location.
- **Responsive UI**: Fully responsive UI built with Bootstrap.
- **Persistent Data**: Events are stored in a PostgreSQL database.

## Demo
![short demo of web appliatoon](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXc2b281ZmVhbjU0Yng4NGEwOHh5b3Uyam04YmJwbzZmbnY3eTlvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XHFb42rroPwGIdxNa3/giphy.gif)

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- Node.js: [Download Node.js](https://nodejs.org/)
- PostgreSQL: [Download PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**:

   \`\`\`bash
   git clone git@github.com:MBHunter88/-techtonica-assignments.git
   cd eventonica
   \`\`\`

2. **Install dependencies** for both the client and server:

   \`\`\`bash
   # Install dependencies for the frontend (client)
   cd client
   npm install

   # Install dependencies for the backend (server)
   cd ../server
   npm install
   \`\`\`

3. **Set up PostgreSQL database**:
   
   - Create a new PostgreSQL database (e.g., \`eventonica_db\`).
   - Update the connection details in the \`.env\` file located in the \`server\` folder. Example:

     \`\`\`
     DB_HOST=localhost
     DB_USER=yourusername
     DB_PASSWORD=yourpassword
     DB_NAME=eventonica_db
     \`\`\`


## Running the App

### Backend (Server)

1. Navigate to the \`server\` folder and start the backend:

   \`\`\`bash
   npm start
   \`\`\`

   The backend will be running on [http://localhost:8080](http://localhost:8080).

### Frontend (Client)

2. Navigate to the \`client\` folder and start the frontend:

   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will be running on [http://localhost:5173](http://localhost:5173).

## API Routes

### Events API

- **GET /api/events**: Get all events
- **POST /api/events**: Add a new event
- **PUT /api/events/:id**: Update an event by ID
- **DELETE /api/events/:id**: Delete an event by ID

### Example Requests

- **GET All Events**:

  \`\`\`bash
  curl http://localhost:8080/api/events
  \`\`\`

## Tests

To run tests for the project:

1. **Frontend tests**:

   \`\`\`bash
   cd client
   npm test
   \`\`\`

2. **Backend tests**:

   \`\`\`bash
   cd server
   npm test
   \`\`\`

Tests include unit tests for React component and API integration tests for the backend.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
"""


