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
import { useMutation } from "@apollo/client";
import { GET_USER_PROFILE } from "../../graphql/queries";
import { GET_SIGNED_URL } from "../../graphql/mutations";

function UserForm(props) {
  const {
    isEditOpen,
    toggleEdit,
    userProfile,
    onFinish,
    submittingupdate,
  } = props;
  const [imageUrl, setImageUrl] = React.useState(userProfile?.photo);
  const [loading, setLoading] = React.useState(false);

  const [form] = Form.useForm();

  const [addPhoto] = useMutation(GET_SIGNED_URL, {
    update: (_, data) => {
      setImageUrl(data.data.signS3?.url);
      form.setFieldsValue({ photo: data.data.signS3?.url });
    },
    refetchQueries: [
      {
        query: GET_USER_PROFILE,
      },
    ],
  });

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error("Image must smaller than 3MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") return setLoading(true);
    if (info.file.status === "done") {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUpload = async ({ file }) => {
    await getBase64(file, (dataUrl) => {
      addPhoto({ variables: { filename: file.name, filetype: file.type } });
    });
    form.setFieldsValue({ photo: imageUrl });
  };
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
          <Col lg={24}>
            <FormItem name="photo">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={handleUpload}
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </FormItem>
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
