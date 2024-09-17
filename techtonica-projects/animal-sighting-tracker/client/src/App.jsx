import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar';
import Species from './components/Species';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      {/* Add a Navbar for global navigation */}
      <MyNavBar />

      {/* Use a container for layout and structure */}
      <Container className="mt-4">
        {/* Species component will be the main component shown on the page */}
        <Species />
      </Container>
    </div>
  );
}

export default App;
