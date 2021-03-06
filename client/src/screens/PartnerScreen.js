import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getPartnerDetails, updatePartner } from "../actions/partnerActions";
import { listCentralReceipts } from "../actions/centralReceiptActions";
import { listSaleReceipts } from "../actions/saleReceiptActions";
import { PARTNER_UPDATE_RESET } from "../constants/partnerConstants";

const PartnerScreen = ({ history, match }) => {
  const dispatch = useDispatch();

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

  const partnerDetails = useSelector((state) => state.partnerDetails);
  const { loading, error, partner } = partnerDetails;

  const partnerUpdate = useSelector((state) => state.partnerUpdate);
  const { success } = partnerUpdate;

  const centralReceiptsList = useSelector((state) => state.centralReceiptList);
  const { receipts } = centralReceiptsList;

  const partnerReceipts = receipts.filter(
    (receipt) => receipt.partner._id === partner._id
  );

  const saleReceiptList = useSelector((state) => state.saleReceiptList);
  const { receipts: saleReceipts } = saleReceiptList;

  const partnerPurchases = saleReceipts.filter(
    (receipt) => receipt.partner._id === partner._id
  );

  useEffect(() => {
    if (!partner || !partner.name) {
      dispatch(getPartnerDetails(match.params.id));
      dispatch(listCentralReceipts());
      dispatch(listSaleReceipts());
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
      dispatch(getPartnerDetails(match.params.id));
      dispatch({ type: PARTNER_UPDATE_RESET });
      history.push("/partners");
    }
  }, [dispatch, match, history, partner, success]);

  useEffect(() => {
    dispatch(getPartnerDetails(match.params.id));
  }, [dispatch, match]);

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
    <>
      {partner && (
        <Helmet>
          <title>{`${partner.name} ${partner.surname}`}</title>
        </Helmet>
      )}

      <Row>
        <Col md={4}>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <h2>
            {partner.name} {partner.surname}
          </h2>
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="name">
                  <Form.Label>Ime</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="surname">
                  <Form.Label>Prezime</Form.Label>
                  <Form.Control
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="oib">
              <Form.Label>OIB</Form.Label>
              <Form.Control
                type="number"
                value={oib}
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
                <option value="dobavlja??">dobavlja??</option>
                <option value="kupac">kupac</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
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
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="houseNumber" className="mb-3">
                  <Form.Label>Ku??ni broj</Form.Label>
                  <Form.Control
                    type="number"
                    value={houseNumber}
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
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>Grad</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Dr??ava</Form.Label>
                  <Form.Control
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="telephone" className="mb-3">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="text"
                value={telephone}
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
          {partner.type === "dobavlja??" ? (
            <>
              <h2>Primke</h2>
              {partnerReceipts ? (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ZAKLJU??EN</th>
                      <th>BROJ DOKUMENTA</th>
                      <th>DOKUMENT</th>
                      <th>PODTIP DOKUMENTA</th>
                      <th>DATUM</th>
                      <th>VRIJEME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerReceipts.map((receipt) => (
                      <tr key={receipt._id}>
                        <td>
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </td>
                        <td>{receipt.documentNumber}</td>
                        <td>{receipt.documentType}</td>
                        <td>{receipt.documentSubtype}</td>
                        <td>{receipt.createdAt.substring(0, 10)}</td>
                        <td>{receipt.createdAt.substring(11, 19)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h2>Nema zaprimljene robe</h2>
              )}
            </>
          ) : (
            <>
              <h2>Narud??be</h2>
              {partnerPurchases ? (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ZAKLJU??EN</th>
                      <th>BROJ DOKUMENTA</th>
                      <th>DOKUMENT</th>
                      <th>PODTIP DOKUMENTA</th>
                      <th>DATUM</th>
                      <th>VRIJEME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerPurchases.map((receipt) => (
                      <tr key={receipt._id}>
                        <td>
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </td>
                        <td>{receipt.documentNumber}</td>
                        <td>{receipt.documentType}</td>
                        <td>{receipt.documentSubtype}</td>
                        <td>{receipt.createdAt.substring(0, 10)}</td>
                        <td>{receipt.createdAt.substring(11, 19)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h2>Nema zaprimljene robe</h2>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
export default PartnerScreen;
