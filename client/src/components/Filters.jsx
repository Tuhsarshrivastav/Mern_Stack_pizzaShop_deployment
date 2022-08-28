import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterPizza } from "../actions/pizzaAction";
const Filters = () => {
  const [searchkey, setsearchkey] = useState("");
  const [searchPrice, setsearchprice] = useState("AllPrice");
  const [quantity, setsearchQuantity] = useState("AllQTY");

  console.log(searchPrice);
  const [category, setcategory] = useState("all");
  const dispatch = useDispatch();
  return (
    <div className="p-4 bg-light mt-4">
      <Form>
        <Row>
          <Col md={6}>
            <Form.Control
              value={searchkey}
              onChange={(e) => setsearchkey(e.target.value)}
              placeholder="serach pizza by name"
            />
          </Col>
          <Col md={6}>
            <select
              class="form-select"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option>All</option>
              <option>veg</option>
              <option>nonveg</option>
            </select>
          </Col>
          <Col md={6} style={{ marginTop: "15px" }}>
            <select
              class="form-select"
              value={quantity}
              onChange={(e) => setsearchQuantity(e.target.value)}
            >
              <option>AllQuantity</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </Col>
          <Col md={6} style={{ marginTop: "15px" }}>
            <select
              class="form-select"
              value={searchPrice}
              onChange={(e) => setsearchprice(e.target.value)}
            >
              <option>AllPrice</option>
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
              <option>500</option>
            </select>
          </Col>
          <Col>
            <Button
              style={{ marginTop: "20px" }}
              onClick={() => {
                dispatch(
                  filterPizza(searchkey, category, searchPrice, quantity)
                );
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;
