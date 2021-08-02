import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuItem = ({ title, image }) => {
  return (
    <Link to="/articles">
      <Card className="bg-dark text-dark text-uppercase menu-item">
        <Card.Img src={image} alt="picture" />
        <Card.ImgOverlay>
          <span
            className="d-flex justify-content-center"
            style={{
              position: "relative",
              top: "50%",
              fontSize: 48,
            }}
          >
            {title}
          </span>
        </Card.ImgOverlay>
      </Card>
    </Link>
  );
};

export default MenuItem;
