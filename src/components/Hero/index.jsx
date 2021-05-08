import { Col, Row } from "antd";
import React from "react";
import "./style.less";

function HeroComponent({ children, backgroundphoto }) {
  console.log(backgroundphoto)
  return (
    <Row>
      <Col lg={24} className="hero" style={{backgroundImage:`url(${backgroundphoto})`}}>
        {children}
      </Col>
    </Row>
  );
}

export default HeroComponent;
