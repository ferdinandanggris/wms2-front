import { lazy } from 'react';

const Home = lazy(() => import("../../views/Home2"))
// const Profile = lazy(() => import("../../views/Profile"))
const Login = lazy(() => import("../../views/auth/Login"))
const ForgotPassword = lazy(() => import("../../views/auth/ForgotPassword"))
const RecoveryPassword = lazy(() => import("../../views/auth/RecoveryPassword"))
const Unauthorize = lazy(() => import("../../views/Unauthorize"))

const AuthenticationRoutes = [
  {
    path: '/home',
    element: <Home />,
    meta: {
      layout: "full",
      publicRoute: false,
    }
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
    }
  },
  {
    path: "/recovery-password/:code",
    element: <RecoveryPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
    }
  },
  {
    path: "/access-control",
    element: <Unauthorize />,
    meta: {
      layout: "full",
      publicRoute: false,
    }
  },
]

export default AuthenticationRoutes
