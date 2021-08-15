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
  let count = 1;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [document, setDocument] = useState();
  const [receiptArticles, setReceiptArticles] = useState([
    { article: "", name: "", quantity: 0, purchasePrice: 0 },
  ]);
  const [rows, setRows] = useState([]);

  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers } = supplierList;

  const articleList = useSelector((state) => state.articleList);
  const { loading: loadingArticles, articles } = articleList;

  useEffect(() => {
    dispatch(listSuppliers());
    dispatch(listArticles());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const addRow = () => {
    setRows([...rows, "row"]);
  };
  const removeRow = (index) => {};

  const handleReceipt = () => {};

  const handleArticle = (index) => (event) => {
    // split id and name from value into 2 variables
    const article = event.target.value.split(" ")[0];
    const name = event.target.value.substring(
      event.target.value.indexOf(" ") + 1
    );
    if (receiptArticles[index]) {
      receiptArticles[index].article = article;
      receiptArticles[index].name = name;
    } else {
      receiptArticles.push({
        article: article,
        name: name,
        quantity: 0,
        purchasePrice: 0,
      });
    }
    console.log(receiptArticles);
  };

  const handleQuantity = (index) => (event) => {
    if (receiptArticles[index]) {
      receiptArticles[index].quantity = event.target.value;
    } else {
      receiptArticles.push({
        article: "",
        name: "",
        quantity: event.target.value,
        purchasePrice: 0,
      });
    }
    console.log(receiptArticles);
  };

  const handlePurchasePrice = (index) => (event) => {
    if (receiptArticles[index]) {
      receiptArticles[index].purchasePrice = event.target.value;
    } else {
      receiptArticles.push({
        article: "",
        name: "",
        quantity: 0,
        purchasePrice: event.target.value,
      });
    }
    console.log(receiptArticles);
  };

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
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeRow(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <div className="d-flex justify-content-between">
            <Button
              type="btn"
              onClick={addRow}
              disabled={articles.length <= rows.length}
            >
              Dodaj artikal
            </Button>
            <Button
              type="btn"
              disabled={rows.length === 0}
              onClick={handleReceipt}
            >
              UNESI
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default CentralReceiptCreateScreen;
