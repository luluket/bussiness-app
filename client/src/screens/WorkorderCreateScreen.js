import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/articleActions";
import { articleMaterialLagerQuantities } from "../actions/materialLagerActions";
import { listRates } from "../actions/rateOfYieldActions";
import { listWorkers } from "../actions/userActions";

const WorkorderCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const documentType = "radni nalog";
  const [documentNumber, setDocumentNumber] = useState(0);
  const warehouse = "skladište gotovih proizvoda";
  const [materialWarehouse, setMaterialWarehouse] = useState("");
  const [article, setArticle] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [rate, setRate] = useState({});
  const [ids, setIds] = useState([]);
  const [workers, setWorkers] = useState([{ _id: "" }]);

  const [rows, setRows] = useState("");

  const workerList = useSelector((state) => state.workerList);
  const { loading: loadingWorkers } = workerList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const rateList = useSelector((state) => state.rateList);
  const { rates } = rateList;

  const materialQuantities = useSelector(
    (state) => state.materialLagerQuantities.quantities
  );

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listRates());
    dispatch(listWorkers());
  }, [dispatch]);

  const handleRate = (event) => {
    if (event.target.value === "") {
      setRate({});
      setIds([]);
    } else {
      setRate(rates.find((rate) => rate._id === event.target.value));
    }
  };

  // upon rate selection, fetch components quantites from material warehouse
  useEffect(() => {
    if (Object.keys(rate).length !== 0) {
      rate.components.forEach((item) => {
        setIds((ids) => [...ids, item.material._id]);
      });
    }
  }, [rate]);

  useEffect(() => {
    dispatch(articleMaterialLagerQuantities(ids));
  }, [ids]);

  const handleWorker = (index) => (event) => {
    const worker = workerList.workers.find(
      (worker) => worker._id === event.target.value
    );
    const { _id } = worker;
    if (workers[index]) {
      workers[index]._id = _id;
    } else {
      workers.push({
        _id: _id,
      });
    }
  };

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const submitHandler = (e) => {
    e.prevent.default();
  };
  return (
    <>
      <h1>Novi radni nalog</h1>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="documentType">
              <Form.Label>Tip dokumenta</Form.Label>
              <Form.Control
                type="text"
                value={documentType}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="documentNumber">
              <Form.Label>Broj dokumenta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite broj dokumenta"
                onChange={(e) => setDocumentNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="warehouse">
              <Form.Label>Skladište</Form.Label>
              <Form.Control
                type="text"
                value={warehouse}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="documentNumber">
              <Form.Label>Skladište utroška materijala</Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setMaterialWarehouse(e.target.value)}
              >
                <option>Izaberite skladište</option>
                <option value="skladište materijala">
                  Skladište materijala
                </option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="article">
              <Form.Label>Artikl</Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setArticle(e.target.value)}
              >
                <option>Izaberite artikl</option>
                {products.map((product) => (
                  <option value={product._id}>
                    {product._id} - {product.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productQuantity">
              <Form.Label>Komada</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite broj komada za proizvodnju"
                onChange={(e) => setProductQuantity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="rate">
              <Form.Label>Normativ</Form.Label>
              {rates.length === 0 ? (
                <>
                  <h3>Lista normativa je prazna</h3>
                  <Button
                    type="button"
                    onClick={() => history.push("/manufacture/rate")}
                  >
                    Kreirajte normativ
                  </Button>
                </>
              ) : (
                <Form.Control as="select" type="text" onChange={handleRate}>
                  <option value="">Izaberite normativ</option>
                  {rates.map((rate) => (
                    <option value={rate._id}>
                      {rate._id}-{rate.product.name}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {Object.keys(rate).length !== 0 && (
            <>
              <div className="d-flex justify-content-between">
                <h3>SASTAVNICE</h3>
                <Button
                  className="mb-2"
                  onClick={() => history.push("/manufacture/requisition")}
                >
                  Novo trebovanje
                </Button>
              </div>
              <Table size="sm" bordered responsive>
                <thead>
                  <tr>
                    <th>ID ARTIKLA</th>
                    <th>NAZIV ARTIKLA</th>
                    <th id="quantityRequisition">KOLIČINA</th>
                    <th>RASPOLOŽIVO</th>
                    <th>NABAVNA CIJENA</th>
                    <th>PROIZVODNA CIJENA</th>
                  </tr>
                </thead>
                <tbody>
                  {rate.components.map((rate, index) => (
                    <tr key={index}>
                      <td>{rate.material._id}</td>
                      <td>{rate.material.name}</td>

                      {materialQuantities &&
                      productQuantity * rate.quantity >
                        materialQuantities[index] ? (
                        <td>
                          {`${productQuantity}*${rate.quantity}`}=
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {productQuantity * rate.quantity}
                          </span>
                        </td>
                      ) : (
                        <td>
                          {`${productQuantity}*${rate.quantity}`}=
                          {productQuantity * rate.quantity}
                        </td>
                      )}
                      <td>{materialQuantities && materialQuantities[index]}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </Row>

        {rows.length > 0 && (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>RB</th>
                <th>RADNIK</th>
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
                        onChange={handleWorker(index)}
                      >
                        <option>Izaberite radnika</option>
                        {loadingWorkers && <span>loading</span>}
                        {workerList.workers.map((worker) => {
                          return (
                            <option id={worker._id} value={worker._id}>
                              {worker._id} | {worker.name} {worker.surname}
                            </option>
                          );
                        })}
                      </Form.Control>
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
          {loadingWorkers ? (
            <span></span>
          ) : (
            <Button
              type="button"
              onClick={addRow}
              disabled={workerList.workers.length <= rows.length}
            >
              Dodaj radnika
            </Button>
          )}

          <Button type="submit" disabled={rows.length === 0}>
            UNESI
          </Button>
        </div>
      </Form>
    </>
  );
};

export default WorkorderCreateScreen;
