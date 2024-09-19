import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/WBBLogo.png'


function MyNavBar(props) {

  return (
    <>
    <Navbar style={{ backgroundColor: 'beige' }} sticky="top">
      <Container>
        <Navbar.Brand href="/">
        <img
              src={Logo}
              height="90"
              width="100"
              className="d-inline-block align-top"
            />
          
        </Navbar.Brand>
        <h1>Wolf - Bear - Bee <span style={{ fontStyle: 'italic' }}>Guardians</span></h1>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Donate: <a href="https://www.redwolf.org/general-donation">Red Wolf Sanctuary</a><br/>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;