import React from "react";
import { withCookies } from "react-cookie";
import DiaryList from "./DiaryList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveTokAndUsername } from "../../actions";
import DiaryCreateModalButton from "./DiaryCreateModalButton";

class DiaryHome extends React.Component {
  authtoken = this.props.cookies.get("authtoken");

  componentWillMount() {
    if (this.authtoken) {
      let [token, username] = this.authtoken.split("$");
      this.props.saveTokAndUsername(token, username);
    }
  }
  render() {
    return (
      <div>
        {this.authtoken ? (
          <div>
            <DiaryList />
            <DiaryCreateModalButton />
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default withCookies(connect(null, { saveTokAndUsername })(DiaryHome));
