import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MenuItem from "../components/MenuItem";
import artikli from "../../src/artikli.jpg";
import central from "../../src/central.jpg";
import partners from "../../src/staff.png";
import normativ from "../../src/normativ.jpg";
import radninalog from "../../src/radninalog.png";
import material from "../../src/skladistematerijala.jpg";
import products from "../../src/skladisteproizvoda.jpg";
import materialcost from "../../src/utrosakmaterijala.jpg";
import materialrequired from "../../src/trebovanje.jpg";
const MenuScreen = () => {
  return (
    <Container>
      <Row className="d-flex">
        <MenuItem title="artikli" image={artikli} link="/articles" />
        <MenuItem title="normativi" image={normativ} link="/normativs" />
        <MenuItem title="radni nalozi" image={radninalog} link="/workorders" />
        <MenuItem title="centralno skladište" image={central} link="/central" />
        <MenuItem
          title="skladište materijala"
          image={material}
          link="/material"
        />
        <MenuItem
          title="skladište gotovih proizvoda"
          image={products}
          link="/builtproducts"
        />
        <MenuItem title="partneri" image={partners} link="/partners" />
        <MenuItem
          title="utrošak materijala"
          image={materialcost}
          link="/materialcost"
        />
        <MenuItem
          title="trebovanje"
          image={materialrequired}
          link="/materialrequired"
        />
      </Row>
    </Container>
  );
};

export default MenuScreen;
