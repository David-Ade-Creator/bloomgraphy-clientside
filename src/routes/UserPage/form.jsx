import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";

function UserForm(props) {
  const {
    isEditOpen,
    toggleEdit,
    userProfile,
    onFinish,
    submittingupdate,
  } = props;
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function getBase64(img, callback) {
    console.log(img);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info) => {
    console.log(info.file.originFileObj);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title="Update your profile"
      visible={isEditOpen}
      closable={false}
      onCancel={toggleEdit}
      footer={null}
      width="800px"
      destroyOnClose
    >
      <Form initialValues={userProfile} onFinish={onFinish}>
        <Row className="gx-p-3">
          <Col lg={24}>
            {/* <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload> */}
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gx-mb-2">
            <FormItem
              name="firstName"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="First Name" />
            </FormItem>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gx-mb-2">
            <FormItem
              name="lastName"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="Last name" />
            </FormItem>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <FormItem name="location">
              <Input placeholder="Location" />
            </FormItem>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <FormItem name="bio">
              <Input.TextArea placeholder="Biography" />
            </FormItem>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} className="gx-mb-2">
            <FormItem name="personalWebsite">
              <Input placeholder="Personal website" />
            </FormItem>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <FormItem name="portfolioUrl">
              <Input placeholder="Portfolio Url" />
            </FormItem>
          </Col>
          <Col>
            <Space>
              <Button onClick={toggleEdit} disabled={submittingupdate}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submittingupdate}
              >
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default UserForm;
