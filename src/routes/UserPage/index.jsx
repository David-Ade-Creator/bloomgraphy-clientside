import React from "react";
import { Avatar, Button, Col, Image, Input, Modal, Row } from "antd";
import data from "./data";
import { Tabs } from "antd";
import ListCard from "../../components/ListCard";

const { TabPane } = Tabs;

function UserPage() {
  const [isEditOpen, setEdit] = React.useState(false);
  const toggleEdit = () => {
    setEdit(!isEditOpen);
  };

  return (
    <div>
      <Row
        style={{ background: "white", minHeight: "30vh" }}
        className="gx-p-5"
      >
        <Modal
          title="Update your profile"
          visible={isEditOpen}
          onOk={toggleEdit}
          onCancel={toggleEdit}
          width="800px"
        >
          <Row justify="center">
            <Col lg={22}>
              <Row justify="center">
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
              </Row>
            </Col>
          </Row>
        </Modal>
        <Col lg={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Shots" key="1">
              <Row>
                {data.photoList.map((singledata) => {
                  return (
                    <ListCard singledata={singledata} toggleEdit={toggleEdit} />
                  );
                })}
              </Row>
            </TabPane>
            <TabPane tab="About" key="2">
              <Row className="gx-p-3" style={{ minHeight: "66.5vh" }}>
                <Col lg={14}>
                  <Row justify="center gx-mb-3">
                    <Col
                      lg={20}
                      md={20}
                      sm={20}
                      xs={20}
                      style={{ textAlign: "center" }}
                      className="gx-mb-4"
                    >
                      {/* <Avatar size={64}
      src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
    /> */}
                      <Avatar size={64}>D</Avatar>
                    </Col>
                    <Col
                      llg={20}
                      md={20}
                      sm={20}
                      xs={20}
                      style={{ textAlign: "center" }}
                      className="gx-mb-4"
                    >
                      Photographer Name
                    </Col>
                    <Col
                      lg={20}
                      md={20}
                      sm={20}
                      xs={20}
                      style={{ textAlign: "center" }}
                      className="gx-mb-3"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span style={{ textAlign: "center" }}>
                          64 Shots uploaded
                        </span>
                        <Button type="primary" onClick={toggleEdit}>
                          Edit Profile
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col lg={20}>
                      <h2>Bio</h2>
                      <p>
                        This is my bio This is my bio This is my bio This is my
                        bio This is my bio This is my bio This is my bio This is
                        my bio This is my bio This is my bio This is my bio This
                        is my bio
                      </p>
                    </Col>
                    <Col lg={20} md={20} sm={20}>
                      <h5>
                        Contact me : <strong>info@techme.com</strong>
                      </h5>
                    </Col>
                  </Row>
                </Col>
                <Col lg={10} className="gx-mt-3">
                  <Row justify="center">
                    <Col lg={20}>
                      <h2>Location</h2>
                      <p>yes</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default UserPage;
