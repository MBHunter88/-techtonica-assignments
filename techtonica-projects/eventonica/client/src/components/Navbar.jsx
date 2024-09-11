import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/BlueTechtonicaWord.png'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


function MyNavBar({ searchQuery, setSearchQuery }) {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand='lg' className='my-navbar'>
        <Container>
          <Navbar.Brand href="/">
          <h1>EVENTONICA</h1>
            {/* <img
              src={Logo}
              height="40"
              className="d-lg-inline-block alighn-top"
              alt="Techtonica logo"
            /> */}
          </Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Form className="d-flex search-form">
            <FormControl
              type="search"
              placeholder="Search events"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            />
          </Form>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">MJ Bedford Hunter</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;