import {Col, Container, Row, Table} from "react-bootstrap";
import MarkDown from "./MarkDown";
import React from "react";
import {trimEndCharFromString} from "../util/util";

export default function CMSTable({element}){
    if (!element) {return <></>}
    const headers =trimEndCharFromString(element.headers,";")
    let header = headers?.split("|");
    const content = trimEndCharFromString(element.content,";")
    const contentRows = content?.split(";")
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