import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuItem = ({ title, image, link }) => {
  return (
    <Col lg={4} md={6}>
      <Link to={link}>
        <Card
          className="bg-dark shadow-lg rounded text-white text-uppercase menu-item my-2"
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
      </Link>
    </Col>
  );
};

export default MenuItem;
