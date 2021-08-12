import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getPartnerDetails, updatePartner } from "../actions/partnerActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const PartnerScreen = ({ location, history, match }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [oib, setOib] = useState(0);
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [zip, setZip] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [telephone, setTelephone] = useState(0);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const partnerDetails = useSelector((state) => state.partnerDetails);
  const { loading, error, partner } = partnerDetails;

  const partnerUpdate = useSelector((state) => state.partnerUpdate);
  const { success } = partnerUpdate;

  useEffect(() => {
    if (!partner || !partner.name) {
      dispatch(getPartnerDetails(match.params.id));
    } else {
      setName(partner.name);
      setSurname(partner.surname);
      setOib(partner.oib);
      setType(partner.type);
      setEmail(partner.email);
      setStreet(partner.street);
      setHouseNumber(partner.houseNumber);
      setZip(partner.zip);
      setCity(partner.city);
      setCountry(partner.country);
      setTelephone(partner.telephone);
    }
    if (success) {
      history.push("/partners");
    }
  }, [dispatch, history, , partner, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePartner({
        _id: partner._id,
        name,
        surname,
        oib,
        type,
        email,
        street,
        houseNumber,
        zip,
        city,
        country,
        telephone,
      })
    );
  };

  return (
    <Row>
      <Col md={4}>
        <h2>Partner Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {/* {success && <Message variant="success">Profile Updated</Message>} */}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col lg={6} md={6} sm={12}>
              <Form.Group controlId="name">
                <Form.Label>Ime</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Group controlId="surname">
                <Form.Label>Prezime</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={surname}
                  onChange={(e) => setSurname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="oib">
            <Form.Label>OIB</Form.Label>
            <Form.Control
              type="number"
              placeholder={oib}
              onChange={(e) => setOib(e.target.value)}
              style={{ width: "15rem" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="type" className="mb-3">
            <Form.Label>Vrsta</Form.Label>
            <Form.Control
              as="select"
              type="name"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "15rem" }}
            >
              <option>Izaberite vrstu partnera</option>
              <option value="dobavljač">dobavljač</option>
              <option value="kupac">kupac</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "15rem" }}
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Col lg={6} md={6} sm={12}>
              <Form.Group controlId="street" className="mb-3">
                <Form.Label>Ulica</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={street}
                  onChange={(e) => setStreet(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Form.Group controlId="houseNumber" className="mb-3">
                <Form.Label>Kućni broj</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="zip" className="mb-3">
                <Form.Label>Poštanski broj</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={zip}
                  onChange={(e) => setZip(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="city" className="mb-3">
                <Form.Label>Grad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="country" className="mb-3">
                <Form.Label>Država</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="telephone" className="mb-3">
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              type="text"
              placeholder={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              style={{ width: "15rem" }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Izmijeni
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>Primke</h2>
        <Table striped bordered hover responsive className="table-sm"></Table>
      </Col>
    </Row>
  );
};
export default PartnerScreen;
