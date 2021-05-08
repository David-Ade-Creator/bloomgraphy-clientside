import { Button, Col, Input, Row } from "antd";
import React from "react";

function EditProfile() {
  return (
    <Row justify="center">
      <Col lg={12}>
        <Row className="gx-p-5" justify="center">
          <Col lg={12} md={12} sm={24} xs={24} className="gx-mb-2">
            <p>Name *</p>
            <Input />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gx-mb-2">
            <p>Username *</p>
            <Input />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <p>Location</p>
            <Input />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <p>Bio </p>
            <Input.TextArea />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <p>Personal Website</p>
            <Input />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <p>Porfolio Url</p>
            <Input />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <Button type="primary">Update</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default EditProfile;
