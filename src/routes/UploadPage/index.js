/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import ImgCrop from "antd-img-crop";
import { Row, Col, Form, Input, Select, Button, message, Upload } from "antd";
import { useHistory, useLocation } from "react-router";
import CircularProgress from "components/CircularProgress";
import { CREATE_POST } from "../../graphql/mutations";
import { useSelector } from "react-redux";

const { Option } = Select;

function UploadPage(props) {
  const history = useHistory();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [fileList, setFileList] = React.useState([]);
  const [isEditing, setEditing] = React.useState(false);

  const authUser = useSelector(({ auth }) => auth.authUser);

  React.useEffect(() => {
    if (authUser == null) {
      props.history.push("/signin");
    }
  }, [authUser]);

  React.useEffect(() => {
    currentUrl.includes("editpost") ? setEditing(true) : setEditing(false);
  }, [currentUrl, isEditing]);

  const [addPost, { loading: addPostLoading }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      message.success("New Post added");
      history.push("/home");
    },
  });

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onChange = ({ file, fileList:newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (values) => {
    let images = [];
    fileList.forEach(file =>{
      images = [...images, file.response];
    })
    addPost({ variables: { ...values, images } });
  }

  return !authUser.username ? (
    <CircularProgress />
  ) : (
    <Row className="gx-p-5 gx-mt-5" justify="center">
      <Col lg={13} md={14} sm={24} xs={24}>
        <ImgCrop rotate>
          <Upload
            action="https://queaserver.herokuapp.com/api/q3/upload/s3"
            listType="picture-card"
            // showUploadList={false}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
          {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </Col>
      <Col lg={13} md={14} sm={24} xs={24}>
        <Form className="gx-mt-4" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Add a title" />
          </Form.Item>

          <Form.Item
            label="Photograph Type"
            name="type"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select type">
              <Option value="portraits">Portraits</Option>
              <Option value="photojournalism">Photojournalism</Option>
              <Option value="fashion">Fashion</Option>
              <Option value="sport">Sport</Option>
              <Option value="still-life">Still Life</Option>
              <Option value="editorial">Editorial</Option>
              <Option value="architectural">Architectural</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="body"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.TextArea
              placeholder="Want to tell us any unique details about this photograph ?"
              rows="6"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
              loading={addPostLoading}
            >
              {isEditing && !addPostLoading
                ? "Update Post"
                : "Publish to Bloom"}
              {addPostLoading && "Posting..."}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default UploadPage;