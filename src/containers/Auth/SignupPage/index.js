import React from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import IntlMessages from "util/IntlMessages";
import "./style.less";
import FormItem from "antd/lib/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { userAuthUpdate } from "../../../appRedux/actions/Auth";

function Signup(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const authUser = useSelector(({ auth }) => auth.authUser);

  React.useEffect(() => {
    if (authUser !== null) {
      props.history.push("/");
    }
  }, [authUser]);

  const [signUpUser, { loading }] = useMutation(SIGNUP_USER, {
    update: (_, result) => {
      dispatch(userAuthUpdate(result.data.register.token));
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onFinish = (values) => signUpUser({ variables: values });

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
                  <Form
                    className="gx-signup-form gx-form-row0"
                    onFinish={onFinish}
                  >
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="gx-p-0 gx-pr-1"
                      >
                        <FormItem
                          name="firstName"
                          rules={[
                            { required: true, message: "First name required!" },
                          ]}
                        >
                          <Input placeholder="firstName" />
                        </FormItem>
                      </Col>

                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="gx-p-0 gx-pr-1"
                      >
                        <FormItem
                          name="lastName"
                          rules={[
                            { required: true, message: "Last name required!" },
                          ]}
                        >
                          <Input placeholder="lastName" />
                        </FormItem>
                      </Col>

                      <Col lg={24} md={24} sm={24} xs={24} className="gx-p-0">
                        <FormItem
                          name="username"
                          rules={[
                            { required: true, message: "Username required!" },
                          ]}
                        >
                          <Input placeholder="Username" />
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Email required!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </FormItem>
                    <FormItem
                      name="password"
                      rules={[
                        { required: true, message: "Password required!" },
                      ]}
                    >
                      <Input type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Confirm password required!",
                        },
                      ]}
                    >
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
                        loading={loading}
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
        <Col lg={8} className="authbanner">
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

const SIGNUP_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export default Signup;
