import React from "react";
import { connect } from "react-redux";
import { fetchDiary } from "../../actions";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DiaryDelete from "./DiaryDelete";
import DiaryEdit from "./DiaryEdit";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DiaryItem = (props) => {
  return (
    <Card onClick={() => props.fetchDiary(props.id)}>
      <Accordion.Toggle as={Card.Header} eventKey={props.id}>
        {props.title}
        <Badge variant="primary">{props.timestamp}</Badge>
      </Accordion.Toggle>
      <Accordion.Collapse
        eventKey={props.id}
        style={{ backgroundColor: "rgba(78, 92, 120, 0.82)", color: "#fff" }}
      >
        <Card.Body>
          {props.image ? (
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Image src={props.image} thumbnail></Image>
              </Col>
            </Row>
          ) : null}
          <div className="text my-2">{props.text}</div>
          <ButtonGroup size="sm" className="float-right mb-3">
            <DiaryDelete id={props.id} />
            <DiaryEdit id={props.id} />
          </ButtonGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { currentDiary: state.diaries.currentDiary };
};

export default connect(mapStateToProps, { fetchDiary })(DiaryItem);
