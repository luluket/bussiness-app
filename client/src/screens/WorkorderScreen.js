import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listWorkorderDetails,
  workorderFinish,
  updateWorkorder,
  listWorkorders,
} from "../actions/workorderActions";
import { listRates } from "../actions/rateOfYieldActions";
import { articleMaterialLagerQuantities } from "../actions/materialLagerActions";
import { articleLagerPurchasePrices } from "../actions/lagerActions";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import { WORKORDER_UPDATE_RESET } from "../constants/workorderConstants";

const WorkorderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [toDo, setToDo] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [finished, setFinished] = useState(false);
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState(0);
  const [warehouse, setWarehouse] = useState("");
  const [materialWarehouse, setMaterialWarehouse] = useState("");
  const [article, setArticle] = useState({});
  const [productQuantity, setProductQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [lotNumber, setLotNumber] = useState(0);
  const [rate, setRate] = useState({});
  const [ids, setIds] = useState([]);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [totalManufacturePrice, setTotalManufacturePrice] = useState(0);
  const [workers, setWorkers] = useState([]);

  const workorderDetails = useSelector((state) => state.workorderDetails);
  const {
    loading: loadingWorkorder,
    error: errorWorkorder,
    workorder,
  } = workorderDetails;

  const rateList = useSelector((state) => state.rateList);
  const { loading: loadinRates, error: errorRates, rates } = rateList;

  const materialQuantities = useSelector(
    (state) => state.materialLagerQuantities.quantities
  );

  const materialPurchasePrices = useSelector(
    (state) => state.lagerArticlePurchasePrices.purchasePrices
  );

  const workorderUpdate = useSelector((state) => state.workorderUpdate);
  const { success: successUpdate } = workorderUpdate;

  useEffect(() => {
    if (!workorder || Object.keys(workorder).length === 0) {
      dispatch(listWorkorderDetails(match.params.id));
      dispatch(listRates());
    }

    setToDo(workorder.toDo);
    setInProgress(workorder.inProgress);
    setFinished(workorder.finished);
    setDocumentType(workorder.documentType);
    setDocumentNumber(workorder.documentNumber);
    setWarehouse(workorder.warehouse);
    setMaterialWarehouse(workorder.materialWarehouse);
    setArticle(workorder.article);
    setRate(workorder.rateOfYield);
    setLotNumber(workorder.lot);
    setProductQuantity(workorder.quantity);
    setDescription(workorder.description);
    setWorkers(workorder.workers);
    setTotalPurchasePrice(workorder.totalPurchasePrice);
    setTotalManufacturePrice(workorder.totalManufacturePrice);

    if (successUpdate) {
      dispatch(listWorkorderDetails(match.params.id));
      dispatch(listWorkorders());
      dispatch({ type: WORKORDER_UPDATE_RESET });
      history.push("/manufacture");
    }
  }, [dispatch, history, match, workorder, successUpdate]);

  useEffect(() => {
    setIds([]);
    if (rate && Object.keys(rate).length !== 0) {
      rate.components.forEach((item) => {
        setIds((ids) => [...ids, item.material._id]);
      });
    }
  }, [rate]);

  useEffect(() => {
    if (rate && Object.keys(rate).length !== 0) {
      dispatch(articleMaterialLagerQuantities(ids));
      dispatch(articleLagerPurchasePrices(ids));
      dispatch(listRates());
    }
  }, [ids]);

  const handleRate = (event) => {
    setRate(rates.find((rate) => rate._id === event.target.value));
  };

  useEffect(() => {
    if (
      rate &&
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
    if (productQuantity) {
      document.getElementById("quantityHeader").style.border = "black";
    }
  }, [productQuantity, rate]);

  useEffect(() => {
    setTotalManufacturePrice((totalPurchasePrice * 2.5).toFixed(2));
  }, [totalPurchasePrice]);

  const handleFinished = () => {
    const consumedArticles = [];
    rate.components.map((item) =>
      consumedArticles.push({
        article: item.material._id,
        quantity: item.quantity,
      })
    );
    var overload = false;
    rate.components.forEach((item, index) => {
      if (productQuantity * item.quantity > materialQuantities[index]) {
        overload = true;
      }
    });
    if (overload) {
      document.getElementById("quantityHeader").style.border = "red solid";
    } else {
      dispatch(
        updateWorkorder({
          _id: workorder._id,
          documentType,
          documentNumber,
          warehouse,
          materialWarehouse,
          article,
          quantity: productQuantity,
          description,
          rateOfYield: rate,
          lot: lotNumber,
          workers,
          totalPurchasePrice,
          totalManufacturePrice,
          toDo: "false",
          inProgress: "false",
          finished: "true",
          consumedArticles,
        })
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //upon update check validate rate quantities according to lager
    var overload = false;
    rate.components.forEach((item, index) => {
      if (productQuantity * item.quantity > materialQuantities[index]) {
        overload = true;
      }
    });
    if (overload) {
      document.getElementById("quantityHeader").style.border = "red solid";
    } else {
      dispatch(
        updateWorkorder({
          _id: workorder._id,
          documentType,
          documentNumber,
          warehouse,
          materialWarehouse,
          article,
          quantity: productQuantity,
          description,
          rateOfYield: rate,
          lot: lotNumber,
          workers,
          totalPurchasePrice,
          totalManufacturePrice,
        })
      );
    }
  };

  return (
    <>
      {errorWorkorder && <Message variant="danger">{errorWorkorder}</Message>}
      <Row className="mb-3" style={{ fontSize: "2rem" }}>
        <Col md={4}>
          {toDo ? (
            <div
              style={{ color: "#CCCC00	", fontWeight: "bold" }}
              className="text-center"
            >
              Pripravan
            </div>
          ) : (
            <div className="text-center">Pripravan</div>
          )}
        </Col>
        <Col md={4}>
          {inProgress ? (
            <div
              style={{ color: "orange", fontWeight: "bold" }}
              className="text-center"
            >
              U izvršavanju
            </div>
          ) : (
            <div className="text-center">U izvršavanju</div>
          )}
        </Col>
        <Col md={4}>
          {finished ? (
            <div
              style={{ color: "green", fontWeight: "bold" }}
              className="text-center"
            >
              Završen
            </div>
          ) : (
            <div className="text-center">Završen</div>
          )}
        </Col>
      </Row>
      <hr></hr>
      <Row className="mb-3">
        <Col md={8}>
          <h1>
            {documentType}-{documentNumber}
          </h1>
        </Col>
        <Col md={4} className="text-center">
          {toDo && (
            <Button type="button" className="mt-3">
              Preuzmi na izvršavanje
            </Button>
          )}
          {inProgress && (
            <Button type="button" onClick={handleFinished} className="mt-3">
              Završi
            </Button>
          )}
          {finished && (
            <Message variant="success">Radni nalog je zaključen</Message>
          )}
        </Col>
      </Row>

      {article &&
        rate &&
        Object.keys(article).length !== 0 &&
        Object.keys(rate).length !== 0 && (
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
                    value={documentNumber}
                    disabled={finished}
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
                    disabled={finished}
                    value={materialWarehouse}
                    onChange={(e) => setMaterialWarehouse(e.target.value)}
                  >
                    <option value={materialWarehouse}>
                      {materialWarehouse}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="article">
                  <Form.Label>Artikl</Form.Label>
                  <Form.Control as="select" type="text" disabled>
                    <option>
                      {article._id} - {article.name}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productQuantity">
                  <Form.Label>Komada</Form.Label>
                  <Form.Control
                    type="text"
                    value={productQuantity}
                    disabled={finished}
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
                  value={description}
                  disabled={finished}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="rate">
                  <Form.Label>Normativ</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    onChange={handleRate}
                    value={rate._id}
                    disabled={finished}
                  >
                    {rate && (
                      <option value={rate._id}>
                        {rate._id} - {rate.product.name}
                      </option>
                    )}

                    {rates &&
                      rates.map((item) => {
                        if (item._id !== rate._id) {
                          return (
                            <option value={item._id}>
                              {item._id} - {item.product.name}
                            </option>
                          );
                        }
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lotNumber">
                  <Form.Label>LOT broj</Form.Label>
                  <Form.Control
                    type="number"
                    value={lotNumber}
                    disabled={finished}
                    onChange={(e) => setLotNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {rate && Object.keys(rate).length !== 0 && (
              <Table size="sm" bordered responsive>
                <thead>
                  <tr>
                    <th>ID ARTIKLA</th>
                    <th>NAZIV ARTIKLA</th>
                    <th id="quantityHeader">KOLIČINA</th>
                    <th>RASPOLOŽIVO</th>
                    <th>NABAVNA CIJENA</th>
                    <th>PROIZVODNA CIJENA</th>
                  </tr>
                </thead>
                <tbody>
                  {rate.components.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material._id}</td>
                      <td>{item.material.name}</td>
                      {materialQuantities &&
                      productQuantity * item.quantity >
                        materialQuantities[index] ? (
                        <td>
                          {`${productQuantity}*${item.quantity}=`}
                          <span style={{ color: "red" }}>
                            {productQuantity * item.quantity}
                          </span>
                        </td>
                      ) : (
                        <td>
                          {`${productQuantity}*${item.quantity}=`}
                          {productQuantity * item.quantity}
                        </td>
                      )}

                      <td>{materialQuantities && materialQuantities[index]}</td>
                      {materialPurchasePrices && (
                        <td>
                          {`${productQuantity * item.quantity}*${
                            materialPurchasePrices[index]
                          }=`}
                          {parseFloat(
                            productQuantity *
                              item.quantity *
                              materialPurchasePrices[index]
                          ).toFixed(2)}
                        </td>
                      )}
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ fontWeight: "bold" }}>
                      Σ={totalPurchasePrice && totalPurchasePrice}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      Σ=
                      {totalManufacturePrice && totalManufacturePrice}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
            {workers && (
              <Table bordered responsive size="sm">
                <thead>
                  <tr>
                    <th>RB</th>
                    <th>RADNIK</th>
                    <th>IZBRIŠI</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {worker.user._id}-{worker.user.name}{" "}
                        {worker.user.surname}
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
            {inProgress && finished === false && (
              <Button type="submit" style={{ width: "10rem", height: "3rem" }}>
                Uredi
              </Button>
            )}
          </Form>
        )}
    </>
  );
};
export default WorkorderScreen;
