import React from "react";
import { Container, Navbar, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Navbar bg="dark" variant="dark" className="text-white">
        <Container>
          <Col className="text-center py-3">Luka Luketin &copy; 2020/2021</Col>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
