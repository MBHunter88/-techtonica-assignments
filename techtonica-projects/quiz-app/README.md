# BrainBuster 🧠💥
**Where Only the Sharpest Minds Survive!**

Welcome to **BrainBuster**, the ultimate trivia challenge that will test your brainpower! Think you're smart? Prove it by answering some of the toughest trivia questions out there.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)

---

## Demo

![BrainBuster Demo](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWJwNnQ4b2VjbHVzeWt6ZGpzN2g3bWdxNmxnbDZzNHQzYnYxbzNlOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RDr18kPOf8aa3pjt7I/giphy.gif)


---

## Features
- 🧠 **Challenging Questions** from various categories.
- 🎯 **Score Tracking**: See how well you're doing in real-time.
- 🟢 **Dynamic Answer Highlighting**: Correct answers turn green once selected.
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop devices.
- 💬 **Instant Feedback**: Know immediately if your answer is right or wrong.

---

## Installation

### Prerequisites
- **Node.js** (v12.0 or higher)
- **npm** (v6.0 or higher)

### Step-by-Step Instructions
1. **Clone the repository**:
    ```bash
    git clone git@github.com:MBHunter88/-techtonica-assignments.git
    cd quiz-app
    ```

2. **Install the dependencies**:
    ```bash
    npm install
    ```

3. **Run the app**:
    ```bash
    npm start
    ```

4. **Access the app**:
    - Open your browser and go to `http://localhost:3000`.

---

## Usage

1. **Start the Game**:
   - Click the "Start Quiz" button to fetch trivia questions from the external API and begin your BrainBuster challenge.
   
2. **Answer the Questions**:
   - Select the correct answer from the provided options. The correct answer will turn green once selected.

3. **Track Your Progress**:
   - The scoreboard updates after each question to show your current score.

4. **Finish the Quiz**:
   - After the last question, your total score will be displayed, and you’ll have the option to restart the game.

---

## Testing

**BrainBuster** comes with unit and integration tests to ensure everything works as expected.

### Running Tests
1. **Run all tests**:
    ```bash
    npm test
    ```

2. **Run specific tests**:
    - You can run tests for specific components or features by specifying the test file:
    ```bash
    npm test -- YourTestFile.test.js
    ```

3. **Integration Testing**:
   - All major interactions between the frontend and backend are tested to ensure data flow and user experience are smooth.

---

## Technologies Used

- **Frontend**:
  - React.js (with Hooks)
  - CSS3 (including media queries for responsive design)

- **Backend**:
  - Node.js
  - Express.js
  - External Trivia API

- **Testing**:
  - Jest
  - React Testing Library
  - Supertest (for backend API tests)

---

## License
This project is licensed under the MIT License.

---

