import React from "react";
import LoginForm from "./LoginForm";
import Spinner from "react-bootstrap/Spinner";
import { signIn } from "../../actions";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import history from "../../history";
import GoogleLoginButton from "./OAuth/GoogleLoginButton";
import FacebookLoginButton from "./OAuth/FacebookLoginButton";

import { showModal, hideModal } from "../../actions";

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  signIn: (formValues) => dispatch(signIn(formValues)),
});

class Login extends React.Component {
  onSubmit = (formValues) => {
    this.props.signIn(formValues);
  };

  componentDidMount() {
    document.getElementsByTagName("body")[0].classList.add("gradient");
    document.getElementsByTagName("body")[0].classList.remove("list");
    if (this.props.cookies.get("authtoken")) {
      history.push("/diary");
    }
  }
  closeModal = () => {
    this.props.hideModal();
  };

  componentWillUnmount() {
    let user = this.props.user;
    if (user) {
      let { username, token } = user;
      let tokenName = token + "$" + username;
      this.props.cookies.set("authtoken", tokenName);
    }
  }
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <h1 className="mb-5" style={{ fontWeight: "100" }}>
            Login
          </h1>
          <GoogleLoginButton />
          <FacebookLoginButton />

          <div className="line">
            <span className="line-right"></span>
            <span className="line-text">Or</span>
            <span className="line-left"></span>
          </div>

          <LoginForm
            onSubmit={this.onSubmit}
            btnText={
              this.props.loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Login"
              )
            }
            disabled={this.props.loading ? true : false}
          />
          <p className="my-2">
            Not a user?{" "}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data: { user }, loading: { signInLoading } }) => {
  return { user: user, loading: signInLoading };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Login));
// openAlertModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Invalid Credentials",
//       message: MESSAGE,
//       closeModal: this.closeModal,
//     },
//     "alert"
//   );
// };
// showInput = () => {
//   const { address } = this.state;
//   const message = address ? `Address: ${address}` : "No address entered";
//   this.props.showModal(
//     {
//       open: true,
//       title: "Prompt Modal",
//       message,
//       closeModal: this.closeModal,
//     },
//     "alert"
//   );
// };

// openConfirmModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Confirm Modal",
//       message: MESSAGE,
//       confirmAction: this.closeModal,
//       closeModal: this.closeModal,
//     },
//     "confirm"
//   );
// };

// openDeleteModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Delete Modal",
//       message: MESSAGE,
//       deleteAction: this.closeModal,
//       closeModal: this.closeModal,
//       deleteText: "delete",
//     },
//     "delete"
//   );
// };

// openPromptModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Prompt Modal",
//       fields: [
//         {
//           name: "address",
//           placeholder: "Enter your address",
//           showLabel: false,
//         },
//       ],
//       onInputChange: this.onInputChange,
//       confirmAction: this.showInput,
//     },
//     "prompt"
//   );
// };
