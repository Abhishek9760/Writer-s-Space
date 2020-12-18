import React from "react";
import { connect } from "react-redux";
import { fetchDiary } from "../../actions";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DiaryDelete from "./DiaryDelete";
import DiaryEdit from "./DiaryEdit";

const DiaryItem = (props) => {
  return (
    <Card onClick={() => props.fetchDiary(props.id)}>
      <Accordion.Toggle as={Card.Header} eventKey={props.id}>
        {props.title}
        <Badge variant="primary">{props.timestamp}</Badge>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.id}>
        <Card.Body>
          <div className="text">{props.text}</div>
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
