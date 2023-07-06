import React, { Suspense, useEffect } from "react";

import Router from "./router/Router";
import { store } from "./redux/store";

import setAxios from "./utility/setAxios";
import setToken from "./utility/setToken";

import { loadUser, logout } from "./actions/auth";

setAxios();
if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiQW5kaSBQcmFzZXR5byIsIm5iZiI6MTY4ODQ3MDkyNiwiZXhwIjoxNjg5MDc1NzI2LCJpYXQiOjE2ODg0NzA5MjZ9.oTCUYX4fgJWsNlBSfoIAA9sUJgHizjJo0G9C2zCdELI";
    if (localStorage.token === undefined || localStorage.token === null) {
      store.dispatch(logout({ email: "" }));
    } else store.dispatch(loadUser());
  }, []);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
