import React from "react";
import { connect } from "react-redux";
import { fetchDiarys } from "../../actions";
import Pagination from "./Pagination";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import DiaryCreate from "./DiaryCreate";
import DiarySearch from "./DiarySearch";

import DiaryItem from "./DiaryItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class DiaryList extends React.Component {
  componentDidMount() {
    document.getElementsByTagName("body")[0].classList.remove("gradient");
    document.getElementsByTagName("body")[0].classList.add("list");
    this.props.fetchDiarys();
  }

  renderDiaryList = () => {
    let { count, results } = this.props;
    if (count > 0) {
      return results.map((diary) => {
        return (
          <DiaryItem
            id={diary.id}
            title={diary.title}
            text={diary.text}
            timestamp={diary.timestamp}
            image={diary.image}
            key={diary.id}
          />
        );
      });
    } else if (this.props.searched) {
      return (
        <div className="alert alert-secondary" role="alert">
          404 Not Found
        </div>
      );
    } else if (count === 0) {
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
          {this.props.count > 0 || this.props.searched ? <DiarySearch /> : null}
          <Accordion>{this.renderDiaryList()}</Accordion>
          <Pagination show={this.props.count > 10 ? true : false} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ diaries: { count, results, searched } }) => {
  return { results: results, count: count, searched: searched };
};

export default connect(mapStateToProps, { fetchDiarys })(DiaryList);
