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
import { listCentralExports } from "../actions/centralExportActions";
import { CENTRAL_EXPORT_LIST_RESET } from "../constants/centralExportConstants";

const CentralScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [showLagerNote, setShowLagerNote] = useState(false);
  const [showReceiptNote, setShowReceiptNote] = useState(false);
  const [showExportNote, setShowExportNote] = useState(false);

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

  const centralExportList = useSelector((state) => state.centralExportList);
  const {
    loading: loadingExports,
    error: errorExports,
    exports,
  } = centralExportList;

  useEffect(() => {
    dispatch({ type: LAGER_LIST_RESET });
    dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
    setShowLagerNote(false);
    setShowReceiptNote(true);
  }, [loadingReceipts]);

  useEffect(() => {
    dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
    dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
    setShowLagerNote(true);
    setShowReceiptNote(false);
  }, [loadingLager]);

  useEffect(() => {
    dispatch({ type: LAGER_LIST_RESET });
    dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
  }, [loadingExports]);

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
      function: listCentralExports(),
    },
  ];

  return (
    <Row className="flex-xl-nowrap">
      <Col as={Sidebar} props={props} />
      <Col xs={12} md={9} lg={9}>
        <h1>CENTRALNO SKLADIŠTE</h1>
        {loadingLager && <Loader />}
        {errorLager && <Message variant="danger">{errorLager}</Message>}
        {lager.length != 0 ? (
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
                {lager.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.article.name}</td>
                      <td>{item.article.unit}</td>
                      <td>{item.quantity}</td>
                      <td>{item.averagePurchasePrice}</td>
                      <td>{item.sellingPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          showLagerNote && <h2>Lager lista je prazna</h2>
        )}
        {loadingReceipts && <Loader />}
        {errorReceipts && <Message variant="danger">{errorReceipts}</Message>}
        {receipts.length != 0 ? (
          <>
            <h2>PRIMKE</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ZAKLJUČEN</th>
                  <th>DOKUMENT</th>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
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
                      <td>{receipt.document}-ulazni račun</td>
                      <td>{receipt.createdAt.substring(0, 10)}</td>
                      <td>{receipt.createdAt.substring(11, 19)}</td>
                      <td>
                        {receipt.partner.name} {receipt.partner.surname}
                      </td>
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
        ) : (
          showReceiptNote && (
            <>
              <h2>Lista primki je prazna</h2>
              <Button
                type="button"
                onClick={() => history.push("/central/receipt")}
              >
                Nova primka
              </Button>
            </>
          )
        )}
        {loadingExports && <Loader />}
        {errorExports && <Message variant="danger">{errorExports}</Message>}
        {exports.length != 0 && (
          <>
            <h2>MEĐUSKALDIŠNICA - IZLAZ</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ZAKLJUČEN</th>
                  <th>DOKUMENT</th>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                  <th>SKLADIŠTE</th>
                </tr>
              </thead>
              <tbody>
                {exports.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      // onClick={() =>
                      //   history.push(`/central/item/${item._id}`)
                      // }
                    >
                      <td>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      </td>
                      <td>{item.document}-izlazni račun</td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>{item.createdAt.substring(11, 19)}</td>
                      <td>{item.warehouse}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              type="button"
              onClick={() => history.push("/central/export")}
            >
              Nova otprema
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default CentralScreen;
