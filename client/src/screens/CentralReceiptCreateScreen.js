import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import { listSuppliers } from "../actions/partnerActions";
import { listArticles } from "../actions/articleActions";
import {
  createReceipt,
  listCentralReceipts,
} from "../actions/centralReceiptActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { CENTRAL_RECEIPT_CREATE_RESET } from "../constants/centralReceiptConstants";

const CentralReceiptCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [partner, setPartner] = useState("");
  const [documentType, setDocumentType] = useState("primka");
  const [documentSubtype, setDocumentSubtype] = useState("ulazni račun");
  const [documentNumber, setDocumentNumber] = useState();
  const [receivedArticles, setReceivedArticles] = useState([]);
  const [rows, setRows] = useState([]);

  const supplierList = useSelector((state) => state.supplierList);
  const {
    loading: loadingSuppliers,
    error: errorSuppliers,
    suppliers,
  } = supplierList;

  const articleList = useSelector((state) => state.articleList);
  const { articles } = articleList;

  const centralReceiptCreate = useSelector(
    (state) => state.centralReceiptCreate
  );
  const { error: errorCreate, success: successCreate } = centralReceiptCreate;

  useEffect(() => {
    dispatch(listSuppliers());
    dispatch(listArticles());
    if (successCreate) {
      dispatch({ type: CENTRAL_RECEIPT_CREATE_RESET });
      dispatch(listCentralReceipts());
      history.push("/central");
    }
  }, [dispatch, successCreate]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    let newArray = [...receivedArticles];
    newArray[index] = {
      article: event.target.value,
    };
    setReceivedArticles(newArray);
  };

  const handleQuantity = (index) => (event) => {
    let newArray = [...receivedArticles];
    newArray[index].quantity = event.target.value;
    setReceivedArticles(newArray);
  };

  const handlePurchasePrice = (index) => (event) => {
    let newArray = [...receivedArticles];
    newArray[index].purchasePrice = event.target.value;
    setReceivedArticles(newArray);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReceipt({
        partner,
        documentType,
        documentSubtype,
        documentNumber,
        receivedArticles,
      })
    );
  };

  return (
    <>
      <h1>PRIMKA - CENTRALNO SKLADIŠTE</h1>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingSuppliers ? (
        <Loader />
      ) : errorSuppliers ? (
        <Message variant="danger">{errorSuppliers}</Message>
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
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="documentType">
                <Form.Label>Tip dokumenta</Form.Label>
                <Form.Control
                  type="number"
                  value={documentType}
                  placeholder={documentType}
                  disabled
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="documentSubtype">
                <Form.Label>Podtip dokumenta</Form.Label>
                <Form.Control
                  type="number"
                  value={documentSubtype}
                  placeholder={documentSubtype}
                  disabled
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="documentNumber">
                <Form.Label>Broj dokumenta</Form.Label>
                <Form.Control
                  type="number"
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
                              <option value={article._id}>
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
                        step="0.01"
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
