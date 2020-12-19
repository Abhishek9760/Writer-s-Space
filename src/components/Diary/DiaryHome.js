import React from "react";
import { withCookies } from "react-cookie";
import DiaryList from "./DiaryList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveTokAndUsername } from "../../actions";
import DiarySearch from "./DiarySearch";

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
            <DiarySearch />
            <DiaryList />
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default withCookies(connect(null, { saveTokAndUsername })(DiaryHome));
