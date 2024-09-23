import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar';
import Species from './components/Species';
import background from './assets/forest_background.jpg'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App"
    style={{backgroundImage: `${background}`}}
    >
      <MyNavBar />
  
        <Species />
     
    </div>
  );
}

export default App;
