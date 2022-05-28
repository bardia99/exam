import { useState } from "react";
import {
  Input,
  Form,
  Row,
  Col,
  FormGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { nanoid } from "nanoid";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const options = ["Html ", "Js ", "React "];
  function getStyles(option, optionValues, theme) {
    return {
      fontWeight:
        optionValues.indexOf(option) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    talent: [],
  });

  function createNewUser(e, name) {
    setData((prevData) => {
      return {
        ...prevData,
        [name]: e.target.value,
        id: nanoid(),
      };
    });
  }
  function add() {
    let oldVal = JSON.parse(localStorage.getItem("val"));
    if (oldVal !== null) {
      oldVal.push(data);
    } else {
      oldVal = [];
      oldVal.push(data);
    }
    localStorage.setItem("val", JSON.stringify(oldVal));
    setData({
      firstName: "",
      lastName: "",
      age: "",
      talent: [],
    });
  }

  return (
    <div className="home">
      <Card>
        <CardTitle className="mt-12 ml-12">
          <h3>Create</h3>
          <Breadcrumb>
            <BreadcrumbItem active>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <Link to="/users">Users</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </CardTitle>
        <CardBody>
          <Form>
            <FormGroup>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={data.firstName}
                    onChange={(e) => createNewUser(e, "firstName")}
                    bsSize="sm"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    value={data.lastName}
                    type="text"
                    name="lastName"
                    onChange={(e) => createNewUser(e, "lastName")}
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
                    onChange={(e) => createNewUser(e, "age")}
                    name="age"
                    placeholder="Age"
                    bsSize="sm"
                  />
                </Col>
                <Col md={6}>
                  <div>
                    <FormControl sx={{ m: 0, width: 555 }}>
                      <InputLabel id="talent-label">Talent</InputLabel>
                      <Select
                        labelId="talent-label"
                        id="talent"
                        name="talent"
                        multiple
                        value={data.talent}
                        onChange={(e) => createNewUser(e, "talent")}
                        input={<OutlinedInput id="talent" label="talent" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, data.talent, theme)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Form>
          <Col md={3}>
            <Button onClick={add} color="primary" className="mt-12">
              add
            </Button>
          </Col>
        </CardBody>
      </Card>
    </div>
  );
}
