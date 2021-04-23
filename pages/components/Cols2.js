import {Col, Container, Row} from "react-bootstrap";
import MarkDown from "./MarkDown";
import React from "react";

export default function Cols2({element}){
    return <Container>
        <Row>
            <Col sm={element?.big ==="left"? 8:4} >
                <MarkDown>{element?.left}</MarkDown>
            </Col>
            <Col sm={element?.left? 4:8} >
                <MarkDown style={{maxWidth:"100%"}}>{element?.right}</MarkDown>
            </Col>
        </Row>

    </Container>
}