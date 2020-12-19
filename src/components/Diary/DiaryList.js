import React from "react";
import { connect } from "react-redux";
import { fetchDiarys } from "../../actions";
import Pagination from "./Pagination";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import DiaryCreate from "./DiaryCreate";

import DiaryItem from "./DiaryItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class DiaryList extends React.Component {
  componentWillMount() {
    document.getElementsByTagName("body")[0].classList.remove("gradient");
    document.getElementsByTagName("body")[0].classList.add("list");
    this.props.fetchDiarys();
  }

  renderDiaryList = () => {
    let { diaries } = this.props;
    if (diaries.count > 0) {
      return diaries.results.map((diary) => {
        return (
          <DiaryItem
            id={diary.id}
            title={diary.title}
            text={diary.text}
            timestamp={diary.timestamp}
            key={diary.id}
          />
        );
      });
    } else if (this.props.searched) {
      return (
        <div class="alert alert-secondary" role="alert">
          404 Not Found
        </div>
      );
    } else if (diaries.count === 0) {
      return (
        <p>
          No diaries till now.
          <br />
          Make one today <DiaryCreate />
        </p>
      );
    } else {
      return <Spinner animation="border" />;
    }
  };
  render() {
    return (
      <Row>
        <Col>
          <Accordion>{this.renderDiaryList()}</Accordion>
          {/* {this.props.count > 10 ? <Pagination show={} /> : null} */}
          <Pagination show={this.props.count > 10 ? true : false} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ diaries }) => {
  return { diaries: diaries, count: diaries.count, searched: diaries.searched };
};

export default connect(mapStateToProps, { fetchDiarys })(DiaryList);
