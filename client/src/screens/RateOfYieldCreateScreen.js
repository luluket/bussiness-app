import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table, FormGroup } from "react-bootstrap";
import { listProducts } from "../actions/articleActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { RATE_CREATE_RESET } from "../constants/rateOfYieldConstants";
import { listMaterials } from "../actions/articleActions";
import { createRate } from "../actions/rateOfYieldActions";

const RateOfYieldCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const [components, setComponents] = useState([
    { material: "", quantity: 0, factor: 0 },
  ]);
  const [rows, setRows] = useState([]);

  //fetch every article type product
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // fetch every article from material warehouse
  const materialList = useSelector((state) => state.materialList);
  const { materials } = materialList;

  const rateCreate = useSelector((state) => state.rateCreate);
  const { error: errorCreate, success: successCreate } = rateCreate;

  useEffect(() => {
    dispatch(listMaterials());
    dispatch(listProducts());
    if (successCreate) {
      dispatch({ type: RATE_CREATE_RESET });
      history.push("/manufacture");
    }
  }, [dispatch, successCreate]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  // handle array of components - material + percentage in product
  const handleMaterial = (index) => (event) => {
    const article = materials.find((item) => item._id === event.target.value);
    if (components[index]) {
      components[index].material = article;
    } else {
      components.push({
        material: article,
        quantity: 0,
        factor: 0,
      });
    }
  };

  const handleQuantity = (index) => (event) => {
    if (components[index]) {
      components[index].quantity = event.target.value;
    } else {
      components.push({
        material: "",
        quantity: event.target.value,
        factor: 0,
      });
    }
  };

  const handleFactor = (index) => (event) => {
    document.getElementById("factorHeader").style.border = "black";
    document.getElementById(`factor-${index}`).style.color = "black";
    if (components[index]) {
      components[index].factor = event.target.value;
    } else {
      components.push({
        material: "",
        quantity: 0,
        factor: event.target.value,
      });
    }
    if (components[index].factor > 1) {
      document.getElementById(`factor-${index}`).style.color = "red";
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var sumFactors = 0;
    components.forEach((component) => {
      sumFactors += parseFloat(component.factor);
    });
    if (sumFactors === 1) {
      dispatch(
        createRate({
          product,
          components,
        })
      );
    } else {
      document.getElementById("factorHeader").style.border = "red solid";
    }
  };

  return (
    <>
      <h1>NOVI NORMATIV</h1>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="product" className="mb-3">
          <Form.Label>Odaberite artikal</Form.Label>
          <Form.Control
            as="select"
            type="text"
            onChange={(e) => setProduct(e.target.value)}
          >
            <option>Izaberite proizvod</option>
            {products.map((product) => {
              return (
                <option value={product._id}>
                  {product.name} ({product._id})
                </option>
              );
            })}
          </Form.Control>
        </FormGroup>
        {rows.length > 0 && (
          <>
            <h4 className="m-0 p-0">SASTAVNICE</h4>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>RB</th>
                  <th>ARTIKL</th>
                  <th>KOLIČINA</th>
                  <th id="factorHeader">FAKTOR(Σ=1)</th>
                  <th>IZBRIŠI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Group controlId="article">
                        <Form.Control
                          as="select"
                          type="text"
                          onChange={handleMaterial(index)}
                        >
                          <option>Izaberite artikal</option>
                          {materials.map((item) => {
                            return (
                              <option id={item._id} value={item._id}>
                                {item.name} ({item._id})
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId={`factor-${index}`}>
                        <Form.Control
                          type="number"
                          placeholder="Unesite količinu"
                          onChange={handleQuantity(index)}
                          autoComplete="off"
                        ></Form.Control>
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId={`factor-${index}`}>
                        <Form.Control
                          type="decimal"
                          placeholder="Unesite postotak"
                          onChange={handleFactor(index)}
                          autoComplete="off"
                        ></Form.Control>
                      </Form.Group>
                    </td>

                    <td>
                      <Button type="button" variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <div className="d-flex justify-content-between mb-3">
          <Button
            type="button"
            onClick={addRow}
            disabled={materials.length <= rows.length}
          >
            Dodaj artikal
          </Button>
          <Button type="submit" disabled={rows.length === 0}>
            UNESI
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RateOfYieldCreateScreen;
