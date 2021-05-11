import { Col, Row } from "antd";
import React from "react";
import "./style.less";

function HeroComponent({ children, backgroundphoto }) {
  return (
    <Row>
      <Col lg={24} className="hero">
        {children}
      </Col>
    </Row>
  );
}

export default HeroComponent;
