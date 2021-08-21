import React from "react";
import { Container, Row } from "react-bootstrap";
import MenuItem from "../components/MenuItem";
import artikli from "../../src/artikli.jpg";
import central from "../../src/central.jpg";
import partners from "../../src/staff.png";
import manufacture from "../../src/manufacture.jpg";
const MenuScreen = () => {
  return (
    <Container>
      <Row>
        <MenuItem title="artikli" image={artikli} link="/articles" />
        <MenuItem title="veleprodaja" image={central} link="/central" />
        <MenuItem title="proizvodnja" image={manufacture} link="/manufacture" />
        <MenuItem title="partneri" image={partners} link="/partners" />
      </Row>
    </Container>
  );
};

export default MenuScreen;
