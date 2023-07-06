import { lazy } from "react";

const Mobile = lazy(() => import("../../views/Home"));
const SubMenu = lazy(() => import("../../views/mobile/SubMenu"));
const More = lazy(() => import("../../views/mobile/More"));

const AdminRoutes = [
  {
    path: "/mobile",
    element: <Mobile />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/order",
    element: <SubMenu groupName={"order"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/shipment",
    element: <SubMenu groupName={"shipment"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/fleet-order",
    element: <SubMenu groupName={"fleet-order"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/documents",
    element: <SubMenu groupName={"documents"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/driver-management",
    element: <SubMenu groupName={"driver-management"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/customer-management",
    element: <SubMenu groupName={"customer-management"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/fleet-management",
    element: <SubMenu groupName={"fleet-management"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/finance-management",
    element: <SubMenu groupName={"finance-management"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/admin",
    element: <SubMenu groupName={"admin"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/master",
    element: <SubMenu groupName={"master"} />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
  {
    path: "/mobile/more",
    element: <More />,
    meta: {
      layout: "full",
      publicRoute: false,
    },
  },
];

export default AdminRoutes;
