import React, { useState } from "react";
import { Input, Form, Row, Col, FormGroup, Button } from "reactstrap";
import { nanoid } from "nanoid";

export default function Home() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    talent: "",
  });
  let arr = [];
  function createNewUser(event) {
    setData((prevData) => {
      const { name, value } = event.target;
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function add() {
    const oldVal = JSON.parse(localStorage.getItem("val"));
  
    oldVal.push(data)
    localStorage.setItem("val", JSON.stringify(oldVal));
  }

  console.log(data);

  return (
    <div className="home">
      <Form>
        <FormGroup>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={data.firstName}
                onChange={createNewUser}
                bsSize="sm"
              />
            </Col>
            <Col md={6}>
              <Input
                value={data.lastName}
                type="text"
                name="lastName"
                onChange={createNewUser}
                placeholder="Last Name"
                bsSize="sm"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md={6}>
              <Input
                value={data.age}
                type="text"
                onChange={createNewUser}
                name="age"
                placeholder="Age"
                bsSize="sm"
              />
            </Col>
            <Col md={6}>
              <Input
                name="talent"
                value={data.talent}
                type="select"
                bsSize="sm"
                onChange={createNewUser}
              >
                <option value="">Choose Your Talent</option>
                <option value="html">Html</option>
                <option value="js">JS</option>
                <option value="react">React</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <Col md={3}>
        <Button onClick={add} color="primary" className="mt-12">
          add
        </Button>
      </Col>
    </div>
  );
}
