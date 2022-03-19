import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";


export default function login(){
    const [formState, setFormState] = useState({email:"",password:""})

    const handleChange =({target:{name,value}})=> {
        setFormState(prevState => ({
                ...prevState, [name]:value
            })
        )
    }

    return (<main>
            <Container>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    alert(JSON.stringify(formState))
                }}>
                    <Row>
                        <Col>
                            <Form.Control name={"email"} type={"email"} placeholder={"Email"} value={formState.email}
                                          onChange={handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control name={"passsword"} type={"password"} placeholder={"Password"}/>
                        </Col>
                    </Row>
                    <Button variant={"primary"} type={"submit"}>Login </Button>
                </Form>
            </Container>
        </main>

    )
}