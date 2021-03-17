import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { LoginReq } from "./services/userService";
import { toastWarning } from "./utils/toast";
import { Redirect } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirected, setRedirected] = useState(false);
  const isValidInputs = () => {
    if (!email) {
      toastWarning("Email is Required");
      return false;
    }
    if (!pass) {
      toastWarning("Password is Required");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (isValidInputs()) {
      const result = await LoginReq({ email, pass });
      if (result && result.status === 200) {
        //alert("ok");
        setRedirected(true);
      }
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "pass":
        setPass(e.target.value);
        break;
    }
  };

  return (
    <React.Fragment>
      {redirected ? <Redirect to="/users" /> : ""}
      <Container>
        <Row>
          <Col>
            <br />
            <br />
            <br />
            <br />
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleLogin}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
