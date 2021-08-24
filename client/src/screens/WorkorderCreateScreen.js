import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/articleActions";
import { articleMaterialLagerQuantities } from "../actions/materialLagerActions";
import { articleLagerPurchasePrices } from "../actions/lagerActions";
import { listRates } from "../actions/rateOfYieldActions";
import { listWorkers } from "../actions/userActions";
import { createWorkorder, listWorkorders } from "../actions/workorderActions";
import { WORKORDER_CREATE_RESET } from "../constants/workorderConstants";

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
  const [workers, setWorkers] = useState([]);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [totalManufacturePrice, setTotalManufacturePrice] = useState(0);
  const [lotNumber, setLotNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [toDo, setToDo] = useState(true);

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

  const materialPurchasePrices = useSelector(
    (state) => state.lagerArticlePurchasePrices.purchasePrices
  );

  const workorderCreate = useSelector((state) => state.workorderCreate);
  const { success: successCreate } = workorderCreate;

  // purchase prices of material multiplied by manufacturing product quantity equals total product purchase price

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listRates());
    dispatch(listWorkers());
    if (successCreate) {
      dispatch({ type: WORKORDER_CREATE_RESET });
      dispatch(listWorkorders());
      history.push("/manufacture");
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (
      Object.keys(rate).length !== 0 &&
      materialPurchasePrices &&
      materialQuantities
    ) {
      var purchasePrices = rate.components.map((item, index) =>
        parseFloat(
          productQuantity * item.quantity * materialPurchasePrices[index]
        )
      );
      setTotalPurchasePrice(
        purchasePrices.reduce((acc, item) => acc + item, 0).toFixed(2)
      );
    }
  }, [productQuantity]);

  useEffect(() => {
    setTotalManufacturePrice(totalPurchasePrice * 2.5);
  }, [totalPurchasePrice]);

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
    dispatch(articleLagerPurchasePrices(ids));
  }, [ids]);

  const handleWorker = (index) => (event) => {
    const worker = workerList.workers.find(
      (worker) => worker._id === event.target.value
    );
    if (workers[index]) {
      workers[index].user = worker;
    } else {
      workers.push({
        user: worker,
      });
    }
  };

  const addRow = () => {
    setRows([...rows, "row"]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(workers);
    dispatch(
      createWorkorder({
        documentType,
        documentNumber,
        warehouse,
        materialWarehouse,
        article,
        quantity: productQuantity,
        description,
        rateOfYield: rate,
        lot: lotNumber,
        totalPurchasePrice,
        totalManufacturePrice,
        workers,
        toDo,
      })
    );
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
          <Form.Group controlId="description">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Unesite opis ili bilješke"
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Col md={6}>
            <Form.Group controlId="lotNumber">
              <Form.Label>LOT broj</Form.Label>
              <Form.Control
                type="number"
                placeholder="unesite lot broj"
                onChange={(e) => setLotNumber(e.target.value)}
              ></Form.Control>
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
                      {materialPurchasePrices && (
                        <td>
                          {`${productQuantity * rate.quantity}*${
                            materialPurchasePrices[index]
                          }=`}
                          {productQuantity *
                            rate.quantity *
                            materialPurchasePrices[index]}
                        </td>
                      )}
                      <td></td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ fontWeight: "bold" }}>
                      Σ={totalPurchasePrice}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      Σ = {totalManufacturePrice}
                    </td>
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
            POŠALJI NA IZVRŠENJE
          </Button>
        </div>
      </Form>
    </>
  );
};

export default WorkorderCreateScreen;
