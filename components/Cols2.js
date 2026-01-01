import { Col, Container, Nav, Row, Button } from "react-bootstrap";
import MarkDown from "./MarkDown";
import React, { useState, useEffect } from "react";
import { useWindow } from "../api/window";

export default function Cols2({ element }) {
  const colStyle = { 
    overflowWrap: "break-word"
  };
  const [windowWidth, setWindowWidth] = useState(() => {
    // Initialize with a value that matches server-side rendering
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 2000; // Default for SSR
  });
  const [activeTab, setActiveTab] = useState("left");
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useWindow(setWindowWidth);
  
  // During SSR and initial client render, use the desktop layout to avoid hydration mismatch
  const shouldUseMobileLayout = isClient && windowWidth < 992 && element?.lefttitle && element?.righttitle;
  
  if (shouldUseMobileLayout) {
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
        <hr />
        <Row>
          <Col style={colStyle}>
            <h5 id="righttitle">{element?.righttitle}</h5>
            <MarkDown>{element?.right}</MarkDown>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col
            xl={element?.big ? (element?.big === "left" ? 8 : 4) : 6}
            lg={6}
            style={colStyle}
          >
            {element?.lefttitle && <h4>{element?.lefttitle}</h4>}
            <MarkDown>{element?.left}</MarkDown>
          </Col>
          <Col
            xl={element?.big ? (element?.big === "left" ? 4 : 8) : 6}
            lg={6}
            style={colStyle}
          >
            {element?.righttitle && <h4>{element?.righttitle}</h4>}
            <MarkDown style={{ maxWidth: "100%" }}>{element?.right}</MarkDown>
          </Col>
        </Row>
      </Container>
    );
  }
}
