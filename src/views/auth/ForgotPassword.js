import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alert from "../../components/Alert";
import { forgetPassword } from "../../actions/auth";

const ForgotPassword = ({ forgetPassword }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    forgetPassword({ email })
      .then(() => {
        setSent(true);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const renderEmail = () => {
    if (loading)
      return (
        <div className="text-center" style={{ width: "100%" }}>
          Loading...
        </div>
      );
    return (
      <form method="post" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="login-label">We'll send a recovery link to</label>
          <input className="form-control" type="email" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter your email address" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Send Recovery Link
        </button>
      </form>
    );
  };

  const renderSent = () => {
    return (
      <div>
        <div className="login-label" style={{ color: "#717986" }}>
          We sent a recovery link to you at:
        </div>
        <div className="login-label" style={{ fontWeight: 500 }}>
          {email}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-90 px-3" style={{ height: "100vh" }}>
      <div className="login-card">
        <div className="login-header">
          <img src="/assets/images/logo-text.png" alt="Header" />
        </div>
        <div className="d-flex justify-content-between w-100 mb-2">
          <div className="login-title">Can't log in?</div>
        </div>
        <div className="w-100">
          <Alert />
          {sent ? renderSent() : renderEmail()}
          <Link to="/login" className="text-center forget-password mt-2">
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  forgetPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgetPassword })(ForgotPassword);
