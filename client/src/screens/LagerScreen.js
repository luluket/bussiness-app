import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLager } from "../actions/lagerActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";

const LagerScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const lagerList = useSelector((state) => state.lagerList);
  const { loading, error, lager } = lagerList;

  //   const handleRowClick = (id) => {
  //     history.push(`/article/${id}`);
  //   };

  useEffect(() => {
    dispatch(listLager());
  }, [dispatch]);

  const handleButtonClick = () => {
    history.push("/lager/create");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1>Centralno skladište - Lager Lista</h1>
            </Col>
            <Col lg={4}>
              <Button
                type="button"
                className="mb-3"
                onClick={handleButtonClick}
              >
                <i className="fas fa-plus"></i> Primka - Kalkulacija
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID artikla</th>
                <th>Naziv artikla</th>
                <th>Jedinica mjere</th>
                <th>Količina</th>
                <th>PNC</th>
                <th>cijena</th>
              </tr>
            </thead>
            <tbody>
              {lager.map((article) => {
                return (
                  <tr
                    key={article._id}
                    // onClick={() => handleRowClick(article._id)}
                  >
                    <td>{article._id}</td>
                    <td>{article.articleName}</td>
                    <td>{article.articleUnit}</td>
                    <td>{article.quantity}</td>
                    <td>{article.averagePurchasePrice}</td>
                    <td>{article.sellingPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default LagerScreen;
