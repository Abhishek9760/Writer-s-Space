import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class NotFound extends React.Component {
  render() {
    return (
      <Row>
        <Col sm={12} xs={12} xl={6} md={12} lg={6}>
          <Image src="error-404.svg" fluid></Image>
        </Col>
        <Col xs={12} sm={12} xl={6} md={12} lg={6}>
          <p
            class="display-4"
            style={{ fontWeight: "100", textAlign: "center", color: "#904a4a" }}
          >
            Not Found
          </p>
        </Col>
      </Row>
    );
  }
}

export default NotFound;
