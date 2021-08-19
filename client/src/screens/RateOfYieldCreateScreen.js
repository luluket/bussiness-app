import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table, FormGroup } from "react-bootstrap";
import { listProducts } from "../actions/articleActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { RATE_CREATE_RESET } from "../constants/rateOfYieldConstants";
import { listMaterialLager } from "../actions/materialLagerActions";
import { createRate } from "../actions/rateOfYieldActions";

const RateOfYieldCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");
  const [components, setComponents] = useState([{ material: "", factor: 0 }]);
  const [rows, setRows] = useState([]);

  //fetch every article type product
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // fetch every article from material warehouse
  const materialLagerList = useSelector((state) => state.materialLagerList);
  const { lager } = materialLagerList;

  const rateCreate = useSelector((state) => state.rateCreate);
  const { error: errorCreate, success: successCreate } = rateCreate;

  useEffect(() => {
    dispatch(listMaterialLager());
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
    const component = lager.find(
      (item) => item.article._id === event.target.value
    );
    const { article } = component;
    if (components[index]) {
      components[index].material = article;
    } else {
      components.push({
        material: article,
        factor: 0,
      });
    }
  };

  const handleFactor = (index) => (event) => {
    document.getElementById(`factor-${index}`).style.color = "black";
    if (components[index]) {
      components[index].factor = event.target.value;
    } else {
      components.push({
        material: "",
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
                          {lager.map((item) => {
                            return (
                              <option
                                id={item.article._id}
                                value={item.article._id}
                              >
                                {item.article.name} ({item.article._id})
                              </option>
                            );
                          })}
                        </Form.Control>
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
            disabled={lager.length <= rows.length}
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
