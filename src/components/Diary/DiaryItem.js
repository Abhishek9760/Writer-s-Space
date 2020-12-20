import React from "react";
import { connect } from "react-redux";
import { fetchDiary } from "../../actions";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DiaryDelete from "./DiaryDelete";
import DiaryEdit from "./DiaryEdit";
import Figure from "react-bootstrap/Figure";
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
          <Row>
            {props.image ? (
              <Col xs={12} sm={6} md={6} lg={6}>
                <a href={props.image} target="_blank">
                  <Figure.Image
                    className="image"
                    src={props.image}
                    thumbnail
                  ></Figure.Image>
                </a>
              </Col>
            ) : null}
            <Col md={6}>
              <div className="text my-2">{props.text}</div>
            </Col>
          </Row>

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
