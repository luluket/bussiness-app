import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPartners } from "../actions/partnerActions";
import { Row, Card, Col, ListGroup } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import picture from "../../src/staff.png";

const PartnerScreen = () => {
  const dispatch = useDispatch();

  const partnerList = useSelector((state) => state.partnerList);
  const { loading, error, partners } = partnerList;

  useEffect(() => {
    dispatch(listPartners());
  }, [dispatch]);

  return (
    <>
      <h1>PARTNERI</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {partners.map((partner) => {
            return (
              <Col lg={4} md={6} className="mb-3">
                <Card className="bg-dark shadow-lg rounded">
                  <Card.Img src={picture} alt="picture" variant="top" />
                  <Card.Body className="bg-light">
                    <Card.Title>
                      {partner.name} {partner.surname}
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <stron>oib: </stron>
                        {partner.oib}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>vrsta partnera: </strong>
                        {partner.type}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>email: </strong>
                        {partner.email}
                      </ListGroup.Item>
                      {partner.role && (
                        <ListGroup.Item>
                          <strong>pozicija: </strong>
                          {partner.role}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default PartnerScreen;
