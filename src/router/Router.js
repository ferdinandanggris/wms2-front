import { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error from "../views/Error";

const Router = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const roleType = "admin";
  const allRoutes = getRoutes(roleType);

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={width <= 768 ? "/mobile" : "/admin"} />,
    },
    {
      path: "*",
      element: <Error />,
      meta: {
        layout: "blank",
        publicRoute: true,
      },
    },
    ...allRoutes,
  ]);

  return routes;
};

Router.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Router);
