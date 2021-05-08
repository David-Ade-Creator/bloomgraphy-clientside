import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import "./style.less";
import FormItem from "antd/lib/form/FormItem";

function Signup() {
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
                  <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                    Signup to <strong>Bloomgraphy</strong>
                  </div>
                  <Form className="gx-signup-form gx-form-row0">
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="gx-p-0 gx-pr-1"
                      >
                        <FormItem>
                          <Input placeholder="Name" />
                        </FormItem>
                      </Col>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="gx-p-0 gx-pl-1"
                      >
                        <FormItem>
                          <Input placeholder="Username" />
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem>
                      <Input placeholder="Email" />
                    </FormItem>
                    <FormItem>
                      <Input type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                      <Input type="password" placeholder="Confirm Password" />
                    </FormItem>
                    <FormItem>
                      <Checkbox>
                        <IntlMessages id="appModule.iAccept" />
                      </Checkbox>
                      <span className="gx-link gx-signup-form-forgot">
                        <IntlMessages id="appModule.termAndCondition" />
                      </span>
                    </FormItem>

                    <FormItem>
                      <Button
                        type="primary"
                        className="gx-mb-0"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        <IntlMessages id="app.userAuth.signUp" />
                      </Button>
                    </FormItem>
                    <div style={{ marginTop: "10px" }}>
                      <span>Already have an account ? </span>
                      <Link to="/signin">
                        <IntlMessages id="app.userAuth.signIn" />
                      </Link>
                    </div>
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

export default Signup;
