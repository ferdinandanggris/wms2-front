import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Alert from "../../components/Alert";
import { recoveryPassword } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const RecoveryPassword = ({ setAlert, recoveryPassword }) => {
  let { code } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });

  const { password, confirm } = formData;
  const [succeed, setSucceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setAlert("Invalid Password", "danger");
      return;
    }

    setLoading(true);
    recoveryPassword({ body: { code, password } })
      .then(() => {
        setSucceed(true);
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
          <input className="form-control" type="password" name="password" value={password} onChange={(e) => onChange(e)} placeholder="Enter your new password" required />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="confirm" value={confirm} onChange={(e) => onChange(e)} placeholder="Re-enter your new password" required />
        </div>
        <button type="submit" className="btn btn-primary btn-full">
          Change Password
        </button>
      </form>
    );
  };

  const renderSucceed = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="login-label" style={{ color: "#717986" }}>
          We have changed your password, please try to login
        </div>
        <Link className="btn btn-primary btn-full mt-2" to="/login">
          Back To Login
        </Link>
      </div>
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="d-flex flex-column justify-content-center align-items-center border-bottom pb-3 mb-3">
          <img src="/assets/images/logo-text.png" alt="Header" className="login-header" />
        </div>
        <div className="login-title">Recovery Password</div>
        <div className="card-body">
          <Alert />
          {succeed ? renderSucceed() : renderEmail()}
        </div>
      </div>
    </div>
  );
};

RecoveryPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  recoveryPassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, recoveryPassword })(RecoveryPassword);
