import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBell, FaBars } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({ user, logout, toogleMenu, showMenu }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout({ email: user.email }).then(() => {
      navigate("/login");
    });
  };

  const renderUser = () => {
    if (user === null) return null;

    let gravatar = "NO";
    gravatar = user.fullName;
    gravatar = gravatar.replace(/\s+/g, "+").toLowerCase();
    gravatar = "https://ui-avatars.com/api/?name=" + gravatar;

    return (
      <Fragment>
        <div className="avatar mx-2">
          <img className="round" src={gravatar} alt="avatar" />
        </div>
        <div className="user-nav mr-2">
          <div className="user-name fw-bolder">{user.fullName}</div>
          <div className="user-status">{user.email}</div>
        </div>
      </Fragment>
    );
  };

  return (
    <nav className="navbar sticky-top">
      <div className="d-flex justify-content-between navbar-left">
        <a className={`sidemenu-opener ${showMenu ? "" : "hidden"}`} onClick={(e) => toogleMenu(e)}>
          <FaBars />
        </a>
        <Link className="navbar-brand" to="/">
          <img src="/assets/images/logo-text.png" alt="logo" />
        </Link>
      </div>
      <div className="d-flex align-items-center navbar-right">
        <Link className="notification" to="/notification">
          <FaBell />
        </Link>
        <a className="nav-link user-profile dropdown-toggle d-flex align-items-center" href="/#" id="profile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {renderUser()}
        </a>
        <div className="dropdown-menu" aria-labelledby="profile">
          <Link className="dropdown-item d-flex align-items-center border-bottom" to="/profile">
            <FaUser className="dropdown-icon" />
            <span className="dropdown-text">My Profile</span>
          </Link>
          <a className="dropdown-item d-flex align-items-center logout" href="/#" onClick={(e) => handleLogout(e)}>
            <RiLogoutCircleRLine className="dropdown-icon logout" />
            <span className="dropdown-text">Logout</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
