import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import {
  createExport,
  listCentralExports,
} from "../actions/centralExportActions";
import Message from "../components/Message";
import {
  listLagerMaterials,
  articleLagerQuantity,
  articleLagerQuantities,
} from "../actions/lagerActions";
import { CENTRAL_EXPORT_CREATE_RESET } from "../constants/centralExportConstants";
import {
  fullfillRequisition,
  listUnfullfilledRequisitions,
} from "../actions/requisitionActions";

const CentralExportCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const departureWarehouse = "Centralno skladište";
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const documentType = "mđskl-izlaz";
  const documentSubtype = "ostalo";
  const [documentNumber, setDocumentNumber] = useState();
  const [requisition, setRequisition] = useState({});
  const [exportedArticles, setExportedArticles] = useState([]);
  const [ids, setIds] = useState([]);
  const [rows, setRows] = useState("");

  const lagerListMaterial = useSelector((state) => state.lagerListMaterial);
  const { lager } = lagerListMaterial;

  const centralExportCreate = useSelector((state) => state.centralExportCreate);
  const { error: errorCreate, success: successCreate } = centralExportCreate;

  const requisitionUnfullfilledList = useSelector(
    (state) => state.requisitionUnfullfilledList
  );
  const { requisitions: requisitionsUnfullfilled } =
    requisitionUnfullfilledList;

  const lagerArticleQuantity = useSelector(
    (state) => state.lagerArticleQuantity
  );
  const { quantity: articleQuantity } = lagerArticleQuantity;

  const lagerArticleQuantities = useSelector(
    (state) => state.lagerArticleQuantities
  );
  const { quantities: articleQuantities } = lagerArticleQuantities;

  useEffect(() => {
    dispatch(listLagerMaterials());
    dispatch(listUnfullfilledRequisitions());
    if (successCreate) {
      dispatch({ type: CENTRAL_EXPORT_CREATE_RESET });
      dispatch(listCentralExports());
      history.push("/central");
    }
  }, [dispatch, history, successCreate]);

  // upon requisition selection, fetch requested articles quantities from central lager list
  useEffect(() => {
    if (Object.keys(requisition).length !== 0) {
      requisition.requestedArticles.forEach((item) => {
        setIds((ids) => [...ids, item.article._id]);
      });
    }
    setDocumentNumber(requisition.documentNumber);
  }, [requisition]);

  // array of article ids sent to lager to fetch quantites
  useEffect(() => {
    dispatch(articleLagerQuantities(ids));
  }, [dispatch, ids]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    let newArray = [...exportedArticles];
    newArray[index] = {
      article: event.target.value,
    };
    setExportedArticles(newArray);
  };

  const handleQuantity = (index) => (event) => {
    document.getElementById("quantityHeader").style.border = "black";
    document.getElementById(`quantity-${index}`).style.color = "black";

    let newArray = [...exportedArticles];
    newArray[index].quantity = event.target.value;
    setExportedArticles(newArray);

    //if article name has been set in form, validate export quantity with lager quantity
    if (exportedArticles[index].article) {
      dispatch(articleLagerQuantity(exportedArticles[index].article._id));
      if (exportedArticles[index].quantity > articleQuantity) {
        document.getElementById(`quantity-${index}`).style.color = "red";
      }
    }
  };

  const handleRequisition = (event) => {
    if (event.target.value === "") {
      setRequisition({});
      setIds([]);
      setDocumentNumber(0);
    } else {
      setRequisition(
        requisitionsUnfullfilled.find(
          (requisition) => requisition._id === event.target.value
        )
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // send requisition or manually exported articles
    if (Object.keys(requisition).length > 0) {
      var shortage = false;
      requisition.requestedArticles.forEach((item, index) => {
        if (item.quantity > articleQuantities[index]) {
          shortage = true;
        }
      });
      if (shortage) {
        document.getElementById("quantityRequisition").style.border =
          "red solid";
      } else {
        dispatch(
          createExport({
            departureWarehouse,
            destinationWarehouse,
            documentNumber,
            documentType,
            documentSubtype,
            exportedArticles: requisition.requestedArticles,
          })
        );
        dispatch(fullfillRequisition(requisition._id));
      }
    } else {
      // if exported quantities are inside lager quantities, submit form
      var overexported = false;
      exportedArticles.forEach((item) => {
        dispatch(articleLagerQuantity(item.article));
        if (item.quantity > articleQuantity) {
          overexported = true;
        }
      });

      if (overexported) {
        document.getElementById("quantityHeader").style.border = "red solid";
      } else {
        dispatch(
          createExport({
            departureWarehouse,
            destinationWarehouse,
            documentType,
            documentSubtype,
            documentNumber,
            exportedArticles,
          })
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Međuskladišnica izlaz</title>
      </Helmet>
      <h1>MEĐUSKLADIŠNICA IZLAZ - CENTRALNO SKLADIŠTE</h1>
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="departureWarehouse">
              <Form.Label>Polazno skladište</Form.Label>
              <Form.Control
                type="text"
                value={departureWarehouse}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="destinationWarehouse">
              <Form.Label>Odredišno skladište</Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setDestinationWarehouse(e.target.value)}
              >
                <option>Izaberite skladište</option>
                <option value="Skladište materijala">
                  Skladište materijala
                </option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="documentType">
            <Form.Label>Tip dokumenta</Form.Label>
            <Form.Control
              type="number"
              value={documentType}
              placeholder={documentType}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="documentSubtype">
            <Form.Label>Podtip dokumenta</Form.Label>
            <Form.Control
              type="number"
              value={documentSubtype}
              placeholder={documentSubtype}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="documentNumber">
            <Form.Label>Broj dokumenta</Form.Label>
            <Form.Control
              type="number"
              value={documentNumber}
              placeholder="Unesite broj dokumenta"
              onChange={(e) => setDocumentNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Form.Group as={Col} md={6} controlId="requisition" className="mb-3">
          <Form.Label>Dokument trebovanje</Form.Label>
          <Form.Control as="select" type="text" onChange={handleRequisition}>
            <option value="">Izaberite trebovanje</option>
            {requisitionsUnfullfilled.map((requisition) => (
              <option value={requisition._id}>{requisition._id}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {Object.keys(requisition).length !== 0 && (
          <Table size="sm" bordered responsive>
            <thead>
              <tr>
                <th>RB</th>
                <th>ARTIKAL</th>
                <th id="quantityRequisition">KOLIČINA</th>
                <th>RASPOLOŽIVO</th>
              </tr>
            </thead>
            <tbody>
              {requisition.requestedArticles.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.article.name}</td>
                  {articleQuantities &&
                  item.quantity > articleQuantities[index] ? (
                    <td style={{ color: "red", fontWeight: "bold" }}>
                      {item.quantity}
                    </td>
                  ) : (
                    <td>{item.quantity}</td>
                  )}
                  <td>{articleQuantities && articleQuantities[index]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {rows.length > 0 && (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>RB</th>
                <th>ARTIKAL</th>
                <th id="quantityHeader">KOLIČINA</th>
                <th>IZBRIŠI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} id={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Group controlId="article">
                      <Form.Control
                        as="select"
                        type="text"
                        onChange={handleArticle(index)}
                      >
                        <option>Izaberite artikal</option>
                        {lager.map((item) => {
                          return (
                            <option
                              id={item.article._id}
                              value={item.article._id}
                            >
                              {item.article._id} - {item.article.name} -{" "}
                              {item.quantity}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group
                      controlId={`quantity-${index}`}
                      className="quantity"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Unesite količinu"
                        onChange={handleQuantity(index)}
                      ></Form.Control>
                    </Form.Group>
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
            disabled={lager.length <= rows.length}
          >
            Dodaj artikal
          </Button>
          <Button
            type="submit"
            disabled={
              rows.length === 0 && Object.keys(requisition).length === 0
            }
          >
            UNESI
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CentralExportCreateScreen;
