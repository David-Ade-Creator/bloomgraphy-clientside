import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Row, Col, Form, Input, Select, Button } from "antd";

const { Option } = Select;

function UploadPage() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Row className="gx-p-4" justify="center">
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
              <h1>
                <strong>Upload files</strong>
              </h1>
              <h2>
                Drag and drop an image Or click to browse to choose a file
              </h2>
            </div>
          )}
        </div>
      </Col>
      <Col lg={8} md={8} sm={24} xs={24}>
        <Form className="gx-mt-4">
          <Form.Item>
            <h3>Title</h3>
            <Input placeholder="Add a title" />
          </Form.Item>

          <Form.Item>
            <h3>Photograph type</h3>
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

          <Form.Item>
              <h3>Description ? (optional)</h3>
          <Input.TextArea placeholder="Want to tell us any unique details about this photograph ?" rows="6"/>
          </Form.Item>

          <Form.Item>
           <Button type="primary" style={{width:"100%"}}>Publish to Bloom</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default UploadPage;
