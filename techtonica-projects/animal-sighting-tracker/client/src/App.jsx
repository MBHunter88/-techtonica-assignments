import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar';
import Species from './components/Species';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <Container className="mt-4">
        <Species />
      </Container>
    </div>
  );
}

export default App;
