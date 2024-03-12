import { Col, Container, Nav, Row, Button } from "react-bootstrap";
import MarkDown from "./MarkDown";
import React, { useState } from "react";
import { useWindow } from "../api/window";

export default function Cols2({ element }) {
  const colStyle = { overflowWrap: "break-word" };
  const [windowWidth, setWindowWidth] = useState(2000);
  const [activeTab, setActiveTab] = useState("left");
  useWindow(setWindowWidth);
  if (windowWidth < 992 && element?.lefttitle && element?.righttitle) {
    return (
      <Container>
        <Button variant="link" href="#lefttitle">
          {element?.lefttitle ?? ""}
        </Button>
        <Button variant="link" href="#righttitle">
          {element?.righttitle ?? ""}
        </Button>
        <hr style={{ margin: "0 0 15px 0" }} />
        <Row>
          <Col style={colStyle}>
            <h5 id="lefttitle">{element?.lefttitle}</h5>
            <MarkDown>{element?.left}</MarkDown>
          </Col>
        </Row>
        <Row>
          <Col style={colStyle}>
            <h5 id="righttitle">{element?.righttitle}</h5>
            <MarkDown>{element?.right}</MarkDown>
          </Col>
        </Row>
        <Nav
          variant="tabs"
          defaultActiveKey="left"
          onSelect={(eventKey) => setActiveTab(eventKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="left" active={activeTab === "left"}>
              <h5>{element?.lefttitle}</h5>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="right" active={activeTab === "right"}>
              <h5>{element?.righttitle}</h5>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Row>
          <Col style={colStyle}>
            {activeTab === "left" && <MarkDown>{element?.left}</MarkDown>}
            {activeTab === "right" && <MarkDown>{element?.right}</MarkDown>}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col xl={element?.big === "left" ? 8 : 4} lg={6} style={colStyle}>
            {element?.lefttitle && <h4>{element?.lefttitle}</h4>}
            <MarkDown>{element?.left}</MarkDown>
          </Col>
          <Col xl={element?.left ? 4 : 8} lg={6} style={colStyle}>
            {element?.righttitle && <h4>{element?.righttitle}</h4>}
            <MarkDown style={{ maxWidth: "100%" }}>{element?.right}</MarkDown>
          </Col>
        </Row>
      </Container>
    );
  }
}
