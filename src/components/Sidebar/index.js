import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Icon
import { MdArrowForwardIos } from "react-icons/md";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import AdminMenu from "../../menu/AdminMenu";

const Sidebar = ({ showMenu }) => {
  const location = useLocation();
  const locationArr = location.pathname.split("/");

  const [groupList, setGroupList] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const [first, setFirst] = useState(true);
  const [groupMenu, setGroupMenu] = useState("");

  useEffect(() => {
    let path = "/admin";
    if (locationArr.length > 2) {
      path = "/" + locationArr[1] + "/" + locationArr[2];
      setGroupMenu(locationArr[1]);
    }
    if (locationArr.length === 2 && (locationArr[1] === "order" || locationArr[1] === "shipment" || locationArr[1] === "fleet-order")) {
      path = "/" + locationArr[1];
      setGroupMenu(locationArr[1]);
    }
    setActiveMenu(path);
  }, [locationArr, setGroupMenu, setActiveMenu]);

  if (first && groupMenu !== "") {
    setGroupList({ ...groupList, [groupMenu]: true });
    setFirst(false);
  }

  const handleGroup = (e, type, expand = null) => {
    if (e !== undefined && e !== null) e.preventDefault();

    let value = groupList[type];
    if (value === undefined) value = true;
    else value = !value;
    if (expand !== null) value = expand;
    setGroupList({ ...groupList, [type]: value });
  };

  const renderSubmenu = (subMenus) =>
    subMenus.map((item, index) => {
      return (
        <li key={index} className="nav-item">
          <Link className={"nav-link d-flex align-items-center " + (activeMenu === item.path ? "active" : "")} to={item.path}>
            {item.icon}
            <span className="sidebar-text">{item.title}</span>
          </Link>
        </li>
      );
    });

  const renderMenu = (menu) =>
    menu.map((item, index) => {
      if (item.path === undefined) {
        return (
          <Fragment key={index}>
            <li className="nav-item nav-dropdown" onClick={(e) => handleGroup(e, item.group)}>
              <div className="nav-link d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {item.icon}
                  <span className="sidebar-text">{item.title}</span>
                </div>
                <MdArrowForwardIos className={"nav-arrow " + (groupList[item.group] ? "down" : "")} />
              </div>
            </li>

            {groupList[item.group] && (
              <div id={item.group} className="nav-submenu collape">
                {renderSubmenu(item.subMenus)}
              </div>
            )}
          </Fragment>
        );
      }

      return (
        <li key={index} className="nav-item">
          <Link className={"nav-link d-flex align-items-center " + (activeMenu === item.path ? "active" : "")} to={item.path}>
            {item.icon}
            <span className="sidebar-text">{item.title}</span>
          </Link>
        </li>
      );
    });

  return (
    <nav className={`col-md-2 sidebar ${showMenu ? "active" : ""}`}>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">{renderMenu(AdminMenu)}</ul>
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Sidebar);
