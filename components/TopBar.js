import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";

export default function TopBar({element}){
    return <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Lægerne i spinderiet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/laegerne">Lægerne</Nav.Link>
                <Nav.Link href="/personale">Personale</Nav.Link>
                <NavDropdown title="Praktisk information" id="basic-nav-dropdown">
                    <NavDropdown.Item href="om">Om klinikken</NavDropdown.Item>
                    <NavDropdown.Item href="speciallaeger">Speciallæger</NavDropdown.Item>
                    <NavDropdown.Item href="priserpatient">Priser for patienter</NavDropdown.Item>
                    <NavDropdown.Item href="vagtring">Vagtring</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="oevelser">Øvelser og vejledninger</NavDropdown.Item>
                    <NavDropdown.Item href="priserattester">Priser på attester</NavDropdown.Item>
                    <NavDropdown.Item href="problemer">Problemer med e-konsultation<br/>receptfornyelse eller
                        tidsbestilling</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            {/*<Form inline>*/}
            {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
            {/*    <Button variant="outline-success">Search</Button>*/}
            {/*</Form>*/}
        </Navbar.Collapse>
    </Navbar>
}