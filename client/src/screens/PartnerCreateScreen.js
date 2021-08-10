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
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: PARTNER_CREATE_RESET });
      history.push("/partners");
    }
  }, [success]);

  return (
    <FormContainer>
      <h1>NOVI PARTNER</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Ime partnera</Form.Label>
          <Form.Control
            type="name"
            placeholder="Unesite ime partnera"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="surname" className="mb-3">
          <Form.Label>Prezime partnera</Form.Label>
          <Form.Control
            type="name"
            placeholder="Unesite prezime partnera"
            onChange={(e) => setSurname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="oib" className="mb-3">
          <Form.Label>Unesite OIB partnera</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite oib partnera"
            onChange={(e) => setOib(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Vrsta partnera</Form.Label>
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

        <Form.Group controlId="pdv" className="mb-3">
          <Form.Label>Email partnera</Form.Label>
          <Form.Control
            type="email"
            placeholder="Unesite email partnera"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Unesi</Button>
      </Form>
    </FormContainer>
  );
};

export default PartnerCreateScreen;
