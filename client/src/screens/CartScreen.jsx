import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../actions/cartAction";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  console.log(currentUser);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce((x, item) => x + item.price, 0);
  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            {cartItems.length > 0 ? (
              <h4 style={{ marginTop: "10%" }}>My Cart</h4>
            ) : (
              ""
            )}
            <Row>
              {cartItems.map((item) => (
                <>
                  <Col md={7}>
                    <h5>
                      {item.name} [{item.varient}]
                    </h5>
                    <h6>
                      {" "}
                      Price : {item.quantity} X {item.prices[0][item.varient]} ={" "}
                      {item.price}
                    </h6>

                    <h6>
                      Quantity :&nbsp;
                      <FaMinusCircle
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.varient)
                          );
                        }}
                      />{" "}
                      &nbsp;
                      {item.quantity} &nbsp;
                      <FaPlusCircle
                        className="text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.varient)
                          );
                        }}
                      />
                    </h6>
                  </Col>
                  <Col md={5}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer", marginLeft: "20px" }}
                      onClick={() => {
                        dispatch(deleteFromCart(item));
                      }}
                    />
                  </Col>
                  <hr />
                </>
              ))}
            </Row>
          </Col>
          {cartItems.length > 0 ? (
            <Col md={4}>
              <h4 style={{ marginTop: "10%" }}>Payment Info</h4>
              <h4>Sub Total </h4>
              <h4>RS : {subTotal} /-</h4>
              {currentUser === null ? (
                <Link to="/login">
                  <Button>Login Before Buy</Button>
                </Link>
              ) : (
                <Checkout subTotal={subTotal} />
              )}
            </Col>
          ) : (
            <div
              style={{ marginTop: "15%" }}
              className="d-flex justify-content-center   align-items-center"
            >
              <h2 className="">There is no items in cart</h2>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
