import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMaterialLager } from "../actions/materialLagerActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { listMaterialImports } from "../actions/materialImportActions";
import { listRates } from "../actions/rateOfYieldActions";
import { MATERIAL_LAGER_LIST_RESET } from "../constants/materialLagerConstants";
import { RATE_LIST_RESET } from "../constants/rateOfYieldConstants";
import { MATERIAL_IMPORT_LIST_RESET } from "../constants/materialImportConstants";
import { listRequisitions } from "../actions/requisitionActions";
import { REQUISITION_LIST_RESET } from "../constants/requisitionConstants";
import { listWorkorders } from "../actions/workorderActions";
import { WORKORDER_LIST_RESET } from "../constants/workorderConstants";

const ManufactureScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  // states to handle empty database tables
  const [showMaterialLagerNote, setShowMaterialLagerNote] = useState(false);
  const [showMaterialImportNote, setShowMaterialImportNote] = useState(false);
  const [showRequisitionNote, setShowRequisitionNote] = useState(false);
  const [showRateNote, setShowRateNote] = useState(false);
  const [showWorkorderNote, setShowWorkorderNote] = useState(false);

  const materialLagerList = useSelector((state) => state.materialLagerList);
  const { loading: loadingLager, error: errorLager, lager } = materialLagerList;

  const rateList = useSelector((state) => state.rateList);
  const { loading: loadingRates, error: errorRates, rates } = rateList;

  const materialImportList = useSelector((state) => state.materialImportList);
  const {
    loading: loadingImports,
    error: errorImports,
    imports,
  } = materialImportList;

  const requisitionList = useSelector((state) => state.requisitionList);
  const {
    loading: loadingRequisitions,
    error: errorRequisitions,
    requisitions,
  } = requisitionList;

  const workorderList = useSelector((state) => state.workorderList);
  const {
    loading: loadingWorkorders,
    error: errorWorkorders,
    workorders,
  } = workorderList;

  useEffect(() => {
    if (loadingLager) {
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowMaterialLagerNote(true);
      setShowMaterialImportNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
    }
  }, [loadingLager]);

  useEffect(() => {
    if (loadingImports) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowMaterialImportNote(true);
      setShowMaterialLagerNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
    }
  }, [loadingImports]);

  useEffect(() => {
    if (loadingRates) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowRateNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
    }
  }, [loadingRates]);

  useEffect(() => {
    if (loadingWorkorders) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });

      setShowWorkorderNote(true);
      setShowRequisitionNote(false);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowRateNote(false);
    }
  }, [loadingWorkorders]);

  useEffect(() => {
    if (loadingRequisitions) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });

      setShowRequisitionNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowWorkorderNote(false);
      setShowRateNote(false);
    }
  }, [loadingRequisitions]);

  const props = [
    {
      name: "Skladište materijala",
      subitems: [
        { name: "Lager", function: listMaterialLager() },
        { name: "Međuskladišnica ulaz", function: listMaterialImports() },
        { name: "Međuskladišnica izlaz", function: listMaterialLager() },
        { name: "Utrošak materijala", function: listMaterialLager() },
      ],
      function: listMaterialLager(),
    },
    {
      name: "Skladište gotovih proizvoda",
      subitems: [
        { name: "Lager", function: listMaterialLager() },
        { name: "Međuskladišnica ulaz", function: listMaterialLager() },
        { name: "Međuskladišnica izlaz", function: listMaterialLager() },
        { name: "Radni nalog", function: listWorkorders() },
      ],
      function: listMaterialLager(),
    },
    {
      name: "Trebovanje",
      subitems: [],
      function: listRequisitions(),
    },
    {
      name: "Normativi",
      subitems: [],
      function: listRates(),
    },
  ];

  return (
    <Row className="flex-xl-nowrap">
      <Col as={Sidebar} props={props} />
      <Col xs={12} md={9} lg={9}>
        <h1 className="text-center">PROIZVODNI POGON</h1>
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
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          showMaterialLagerNote && <h2>Lager lista je prazna</h2>
        )}
        {loadingImports && <Loader />}
        {errorImports && <Message variant="danger">{errorImports}</Message>}
        {imports.length != 0 ? (
          <>
            <h2>MEĐUSKLADIŠNICA - ULAZ</h2>
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
                      <td>{item.document}-ulazni račun</td>
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
          showMaterialImportNote && (
            <h2>Lista zaprimljenih artikala je prazna</h2>
          )
        )}
        {loadingWorkorders && <Loader />}
        {errorWorkorders && (
          <Message variant="danger">{errorWorkorders}</Message>
        )}
        {workorders && workorders.length != 0 ? (
          <>
            <h2>RADNI NALOZI</h2>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>STATUS</th>
                  <th>DOKUMENT</th>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                </tr>
              </thead>
              <tbody>
                {workorders.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      onClick={() =>
                        history.push(`/manufacture/workorder/${item._id}`)
                      }
                    >
                      <td>
                        <div className="p-1 d-flex justify-content-between">
                          <span>{`Pripravan`} </span>
                          {item.toDo && (
                            <div>
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            </div>
                          )}
                        </div>
                        <div className="p-1 d-flex justify-content-between">
                          <span>{`U izvršavanju`} </span>
                          {item.inProgress && (
                            <div>
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            </div>
                          )}
                        </div>
                        <span className="p-1 d-flex justify-content-between">
                          <span>{`Završen`} </span>
                          {item.finished && (
                            <div>
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            </div>
                          )}
                        </span>
                      </td>
                      <td>
                        {item.documentNumber}-{item.documentType}
                      </td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>{item.createdAt.substring(11, 19)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              type="button"
              onClick={() => history.push("/manufacture/workorder/create")}
            >
              Novi radni nalog
            </Button>
          </>
        ) : (
          showWorkorderNote && (
            <>
              <h2>Nema kreiranog radnog naloga</h2>
              <Button
                type="button"
                onClick={() => history.push("/manufacture/workorder/create")}
              >
                Novi radni nalog
              </Button>
            </>
          )
        )}
        {loadingRates && <Loader />}
        {errorRates && <Message variant="danger">{errorRates}</Message>}
        {rates.length != 0 ? (
          <>
            <h2>NORMATIVI</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID ARTIKLA</th>
                  <th>ARTIKL</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      // onClick={() =>
                      //   history.push(`/central/item/${item._id}`)
                      // }
                    >
                      <td>{item.product._id}</td>
                      <td>{item.product.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              type="button"
              onClick={() => history.push("/manufacture/rate")}
            >
              Novi normativ
            </Button>
          </>
        ) : (
          showRateNote && (
            <>
              <h2>Nema kreiranog normativa</h2>
              <Button
                type="button"
                onClick={() => history.push("/manufacture/rate")}
              >
                Novi normativ
              </Button>
            </>
          )
        )}
        {loadingRequisitions && <Loader />}
        {errorRequisitions && (
          <Message variant="danger">{errorRequisitions}</Message>
        )}
        {requisitions.length != 0 ? (
          <>
            <h2>TREBOVANJE</h2>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>ZAHTIJEVANO</th>
                  <th>ZAPRIMLJENO</th>
                  <th>DOKUMENT</th>
                  <th>ARTIKLI</th>
                  <th>KOLIČINA</th>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                  <th>SKLADIŠTE</th>
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
                      <td>{item.document}</td>
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
                      <td>Centralno skladište</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              type="button"
              onClick={() => history.push("/manufacture/requisition")}
            >
              Novo trebovanje
            </Button>
          </>
        ) : (
          showRequisitionNote && (
            <>
              <h2>Lista trebovanja je prazna</h2>
              <Button
                type="button"
                onClick={() => history.push("/manufacture/requisition")}
              >
                Novo trebovanje
              </Button>
            </>
          )
        )}
      </Col>
    </Row>
  );
};

export default ManufactureScreen;
