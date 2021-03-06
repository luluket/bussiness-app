import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPartner } from "../actions/partnerActions";
import { useHistory } from "react-router-dom";
import { PARTNER_CREATE_RESET } from "../constants/partnerConstants";

const PartnerCreateScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oib, setOib] = useState(0);
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState(0);
  const [telephone, setTelephone] = useState(0);
  const [country, setCountry] = useState("");

  const partnerCreate = useSelector((state) => state.partnerCreate);
  const { success } = partnerCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPartner({
        name,
        surname,
        oib,
        type,
        email,
        street,
        houseNumber,
        city,
        zip,
        telephone,
        country,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: PARTNER_CREATE_RESET });
      history.push("/partners");
    }
  }, [dispatch, history, success]);

  return (
    <>
      <Helmet>
        <title>Novi partner</title>
      </Helmet>
      <h1>NOVI PARTNER</h1>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="name">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="name"
                placeholder="Unesite ime partnera"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="surname">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="name"
                placeholder="Unesite prezime partnera"
                onChange={(e) => setSurname(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="oib">
              <Form.Label>OIB</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite oib partnera"
                onChange={(e) => setOib(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Vrsta</Form.Label>
          <Form.Control
            as="select"
            type="name"
            onChange={(e) => setType(e.target.value)}
            style={{ width: "15rem" }}
          >
            <option>Izaberite vrstu partnera</option>
            <option value="dobavlja??">dobavlja??</option>
            <option value="kupac">kupac</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Unesite email partnera"
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
                placeholder="Unesite ulicu partnera"
                onChange={(e) => setStreet(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Form.Group controlId="houseNumber" className="mb-3">
              <Form.Label>Ku??ni broj</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite ku??ni broj partnera"
                onChange={(e) => setHouseNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="zip" className="mb-3">
              <Form.Label>Po??tanski broj</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite po??tanski broj partnera"
                onChange={(e) => setZip(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>Grad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite grad partnera"
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Form.Group controlId="country" className="mb-3">
              <Form.Label>Dr??ava</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite dr??avu partnera"
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="telephone" className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite telefon partnera"
            onChange={(e) => setTelephone(e.target.value)}
            style={{ width: "15rem" }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Unesi</Button>
      </Form>
    </>
  );
};

export default PartnerCreateScreen;
