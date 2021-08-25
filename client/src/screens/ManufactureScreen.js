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
import { listMaterialConsumptions } from "../actions/materialConsumptionActions";
import { MATERIAL_CONSUMPTION_LIST_RESET } from "../constants/materialConsumptionConstants";
import { listProductLager } from "../actions/productLagerActions";
import { PRODUCT_LAGER_LIST_RESET } from "../constants/productLagerConstants";
import { listProductExports } from "../actions/productExportActions";
import { PRODUCT_EXPORT_LIST_RESET } from "../constants/productExportConstants";

const ManufactureScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  // states to handle empty database tables
  const [showMaterialLagerNote, setShowMaterialLagerNote] = useState(false);
  const [showMaterialImportNote, setShowMaterialImportNote] = useState(false);
  const [showMaterialConsumptionNote, setShowMaterialConsumptionNote] =
    useState(false);
  const [showRequisitionNote, setShowRequisitionNote] = useState(false);
  const [showRateNote, setShowRateNote] = useState(false);
  const [showWorkorderNote, setShowWorkorderNote] = useState(false);
  const [showProductLagerNote, setShowProductLagerNote] = useState(false);
  const [showProductExportNote, setShowProductExportNote] = useState(false);

  const materialLagerList = useSelector((state) => state.materialLagerList);
  const {
    loading: loadingMaterialLager,
    error: errorMaterialLager,
    lager: materialLager,
  } = materialLagerList;

  const materialConsumptionList = useSelector(
    (state) => state.materialConsumptionList
  );
  const {
    loading: loadingConsumptions,
    error: errorConsumptions,
    consumptions,
  } = materialConsumptionList;

  const productLagerList = useSelector((state) => state.productLagerList);
  const {
    loading: loadingProductLager,
    error: errorProductLager,
    lager: productLager,
  } = productLagerList;

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

  const productExportList = useSelector((state) => state.productExportList);
  const {
    loading: loadingProductExports,
    error: errorProductExports,
    exports: productExports,
  } = productExportList;

  const workorderList = useSelector((state) => state.workorderList);
  const {
    loading: loadingWorkorders,
    error: errorWorkorders,
    workorders,
  } = workorderList;

  useEffect(() => {
    dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
    dispatch({ type: WORKORDER_LIST_RESET });
    dispatch({ type: RATE_LIST_RESET });
    dispatch({ type: REQUISITION_LIST_RESET });
    dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
    dispatch({ type: PRODUCT_LAGER_LIST_RESET });
    dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (loadingMaterialLager) {
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowMaterialLagerNote(true);
      setShowMaterialImportNote(false);
      setShowProductLagerNote(false);
      setShowMaterialConsumptionNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingMaterialLager]);

  useEffect(() => {
    if (loadingImports) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowMaterialImportNote(true);
      setShowMaterialLagerNote(false);
      setShowProductLagerNote(false);
      setShowMaterialConsumptionNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingImports]);

  useEffect(() => {
    if (loadingProductLager) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowProductLagerNote(true);
      setShowMaterialLagerNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialConsumptionNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingProductLager]);

  useEffect(() => {
    if (loadingConsumptions) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowMaterialConsumptionNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowProductLagerNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingConsumptions]);

  useEffect(() => {
    if (loadingProductExports) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowProductExportNote(true);
      setShowMaterialConsumptionNote(false);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowProductLagerNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowRateNote(false);
    }
  }, [loadingProductExports]);

  useEffect(() => {
    if (loadingRates) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });

      setShowRateNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialLagerNote(false);
      setShowProductLagerNote(false);
      setShowMaterialConsumptionNote(false);
      setShowWorkorderNote(false);
      setShowRequisitionNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingRates]);

  useEffect(() => {
    if (loadingWorkorders) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: REQUISITION_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });

      setShowWorkorderNote(true);
      setShowRequisitionNote(false);
      setShowMaterialImportNote(false);
      setShowProductLagerNote(false);
      setShowMaterialConsumptionNote(false);
      setShowMaterialLagerNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingWorkorders]);

  useEffect(() => {
    if (loadingRequisitions) {
      dispatch({ type: MATERIAL_LAGER_LIST_RESET });
      dispatch({ type: MATERIAL_IMPORT_LIST_RESET });
      dispatch({ type: PRODUCT_LAGER_LIST_RESET });
      dispatch({ type: PRODUCT_EXPORT_LIST_RESET });
      dispatch({ type: MATERIAL_CONSUMPTION_LIST_RESET });
      dispatch({ type: RATE_LIST_RESET });
      dispatch({ type: WORKORDER_LIST_RESET });

      setShowRequisitionNote(true);
      setShowMaterialImportNote(false);
      setShowMaterialConsumptionNote(false);
      setShowProductLagerNote(false);
      setShowMaterialLagerNote(false);
      setShowWorkorderNote(false);
      setShowRateNote(false);
      setShowProductExportNote(false);
    }
  }, [loadingRequisitions]);

  const props = [
    {
      name: "Skladište materijala",
      subitems: [
        { name: "Lager", function: listMaterialLager() },
        { name: "Međuskladišnica ulaz", function: listMaterialImports() },
        { name: "Međuskladišnica izlaz", function: listMaterialLager() },
        { name: "Utrošak materijala", function: listMaterialConsumptions() },
      ],
      function: listMaterialLager(),
    },
    {
      name: "Skladište gotovih proizvoda",
      subitems: [
        { name: "Lager", function: listProductLager() },
        // { name: "Međuskladišnica ulaz", function: listMaterialLager() },
        { name: "Međuskladišnica izlaz", function: listProductExports() },
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
        <hr></hr>
        {loadingMaterialLager && <Loader />}
        {errorMaterialLager && (
          <Message variant="danger">{errorMaterialLager}</Message>
        )}
        {materialLager.length != 0 ? (
          <>
            <h2>SKLADIŠTE MATERIJALA - LAGER LISTA</h2>
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
                {materialLager.map((item) => {
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
          loadingMaterialLager === false &&
          showMaterialLagerNote && <h2>Lager lista je prazna</h2>
        )}
        {loadingImports && <Loader />}
        {errorImports && <Message variant="danger">{errorImports}</Message>}
        {imports.length != 0 ? (
          <>
            <h2>SKLADIŠTE MATERIJALA - MEĐUSKLADIŠNICA ULAZ</h2>
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
          loadingImports === false &&
          showMaterialImportNote && (
            <h2>Lista zaprimljenih artikala je prazna</h2>
          )
        )}
        {loadingProductLager && <Loader />}
        {errorProductLager && (
          <Message variant="danger">{errorProductLager}</Message>
        )}
        {productLager.length != 0 ? (
          <>
            <h2>SKLADIŠTE GOTOVIH PROIZVODA - LAGER LISTA</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>ID artikla</th>
                  <th>Naziv artikla</th>
                  <th>Jedinica mjere</th>
                  <th>Količina</th>
                  <th>NABAVNA CIJENA</th>
                  <th>PROIZVODNA CIJENA</th>
                </tr>
              </thead>
              <tbody>
                {productLager.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.article.name}</td>
                      <td>{item.article.unit}</td>
                      <td>{item.quantity}</td>
                      <td>{item.purchasePrice}</td>
                      <td>{item.manufacturePrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          loadingProductLager === false &&
          showProductLagerNote && <h2>Lager lista je prazna</h2>
        )}
        {loadingProductExports && <Loader />}
        {errorProductExports && (
          <Message variant="danger">{errorProductExports}</Message>
        )}
        {productExports && productExports.length !== 0 ? (
          <>
            <h2>SKLADIŠTE GOTOVIH PROIZVODA - MEĐUSKLADIŠNICA IZLAZ</h2>
            <Table striped bordered responsive size="sm">
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
                {productExports.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    </td>
                    <td>
                      {item.documentNumber}-{item.documentType}
                    </td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>{item.createdAt.substring(11, 19)}</td>
                    <td>{item.destinationWarehouse}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          loadingProductExports === false &&
          showProductExportNote && (
            <>
              {" "}
              <h2>NEMA OTPREMLJENIH MATERIJALA</h2>
              <Button type="button">Nova otprema</Button>
            </>
          )
        )}
        {loadingConsumptions && <Loader />}
        {errorConsumptions && (
          <Message variant="danger">{errorConsumptions}</Message>
        )}
        {consumptions && consumptions.length != 0 ? (
          <>
            <h2>SKLADIŠTE MATERIJALA - UTROŠAK MATERIJALA</h2>
            <Table striped bordered responsive size="sm">
              <thead>
                <tr>
                  <th>ZAKLJUČEN</th>
                  <th>RADNI NALOG</th>
                  <th>DATUM</th>
                  <th>VRIJEME</th>
                  <th>ARTIKL</th>
                </tr>
              </thead>
              <tbody>
                {consumptions.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      </td>
                      <td>
                        {item.workorder.documentNumber}-
                        {item.workorder.documentType}
                      </td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>{item.createdAt.substring(11, 19)}</td>
                      <td>
                        {item.article._id}-{item.article.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          loadingConsumptions === false &&
          showMaterialConsumptionNote && <h2>Nema utroška materijala</h2>
        )}
        {loadingWorkorders && <Loader />}
        {errorWorkorders && (
          <Message variant="danger">{errorWorkorders}</Message>
        )}
        {workorders && workorders.length != 0 ? (
          <>
            <h2>SKLADIŠTE GOTOVIH PROIZVODA - RADNI NALOZI</h2>
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
          loadingWorkorders === false &&
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
          loadingRates === false &&
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
          loadingRequisitions === false &&
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
