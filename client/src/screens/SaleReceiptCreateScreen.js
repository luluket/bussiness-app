import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import { createReceipt, listSaleReceipts } from "../actions/saleReceiptActions";

const SaleReceiptCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [partner, setPartner] = useState("");
  const documentType = "račun VP";
  const documentSubtype = "izlazni račun";
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
    if (successCreate) {
      dispatch({ type: SALE_RECEIPT_CREATE_RESET });
      dispatch(listSaleReceipts());
      history.push("/central");
    }
  }, [dispatch, history, successCreate]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    let newArray = [...ids];
    newArray[index] = event.target.value;
    setIds(newArray);

    let newArray2 = [...soldArticles];
    newArray2[index] = {
      article: event.target.value,
    };
    setSoldArticles(newArray2);
  };

  useEffect(() => {
    if (ids) {
      dispatch(articleLagerQuantities(ids));
      dispatch(articleLagerSellingPrices(ids));
    }
  }, [dispatch, ids]);

  const handleQuantity = (index) => (event) => {
    document.getElementById("quantityHeader").style.border = "black";
    let newArray = [...soldArticles];
    newArray[index].quantity = event.target.value;
    newArray[index].base = parseFloat(
      (event.target.value * sellingPrices[index] * 0.75).toFixed(2)
    );
    newArray[index].pdv = parseFloat(
      (event.target.value * sellingPrices[index] * 0.25).toFixed(2)
    );
    newArray[index].sellingPrice = parseFloat(
      (event.target.value * sellingPrices[index]).toFixed(2)
    );
    setSoldArticles(newArray);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //validate quantities before selling
    var overload = false;
    soldArticles.forEach((item, index) => {
      if (item.quantity > quantities[index]) {
        overload = true;
      }
    });
    if (overload) {
      document.getElementById("quantityHeader").style.border = "red solid";
    } else {
      dispatch(
        createReceipt({
          partner,
          documentType,
          documentSubtype,
          documentNumber,
          soldArticles,
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Novi račun VP</title>
      </Helmet>
      <h1>RAČUN VP - CENTRALNO SKLADIŠTE</h1>
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
            <Table bordered responsive size="sm">
              <thead>
                <tr>
                  <th>RB</th>
                  <th>ARTIKAL</th>
                  <th id="quantityHeader">KOLIČINA</th>
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
