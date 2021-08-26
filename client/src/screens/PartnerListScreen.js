import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listPartners } from "../actions/partnerActions";
import { listUsers } from "../actions/userActions";
import { Row, Card, Col, ListGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import picture from "../../src/staff.png";

const PartnerListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const partnerList = useSelector((state) => state.partnerList);
  const { loading, error, partners } = partnerList;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  useEffect(() => {
    dispatch(listPartners());
    dispatch(listUsers());
  }, [dispatch]);

  const handleButtonClick = () => {
    history.push("/partners/create");
  };

  return (
    <>
      <h1>Zaposleni</h1>

      {loadingUsers ? (
        <span></span>
      ) : errorUsers ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {users.map((user) => {
            return (
              <Col lg={4} md={6} className="mb-3" key={user._id}>
                <Link to={`/user/${user._id}`} className="text-decoration-none">
                  <Card className="bg-dark shadow-lg rounded partner-card">
                    <Card.Img src={picture} alt="picture" variant="top" />
                    <Card.Body className="bg-light">
                      <Card.Title>
                        {user.name} {user.surname}
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          <strong>oib: </strong>
                          {user.oib}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>email: </strong>
                          {user.email}
                        </ListGroup.Item>
                        {user.role && (
                          <ListGroup.Item>
                            <strong>pozicija: </strong>
                            {user.role}
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
      <hr></hr>
      <br></br>
      <Row className="align-items-center">
        <Col>
          <h1>Partneri</h1>
        </Col>
        <Col>
          <Button type="button" className="mb-3" onClick={handleButtonClick}>
            <i className="fas fa-plus"></i> Novi Partner
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {partners.map((partner) => {
            return (
              <Col lg={4} md={6} className="mb-3" key={partner._id}>
                <Link
                  to={`/partner/${partner._id}`}
                  className="text-decoration-none"
                >
                  <Card className="bg-dark shadow-lg rounded partner-card">
                    <Card.Img src={picture} alt="picture" variant="top" />
                    <Card.Body className="bg-light">
                      <Card.Title>
                        {partner.name} {partner.surname}
                      </Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          <strong>oib: </strong>
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
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default PartnerListScreen;
