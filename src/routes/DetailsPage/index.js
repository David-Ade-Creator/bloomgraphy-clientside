import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PostList from "components/wall/PostList";
import { postList, user } from "./data";
import "./style.less";

function DetailsPage() {
  const [images, setImages] = React.useState([
    "https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=331&q=80",
    "https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
  ]);
  const [singleImage, setSingleImage] = React.useState(0);
  const imagelength = images.length;

  const nextImage = () => {
    setSingleImage(singleImage === imagelength - 1 ? 0 : singleImage + 1);
  };
  const prevImage = () => {
    setSingleImage(singleImage === 0 ? imagelength - 1 : singleImage - 1);
  };

  const contentStyle = {
    height: "60vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div>
      <Row justify="center" className="gx-pt-4 gx-pb-4">
        <Col lg={15} md={24} sm={24} xs={24} style={{ minHeight: "79.7vh" }}>
          <Row className="gx-p-3" justify="space-between">
            <Col lg={12} md={24} sm={24} xs={24}>
              <span>
                <Link to="/username">
                  <h4>Photographer</h4>
                </Link>
                <p>
                  Freelancing photographer .{" "}
                  <span style={{ color: "red" }}>
                    <strong>Hire Me</strong>
                  </span>
                </p>
              </span>
            </Col>
            <Col lg={12} style={{ textAlign: "right" }}>
              <span>
                <Button>Save</Button>
                <Button>Like</Button>
              </span>
            </Col>
          </Row>
          <Row justify="center">
            <Col lg={24} md={24} sm={24} xs={24}>
              <Card style={{ position: "relative", width: "100%" }}>
                <Carousel effect="fade">
                  
                    {images.map(singleImage =>  (
                      <div>
                      <img
                      width="100%"
                      height="500px"
                      alt="example"
                      style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                      src={singleImage}
                    />
                    </div>
                    ))}
                  
                </Carousel>
              </Card>
            </Col>
          </Row>
          <Row justify="center" className="gx-p-3">
            <Col lg={24}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </Col>
          </Row>
        </Col>
        <Col
          lg={8}
          md={24}
          sm={24}
          xs={22}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="gx-p-2 feedback">
            <PostList postList={postList} user={user} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailsPage;
