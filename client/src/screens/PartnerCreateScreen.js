import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPartner } from "../actions/partnerActions";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
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
  const { loading, success, partner } = partnerCreate;

  console.log(partner);

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

  // useEffect(() => {
  //   if (success) {
  //     dispatch({ type: PARTNER_CREATE_RESET });
  //     history.push("/partners");
  //   }
  // }, [success]);

  return (
    <FormContainer>
      <h1>NOVI PARTNER</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="name"
            placeholder="Unesite ime partnera"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="surname" className="mb-3">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="name"
            placeholder="Unesite prezime partnera"
            onChange={(e) => setSurname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="oib" className="mb-3">
          <Form.Label>OIB</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite oib partnera"
            onChange={(e) => setOib(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Vrsta</Form.Label>
          <Form.Control
            as="select"
            type="name"
            onChange={(e) => setType(e.target.value)}
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
            placeholder="Unesite email partnera"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="street" className="mb-3">
          <Form.Label>Ulica</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite ulicu partnera"
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="houseNumber" className="mb-3">
          <Form.Label>Kućni broj</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite kućni broj partnera"
            onChange={(e) => setHouseNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="mb-3">
          <Form.Label>Grad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite grad partnera"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="zip" className="mb-3">
          <Form.Label>Poštanski broj</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite poštanski broj partnera"
            onChange={(e) => setZip(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="telephone" className="mb-3">
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite telefon partnera"
            onChange={(e) => setTelephone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Država</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite državu partnera"
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Unesi</Button>
      </Form>
    </FormContainer>
  );
};

export default PartnerCreateScreen;
