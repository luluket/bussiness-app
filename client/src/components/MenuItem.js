import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuItem = ({ title, image, link }) => {
  return (
    <Link to={link} className="text-decoration-none">
      <Row className="shadow-lg p-0 m-2 menu-item">
        <Col md={5} className="p-0">
          <Card
            className="bg-dark shadow-lg rounded text-white text-uppercase"
            style={{ position: "relative", paddingBottom: "56.2%" }}
          >
            <Card.Img
              src={image}
              alt="picture"
              style={{
                opacity: "0.5",
                position: "absolute",
                objectFit: "cover",
                widht: "100%",
                height: "100%",
              }}
            />
            <Card.ImgOverlay className="d-flex flex-column justify-content-center">
              <Card.Title
                className="text-center"
                style={{
                  fontSize: 36,
                }}
              >
                {title}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col md={7} className="text-center">
          <h1>{title}</h1>
        </Col>
      </Row>
    </Link>
  );
};

export default MenuItem;
