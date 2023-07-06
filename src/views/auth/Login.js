import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";
import Alert from "../../components/Alert";

const Login = ({ login }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    login({ email, password })
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-90 px-3" style={{ height: "100vh" }}>
      <div className="login-card">
        <div className="login-header">
          <img src="/assets/images/logo-text.png" alt="Header" />
        </div>
        <div className="d-flex justify-content-between w-100 mb-2">
          <div className="login-title">Sign In</div>
          {/* <Link className="btn btn-primary-outline btn-signup" to="register">
            Sign Up
          </Link> */}
        </div>
        <div className="w-100">
          <Alert />
          <form method="post" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input className="form-control" type="email" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter your email address" required />
            </div>
            <div className="form-group">
              <input className="form-control" type="password" name="password" value={password} onChange={(e) => onChange(e)} placeholder="Enter your password" required />
            </div>
            <div className="d-flex justify-content-between w-100 mb-2">
              <div className="d-flex flex-row">
                <label className="switch">
                  <input type="checkbox" name="rememberMe" />
                  <span className="slider round"></span>
                </label>
                <div className="remember-me">Remember Me</div>
              </div>
              <Link to="/forgot-password" className="forget-password">
                Can't log in?
              </Link>
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
