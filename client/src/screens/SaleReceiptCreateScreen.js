import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import { listCustomers } from "../actions/partnerActions";
import { listArticles } from "../actions/articleActions";
import {
  articleLagerQuantities,
  articleLagerSellingPrices,
} from "../actions/lagerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SALE_RECEIPT_CREATE_RESET } from "../constants/saleReceiptConstants";

const SaleReceiptCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [partner, setPartner] = useState("");
  const [documentType, setDocumentType] = useState("izlazni račun");
  const [documentNumber, setDocumentNumber] = useState();
  const [soldArticles, setSoldArticles] = useState([]);
  const [rows, setRows] = useState([]);
  const [ids, setIds] = useState([]);

  const customerList = useSelector((state) => state.customerList);
  const {
    loading: loadingCustomers,
    error: errorCustomers,
    customers,
  } = customerList;

  const articleList = useSelector((state) => state.articleList);
  const { articles } = articleList;

  const lagerArticleQuantities = useSelector(
    (state) => state.lagerArticleQuantities
  );
  const { quantities } = lagerArticleQuantities;

  const lagerArticleSellingPrices = useSelector(
    (state) => state.lagerArticleSellingPrices
  );
  const { sellingPrices } = lagerArticleSellingPrices;

  const saleReceiptCreate = useSelector((state) => state.saleReceiptCreate);
  const { error: errorCreate, success: successCreate } = saleReceiptCreate;

  useEffect(() => {
    dispatch(listCustomers());
    dispatch(listArticles());
    // if (successCreate) {
    //   dispatch({ type: SALE_RECEIPT_CREATE_RESET });
    //   dispatch(listSaleReceipts());
    //   history.push("/central");
    // }
  }, [dispatch]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };
  useEffect(() => {
    console.log(ids);
  }, [ids]);

  const handleArticle = (index) => (event) => {
    let newArray = [...ids];
    newArray[index] = event.target.value;
    setIds(newArray);

    let newArray2 = [...soldArticles];
    newArray2[index] = {
      article: event.target.value,
    };
    setSoldArticles(newArray2);

    // if (soldArticles[index]) {
    //   soldArticles[index].article = event.target.value;
    // } else {
    //   soldArticles.push({
    //     article: event.target.value,
    //     quantity: 0,
    //     base: 0,
    //     pdv: 0,
    //     sellingPrice: 0,
    //   });
    // }
  };

  useEffect(() => {
    console.log(soldArticles);
  }, [soldArticles]);

  useEffect(() => {
    if (ids) {
      dispatch(articleLagerQuantities(ids));
      dispatch(articleLagerSellingPrices(ids));
    }
  }, [ids]);

  const handleQuantity = (index) => (event) => {
    let newArray = [...soldArticles];
    newArray[index].quantity = event.target.value;
    newArray[index].base = event.target.value * sellingPrices[index] * 0.75;
    newArray[index].pdv = event.target.value * sellingPrices[index] * 0.25;
    newArray[index].sellingPrice = event.target.value * sellingPrices[index];
    setSoldArticles(newArray);
    // if (soldArticles[index]) {
    //   soldArticles[index].quantity = event.target.value;
    //   soldArticles[index].base =
    //     event.target.value * sellingPrices[index] * 0.75;
    //   soldArticles[index].pdv =
    //     event.target.value * sellingPrices[index] * 0.25;
    //   soldArticles[index].sellingPrice =
    //     event.target.value * sellingPrices[index];
    // } else {
    //   soldArticles.push({
    //     article: "",
    //     quantity: event.target.value,
    //     base: 0,
    //     pdv: 0,
    //     sellingPrice: 0,
    //   });
    // }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   createReceipt({
    //     partner,
    //     documentType,
    //     documentNumber,
    //     soldArticles,
    //   })
    // );
  };

  return (
    <>
      <h1>PRIMKA - CENTRALNO SKLADIŠTE</h1>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingCustomers ? (
        <Loader />
      ) : errorCustomers ? (
        <Message variant="danger">{errorCustomers}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="supplier">
                <Form.Label>Kupac</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  onChange={(e) => setPartner(e.target.value)}
                >
                  <option>Izaberite kupca</option>
                  {customers.map((customer) => {
                    return (
                      <option value={customer._id}>
                        {customer.name} {customer.surname} ({customer._id})
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
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
            <Col md={6}>
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
            <Table bordered responsive size="sm">
              <thead>
                <tr>
                  <th>RB</th>
                  <th>ARTIKAL</th>
                  <th>KOLIČINA</th>
                  <th>RASPOLOŽIVO</th>
                  <th>OSNOVICA</th>
                  <th>PDV 25%</th>
                  <th>UKUPNA CIJENA</th>
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
                                {article._id}-{article.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={
                          soldArticles[index] &&
                          soldArticles[index].hasOwnProperty("quantity")
                            ? soldArticles[index].quantity
                            : 0
                        }
                        onChange={handleQuantity(index)}
                      ></Form.Control>
                    </td>
                    <td>{quantities && quantities[index]}</td>
                    <td>
                      {soldArticles[index] &&
                        soldArticles[index].hasOwnProperty("base") &&
                        soldArticles[index].base}
                    </td>
                    <td>
                      {soldArticles[index] &&
                        soldArticles[index].hasOwnProperty("pdv") &&
                        soldArticles[index].pdv}
                    </td>
                    <td>
                      {soldArticles[index] &&
                        soldArticles[index].hasOwnProperty("sellingPrice") &&
                        soldArticles[index].sellingPrice}
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

export default SaleReceiptCreateScreen;
