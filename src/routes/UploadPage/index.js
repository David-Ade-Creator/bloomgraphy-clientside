import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import { Row, Col, Form, Input, Select, Button, message, Upload } from "antd";
import { useHistory, useLocation } from "react-router";
import CircularProgress from "components/CircularProgress";
import { CREATE_POST, GET_SIGNED_URL } from "../../graphql/mutations";
import { useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Dragger } = Upload;

function UploadPage(props) {
  const history = useHistory();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [images, setImages] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [isEditing, setEditing] = React.useState(false);

  const authUser = useSelector(({ auth }) => auth.authUser);

  React.useEffect(() => {
    if (authUser == null) {
      props.history.push("/signin");
    }
  }, [authUser]);

  const [addPhoto] = useMutation(GET_SIGNED_URL, {
    update: (_, data) => {
      console.log(data.data.signS3?.url);
      setImages([...images, data.data.signS3?.url]);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      if (acceptedFiles.length > 1) {
        message.warn("cannot upload more than One photo");
      } else {
        setUploading(true);
        acceptedFiles.forEach((file) => {
          console.log(file.type)
          addPhoto({ variables: { filename: file.name, filetype: file.type } });
        });
        setUploading(false);
      }

      // Do something with the files
    },
    [addPhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  React.useEffect(() => {
    currentUrl.includes("editpost") ? setEditing(true) : setEditing(false);
  }, [currentUrl, isEditing]);

  const removeImage = (index) => {
    const newImages = images.filter((image, i) => i !== index);
    setImages(newImages);
  };

  const [addPost, { loading: addPostLoading }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      message.success("New Post added");
      history.push("/home");
    },
  });

  const onFinish = (values) => addPost({ variables: { ...values, images } });

  return !authUser.username ? (
    <CircularProgress />
  ) : (
    <Row className="gx-p-5 gx-mt-5" justify="center">
      <Col lg={10} md={10} sm={24} xs={24}>
        <div
          style={{
            width: "100%",
            border: "1px dashed",
            height: "60vh",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: "14px",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div style={{ textAlign: "center" }}>
              <InboxOutlined style={{ fontSize: "40px" }} />

              <h2>
                Drag and drop an image Or click to browse to choose a file
              </h2>
            </div>
          )}
        </div>
        <div
          className="gx-mt-3"
          style={{ display: "flex", justifyContent: "start", flexWrap: "wrap" }}
        >
          {images.map((image, i) => (
            <span className="gx-mr-2" style={{ position: "relative" }} key={i}>
              <span style={{ position: "absolute", bottom: "0", left: "0" }}>
                <Button type="danger" onClick={() => removeImage(i)}>
                  X
                </Button>
              </span>
              <img
                src={image}
                alt="images"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </span>
          ))}
        </div>
      </Col>
      <Col lg={8} md={8} sm={24} xs={24}>
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
