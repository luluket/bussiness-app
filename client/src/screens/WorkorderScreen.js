import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWorkorderDetails } from "../actions/workorderActions";
import { listProducts } from "../actions/articleActions";
import { listRates } from "../actions/rateOfYieldActions";
import { listRateDetails } from "../actions/rateOfYieldActions";
import { articleMaterialLagerQuantities } from "../actions/materialLagerActions";
import { articleLagerPurchasePrices } from "../actions/lagerActions";
import { workorderInProgress } from "../actions/workorderActions";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const WorkorderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [toDo, setToDo] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [finished, setFinished] = useState(false);
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState(0);
  const [warehouse, setWarehouse] = useState("");
  const [materialWarehouse, setMaterialWarehouse] = useState("");
  const [articleId, setArticleId] = useState("");
  const [articleName, setArticleName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [lotNumber, setLotNumber] = useState(0);
  const [rate, setRate] = useState({});
  const [rateId, setRateId] = useState("");
  const [rateProduct, setRateProduct] = useState("");
  const [ids, setIds] = useState([]);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [totalManufacturePrice, setTotalManufacturePrice] = useState(0);

  const isInProgress = useSelector(
    (state) => state.workorderInProgress.workorder.inProgress
  );

  const workorderDetails = useSelector((state) => state.workorderDetails);
  const {
    loading: loadingWorkorder,
    error: errorWorkorder,
    workorder,
  } = workorderDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const rateList = useSelector((state) => state.rateList);
  const { loading: loadinRates, error: errorRates, rates } = rateList;

  const rateDetails = useSelector((state) => state.rateDetails);
  const {
    loading: loadinRateDetails,
    error: errorRateDetails,
    rate: workorderRate,
  } = rateDetails;

  const materialQuantities = useSelector(
    (state) => state.materialLagerQuantities.quantities
  );

  const materialPurchasePrices = useSelector(
    (state) => state.lagerArticlePurchasePrices.purchasePrices
  );

  useEffect(() => {
    if (isInProgress) {
      setToDo(false);
      setInProgress(true);
      setFinished(false);
    }
  }, [isInProgress]);

  useEffect(() => {
    dispatch(listWorkorderDetails(match.params.id));
    dispatch(listProducts());
    dispatch(listRates());

    setToDo(workorder.toDo);
    setInProgress(workorder.inProgress);
    setFinished(workorder.finished);
  }, [dispatch, match]);

  useEffect(() => {
    if (workorder.toDo) {
      setToDo(workorder.toDo);
    }
  }, [workorder.toDo]);

  useEffect(() => {
    if (workorder.inProgress) {
      setInProgress(workorder.inProgress);
    }
  }, [workorder.inProgress]);

  useEffect(() => {
    if (workorder.finished) {
      setFinished(workorder.finished);
    }
  }, [workorder.finished]);

  useEffect(() => {
    if (workorder.documentType) {
      setDocumentType(workorder.documentType);
    }
  }, [workorder.documentType]);

  useEffect(() => {
    if (workorder.documentNumber) {
      setDocumentNumber(workorder.documentNumber);
    }
  }, [workorder.documentNumber]);

  useEffect(() => {
    if (workorder.warehouse) {
      setWarehouse(workorder.warehouse);
    }
  }, [workorder.warehouse]);

  useEffect(() => {
    if (workorder.materialWarehouse) {
      setMaterialWarehouse(workorder.materialWarehouse);
    }
  }, [workorder.materialWarehouse]);

  useEffect(() => {
    if (workorder.article) {
      setArticleId(workorder.article._id);
      setArticleName(workorder.article.name);
    }
  }, [workorder.article]);

  useEffect(() => {
    if (workorder.rateOfYield) {
      setRateId(workorder.rateOfYield._id);
      setRateProduct(workorder.rateOfYield.product.name);
    }
  }, [workorder.rateOfYield]);

  useEffect(() => {
    console.log(articleId);
  }, [articleId]);

  useEffect(() => {
    if (rateId) {
      dispatch(listRateDetails(rateId));
      setRate(rates.find((rate) => rate._id === rateId));
    }
  }, [rateId]);

  useEffect(() => {
    if (Object.keys(workorderRate).length !== 0) {
      workorderRate.components.forEach((item) => {
        setIds((ids) => [...ids, item.material._id]);
      });
    }
  }, [workorderRate]);

  useEffect(() => {
    if (workorder.lot) {
      setLotNumber(workorder.lot);
    }
  }, [workorder.lot]);

  useEffect(() => {
    if (workorder.quantity) {
      setProductQuantity(workorder.quantity);
    }
  }, [workorder.quantity]);

  useEffect(() => {
    if (workorder.description) {
      setDescription(workorder.description);
    }
  }, [workorder.description]);

  useEffect(() => {
    if (workorder.description) {
      setDescription(workorder.description);
    }
  }, [workorder.description]);

  useEffect(() => {
    if (workorder.totalPurchasePrice) {
      setTotalPurchasePrice(workorder.totalPurchasePrice);
    }
  }, [workorder.totalPurchasePrice]);

  useEffect(() => {
    if (workorder.totalManufacturePrice) {
      setTotalManufacturePrice(workorder.totalManufacturePrice);
    }
  }, [workorder.totalManufacturePrice]);

  useEffect(() => {
    dispatch(articleMaterialLagerQuantities(ids));
    dispatch(articleLagerPurchasePrices(ids));
    console.log(ids);
  }, [ids]);

  const handleRate = (event) => {
    setRate(rates.find((rate) => rate._id === event.target.value));
  };

  useEffect(() => {
    if (
      Object.keys(workorderRate).length !== 0 &&
      materialPurchasePrices &&
      materialQuantities
    ) {
      var purchasePrices = workorderRate.components.map((item, index) =>
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

  const handleInProgress = () => {
    dispatch(workorderInProgress(match.params.id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {errorWorkorder && <Message variant="danger">{errorWorkorder}</Message>}
      <Row className="mb-3" style={{ fontSize: "2rem" }}>
        <Col md={4}>
          {toDo ? (
            <div
              style={{ color: "green", fontWeight: "bold" }}
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
              style={{ color: "green", fontWeight: "bold" }}
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
            <Button type="button" onClick={handleInProgress} className="mt-3">
              Preuzmi na izvršavanje
            </Button>
          )}
          {inProgress && (
            <Button type="button" onClick={handleInProgress} className="mt-3">
              Završi
            </Button>
          )}
          {finished && (
            <Message variant="success">Radni nalog je zaključen</Message>
          )}
        </Col>
      </Row>

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
                <option value={workorder.materialWarehouse} selected>
                  {workorder.materialWarehouse}
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
                onChange={(e) => setArticleId(e.target.value)}
              >
                <option value={articleId} selected>
                  {articleId} - {articleName}
                </option>
                {products.map((product) => {
                  if (product._id !== articleId) {
                    return (
                      <option value={product._id}>
                        {product._id} - {product.name}
                      </option>
                    );
                  }
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productQuantity">
              <Form.Label>Komada</Form.Label>
              <Form.Control
                type="text"
                value={productQuantity}
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
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="rate">
              <Form.Label>Normativ</Form.Label>
              <Form.Control as="select" type="text" onChange={handleRate}>
                <option value={workorderRate._id} selected>
                  {workorderRate._id} - {rateProduct}
                </option>
                {rates.map((item) => {
                  if (item._id !== workorderRate._id) {
                    return (
                      <option value={item._id}>
                        {item._id}-{item.product.name}
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
                onChange={(e) => setLotNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {Object.keys(workorderRate).length !== 0 && (
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
              {workorderRate.components.map((item, index) => (
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
                  Σ={totalManufacturePrice && totalManufacturePrice}
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Form>
    </>
  );
};
export default WorkorderScreen;
