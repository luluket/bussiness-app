import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
import { listCentralImports } from "../actions/centralImportActions";
import { CENTRAL_EXPORT_LIST_RESET } from "../constants/centralExportConstants";
import {
  listRequisitions,
  listUnfullfilledRequisitions,
} from "../actions/requisitionActions";
import {
  REQUISITION_LIST_RESET,
  REQUISITION_UNFULLFILLED_LIST_RESET,
} from "../constants/requisitionConstants";
import { CENTRAL_IMPORT_LIST_RESET } from "../constants/centralImportConstants";
import { listSaleReceipts } from "../actions/saleReceiptActions";
import { SALE_RECEIPT_LIST_RESET } from "../constants/saleReceiptConstants";

const CentralScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [showLagerNote, setShowLagerNote] = useState(false);
  const [showReceiptNote, setShowReceiptNote] = useState(false);
  const [showImportNote, setShowImportNote] = useState(false);
  const [showExportNote, setShowExportNote] = useState(false);
  const [showRequisitionNote, setShowRequisitionNote] = useState(false);
  const [showSaleReceiptNote, setSaleReceiptNote] = useState(false);

  const lagerList = useSelector((state) => state.lagerList);
  const { loading: loadingLager, error: errorLager, lager } = lagerList;

  const centralReceiptList = useSelector((state) => state.centralReceiptList);
  const {
    loading: loadingReceipts,
    error: errorReceipts,
    receipts,
  } = centralReceiptList;

  const centralImportList = useSelector((state) => state.centralImportList);
  const {
    loading: loadingImports,
    error: errorImports,
    imports,
  } = centralImportList;

  const centralExportList = useSelector((state) => state.centralExportList);
  const {
    loading: loadingExports,
    error: errorExports,
    exports,
  } = centralExportList;

  const requisitionUnfullfilledList = useSelector(
    (state) => state.requisitionUnfullfilledList
  );
  const { requisitions: requisitionsUnfullfilled } =
    requisitionUnfullfilledList;

  const requisitionList = useSelector((state) => state.requisitionList);
  const {
    loading: loadingRequisitions,
    error: errorRequisitions,
    requisitions,
  } = requisitionList;

  const saleReceiptList = useSelector((state) => state.saleReceiptList);
  const {
    loading: loadingSaleReceipts,
    error: errorSaleReceipts,
    receipts: saleReceipts,
  } = saleReceiptList;

  useEffect(() => {
    dispatch(listUnfullfilledRequisitions());
  }, [dispatch]);

  useEffect(() => {
    if (loadingLager) {
      dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
      dispatch({ type: CENTRAL_IMPORT_LIST_RESET });
      dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: SALE_RECEIPT_LIST_RESET });

      setShowLagerNote(true);
      setShowReceiptNote(false);
      setShowExportNote(false);
      setShowRequisitionNote(false);
      setShowImportNote(false);
      setSaleReceiptNote(false);
    }
  }, [dispatch, loadingLager]);

  useEffect(() => {
    if (loadingReceipts) {
      dispatch({ type: LAGER_LIST_RESET });
      dispatch({ type: CENTRAL_IMPORT_LIST_RESET });
      dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: SALE_RECEIPT_LIST_RESET });

      setShowReceiptNote(true);
      setShowLagerNote(false);
      setShowExportNote(false);
      setShowRequisitionNote(false);
      setShowImportNote(false);
      setSaleReceiptNote(false);
    }
  }, [dispatch, loadingReceipts]);

  useEffect(() => {
    if (loadingExports) {
      dispatch({ type: LAGER_LIST_RESET });
      dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
      dispatch({ type: CENTRAL_IMPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: SALE_RECEIPT_LIST_RESET });

      setShowExportNote(true);
      setShowLagerNote(false);
      setShowReceiptNote(false);
      setShowRequisitionNote(false);
      setShowImportNote(false);
      setSaleReceiptNote(false);
    }
  }, [dispatch, loadingExports]);

  useEffect(() => {
    if (loadingImports) {
      dispatch({ type: LAGER_LIST_RESET });
      dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
      dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: SALE_RECEIPT_LIST_RESET });

      setShowImportNote(true);
      setShowExportNote(false);
      setShowLagerNote(false);
      setShowReceiptNote(false);
      setShowRequisitionNote(false);
      setSaleReceiptNote(false);
    }
  }, [dispatch, loadingImports]);

  useEffect(() => {
    if (loadingRequisitions) {
      dispatch({ type: LAGER_LIST_RESET });
      dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
      dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
      dispatch({ type: CENTRAL_IMPORT_LIST_RESET });
      dispatch({ type: REQUISITION_UNFULLFILLED_LIST_RESET });
      dispatch({ type: SALE_RECEIPT_LIST_RESET });

      setShowRequisitionNote(true);
      setShowLagerNote(false);
      setShowReceiptNote(false);
      setShowExportNote(false);
      setShowImportNote(false);
      setSaleReceiptNote(false);
    }
  }, [dispatch, loadingRequisitions]);

  useEffect(() => {
    if (loadingSaleReceipts) {
      dispatch({ type: LAGER_LIST_RESET });
      dispatch({ type: CENTRAL_RECEIPT_LIST_RESET });
      dispatch({ type: CENTRAL_IMPORT_LIST_RESET });
      dispatch({ type: CENTRAL_EXPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setSaleReceiptNote(true);
      setShowReceiptNote(false);
      setShowLagerNote(false);
      setShowExportNote(false);
      setShowRequisitionNote(false);
      setShowImportNote(false);
    }
  }, [dispatch, loadingSaleReceipts]);

  const props = [
    {
      name: "Lager",
      subitems: [],
      function: listLager(),
    },
    {
      name: "Primka - kalkulacija",
      subitems: [],
      function: listCentralReceipts(),
    },
    {
      name: "Me??uskladi??nica ulaz",
      subitems: [],
      function: listCentralImports(),
    },
    {
      name: "Me??uskladi??nica izlaz",
      subitems: [],
      function: listCentralExports(),
    },
    {
      name: "Trebovanje",
      subitems: [],
      function: listRequisitions(),
    },
    {
      name: "Ra??un VP",
      subitems: [],
      function: listSaleReceipts(),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Veleprodaja</title>
      </Helmet>
      <Row className="flex-xl-nowrap">
        <Col as={Sidebar} props={props} />
        <Col xs={12} md={9} lg={9}>
          {requisitionsUnfullfilled.length !== 0 && (
            <Message variant="danger">
              <div onClick={() => dispatch(listRequisitions())}>
                Zahtjevi za otpremom materijala. Klikni za prikaz
              </div>
            </Message>
          )}
          <h1 className="text-center">CENTRALNO SKLADI??TE</h1>
          <hr></hr>
          {loadingLager && <Loader />}
          {errorLager && <Message variant="danger">{errorLager}</Message>}
          {lager.length !== 0 ? (
            <>
              <h2>LAGER LISTA</h2>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>ID artikla</th>
                    <th>Naziv artikla</th>
                    <th>Jedinica mjere</th>
                    <th>Koli??ina</th>
                    <th>PNC</th>
                    <th>cijena</th>
                  </tr>
                </thead>
                <tbody>
                  {lager.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.article._id}</td>
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
            loadingLager === false &&
            showLagerNote && <h2>Lager lista je prazna</h2>
          )}
          {loadingReceipts && <Loader />}
          {errorReceipts && <Message variant="danger">{errorReceipts}</Message>}
          {receipts.length !== 0 ? (
            <>
              <h2>PRIMKE</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ZAKLJU??EN</th>
                    <th>BROJ DOKUMENTA</th>
                    <th>PODTIP DOKUMENTA</th>
                    <th>DATUM</th>
                    <th>VRIJEME</th>
                    <th>DOBAVLJA??</th>
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
                        <td>{receipt.documentNumber}</td>
                        <td>{receipt.documentSubtype}</td>
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
            loadingReceipts === false &&
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
          {exports.length !== 0 ? (
            <>
              <h2>ME??USKLADI??NICA IZLAZ</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ZAKLJU??EN</th>
                    <th>BROJ DOKUMENTA</th>
                    <th>PODTIP DOKUMENTA</th>
                    <th>DATUM</th>
                    <th>VRIJEME</th>
                    <th>SKLADI??TE</th>
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
                        <td>{item.documentNumber}</td>
                        <td>{item.documentSubtype}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                        <td>{item.createdAt.substring(11, 19)}</td>
                        <td>{item.destinationWarehouse}</td>
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
          ) : (
            loadingExports === false &&
            showExportNote && (
              <>
                <h2>Nema otpremljenih artikala</h2>
                <Button
                  type="button"
                  onClick={() => history.push("/central/export")}
                >
                  Nova otprema
                </Button>
              </>
            )
          )}
          {loadingImports && <Loader />}
          {errorImports && <Message variant="danger">{errorImports}</Message>}
          {imports.length !== 0 ? (
            <>
              <h2>ME??USKLADI??NICA ULAZ</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ZAKLJU??EN</th>
                    <th>BROJ DOKUMENTA</th>
                    <th>PODTIP DOKUMENTA</th>
                    <th>DATUM</th>
                    <th>VRIJEME</th>
                    <th>SKLADI??TE</th>
                  </tr>
                </thead>
                <tbody>
                  {imports.map((item) => {
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
                        <td>{item.documentNumber}</td>
                        <td>{item.documentSubtype}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                        <td>{item.createdAt.substring(11, 19)}</td>
                        <td>{item.departureWarehouse}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            loadingImports === false &&
            showImportNote && <h2>Nema zaprimljenih artikala</h2>
          )}
          {loadingRequisitions && <Loader />}
          {errorRequisitions && (
            <Message variant="danger">{errorRequisitions}</Message>
          )}
          {requisitions.length !== 0 ? (
            <>
              <h2>TREBOVANJE </h2>
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>ZAHTIJEVANO</th>
                    <th>ISPORU??ENO</th>
                    <th>BROJ DOKUMENTA</th>
                    <th>PODTIP DOKUMENTA</th>
                    <th>ARTIKLI</th>
                    <th>KOLI??INA</th>
                    <th>DATUM</th>
                    <th>VRIJEME</th>
                    <th>SKLADI??TE</th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        // onClick={() =>
                        //   history.push(`/central/item/${item._id}`)
                        // }
                      >
                        <td>
                          {item.isSent ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {item.isFullfilled ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>{item.documentNumber}</td>
                        <td>{item.documentSubtype}</td>
                        <td>
                          {item.requestedArticles.map((o) => (
                            <div>{`${o.article.name}\n`}</div>
                          ))}
                        </td>
                        <td>
                          {item.requestedArticles.map((o) => (
                            <div>{`${o.quantity}\n`}</div>
                          ))}
                        </td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                        <td>{item.createdAt.substring(11, 19)}</td>
                        <td>Skladi??te materijala</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            loadingRequisitions === false &&
            showRequisitionNote && <h2>Nema zahtjeva za otpremom materijala</h2>
          )}
          {loadingSaleReceipts && <Loader />}
          {errorSaleReceipts && (
            <Message variant="danger">{errorSaleReceipts}</Message>
          )}
          {saleReceipts.length !== 0 ? (
            <>
              <h2>RA??UN VP</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ZAKLJU??EN</th>
                    <th>BROJ DOKUMENTA</th>
                    <th>PODTIP DOKUMENTA</th>
                    <th>DATUM</th>
                    <th>VRIJEME</th>
                    <th>KUPAC</th>
                  </tr>
                </thead>
                <tbody>
                  {saleReceipts.map((receipt) => {
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
                        <td>{receipt.documentNumber}</td>
                        <td>{receipt.documentSubtype}</td>
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
                onClick={() => history.push("/central/sale/receipt/create")}
              >
                Novi ra??un VP
              </Button>
            </>
          ) : (
            loadingSaleReceipts === false &&
            showSaleReceiptNote && (
              <>
                <h2>Lista izlaznih ra??una je prazna</h2>
                <Button
                  type="button"
                  onClick={() => history.push("/central/sale/receipt/create")}
                >
                  Novi ra??un VP
                </Button>
              </>
            )
          )}
        </Col>
      </Row>
    </>
  );
};

export default CentralScreen;
