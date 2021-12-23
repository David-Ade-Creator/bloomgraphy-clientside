import { Col, Row, Button } from "antd";
import React from "react";
import ListCard from "components/ListCard";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress";

function PostTab({ userPosts, toggleEdit, updateCallAfterDelete }) {
  return (
    <>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24} className="gx-ml-1">
           {userPosts && <Link to="/upload">
              <Button type="primary">Upload</Button>
            </Link>}
        </Col>
      </Row>
      <Row style={{ minHeight: "66vh" }}>
        {userPosts?.length > 0 &&
          userPosts.map((singledata, i) => {
            return (
              <ListCard
                singledata={singledata}
                key={i}
                toggleEdit={toggleEdit}
                recallQuery={updateCallAfterDelete}
              />
            );
          })}
        {!userPosts && 
            <CircularProgress />
       }
      </Row>
    </>
  );
}

export default PostTab;
