import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Form, Col, Button, Table } from "react-bootstrap";
import Message from "../components/Message";
import { REQUISITION_CREATE_RESET } from "../constants/requisitionConstants";
import { listMaterials } from "../actions/articleActions";
import { createRequisition } from "../actions/requisitionActions";

const RequisitionCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [departureWarehouse, setDepartureWarehouse] = useState(
    "Skladište materijala"
  );
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const [document, setDocument] = useState(0);
  const [requestedArticles, setRequestedArticles] = useState([
    { article: "", quantity: 0 },
  ]);
  const [rows, setRows] = useState("");

  const materialList = useSelector((state) => state.materialList);
  const {
    loading: loadingMaterials,
    error: errorMaterials,
    materials,
  } = materialList;

  const requisitionCreate = useSelector((state) => state.requisitionCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    requisition,
  } = requisitionCreate;

  useEffect(() => {
    dispatch(listMaterials());
    if (successCreate) {
      dispatch({ type: REQUISITION_CREATE_RESET });
      history.push("/central");
    }
  }, [dispatch, successCreate]);

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const handleArticle = (index) => (event) => {
    const requestedArticle = materials.find(
      (item) => item._id === event.target.value
    );
    const { _id } = requestedArticle;
    if (requestedArticles[index]) {
      requestedArticles[index].article = _id;
    } else {
      requestedArticles.push({
        article: _id,
        quantity: 0,
      });
    }
  };

  const handleQuantity = (index) => (event) => {
    if (requestedArticles[index]) {
      requestedArticles[index].quantity = event.target.value;
    } else {
      requestedArticles.push({
        article: "",
        quantity: event.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRequisition({
        requestedArticles,
        document,
        isSent: true,
        isFullfilled: false,
      })
    );
  };

  return (
    <>
      <h1>NOVI DOKUMENT - TREBOVANJE</h1>
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
                <option value="Centralno skladište">Centralno skladište</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group as={Col} md={6} controlId="documentNumber" className="mb-3">
          <Form.Label>Broj dokumenta</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite broj dokumenta"
            onChange={(e) => setDocument(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
                        {materials.map((item) => {
                          return (
                            <option id={item._id} value={item._id}>
                              {item._id} | {item.name}{" "}
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
            disabled={materials.length <= rows.length}
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

export default RequisitionCreateScreen;
