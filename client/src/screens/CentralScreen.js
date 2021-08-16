import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLager } from "../actions/lagerActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LAGER_LIST_RESET } from "../constants/lagerConstants";
import { CENTRAL_RECEIPT_LIST_RESET } from "../constants/centralReceiptConstants";
import { listCentralReceipts } from "../actions/centralReceiptActions";

const CentralScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const lagerList = useSelector((state) => state.lagerList);
  const {
    loading: loadingLager,
    success: successLager,
    error: errorLager,
    lager,
  } = lagerList;

  const centralReceiptList = useSelector((state) => state.centralReceiptList);
  const {
    loading: loadingReceipts,
    error: errorReceipts,
    receipts,
  } = centralReceiptList;

  useEffect(() => {
    dispatch({ type: LAGER_LIST_RESET });
  }, [loadingReceipts]);

  useEffect(() => {
    dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
  }, [loadingLager]);

  const handleButtonClick = () => {
    history.push("/lager/create");
  };

  const props = [
    {
      name: "Lager",
      function: listLager(),
    },
    {
      name: "Primka - Kalkulacija",
      function: listCentralReceipts(),
    },
    {
      name: "Međuskladišnica - Ulaz",
      function: listLager(),
    },
    {
      name: "Međuskladišnica - Izlaz",
      function: listLager(),
    },
  ];

  return (
    <Row className="flex-xl-nowrap">
      <Col as={Sidebar} props={props} />
      <Col xs={12} md={9} lg={9}>
        <h1>CENTRALNO SKLADIŠTE</h1>
        {loadingLager && <Loader />}
        {errorLager && <Message variant="danger">{errorLager}</Message>}
        {lager.length != 0 && (
          <>
            <h2>LAGER LISTA</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>ID artikla</th>
                  <th>Naziv artikla</th>
                  <th>Jedinica mjere</th>
                  <th>Količina</th>
                  <th>PNC</th>
                  <th>cijena</th>
                </tr>
              </thead>
              <tbody>
                {lager.map((article) => {
                  return (
                    <tr key={article._id}>
                      <td>{article._id}</td>
                      <td>{article.articleName}</td>
                      <td>{article.articleUnit}</td>
                      <td>{article.quantity}</td>
                      <td>{article.averagePurchasePrice}</td>
                      <td>{article.sellingPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {loadingReceipts && <Loader />}
        {errorReceipts && <Message variant="danger">{errorReceipts}</Message>}
        {receipts.length != 0 && (
          <>
            <h2>PRIMKE</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ZAKLJUČEN</th>
                  <th>ID</th>
                  <th>DOKUMENT</th>
                  <th>DATUM</th>
                  <th>DOBAVLJAČ</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => {
                  return (
                    <tr
                      key={receipt._id}
                      onClick={() =>
                        history.push(`/central/receipt/${receipt._id}`)
                      }
                    >
                      <td>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      </td>
                      <td>{receipt._id}</td>
                      <td>{receipt.document}-ulazni račun</td>
                      <td>{receipt.createdAt.substring(0, 10)}</td>
                      <td>{receipt.partner}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              type="button"
              onClick={() => history.push("/central/receipt")}
            >
              Nova primka
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default CentralScreen;
