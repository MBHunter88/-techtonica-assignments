import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Species from './components/Species';
import Sightings from './components/Sightings';


function App() {

  return (
    <div className="App">
      <Species />
      <Sightings/>

    </div>
  )
}

export default App
