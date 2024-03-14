import React from 'react'

//Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MyNavbar() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-0" sticky="top" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#dashboard" className="ms-5"><img src="https://gable-prod.s3.ap-southeast-1.amazonaws.com/logo_2e12331ff9_d9108c05a3.svg" alt="" width="70%"/></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              bg="dark" 
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Console
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#profile">Profile</Nav.Link>
                  <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="#logout">Log Out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MyNavbar;