import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userAction";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Error from "../components/Error";
const Login = () => {
  const registerState = useSelector((state) => state.loginUserReducer);
  const { error, success, loading } = registerState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      history.push("/");
    }
  }, [history]);
  const loginHandler = () => {
    const user = { email, password };
    dispatch(loginUser(user, history));
    localStorage.removeItem("currentUser");
    // history.push("/");
  };
  return (
    <>
      <Container>
        {loading && <Loader />}
        {success && <Success success="User Login Successfully" />}
        {error && <Error error="somthing went wrong" />}
        <Row className="d-flex justify-content-center   align-items-center">
          <Col md={6}>
            <h5 style={{ marginTop: "12%" }}>Login</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="primary" onClick={loginHandler}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
