import React from "react";
import {
  Table,
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  Input,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Users() {
  const users = JSON.parse(localStorage.getItem("val"));

  const tableUsers = users.map(function(user,i){
    return <tr>
    <td>{i + 1}</td>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.age}</td>
    <td>{user.talent}</td>
  </tr>;
  })

  return (
    <div>
      <Card>
        <CardTitle className="mt-12 ml-12">
          <h3>Create</h3>
          <Breadcrumb>
            <BreadcrumbItem active>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/users">Users</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </CardTitle>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Talent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tableUsers}</tbody>
          </Table>

          <Modal
            centered
            fullscreen="lg"
            size="lg"
            toggle={function noRefCheck() {}}
          >
            <ModalHeader toggle={function noRefCheck() {}}>Edit</ModalHeader>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  // value={user.firstName}
                  bsSize="sm"
                />
              </Col>
              <Col md={6}>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  // value={user.lastName}
                  bsSize="sm"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  name="age"
                  placeholder="Age"
                  // value={user.age}
                  bsSize="sm"
                />
              </Col>
              <Col md={6}>
                <Input name="talent" type="select" bsSize="sm">
                  <option value="">Choose Your Talent</option>
                  <option value="html">Html</option>
                  <option value="js">JS</option>
                  <option value="react">React</option>
                </Input>
              </Col>
            </Row>
            <Button onClick={function noRefCheck() {}}>Cancel</Button>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}
