import {Col, Container, Row} from "react-bootstrap";
import MarkDown from "./MarkDown";
import React from "react";

export default function Cols2({element}){
    const colStyle = {overflowWrap:"break-word"}
    return <Container>
        <Row>
            <Col xl={element?.big ==="left"? 8:4} lg={6}style={colStyle}>
                <MarkDown >{element?.left}</MarkDown>
            </Col>
            <Col xl={element?.left? 4:8} lg={6} style={colStyle}>
                <MarkDown style={{maxWidth:"100%"}}>{element?.right}</MarkDown>
            </Col>
        </Row>

    </Container>
}