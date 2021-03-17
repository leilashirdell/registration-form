import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Form, Image } from "react-bootstrap";
import { downloadFile, uploadFile } from './services/userService'
import { toastWarning, toastSuccess } from "./utils/toast";
import fileDownload from 'js-file-download';

const ManageFiles = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const [filename, setFileName] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async () => {
    setShow(true);
    console.log(props.user)
  };

  const isValidInput = () => {
    if (!props.user.text) {
      alert("User input Not Valid");
      return false;
    }
    return true
  };

  const handleDlownload = async (type) => {
    console.log(type.toString())
    let result = null
    let filename = ''
    let filetype = ''
    switch (type) {
      case "image":
        result = await downloadFile({ uid: props.user._id, type: "image" })
        filename = 'imagefile.jpg'
        filetype = 'image/jpeg'
        break
      case "audio":
        result = await downloadFile({ uid: props.user._id, type: "audio" })
        filename = 'audiofile.m4a'
        filetype = 'audio/mpeg'
        break
      case "document":
        result = await downloadFile({ uid: props.user._id, type: "document" })
        filename = 'document.pdf'
        filetype = 'application/pdf'
        break
    }
    console.log(result)
    if (result && result.status === 200) {
      toastSuccess("Download started")
      const blob = new Blob([result.data], { type: filetype })
      fileDownload(blob, filename);
    }

  }

  const handlefileUp = (e) => {
    console.log(e.target.files[0].type, e.target.files[0].size)
    if (!e.target.files[0]) return toastWarning("Nothing Uploaded");
    if (e.target.files[0].type != 'application/pdf') return toastWarning("Only pdf file Allowed");
    //console.log(e.target.files[0].type, e.target.files[0].size)
    setFileName(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!filename) return toastWarning("File Not Uploaded")
    const formdata = new FormData();
    formdata.append("uid", props.user._id)
    formdata.append("resfile", filename)
    const result = await uploadFile(formdata)
    if (result && result.status === 200) {
      toastSuccess("The file uploaded successfuly");
      handleClose()
    }
  };

  return (
    <React.Fragment>
      <a href="#" className="btn btn-danger" onClick={handleShow}>
        <i className="fa fa-lg fa-edit"></i>
      </a>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                User email:
                <Form.Control
                  type="text"
                  placeholder="Normal text"
                  defaultValue={props.user.email}
                  readOnly={true}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button onClick={(t) => handleDlownload("image")} variant="primary">Download Image File</Button><br /><br />
                <Button onClick={(t) => handleDlownload("audio")} variant="primary">Download Audio File</Button><br /><br />
                <Button onClick={(t) => handleDlownload("document")} variant="primary">Download Document File</Button><br />
              </Col>
            </Row>
            <br />
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
          <Form>
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Upload Excel file to user"
                onChange={handlefileUp} />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleUpload}>
            Upload File
          </Button>
        </Modal.Footer> */}
      </Modal>
    </React.Fragment>
  );
};

export default ManageFiles;
