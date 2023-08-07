import { lazy } from "react";
const Admin = lazy(() => import("../../views/Home3"));

// MASTER
const ItemList = lazy(() => import("../../views/master/item/ItemList"));
const ItemForm = lazy(() => import("../../views/master/item/ItemForm"));

const CustomerList = lazy(() => import("../../views/master/customer/CustomerList"));
const CustomerForm = lazy(() => import("../../views/master/customer/CustomerForm"));

const RawMaterialList = lazy(() => import("../../views/master/rawmaterial/RawMaterialList"));
const RawMaterialForm = lazy(() => import("../../views/master/rawmaterial/RawMaterialForm"));


const LocationList = lazy(() => import("../../views/master/location/LocationList"));
const LocationForm = lazy(() => import("../../views/master/location/LocationForm"));

const PalletList = lazy(() => import("../../views/master/pallet/PalletList"));
const PalletForm = lazy(() => import("../../views/master/pallet/PalletForm"));

const CategoryList = lazy(() => import("../../views/master/category/CategoryList"));
const CategoryForm = lazy(() => import("../../views/master/category/CategoryForm"));
const UomList = lazy(() => import("../../views/master/uom/UomList"));
const UomForm = lazy(() => import("../../views/master/uom/UomForm"));
const GateList = lazy(() => import("../../views/master/gate/GateList"));
const GateForm = lazy(() => import("../../views/master/gate/GateForm"));
const PackingList = lazy(() => import("../../views/master/packing/PackingList"));
const PackingForm = lazy(() => import("../../views/master/packing/PackingForm"));
const WarehouseList = lazy(() => import("../../views/master/warehouse/WarehouseList"));
const WarehouseForm = lazy(() => import("../../views/master/warehouse/WarehouseForm"));
const VendorList = lazy(() => import("../../views/master/vendor/VendorList"));
const VendorForm = lazy(() => import("../../views/master/vendor/VendorForm"));
const GroupList = lazy(() => import("../../views/master/group/GroupList"));
const GroupForm = lazy(() => import("../../views/master/group/GroupForm"));
const RawMaterialReceivingList = lazy(() => import("../../views/transactionrm/rawmaterialreceiving/RawMaterialReceivingList"));
const RawMaterialReceivingForm = lazy(() => import("../../views/transactionrm/rawmaterialreceiving/RawMaterialReceivingForm"));
const RawMaterialBatchList = lazy(() => import("../../views/transactionrm/RawMaterialBatchList"));
const RawMaterialBatchForm = lazy(() => import("../../views/transactionrm/RawMaterialBatchForm"));
const RawMaterialUsageList = lazy(() => import("../../views/transactionrm/RawMaterialUsageList"));
const RawMaterialUsageForm = lazy(() => import("../../views/transactionrm/RawMaterialUsageForm"));
const ReceivingList = lazy(() => import("../../views/transaction/receiving/ReceivingList"));
const ReceivingForm = lazy(() => import("../../views/transaction/receiving/ReceivingForm"));
const ProductionList = lazy(() => import("../../views/transaction/product/ProductionList"));
const ProductionForm = lazy(() => import("../../views/transaction/product/ProductionForm"));
const TransactionItemConsumptionList = lazy(() => import("../../views/transaction/transactionitemconsumption/TransactionItemConsumptionList"));
const TransactionItemConsumptionForm = lazy(() => import("../../views/transaction/transactionitemconsumption/TransactionItemConsumptionForm"));
// const ItemTypeList = lazy(() => import("../../views/master/itemType/ItemTypeList"));
// const ItemTypeForm = lazy(() => import("../../views/master/itemType/ItemTypeForm"));
// const RouteList = lazy(() => import("../../views/master/route/RouteList"));
// const RouteForm = lazy(() => import("../../views/master/route/RouteForm"));
// const ProductList = lazy(() => import("../../views/master/product/ProductList"));
// const ProductForm = lazy(() => import("../../views/master/product/ProductForm"));

// const OrderForm = lazy(() => import("../../views/order/OrderForm"));
// const DraftList = lazy(() => import("../../views/order/DraftList"));
// const ConfirmList = lazy(() => import("../../views/order/ConfirmList"));
// const PickUpList = lazy(() => import("../../views/order/PickUpList"));
// const InHubList = lazy(() => import("../../views/order/InHubList"));
// const TransferList = lazy(() => import("../../views/order/TransferList"));
// const DeliveryList = lazy(() => import("../../views/order/DeliveryList"));
// const CloseList = lazy(() => import("../../views/order/CloseList"));
// const CancelList = lazy(() => import("../../views/order/CancelList"));
// const OrderList = lazy(() => import("../../views/order/OrderList"));

// const ShipmentForm = lazy(() => import("../../views/shipment/ShipmentForm"));
// const ShipmentDraftList = lazy(() => import("../../views/shipment/DraftList"));
// const ShipmentConfirmList = lazy(() => import("../../views/shipment/ConfirmList"));
// const ShipmentScheduledList = lazy(() => import("../../views/shipment/ScheduledList"));
// const ShipmentStartedList = lazy(() => import("../../views/shipment/StartedList"));
// const ShipmentDeliveredList = lazy(() => import("../../views/shipment/DeliveredList"));
// const ShipmentCancelList = lazy(() => import("../../views/shipment/CancelList"));
// const ShipmentList = lazy(() => import("../../views/shipment/ShipmentList"));

// const FleetOrderInternalList = lazy(() => import("../../views/fleetOrder/InternalList"));
// const FleetOrderExternalList = lazy(() => import("../../views/fleetOrder/ExternalList"));
// const FleetOrderForm = lazy(() => import("../../views/fleetOrder/FleetOrderForm"));

// const DeliveredList = lazy(() => import("../../views/documents/DeliveredList"));
// const ReturnedList = lazy(() => import("../../views/documents/ReturnedList"));
// const ReadyList = lazy(() => import("../../views/documents/ReadyList"));
// const InvoicedList = lazy(() => import("../../views/documents/InvoicedList"));

// const DriverList = lazy(() => import("../../views/driverManagement/driver/DriverList"));
// const DriverForm = lazy(() => import("../../views/driverManagement/driver/DriverForm"));
// const LoanTypeList = lazy(() => import("../../views/driverManagement/loanType/LoanTypeList"));
// const LoanTypeForm = lazy(() => import("../../views/driverManagement/loanType/LoanTypeForm"));
// const DriverLoanList = lazy(() => import("../../views/driverManagement/driverLoan/DriverLoanList"));
// const DriverLoanForm = lazy(() => import("../../views/driverManagement/driverLoan/DriverLoanForm"));
// const DriverSavingList = lazy(() => import("../../views/driverManagement/driverSaving/DriverSavingList"));
// const DriverSavingForm = lazy(() => import("../../views/driverManagement/driverSaving/DriverSavingForm"));

// const AddressList = lazy(() => import("../../views/customerManagement/address/AddressList"));
// const AddressForm = lazy(() => import("../../views/customerManagement/address/AddressForm"));
// const CategoryList = lazy(() => import("../../views/customerManagement/category/CategoryList"));
// const CategoryForm = lazy(() => import("../../views/customerManagement/category/CategoryForm"));
// const ContractList = lazy(() => import("../../views/customerManagement/contract/ContractList"));
// const ContractForm = lazy(() => import("../../views/customerManagement/contract/ContractForm"));
// const CustomerList = lazy(() => import("../../views/customerManagement/customer/CustomerList"));
// const CustomerForm = lazy(() => import("../../views/customerManagement/customer/CustomerForm"));
// const IndustryList = lazy(() => import("../../views/customerManagement/industry/IndustryList"));
// const IndustryForm = lazy(() => import("../../views/customerManagement/industry/IndustryForm"));
// const SectorList = lazy(() => import("../../views/customerManagement/sector/SectorList"));
// const SectorForm = lazy(() => import("../../views/customerManagement/sector/SectorForm"));

// const CostCenterList = lazy(() => import("../../views/fleetManagement/costCenter/CostCenterList"));
// const CostCenterForm = lazy(() => import("../../views/fleetManagement/costCenter/CostCenterForm"));
// const FleetList = lazy(() => import("../../views/fleetManagement/fleet/FleetList"));
// const FleetForm = lazy(() => import("../../views/fleetManagement/fleet/FleetForm"));
// const FleetCategoryList = lazy(() => import("../../views/fleetManagement/fleetCategory/FleetCategoryList"));
// const FleetCategoryForm = lazy(() => import("../../views/fleetManagement/fleetCategory/FleetCategoryForm"));
// const FleetTypeList = lazy(() => import("../../views/fleetManagement/fleetType/FleetTypeList"));
// const FleetTypeForm = lazy(() => import("../../views/fleetManagement/fleetType/FleetTypeForm"));
// const MaintenanceList = lazy(() => import("../../views/fleetManagement/maintenance/MaintenanceList"));
// const MaintenanceForm = lazy(() => import("../../views/fleetManagement/maintenance/MaintenanceForm"));

// const DefaultCostList = lazy(() => import("../../views/costManagement/defaultCost/DefaultCostList"));
// const DefaultCostForm = lazy(() => import("../../views/costManagement/defaultCost/DefaultCostForm"));

// const AccountList = lazy(() => import("../../views/financeManagement/account/AccountList"));
// const AccountForm = lazy(() => import("../../views/financeManagement/account/AccountForm"));
// const TermOfPaymentList = lazy(() => import("../../views/financeManagement/termOfPayment/TermOfPaymentList"));
// const TermOfPaymentForm = lazy(() => import("../../views/financeManagement/termOfPayment/TermOfPaymentForm"));
// const InvoiceList = lazy(() => import("../../views/financeManagement/invoice/InvoiceList"));
// const InvoiceForm = lazy(() => import("../../views/financeManagement/invoice/InvoiceForm"));
// const PaymentList = lazy(() => import("../../views/financeManagement/payment/PaymentList"));
// const PaymentForm = lazy(() => import("../../views/financeManagement/payment/PaymentForm"));


//TRANSACTION
const BatchNumberList = lazy(() => import("../../views/transaction/batchNumber/BatchNumberList.js"));
const BatchNumberForm = lazy(() => import("../../views/transaction/batchNumber/BatchNumberForm.js"));
const ItemAdjustmentList = lazy(() => import("../../views/transaction/itemadjustment/ItemAdjustmentList"));
const ItemAdjustmentForm = lazy(() => import("../../views/transaction/itemadjustment/ItemAdjustmentForm"));
const SpkList = lazy(() => import("../../views/transaction/spk/SpkList"));
const SpkForm = lazy(() => import("../../views/transaction/spk/SpkForm"));
const ShippingList = lazy(() => import("../../views/transaction/shipping/ShippingList"));
const ShippingForm = lazy(() => import("../../views/transaction/shipping/ShippingForm"));

//ADMIN
const UserList = lazy(() => import("../../views/admin/user/UserList"));
const UserForm = lazy(() => import("../../views/admin/user/UserForm"));
const RoleList = lazy(() => import("../../views/admin/role/RoleList"));
const RoleForm = lazy(() => import("../../views/admin/role/RoleForm"));
const ModuleList = lazy(() => import("../../views/admin/module/ModuleList"));
const ModuleForm = lazy(() => import("../../views/admin/module/ModuleForm"));

const AdminRoutes = [
  { path: "/admin", element: <Admin />, meta: { layout: "full", publicRoute: false } },

  // MASTER
  { path: "/master/item", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/item/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/lead-customer", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/lead-customer/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/uom", element: <UomList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/uom/:id?/:type", element: <UomForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/raw-material", element: < RawMaterialList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/raw-material/:id?/:type", element: < RawMaterialForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/gate", element: <GateList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/gate/:id?/:type", element: <GateForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/category", element: <CategoryList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/category/:id?/:type", element: <CategoryForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/packing", element: <PackingList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/packing/:id?/:type", element: <PackingForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/group", element: <GroupList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/group/:id?/:type", element: <GroupForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/pallet", element: <PalletList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/pallet/:id?/:type", element: <PalletForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/location", element: <LocationList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/location/:id?/:type", element: <LocationForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/warehouse", element: <WarehouseList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/warehouse/:id?/:type", element: <WarehouseForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/customer", element: <CustomerList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/customer/:id?/:type", element: <CustomerForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/vendor", element: <VendorList />, meta: { layout: "full", publicRoute: false } },
  { path: "/master/vendor/:id?/:type", element: <VendorForm />, meta: { layout: "full", publicRoute: false } },

  // TRANSAKSI
  { path: "/transaction/batch-number", element: <BatchNumberList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/batch-number/:id?/:type", element: <BatchNumberForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/item-adjustment", element: <ItemAdjustmentList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/item-adjustment/:id?/:type", element: <ItemAdjustmentForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/shipping", element: <ShippingList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/shipping/:id?/:type", element: <ShippingForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/spk", element: <SpkList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/spk/:id?/:type", element: <SpkForm />, meta: { layout: "full", publicRoute: false } },

  { path: "/transaction/production", element: <ProductionList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/production/:id?/:type", element: <ProductionForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/receiving", element: <ReceivingList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/receiving/:id?/:type", element: <ReceivingForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/non-komersil", element: <TransactionItemConsumptionList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction/non-komersil/:id?/:type", element: <TransactionItemConsumptionForm />, meta: { layout: "full", publicRoute: false } },

  // TRANSAKSI RM
  { path: "/transaction-rm/raw-material-batch", element: < RawMaterialBatchList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction-rm/raw-material-batch/:id?/:type", element: <RawMaterialBatchForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction-rm/raw-material-receiving", element: <RawMaterialReceivingList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction-rm/raw-material-receiving/:id?/:type", element: <RawMaterialReceivingForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction-rm/raw-material-usage", element: <RawMaterialUsageList />, meta: { layout: "full", publicRoute: false } },
  { path: "/transaction-rm/raw-material-usage/:id?/:type", element: <RawMaterialUsageForm />, meta: { layout: "full", publicRoute: false } },

  // REPORT
  { path: "/report/stock-card", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/stock-card/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/history-item", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/history-item/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/stock-by-date", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/stock-by-date/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/spk-vs-shipping", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/spk-vs-shipping/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/detail-spk-vs-shipping", element: <ItemList />, meta: { layout: "full", publicRoute: false } },
  { path: "/report/detail-spk-vs-shipping/:id?/:type", element: <ItemForm />, meta: { layout: "full", publicRoute: false } },

  // ADMIN
  { path: "/admin/module", element: <ModuleList />, meta: { layout: "full", publicRoute: false } },
  { path: "/admin/module/:id?/:type", element: <ModuleForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/admin/user", element: <UserList />, meta: { layout: "full", publicRoute: false } },
  { path: "/admin/user/:id?/:type", element: <UserForm />, meta: { layout: "full", publicRoute: false } },
  { path: "/admin/role", element: <RoleList />, meta: { layout: "full", publicRoute: false } },
  { path: "/admin/role/:id?/:type", element: <RoleForm />, meta: { layout: "full", publicRoute: false } },

  // // Order
  // { path: "/order", element: <OrderList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/draft", element: <DraftList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/confirm", element: <ConfirmList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/pickup", element: <PickUpList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/inhub", element: <InHubList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/transfer", element: <TransferList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/delivery", element: <DeliveryList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/close", element: <CloseList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/cancel", element: <CancelList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/order/:id?/:type", element: <OrderForm />, meta: { layout: "full", publicRoute: false } },

  // // Shipment
  // { path: "/shipment", element: <ShipmentList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/draft", element: <ShipmentDraftList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/confirm", element: <ShipmentConfirmList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/scheduled", element: <ShipmentScheduledList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/started", element: <ShipmentStartedList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/delivered", element: <ShipmentDeliveredList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/cancel", element: <ShipmentCancelList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/shipment/:id?/:type", element: <ShipmentForm />, meta: { layout: "full", publicRoute: false } },

  // // Fleet Order
  // { path: "/fleet-order/internal", element: <FleetOrderInternalList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-order/external", element: <FleetOrderExternalList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-order/:orderType/:id?/:type", element: <FleetOrderForm />, meta: { layout: "full", publicRoute: false } },

  // // Documents
  // { path: "/documents/delivered", element: <DeliveredList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/documents/returned", element: <ReturnedList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/documents/ready", element: <ReadyList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/documents/invoiced", element: <InvoicedList />, meta: { layout: "full", publicRoute: false } },

  // // Driver Management
  // { path: "/driver-management/driver", element: <DriverList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/driver/:id?/:type", element: <DriverForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/loan-type", element: <LoanTypeList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/loan-type/:id?/:type", element: <LoanTypeForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/driver-loan", element: <DriverLoanList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/driver-loan/:id?/:type", element: <DriverLoanForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/driver-saving", element: <DriverSavingList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/driver-management/driver-saving/:id?/:type", element: <DriverSavingForm />, meta: { layout: "full", publicRoute: false } },

  // // Customer Management
  // { path: "/customer-management/category", element: <CategoryList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/category/:id?/:type", element: <CategoryForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/industry", element: <IndustryList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/industry/:id?/:type", element: <IndustryForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/customer", element: <CustomerList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/customer/:id?/:type", element: <CustomerForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/sector", element: <SectorList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/sector/:id?/:type", element: <SectorForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/address", element: <AddressList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/address/:id?/:type", element: <AddressForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/contract", element: <ContractList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/customer-management/contract/:id?/:type", element: <ContractForm />, meta: { layout: "full", publicRoute: false } },

  // // Fleet Management
  // { path: "/fleet-management/fleet-category", element: <FleetCategoryList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/fleet-category/:id?/:type", element: <FleetCategoryForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/fleet-type", element: <FleetTypeList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/fleet-type/:id?/:type", element: <FleetTypeForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/fleet", element: <FleetList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/fleet/:id?/:type", element: <FleetForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/cost-center", element: <CostCenterList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/cost-center/:id?/:type", element: <CostCenterForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/maintenance", element: <MaintenanceList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/fleet-management/maintenance/:id?/:type", element: <MaintenanceForm />, meta: { layout: "full", publicRoute: false } },

  // // Cost Management
  // { path: "/cost-management/default-cost", element: <DefaultCostList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/cost-management/default-cost/:id?/:type", element: <DefaultCostForm />, meta: { layout: "full", publicRoute: false } },

  // // Finance Management
  // { path: "/finance-management/account", element: <AccountList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/account/:id?/:type", element: <AccountForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/term-of-payment", element: <TermOfPaymentList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/term-of-payment/:id?/:type", element: <TermOfPaymentForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/invoice", element: <InvoiceList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/invoice/:id?/:type", element: <InvoiceForm />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/payment", element: <PaymentList />, meta: { layout: "full", publicRoute: false } },
  // { path: "/finance-management/payment/:id?/:type", element: <PaymentForm />, meta: { layout: "full", publicRoute: false } },

];

export default AdminRoutes;
