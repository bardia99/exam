import { useState } from "react";
import {
  Table,
  Card,
  CardBody,
  CardTitle,
  Input,
  Col,
  Row,
  Form,
  FormGroup,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import {
  Modal,
  Button,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("val")));
  const [btnId, setBtnId] = useState("");

  function deleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  let myId;
  function handleOpen(id) {
    setOpen(true);
    myId = id;
    setBtnId(myId);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id){
        setEditedData({
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          age: users[i].age,
          talent: users[i].talent,
        });
      }
    }
  }
  const handleClose = () => setOpen(false);

  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    talent: [],
  });

  function createEditedUser(e, name) {
    setEditedData((prevData) => {
      return {
        ...prevData,
        [name]: e.target.value,
        id: nanoid(),
      };
    });
  }

  function edit() {
    localStorage.setItem("newVal", JSON.stringify(editedData));
    const editedVal = JSON.parse(localStorage.getItem("newVal"));
    setUsers(users.map((user) => (user.id === btnId ? editedVal : user)));
    setEditedData({
      firstName: "",
      lastName: "",
      age: "",
      talent: [],
    });
    setOpen(false);
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
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

  return (
    <div>
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
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Talent</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map(function (user, i) {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.age}</td>
                      <td>{user.talent}</td>
                      <td>
                        <Button onClick={() => deleteUser(user.id)}>
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => handleOpen(user.id)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form>
                <FormGroup>
                  <Row>
                    <Col md={6}>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={editedData.firstName}
                        onChange={(e) => createEditedUser(e, "firstName")}
                        bsSize="sm"
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        value={editedData.lastName}
                        type="text"
                        name="lastName"
                        onChange={(e) => createEditedUser(e, "lastName")}
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
                        value={editedData.age}
                        type="text"
                        onChange={(e) => createEditedUser(e, "age")}
                        name="age"
                        placeholder="Age"
                        bsSize="sm"
                      />
                    </Col>
                    <Col md={6}>
                      <div>
                        <FormControl sx={{ m: 0, width: 155 }}>
                          <InputLabel id="talent-label">Talent</InputLabel>
                          <Select
                            labelId="talent-label"
                            id="talent"
                            name="talent"
                            multiple
                            value={editedData.talent}
                            onChange={(e) => createEditedUser(e, "talent")}
                            input={<OutlinedInput id="talent" label="talent" />}
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
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
                                style={getStyles(
                                  option,
                                  editedData.talent,
                                  theme
                                )}
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
                <Button onClick={edit} color="primary" className="mt-12">
                  Edit
                </Button>
              </Col>
            </Box>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}
