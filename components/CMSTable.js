import {Col, Container, Row, Table} from "react-bootstrap";
import MarkDown from "./MarkDown";
import React from "react";

export default function CMSTable({element}){
    if (!element) {return <></>}
    let header = element.headers?.split("|");
    if (element.content?.charAt(element.content?.length-1) ===";"){
        element.content = element.content?.slice(0,-1);
    }
    const contentRows = element.content?.split(";")
    return <Container>
        <Row>
            <Col >
                <Table striped={element.striped} size={element.compact && "sm"}>
                    <thead>
                    <tr key={1}>
                        {header.map((header,key)=> <th key={key}>
                            <MarkDown>{ header}</MarkDown>
                        </th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {contentRows.map((row, key)=><tr key={key}>
                        {row.split("|").map((element, key)=>
                        <td key={key}>
                            <MarkDown>{element}</MarkDown>
                        </td>)}
                    </tr>)}

                    </tbody>
                </Table>
            </Col>
        </Row>

    </Container>
}