import { Button, Col, Modal, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import HeroComponent from "../../components/Hero";
import ListCard from "../../components/ListCard";
import data from "./data";
import "./style.less";

const HomePage = () => {
  const [isFilterVisible, setFilterVisible] = React.useState(false);

  const toggleFilters = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="homepage">
      <HeroComponent
        children={
          <div className="hero-child">
            <Row>
              <Col lg={12} md={12} sm={24} xs={24}>
                <h1>
                  <strong>Bloomgraphy</strong>
                </h1>
                <h1 style={{ color: "orange" }}>
                  <strong>Discover the world's top photographers</strong>
                </h1>
                <p>
                  Bloomgraphy is the leading destination to find & showcase
                  creative work and home to the world's best design
                  professionals.
                </p>
                <span>
                  <Link to="/signup">
                    <Button type="primary">Sign up</Button>
                  </Link>
                </span>
              </Col>
            </Row>
          </div>
        }
      />
      <Row className="gx-p-4" justify="start" style={{ background: "white" }}>
        <Col lg={24} className="webfilters">
          <Button>All</Button>
          <Button>Portraits</Button>
          <Button>Photojournalism</Button>
          <Button>Fashion</Button>
          <Button>Sports</Button>
          <Button>Still Life</Button>
          <Button>Editorial</Button>
          <Button>Architectural</Button>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} className="mobilefilter">
          <Button onClick={toggleFilters}>Filters</Button>
          <Modal
            title="Bloomgraphy filters"
            visible={isFilterVisible}
            onOk={toggleFilters}
            onCancel={toggleFilters}
            footer={null}
          >
            <Row>
            <Col lg={24} >
          <Button>All</Button>
          <Button>Portraits</Button>
          <Button>Photojournalism</Button>
          <Button>Fashion</Button>
          <Button>Sports</Button>
          <Button>Still Life</Button>
          <Button>Editorial</Button>
          <Button>Architectural</Button>
        </Col>
            </Row>
          </Modal>
        </Col>
        {data.photoList.map((singledata) => {
          return (
            <ListCard isHomePage singledata={singledata} key={singledata.id} />
          );
        })}
      </Row>
    </div>
  );
};

export default HomePage;
