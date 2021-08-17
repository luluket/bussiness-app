import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import { listArticles } from "../actions/articleActions";
import { createExport } from "../actions/centralExportActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listLagerMaterials } from "../actions/lagerActions";

const CentralExportCreateScreen = () => {
  const dispatch = useDispatch();

  const [departureWarehouse, setDepartureWarehouse] = useState(
    "Centralno skladište"
  );
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const [document, setDocument] = useState();
  const [exportedArticles, setExportedArticles] = useState([
    { article: "", quantity: 0 },
  ]);
  const [rows, setRows] = useState([]);

  const lagerListMaterial = useSelector((state) => state.lagerListMaterial);
  const { lager } = lagerListMaterial;

  const centralExportCreate = useSelector(
    (state) => state.centralReceiptCreate
  );
  const { error: errorCreate, success: successCreate } = centralExportCreate;

  useEffect(() => {
    dispatch(listLagerMaterials());
  }, [dispatch]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    const exportedArticle = lager.find(
      (item) => item.article._id === event.target.value
    );
    const { article } = exportedArticle;
    if (exportedArticles[index]) {
      exportedArticles[index].article = article;
    } else {
      exportedArticles.push({
        article: article,
        quantity: 0,
      });
    }
  };

  const handleQuantity = (index) => (event) => {
    if (exportedArticles[index]) {
      exportedArticles[index].quantity = event.target.value;
    } else {
      exportedArticles.push({
        article: "",
        quantity: event.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createExport({
        departureWarehouse,
        destinationWarehouse,
        document,
        exportedArticles,
      })
    );
  };

  return (
    <>
      <h1>MEĐUSKLADIŠNICA IZLAZ - CENTRALNO SKLADIŠTE</h1>
      {successCreate && <Message variant="success">Uspješan unos</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="sourceWarehouse">
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
                <option value="Skladište materijala">
                  Skladište materijala
                </option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group as={Col} md={6} controlId="document" className="mb-3">
          <Form.Label>Broj dokumenta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite broj dokumenta"
            onChange={(e) => setDocument(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {rows.length > 0 && (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>RB</th>
                <th>ARTIKAL</th>
                <th>KOLIČINA</th>
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
                        onChange={handleArticle(index)}
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
                    <Form.Control
                      type="number"
                      placeholder="Unesite količinu"
                      onChange={handleQuantity(index)}
                    ></Form.Control>
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

export default CentralExportCreateScreen;
