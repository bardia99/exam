import Home from "./Home";
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

function App() {
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
          <Home />
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
