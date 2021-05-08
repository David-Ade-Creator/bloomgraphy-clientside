import React from "react";
import { Avatar, Button, Col, Image } from "antd";
import { Link, useHistory } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";

function ListCard({ singledata, isHomePage }) {

  const history = useHistory();

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure you want to delete ?',
      // icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const gotoUploadPage = (id) => {
    history.push(`/editPost/${id}`)
  }

  return (
    <Col
      lg={6}
      md={12}
      sm={24}
      xs={24}
      style={{ cursor: "pointer", position: "relative" }}
      key={singledata.id}
      className="gx-pb-2"
    >
      <Link to={`/shot/${singledata.id}`}>
        <div style={{ position: "relative" }}>
          <img
            src={singledata.images[0]}
            alt="yes"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </Link>
      {!isHomePage &&(<div
          className="gx-p-1"
          style={{ display: "flex", justifyContent: "space-between" }}
        ><Link to={`/editpost/:${singledata.id}`}>
          <Button type="dashed">
            Edit
          </Button>
          </Link>
          <Button type="danger" onClick={showDeleteConfirm}>
            Delete
          </Button>
        </div>)}
      {isHomePage && (
        <div
          className="gx-p-1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/username">
            <span style={{ display: "flex" }}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <p className="align-item-center gx-pt-2">
                <span className="gx-mt-5">
                  <strong>{singledata.username}</strong>
                </span>
              </p>
            </span>
          </Link>
          <Link to={`/shot/${singledata.id}`}>
            <span className="gx-mt-2">Like {singledata.likeCount}</span>
          </Link>
        </div>
      )}
    </Col>
  );
}

export default ListCard;
