import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Form,
  Col,
  Button,
  Card,
  ListGroup,
  Table,
} from "react-bootstrap";
import { listSuppliers } from "../actions/partnerActions";
import { listArticles } from "../actions/articleActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CentralReceiptCreateScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [document, setDocument] = useState();
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  const [rows, setRows] = useState([]);

  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers } = supplierList;

  const articleList = useSelector((state) => state.articleList);
  const { articles } = articleList;

  useEffect(() => {
    dispatch(listSuppliers());
    dispatch(listArticles());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    const input = { id: event.target.id, name: event.target.value };
    items.find(({ id }) => id === input.id)
      ? setItems(items.filter((item) => item.id !== input.id))
      : setItems([...items, input]);
  };

  const handleRow = (event) => {
    event.preventDefault();
    setRows([...rows, "row"]);
    console.log("aa");
  };

  const removeRow = () => {};

  return (
    <>
      <h1>PRIMKA - CENTRALNO SKLADIŠTE</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="supplier">
                <Form.Label>Dobavljač</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                >
                  {suppliers.map((supplier) => {
                    return (
                      <option value={supplier._id}>
                        {supplier.name} {supplier.surname} ({supplier._id})
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="document">
                <Form.Label>Dokument</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Unesite broj dokumenta"
                  onChange={(e) => setDocument(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {items.map((item) => {
            return (
              <Row>
                <Col lg={4} md={6}>
                  <Card>
                    <Card.Header>{item.name}</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Form.Group controlId="quantity">
                          <Form.Control
                            type="number"
                            placeholder="Unesite količinu"
                            onChange={(e) => setQuantity(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Group controlId="purchasePrice">
                          <Form.Control
                            type="number"
                            placeholder="Unesite nabavnu cijenu"
                            onChange={(e) => setPurchasePrice(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            );
          })}
          {rows.length > 0 && (
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>ARTIKAL</th>
                  <th>KOLIČINA</th>
                  <th>PNC</th>
                  <th>IZBRIŠI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control as="select" type="text">
                        {articles.map((article) => {
                          return (
                            <option value={article._id}>
                              {article.name} {article.surname} ({article._id})
                            </option>
                          );
                        })}
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="Unesite količinu"
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="Unesite nabavnu cijenu"
                      ></Form.Control>
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeRow()}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Button type="btn" onClick={handleRow}>
            Dodaj artikal
          </Button>
        </Form>
      )}
    </>
  );
};

export default CentralReceiptCreateScreen;
