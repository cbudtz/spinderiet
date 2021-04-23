import Head from 'next/head'
import {apiGet, BASE_URL} from "./api/api";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import MarkDown from "./components/MarkDown";
import PageContent from "./components/PageContent";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/">Lægerne i spinderiet</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="/kort">Her bor vi</Nav.Link>
                      <Nav.Link href="/lægerne">Lægerne</Nav.Link>
                      <Nav.Link href="/lægerne">Personale</Nav.Link>
                      <Nav.Link href="/lægerne">Fotos</Nav.Link>
                      <NavDropdown title="Praktisk information" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Speciallæger</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Priser for patienter</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Vagtring</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Øvelser og vejledninger</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.4">Priser på attester</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.4">Problemer med e-konsultation<br/>receptfornyelse eller tidsbestilling</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
                  <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success">Search</Button>
                  </Form>
              </Navbar.Collapse>
          </Navbar>
          <Container>
            <PageContent contents={props.content}/>
          </Container>
      </main>


      <footer >

      </footer>
    </div>
  )
}

export async function getStaticProps({test =""}){
    const json = await apiGet("frontpage");
    console.log("Got static props: ")
    console.log(json)
    return {
        props:{
            ...json
        },
        revalidate:10
    }
}