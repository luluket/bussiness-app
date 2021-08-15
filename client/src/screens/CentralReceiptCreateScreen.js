import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import { listSuppliers } from "../actions/partnerActions";
import { listArticles } from "../actions/articleActions";
import { createReceipt } from "../actions/centralReceiptActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CentralReceiptCreateScreen = () => {
  const dispatch = useDispatch();

  const [partner, setPartner] = useState("");
  const [document, setDocument] = useState();
  const [receivedArticles, setReceivedArticles] = useState([
    { article: "", name: "", quantity: 0, purchasePrice: 0 },
  ]);
  const [rows, setRows] = useState([]);

  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers } = supplierList;

  const articleList = useSelector((state) => state.articleList);
  const { loading: loadingArticles, articles } = articleList;

  const centralReceiptCreate = useSelector(
    (state) => state.centralReceiptCreate
  );
  const { error: errorCreate, success: successCreate } = centralReceiptCreate;

  useEffect(() => {
    dispatch(listSuppliers());
    dispatch(listArticles());
  }, [dispatch]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    // split id and name from value into 2 variables
    const article = event.target.value.split(" ")[0];
    const name = event.target.value.substring(
      event.target.value.indexOf(" ") + 1
    );
    if (receivedArticles[index]) {
      receivedArticles[index].article = article;
      receivedArticles[index].name = name;
    } else {
      receivedArticles.push({
        article: article,
        name: name,
        quantity: 0,
        purchasePrice: 0,
      });
    }
  };

  const handleQuantity = (index) => (event) => {
    if (receivedArticles[index]) {
      receivedArticles[index].quantity = event.target.value;
    } else {
      receivedArticles.push({
        article: "",
        name: "",
        quantity: event.target.value,
        purchasePrice: 0,
      });
    }
  };

  const handlePurchasePrice = (index) => (event) => {
    if (receivedArticles[index]) {
      receivedArticles[index].purchasePrice = event.target.value;
    } else {
      receivedArticles.push({
        article: "",
        name: "",
        quantity: 0,
        purchasePrice: event.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReceipt({
        partner,
        document,
        receivedArticles,
      })
    );
  };

  return (
    <>
      <h1>PRIMKA - CENTRALNO SKLADIŠTE</h1>
      {successCreate && <Message variant="success">Uspješan unos</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingArticles ? (
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
                  onChange={(e) => setPartner(e.target.value)}
                >
                  <option>Izaberite dobavljača</option>
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
                <Form.Label>Broj dokumenta</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Unesite broj dokumenta"
                  onChange={(e) => setDocument(e.target.value)}
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
                  <th>KOLIČINA</th>
                  <th>NABAVNA CIJENA</th>
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
                          {articles.map((article) => {
                            return (
                              <option
                                id={article.name}
                                value={`${article._id} ${article.name}`}
                              >
                                {article.name} ({article._id})
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
                      <Form.Control
                        type="number"
                        placeholder="Unesite nabavnu cijenu"
                        onChange={handlePurchasePrice(index)}
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
              disabled={articles.length <= rows.length}
            >
              Dodaj artikal
            </Button>
            <Button type="submit" disabled={rows.length === 0}>
              UNESI
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default CentralReceiptCreateScreen;
