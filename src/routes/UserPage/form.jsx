import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
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
  const [photo, setPhotoUrl] = React.useState(userProfile?.photo);
  const [loading, setLoading] = React.useState(false);

  const [form] = Form.useForm();

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

 

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setPhotoUrl(info.file?.response),
        setLoading(false),
        form.setFieldsValue({ photo: info.file?.response })
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const update = () => {
    onFinish(form.getFieldsValue());
  };

  return (
    <Modal
      title="Update your profile"
      visible={isEditOpen}
      closable={false}
      onCancel={toggleEdit}
      footer={null}
      width="800px"
      destroyOnClose={true}
    >
      <Form initialValues={userProfile} form={form} onFinish={update}>
        <Row className="gx-p-3">
          <Col lg={24} md={24} sm={24} xs={24}>
            <FormItem name="photo">
            <ImgCrop rotate>
            <Upload
            action="https://queaserver.herokuapp.com/api/q3/upload/s3"
            listType="picture-card"
            showUploadList={false}
            onChange={onChange}
            onPreview={onPreview}
          >
          {photo ? (
                  <img src={photo} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
          </Upload>
          </ImgCrop>
            </FormItem>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24} className="gx-mb-2">
            <FormItem
              name="firstName"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="First Name" />
            </FormItem>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24} className="gx-mb-2">
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
