import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWorkorderDetails } from "../actions/workorderActions";
import { listProducts } from "../actions/articleActions";
import { listRates } from "../actions/rateOfYieldActions";
import { listRateDetails } from "../actions/rateOfYieldActions";
import { articleMaterialLagerQuantities } from "../actions/materialLagerActions";
import { articleLagerPurchasePrices } from "../actions/lagerActions";
import { Row, Col, Form, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const WorkorderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [toDo, setToDo] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [finished, setFinished] = useState(true);
  const [documentType, setDocumentType] = useState(0);
  const [documentNumber, setDocumentNumber] = useState(0);
  const [warehouse, setWarehouse] = useState("");
  const [materialWarehouse, setMaterialWarehouse] = useState("");
  const [article, setArticle] = useState();
  const [productQuantity, setProductQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [lotNumber, setLotNumber] = useState(0);
  const [rate, setRate] = useState({});
  const [ids, setIds] = useState([]);

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
    if (!workorder || !workorder.status) {
      dispatch(listWorkorderDetails(match.params.id));
      dispatch(listProducts());
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
    setProductQuantity(workorder.quantity);
    setDescription(workorder.description);
    setLotNumber(workorder.lot);
    // setRate(workorder.rateOfYield);
  }, [dispatch, match]);

  // useEffect(() => {
  //   if (rate) {
  //     console.log(rate);
  //     listRateDetails(rate._id);
  //   }
  // }, [rate]);

  useEffect(() => {
    dispatch(articleMaterialLagerQuantities(ids));
    dispatch(articleLagerPurchasePrices(ids));
  }, [ids]);

  const handleRate = (event) => {
    setRate(rates.find((rate) => rate._id === event.target.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {errorWorkorder && <Message variant="danger">{errorWorkorder}</Message>}
      {loadingWorkorder && <Loader />}
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
    </>
  );
};
export default WorkorderScreen;
