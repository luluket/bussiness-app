import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MenuItem from "../components/MenuItem";
import artikli from "../../src/artikli.jpg";
const MenuScreen = () => {
  return (
    <Container>
      <Row className="d-flex">
        <Col lg={4} md={6}>
          <MenuItem title="artikli" image={artikli} />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuScreen;
