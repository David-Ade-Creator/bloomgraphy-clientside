import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import "./style.less";

function Signin() {
  return (
    <div>
      <Row style={{ height: "100vh" }} align="middle">
        <Col
          lg={16}
          md={24}
          sm={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="gx-app-login-wrap" style={{ width: "800px" }}>
            <div className="gx-app-login-container">
              <div className="gx-app-login-main-content">
                <div className="gx-app-logo-content">
                  <div className="gx-app-logo-content-bg">
                    <img
                      src="https://miro.medium.com/max/8000/1*PUb4Hkk--uJWCmIsrgw7rg.jpeg"
                      alt="Neature"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="gx-app-logo">
                    <Link to="/">
                      <h4 style={{ color: "white" }}>Bloomgraphy</h4>
                    </Link>
                  </div>
                </div>
                <div className="gx-app-login-content">
                  <Form className="gx-signin-form gx-form-row0">
                    <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                      Signin to <strong>Bloomgraphy</strong>
                    </div>
                    <FormItem>
                      <Input placeholder="Email or Username" />
                    </FormItem>
                    <FormItem>
                      <Input type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                      <Checkbox>Remember me</Checkbox>
                    </FormItem>
                    <FormItem>
                      <Button
                        type="primary"
                        className="gx-mb-0"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        <IntlMessages id="app.userAuth.signIn" />
                      </Button>
                      <div style={{ marginTop: "10px" }}>
                        <Link to="/signup">Create New Account</Link>
                      </div>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          lg={8}
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/bannerHolder2.jpg')` }}
          className="authbanner"
        >
          <div>
            <h1>
              <Link to="/">Bloomgraphy</Link>
            </h1>
            <h3>Discover the world's top photographer</h3>
            <h3>Discover Photography</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Signin;
