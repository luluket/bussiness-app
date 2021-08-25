import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import {
  createExport,
  listProductExports,
} from "../actions/productExportActions";
import Message from "../components/Message";
import {
  listProductLager,
  productLagerQuantities,
} from "../actions/productLagerActions";
import { PRODUCT_EXPORT_CREATE_RESET } from "../constants/productLagerConstants";

const ProductExportCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [departureWarehouse, setDepartureWarehouse] = useState(
    "Skladište gotovih proizvoda"
  );
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const [documentType, setDocumentType] = useState("mđskl-izlaz");
  const [documentNumber, setDocumentNumber] = useState();
  const [exportedArticles, setExportedArticles] = useState([
    { article: "", quantity: 0 },
  ]);
  const [ids, setIds] = useState([]);
  const [rows, setRows] = useState("");

  const productLagerList = useSelector((state) => state.productLagerList);
  const { lager } = productLagerList;

  const productExportCreate = useSelector((state) => state.productExportCreate);
  const { error: errorCreate, success: successCreate } = productExportCreate;

  const lagerProductQuantities = useSelector(
    (state) => state.lagerProductQuantities
  );
  const { quantities: productQuantities } = lagerProductQuantities;

  useEffect(() => {
    dispatch(productLagerQuantities());
    dispatch(listProductLager());
    if (successCreate) {
      dispatch(listProductExports());
      dispatch({ type: PRODUCT_EXPORT_CREATE_RESET });
      history.push("/manufacture");
    }
  }, [dispatch, successCreate]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    setIds((ids) => [...ids, event.target.value]);
    const exportedArticle = lager.find(
      (item) => item.article._id === event.target.value
    );
    const { article } = exportedArticle;
    if (exportedArticles[index]) {
      exportedArticles[index].article = article._id;
    } else {
      exportedArticles.push({
        article: article._id,
        quantity: 0,
      });
    }
  };

  useEffect(() => {
    if (ids) {
      dispatch(productLagerQuantities(ids));
    }
  }, [ids]);

  const handleQuantity = (index) => (event) => {
    document.getElementById("quantityHeader").style.border = "black";
    document.getElementById(`quantity-${index}`).style.color = "black";
    if (exportedArticles[index]) {
      exportedArticles[index].quantity = event.target.value;
    } else {
      exportedArticles.push({
        article: "",
        quantity: event.target.value,
      });
    }

    // if article name has been set in form, validate export quantity with lager quantity
    if (exportedArticles[index].article) {
      if (exportedArticles[index].quantity > productQuantities[index]) {
        document.getElementById(`quantity-${index}`).style.color = "red";
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // check if exported amount is inside product warehouse limit
    var overload = false;
    exportedArticles.forEach((item, index) => {
      if (item.quantity > productQuantities[index]) {
        overload = true;
      }
    });
    if (overload) {
      document.getElementById("quantityHeader").style.border = "red solid";
    } else {
      dispatch(
        createExport({
          departureWarehouse,
          destinationWarehouse,
          exportedArticles,
          documentType,
          documentNumber,
        })
      );
    }
  };

  return (
    <>
      <h1>SKLADIŠTE GOTOVIH PROIZVODA - MEĐUSKLADIŠNICA IZLAZ</h1>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="departureWarehouse">
              <Form.Label>Polazno skladište</Form.Label>
              <Form.Control
                type="text"
                value={departureWarehouse}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="destinationWarehouse">
              <Form.Label>Odredišno skladište</Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setDestinationWarehouse(e.target.value)}
              >
                <option>Izaberite skladište</option>
                <option value="Centralno skladište">Centralno skladište</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="documentType" className="mb-3">
              <Form.Label>Tip dokumenta</Form.Label>
              <Form.Control
                type="text"
                value={documentType}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="documentNumber" className="mb-3">
              <Form.Label>Broj dokumenta</Form.Label>
              <Form.Control
                type="number"
                value={documentNumber}
                placeholder="Unesite broj dokumenta"
                onChange={(e) => setDocumentNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {rows.length > 0 && (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>RB</th>
                <th>ARTIKAL</th>
                <th id="quantityHeader">KOLIČINA</th>
                <th>RASPOLOŽIVO</th>
                <th>IZBRIŠI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} id={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Group controlId="article">
                      <Form.Control
                        as="select"
                        type="text"
                        onChange={handleArticle(index)}
                      >
                        <option>Izaberite artikal</option>
                        {lager.map((item) => {
                          return (
                            <option
                              id={item.article._id}
                              value={item.article._id}
                            >
                              {item.article._id} - {item.article.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group
                      controlId={`quantity-${index}`}
                      className="quantity"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Unesite količinu"
                        onChange={handleQuantity(index)}
                      ></Form.Control>
                    </Form.Group>
                  </td>
                  <td>{productQuantities && productQuantities[index]}</td>
                  <td>
                    <Button type="button" variant="light">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default ProductExportCreateScreen;
