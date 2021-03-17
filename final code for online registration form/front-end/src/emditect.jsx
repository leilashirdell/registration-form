import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap";
import { emotionDetection, editUser } from './services/userService'
import { toastWarning, toastSuccess } from "./utils/toast";
const EmDetect = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async () => {
    setShow(true);
  };

  const isValidInput = () => {
    if (!props.user.text) {
      alert("User input Not Valid");
      return false;
    }
    return true
  };

  const handleEmotion = async () => {
    if (isValidInput()) {
      const formdata = new FormData();
      formdata.append("text", props.user.text);
      formdata.append("api_key", "Tn2wNDAvpAhF7Bhaj6ThftvMv1WwT85E73lVc7rEtdY");
      const result = await emotionDetection(formdata);

      if (result && result.status === 200) {
        if (result.data.code === 400) {
          return alert("VPN connection is needed to call api");
        }
        setData(result.data);
        //console.log(result.data);
      }
    }
  };

  const handleSubmit = async () => {
    if (!data.emotion) return toastWarning("Emotion Not Detected from text")
    const result = await editUser({ uid: props.user._id, payload: data.emotion })
    if (result && result.status === 200) {
      toastSuccess("The Emotion Saved For User");
      handleClose()
    }
  };

  return (
    <React.Fragment>
      <a href="#" className="btn btn-primary" onClick={handleShow}>
        <i className="fa fa-lg fa-edit"></i>
      </a>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Emotion Detection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                User Input Text:
                <Form.Control
                  type="text"
                  placeholder="Normal text"
                  defaultValue={props.user.text}
                  readOnly={true}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button variant="primary" onClick={handleEmotion}>
                  Detect Emotion
                </Button>

              </Col>
            </Row>
            <br />
            {
              data.emotion ? <Row>
                <Col>
                  Happy: {data.emotion.Happy}
                  <br />
               Fear: {data.emotion.Fear}
                  <br />
               Bored: {data.emotion.Bored}
                  <br />
               Angry: {data.emotion.Angry}
                  <br />
               Excited: {data.emotion.Excited}
                  <br />
               Sad: {data.emotion.Sad}
                </Col>
              </Row> : ""
            }
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EmDetect;
