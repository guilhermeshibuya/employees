import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const PageNavbar = () => {
    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Container className="mx-0">
                    <Navbar.Brand as={NavLink} to="/">CRUD</Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbar-nav"/>
                    <Navbar.Collapse id="navbar-nav">
                        <Nav>
                            <Nav.Link as={NavLink} to="/create">Create Record</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default PageNavbar;