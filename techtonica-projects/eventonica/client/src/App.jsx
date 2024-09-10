import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import EventList from './components/EventList'


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <EventList />

    </div>
  )
}

export default App
