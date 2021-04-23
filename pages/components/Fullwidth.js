import {Col, Container, Row} from "react-bootstrap";
import MarkDown from "./MarkDown";
import React from "react";

export default function Fullwidth({element}){
    return <Container>
        <Row>
            <Col >
                <MarkDown>{element?.text}</MarkDown>
            </Col>
        </Row>

    </Container>
}