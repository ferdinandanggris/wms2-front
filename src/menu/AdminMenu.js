import { FaHome, FaUserLock, FaLayerGroup, FaCog, FaThList, FaUserFriends, FaMap, FaUserCog, FaBox, FaCarAlt, FaArchive, FaVoteYea, FaShippingFast, FaCarSide, FaBuilding, FaReceipt, FaTruck, FaFile, FaTruckPickup, FaBoxes, FaPeopleCarry, FaWindowClose, FaCalendarDay, FaCalendarCheck, FaRoute, FaFileAlt, FaMapMarkedAlt, FaClipboardCheck, FaTruckMoving, FaRegHandshake, FaHandshake, FaTruckLoading, FaCompressArrowsAlt, FaFileDownload, FaFileInvoice, FaMoneyCheckAlt, FaCoins, FaCashRegister, FaUserCheck, FaVest, FaBalanceScale, FaCommentsDollar, FaListAlt } from "react-icons/fa";

const AdminMenu = [
  {
    group: "",
    path: "/admin",
    icon: <FaHome className="sidebar-icon" />,
    title: "Dashboard",
  },
  {
    group: "master",
    icon: <FaThList className="sidebar-icon" />,
    title: "Master",
    subMenus: [
      {
        path: "/master/item",
        icon: <FaBox className="sidebar-icon" />,
        title: "Item",
      },
      {
        path: "/master/lead-customer",
        icon: <FaMapMarkedAlt className="sidebar-icon" />,
        title: "Lead Customer",
      },
      {
        path: "/master/uom",
        icon: <FaBox className="sidebar-icon" />,
        title: "Unit Of Measurement",
      },
      {
        path: "/master/raw-material",
        icon: <FaBox className="sidebar-icon" />,
        title: "Raw Material",
      },
      {
        path: "/master/gate",
        icon: <FaBox className="sidebar-icon" />,
        title: "Gate",
      },
      {
        path: "/master/category",
        icon: <FaBox className="sidebar-icon" />,
        title: "Categories",
      },
      {
        path: "/master/packing",
        icon: <FaBox className="sidebar-icon" />,
        title: "Packings",
      },
      {
        path: "/master/group",
        icon: <FaBox className="sidebar-icon" />,
        title: "Group",
      },
      {
        path: "/master/pallet",
        icon: <FaBox className="sidebar-icon" />,
        title: "Pallet",
      },
      {
        path: "/master/location",
        icon: <FaBox className="sidebar-icon" />,
        title: "Locations",
      },
      {
        path: "/master/warehouse",
        icon: <FaBox className="sidebar-icon" />,
        title: "Warehouses",
      },
      {
        path: "/master/customer",
        icon: <FaBox className="sidebar-icon" />,
        title: "Customer",
      },
      {
        path: "/master/vendor",
        icon: <FaBox className="sidebar-icon" />,
        title: "Vendor",
      },
    ],
  },
  {
    group: "transaction",
    icon: <FaThList className="sidebar-icon" />,
    title: "Transaction",
    subMenus: [
      {
        path: "/transaction/spk",
        icon: <FaBox className="sidebar-icon" />,
        title: "SPK",
      },
      {
        path: "/transaction/production",
        icon: <FaBox className="sidebar-icon" />,
        title: "Production",
      },
      {
        path: "/transaction/batch-number",
        icon: <FaBox className="sidebar-icon" />,
        title: "Batch Number",
      },
      {
        path: "/transaction/item-adjustment",
        icon: <FaBox className="sidebar-icon" />,
        title: "Item Adjustment",
      },
      {
        path: "/transaction/receiving",
        icon: <FaBox className="sidebar-icon" />,
        title: "Receiving",
      },
      {
        path: "/transaction/shipping",
        icon: <FaBox className="sidebar-icon" />,
        title: "Shipping",
      },
      {
        path: "/transaction/return",
        icon: <FaBox className="sidebar-icon" />,
        title: "Return",
      },
      {
        path: "/transaction/non-komersil",
        icon: <FaBox className="sidebar-icon" />,
        title: "Non Komersil",
      },
    ],
  },
  {
    group: "transaction-rm",
    icon: <FaThList className="sidebar-icon" />,
    title: "Transaction RM",
    subMenus: [
      {
        path: "/transaction-rm/raw-material-batch",
        icon: <FaBox className="sidebar-icon" />,
        title: "Raw Material Batch",
      },
      {
        path: "/transaction/raw-material-receiving",
        icon: <FaBox className="sidebar-icon" />,
        title: "Raw Material Receiving",
      },
      {
        path: "/transaction/raw-material-usage",
        icon: <FaBox className="sidebar-icon" />,
        title: "Raw Material Usage",
      },

    ],
  },
  {
    group: "reports",
    icon: <FaThList className="sidebar-icon" />,
    title: "Reports",
    subMenus: [
      {
        path: "/report/stock-card",
        icon: <FaBox className="sidebar-icon" />,
        title: "Stock Card",
      },
      {
        path: "/report/history-item",
        icon: <FaBox className="sidebar-icon" />,
        title: "History Item",
      },
      {
        path: "/report/stock-by-date",
        icon: <FaBox className="sidebar-icon" />,
        title: "Stock By Date",
      },
      {
        path: "/report/spk-vs-shipping",
        icon: <FaBox className="sidebar-icon" />,
        title: "SPK Vs Shipping",
      },
      {
        path: "/report/detail-spk-vs-shipping",
        icon: <FaBox className="sidebar-icon" />,
        title: "Detail SPK Vs Shipping",
      },

    ],
  },
  // {
  //   group: "master",
  //   icon: <FaThList className="sidebar-icon" />,
  //   title: "Master",
  //   subMenus: [
  //     {
  //       path: "/master/item-type",
  //       icon: <FaLayerGroup className="sidebar-icon" />,
  //       title: "Item Type",
  //     },
  //     {
  //       path: "/master/route",
  //       icon: <FaMapMarkedAlt className="sidebar-icon" />,
  //       title: "Route",
  //     },
  //     {
  //       path: "/master/product",
  //       icon: <FaBox className="sidebar-icon" />,
  //       title: "Products",
  //     },
  //   ],
  // },
  // {
  //   group: "order",
  //   icon: <FaFileAlt className="sidebar-icon" />,
  //   title: "Orders",
  //   subMenus: [
  //     {
  //       path: "/order/create",
  //       icon: <FaCarAlt className="sidebar-icon" />,
  //       title: "Create Order",
  //     },
  //     {
  //       path: "/order/draft",
  //       icon: <FaArchive className="sidebar-icon" />,
  //       title: "Draft Order",
  //     },
  //     {
  //       path: "/order/confirm",
  //       icon: <FaVoteYea className="sidebar-icon" />,
  //       title: "Confirmed Order",
  //     },
  //     {
  //       path: "/order/pickup",
  //       icon: <FaTruckPickup className="sidebar-icon" />,
  //       title: "Pickup Order",
  //     },
  //     {
  //       path: "/order/inhub",
  //       icon: <FaBoxes className="sidebar-icon" />,
  //       title: "In Hub",
  //     },
  //     {
  //       path: "/order/transfer",
  //       icon: <FaRoute className="sidebar-icon" />,
  //       title: "Transfer",
  //     },
  //     {
  //       path: "/order/delivery",
  //       icon: <FaCarSide className="sidebar-icon" />,
  //       title: "Delivery Order",
  //     },
  //     {
  //       path: "/order/close",
  //       icon: <FaPeopleCarry className="sidebar-icon" />,
  //       title: "Closed Order",
  //     },
  //     {
  //       path: "/order/cancel",
  //       icon: <FaWindowClose className="sidebar-icon" />,
  //       title: "Canceled Order",
  //     },
  //     {
  //       path: "/order",
  //       icon: <FaShippingFast className="sidebar-icon" />,
  //       title: "All Order",
  //     },
  //   ],
  // },
  // {
  //   group: "shipment",
  //   icon: <FaCarAlt className="sidebar-icon" />,
  //   title: "Shipment",
  //   subMenus: [
  //     {
  //       path: "/shipment/draft",
  //       icon: <FaCalendarDay className="sidebar-icon" />,
  //       title: "Draft Shipment",
  //     },
  //     {
  //       path: "/shipment/confirm",
  //       icon: <FaClipboardCheck className="sidebar-icon" />,
  //       title: "Confirmed Shipment",
  //     },
  //     {
  //       path: "/shipment/scheduled",
  //       icon: <FaCalendarCheck className="sidebar-icon" />,
  //       title: "Scheduled Shipment",
  //     },
  //     {
  //       path: "/shipment/started",
  //       icon: <FaRoute className="sidebar-icon" />,
  //       title: "Started Shipment",
  //     },
  //     {
  //       path: "/shipment/delivered",
  //       icon: <FaTruckPickup className="sidebar-icon" />,
  //       title: "Delivered Shipment",
  //     },
  //     {
  //       path: "/shipment/cancel",
  //       icon: <FaWindowClose className="sidebar-icon" />,
  //       title: "Canceled Shipment",
  //     },
  //     {
  //       path: "/shipment",
  //       icon: <FaShippingFast className="sidebar-icon" />,
  //       title: "All Shipment",
  //     },
  //   ],
  // },
  // {
  //   group: "fleet-order",
  //   icon: <FaRoute className="sidebar-icon" />,
  //   title: "Fleet Order",
  //   subMenus: [
  //     {
  //       path: "/fleet-order/internal",
  //       icon: <FaTruckMoving className="sidebar-icon" />,
  //       title: "Internal F/O",
  //     },
  //     {
  //       path: "/fleet-order/external",
  //       icon: <FaRegHandshake className="sidebar-icon" />,
  //       title: "External F/O",
  //     },
  //   ],
  // },
  // {
  //   group: "documents",
  //   icon: <FaFileAlt className="sidebar-icon" />,
  //   title: "Documents",
  //   subMenus: [
  //     {
  //       path: "/documents/delivered",
  //       icon: <FaTruckLoading className="sidebar-icon" />,
  //       title: "Delivered",
  //     },
  //     {
  //       path: "/documents/returned",
  //       icon: <FaCompressArrowsAlt className="sidebar-icon" />,
  //       title: "Returned",
  //     },
  //     {
  //       path: "/documents/ready",
  //       icon: <FaFileDownload className="sidebar-icon" />,
  //       title: "Ready",
  //     },
  //     {
  //       path: "/documents/invoiced",
  //       icon: <FaFileInvoice className="sidebar-icon" />,
  //       title: "Invoiced",
  //     },
  //   ],
  // },
  // {
  //   group: "driver-management",
  //   icon: <FaUserCog className="sidebar-icon" />,
  //   title: "Driver Management",
  //   subMenus: [
  //     {
  //       path: "/driver-management/driver",
  //       icon: <FaUserFriends className="sidebar-icon" />,
  //       title: "Drivers",
  //     },
  //     {
  //       path: "/driver-management/loan-type",
  //       icon: <FaMoneyCheckAlt className="sidebar-icon" />,
  //       title: "Loan Type",
  //     },
  //     {
  //       path: "/driver-management/driver-loan",
  //       icon: <FaCoins className="sidebar-icon" />,
  //       title: "Driver Loan",
  //     },
  //     {
  //       path: "/driver-management/driver-saving",
  //       icon: <FaCashRegister className="sidebar-icon" />,
  //       title: "Driver Saving",
  //     },
  //   ],
  // },
  // {
  //   group: "customer-management",
  //   icon: <FaUserCheck className="sidebar-icon" />,
  //   title: "Customer Management",
  //   subMenus: [
  //     {
  //       path: "/customer-management/category",
  //       icon: <FaReceipt className="sidebar-icon" />,
  //       title: "Category",
  //     },
  //     {
  //       path: "/customer-management/industry",
  //       icon: <FaBuilding className="sidebar-icon" />,
  //       title: "Industry",
  //     },
  //     {
  //       path: "/customer-management/customer",
  //       icon: <FaUserFriends className="sidebar-icon" />,
  //       title: "Customer",
  //     },
  //     {
  //       path: "/customer-management/sector",
  //       icon: <FaLayerGroup className="sidebar-icon" />,
  //       title: "Sector",
  //     },
  //     {
  //       path: "/customer-management/address",
  //       icon: <FaMap className="sidebar-icon" />,
  //       title: "Address",
  //     },
  //     {
  //       path: "/customer-management/contract",
  //       icon: <FaHandshake className="sidebar-icon" />,
  //       title: "Contract",
  //     },
  //   ],
  // },
  // {
  //   group: "fleet-management",
  //   icon: <FaTruckMoving className="sidebar-icon" />,
  //   title: "Fleet Management",
  //   subMenus: [
  //     {
  //       path: "/fleet-management/fleet-category",
  //       icon: <FaFile className="sidebar-icon" />,
  //       title: "Fleet Category",
  //     },
  //     {
  //       path: "/fleet-management/fleet-type",
  //       icon: <FaVest className="sidebar-icon" />,
  //       title: "Fleet Type",
  //     },
  //     {
  //       path: "/fleet-management/fleet",
  //       icon: <FaTruck className="sidebar-icon" />,
  //       title: "Fleets",
  //     },
  //     {
  //       path: "/fleet-management/cost-center",
  //       icon: <FaBalanceScale className="sidebar-icon" />,
  //       title: "Cost Center",
  //     },
  //     {
  //       path: "/fleet-management/maintenance",
  //       icon: <FaHandshake className="sidebar-icon" />,
  //       title: "Maintenance",
  //     },
  //   ],
  // },
  // {
  //   group: "cost-management",
  //   icon: <FaCompressArrowsAlt className="sidebar-icon" />,
  //   title: "Cost Management",
  //   subMenus: [
  //     {
  //       path: "/cost-management/default-cost",
  //       icon: <FaClipboardCheck className="sidebar-icon" />,
  //       title: "Default Cost",
  //     },
  //   ],
  // },
  // {
  //   group: "finance-management",
  //   icon: <FaCommentsDollar className="sidebar-icon" />,
  //   title: "Finance Management",
  //   subMenus: [
  //     {
  //       path: "/finance-management/term-of-payment",
  //       icon: <FaFile className="sidebar-icon" />,
  //       title: "Term Of Payment",
  //     },
  //     {
  //       path: "/finance-management/account",
  //       icon: <FaListAlt className="sidebar-icon" />,
  //       title: "Account",
  //     },
  //     {
  //       path: "/finance-management/invoice",
  //       icon: <FaFileInvoice className="sidebar-icon" />,
  //       title: "Invoice",
  //     },
  //     {
  //       path: "/finance-management/payment",
  //       icon: <FaReceipt className="sidebar-icon" />,
  //       title: "Payment",
  //     },
  //   ],
  // },

  {
    group: "admin",
    icon: <FaCog className="sidebar-icon" />,
    title: "Super Administrator",
    subMenus: [
      {
        path: "/admin/module",
        icon: <FaLayerGroup className="sidebar-icon" />,
        title: "Module",
      },
      {
        path: "/admin/role",
        icon: <FaUserLock className="sidebar-icon" />,
        title: "Role",
      },
      {
        path: "/admin/user",
        icon: <FaUserCog className="sidebar-icon" />,
        title: "User",
      },
    ],
  },
];

export default AdminMenu;
