import React, { useState } from "react";
import { Avatar, Button, Card, Divider, Input, Modal, Upload } from "antd";
import Icon from "@ant-design/icons";

const { TextArea } = Input;

const WriteBox = (props) => {
  const [commentText, setCommentText] = useState("");

  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    previewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleClickImage = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPost = () => {
    props.addPost(commentText, fileList);
    setCommentText("");
    setPreviewVisible(false);
    setPreviewImage("");
    setFileList([]);
    setIsOpen(false);
  };

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const isEnabled = fileList.length === 0 && commentText === "";
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Card className="gx-card">
      <div className="gx-media gx-mb-2">
        <Avatar className="gx-size-50 gx-mr-3" src={props.user.image} />
        <div className="gx-media-body">
          <TextArea
            className="gx-border-0"
            id="exampleTextarea"
            value={commentText}
            multiline="true"
            rows={4}
            onChange={(event) => onChange(event)}
            placeholder="Leave feedbacks"
            margin="none"
          />
        </div>
      </div>

      <Divider />

      <div className="ant-row-flex">
        <Button
          type="primary"
          size="small"
          className="gx-ml-auto gx-mb-0"
          disabled={isEnabled ? "disabled" : ""}
          onClick={handleAddPost}
        >
          SEND
        </Button>
      </div>
    </Card>
  );
};

export default WriteBox;
