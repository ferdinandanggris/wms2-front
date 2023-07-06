import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaCalendarCheck, FaCalendarDay, FaCarAlt, FaClipboardCheck, FaPlus, FaRoute, FaTimes, FaTruckLoading, FaWindowClose } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";

import { loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool } from "../../actions/ice";
import Select2 from "../../components/Select2";
import { setAlert } from "../../actions/alert";

import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import "react-datepicker/dist/react-datepicker.css";

const ShipmentForm = ({ user, data, loadData, addData, editData, master, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool, setAlert }) => {
  let { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const title = "Shipment";
  const img = <FaCarAlt className="module-img" />;
  const path = "/shipment";
  const url = "shipment";
  const role = "Shipment";

  const [searchParams] = useSearchParams();
  const [returnUrl, setReturnUrl] = useState(path);
  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, []);

  const [formData, setFormData] = useState({
    id: 0,
    voucherNo: "",
    referenceNo: "",
    batchNo: "",
    orderNo: "",
    routeType: "",
    orderType: "FTL",
    notes: "",
    status: "DRAFT",
    departureDate: addDays(new Date(), 1).toISOString(),
    departureDateD: addDays(new Date(), 1),
    customerID: 0,
    fleetCategoryID: 0,
    fleetTypeID: 0,
    itemTypeID: 0,
    originID: 0,
    destinationID: 0,
    orderID: 0,
    minTemp: 0,
    maxTemp: 0,
    qty: 0,
    weight: 0,
    volume: 0,
    size: 0,
    orderDetails: [],
    shipmentHistories: [],
  });

  const { voucherNo, referenceNo, batchNo, orderNo, routeType, orderType, notes, status, departureDateD, customerID, fleetCategoryID, itemTypeID, fleetTypeID, originID, destinationID, minTemp, maxTemp, qty, weight, volume, size, orderID, orderDetails, shipmentHistories } = formData;
  const [customerList, setCustomer] = useState(null);
  const [fleetCategoryList, setFleetCategory] = useState(null);
  const [fleetTypeList, setFleetType] = useState(null);
  const [productList, setProduct] = useState(null);
  const [itemTypeList, setItemType] = useState(null);
  const [poolList, setPool] = useState(null);
  const [addressList, setAddress] = useState(null);
  const [levelStatus, setLevelStatus] = useState(null);

  const orderTypeList = [
    { id: "LTL", name: "LTL" },
    { id: "FTL", name: "FTL" },
  ];

  useEffect(() => {
    loadCustomer();
    loadFleetCategory();
    loadProduct();
    loadItemType();
    loadPool();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool]);

  useEffect(() => {
    if (fleetCategoryID !== undefined && fleetCategoryID !== null) loadFleetType({ filterSearch: { fleetCategoryID2: fleetCategoryID } });
  }, [loadFleetType, fleetCategoryID]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        let details = data.data.order?.orderDetails;
        if (details === undefined || details === null) details = [];

        details.map((item) => {
          item.checked = false;
          return null;
        });

        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          voucherNo: data.data.voucherNo,
          referenceNo: data.data.referenceNo,
          batchNo: data.data.batchNo,
          orderNo: data.data.order?.voucherNo,
          routeType: data.data.routeType,
          orderType: data.data.orderType,
          notes: data.data.notes,
          status: data.data.status,
          departureDate: data.data.departureDate,
          departureDateD: data.data.departureDate === null ? null : new Date(data.data.departureDate),
          customerID: data.data.customerID,
          fleetCategoryID: data.data.fleetCategoryID,
          fleetTypeID: data.data.fleetTypeID,
          itemTypeID: data.data.itemTypeID,
          minTemp: data.data.minTemp,
          maxTemp: data.data.maxTemp,
          originID: data.data.originID,
          destinationID: data.data.destinationID,
          orderID: data.data.orderID,
          qty: data.data.qty,
          weight: data.data.weight,
          volume: data.data.volume,
          size: data.data.size,
          orderDetails: details,
          shipmentHistories: data.data.shipmentHistories,
        });

        if (data.data.customer !== undefined && data.data.customer !== null) {
          if (data.data.customer.addresses !== undefined && data.data.customer.addresses !== null) {
            let list = [];
            data.data.customer.addresses.map((item) => {
              list.push({ name: item.name, id: item.id });
              return null;
            });
            setAddress(list);
          }
        }
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.customer !== undefined && master.customer !== null) {
      let list = [...master.customer];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Customer",
          id: 0,
          addresses: [],
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setCustomer(list);
    }

    if (master.fleetCategory !== undefined && master.fleetCategory !== null) {
      let list = [...master.fleetCategory];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Fleet Category",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetCategory(list);
    }

    if (master.fleetType !== undefined && master.fleetType !== null) {
      let list = [...master.fleetType];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Fleet Type",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetType(list);
    }

    if (master.product !== undefined && master.product !== null) {
      let list = [...master.product];
      setProduct(list);
    }

    if (master.itemType !== undefined && master.itemType !== null) {
      let list = [...master.itemType];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Item Type",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setItemType(list);
    }

    if (master.pool !== undefined && master.pool !== null) {
      let list = [...master.pool];
      setPool(list);
    }
  }, [master]);

  useEffect(() => {
    if (customerList !== undefined && customerList !== null && customerID !== undefined && customerID !== null) {
      const obj = customerList.find((obj) => {
        return obj.id === customerID;
      });
      if (obj !== undefined && obj !== null) {
        let list = [];
        if (obj.addresses !== undefined && obj.addresses !== null) {
          obj.addresses.map((item) => {
            list.push({ name: item.name, id: item.id });
            return null;
          });
        }
        if (poolList !== undefined && poolList !== null) {
          poolList.map((item) => {
            list.push({ name: item.name, id: item.id });
            return null;
          });
        }
        setAddress(list);
      }
    }
  }, [customerList, poolList, customerID, setAddress]);

  const statusList = [
    { title: "Draft", value: "DRAFT", level: 0, icon: <FaCalendarDay /> },
    { title: "Confirmed", value: "CONFIRMED", level: 1, icon: <FaClipboardCheck /> },
    { title: "Scheduled", value: "SCHEDULED", level: 2, icon: <FaCalendarCheck /> },
    { title: "Started", value: "STARTED", level: 3, icon: <FaRoute /> },
    { title: "Delivered", value: "DELIVERED", level: 4, icon: <FaTruckLoading /> },
    { title: "Canceled", value: "CANCELED", level: 6, icon: <FaWindowClose /> },
  ];

  useEffect(() => {
    if (status === undefined || status === null) setLevelStatus(statusList[0]);
    else setLevelStatus(statusList.find((obj) => obj.value === status));
  }, [status, setLevelStatus]);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "radius" || e.target.name === "latitude" || e.target.name === "longitude") setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculate = (itemDetails) => {
    let weight = 0;
    let volume = 0;
    let size = 0;
    let qty = 0;
    itemDetails.map((item) => {
      let itemQty = item.qty.toString().replace(",", "");
      weight = weight + item.totalWeight;
      volume = volume + item.totalVolume;
      size = size + item.totalSize;
      qty = qty + parseInt(itemQty);
      return null;
    });

    setFormData({
      ...formData,
      weight: weight,
      volume: volume,
      qty: qty,
      size: size,
      orderDetails: itemDetails,
    });
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    details[index][e.target.name] = e.target.value;
    if (e.target.name === "qty") {
      let qty = e.target.value.replace(",", "");
      details[index]["totalWeight"] = details[index]["weight"] * qty;
      details[index]["totalVolume"] = details[index]["volume"] * qty;
      details[index]["totalSize"] = details[index]["size"] * qty;
      details[index]["total"] = details[index]["unitPrice"] * qty;
    }

    calculate(details);
  };

  const onSelectChange = (e, name) => {
    if (name === "customerID") {
      const customer = customerList.find((obj) => {
        return obj.id === e.id;
      });
      if (customer === undefined && customer === null) return;

      if (customer.addresses !== undefined && customer.addresses !== null) {
        let list = [];
        customer.addresses.map((item) => {
          list.push({ name: item.name, id: item.id });
          return null;
        });
        if (poolList !== undefined && poolList !== null) {
          poolList.map((item) => {
            list.push({ name: item.name, id: item.id });
            return null;
          });
        }
        setAddress(list);
      }

      let weight = 0;
      let volume = 0;
      let size = 0;
      let qty = 0;
      let details = orderDetails;
      details.map((item) => {
        let itemQty = item.qty.toString().replace(",", "");
        weight = weight + item.totalWeight;
        volume = volume + item.totalVolume;
        size = size + item.totalSize;
        qty = qty + parseInt(itemQty);
        return null;
      });

      setFormData({
        ...formData,
        weight: weight,
        volume: volume,
        qty: qty,
        size: size,
        orderDetails: details,
        [name]: e.id,
      });
    } else if (name === "itemTypeID") {
      const itemType = itemTypeList.find((obj) => {
        return obj.id === e.id;
      });
      if (itemType === undefined && itemType === null) return;

      setFormData({ ...formData, [name]: e.id, minTemp: itemType.minTemp, maxTemp: itemType.maxTemp });
    } else {
      setFormData({ ...formData, [name]: e.id });
    }
  };

  const onDetailSelectChange = (e, name, index) => {
    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    details[index][name] = e.id;
    if (name === "productID") {
      const product = productList.find((obj) => {
        return obj.id === e.id;
      });
      if (product === undefined && product === null) return;

      let qty = details[index]["qty"].toString().replace(",", "");
      details[index]["unitPrice"] = product.unitPrice;
      details[index]["weight"] = product.weight;
      details[index]["volume"] = product.volume;
      details[index]["size"] = product.size;
      details[index]["totalWeight"] = qty * product.weight;
      details[index]["totalVolume"] = qty * product.volume;
      details[index]["totalSize"] = qty * product.size;
      details[index]["total"] = qty * product.unitPrice;
    }

    calculate(details);
  };

  const onDetailCheck = (e, index) => {
    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    let checked = details[index]["checked"];
    details[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, orderDetails: details });
  };

  const handleNewRow = (e) => {
    e.preventDefault();

    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    details.push({
      checked: false,
      productID: 0,
      name: "",
      qty: 1,
      unitPrice: 0,
      weight: 0,
      volume: 0,
      size: 0,
      totalWeight: 0,
      totalVolume: 0,
      totalSize: 0,
      total: 0,
    });
    setFormData({ ...formData, orderDetails: details });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    let newDetail = [];

    details.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });

    calculate(newDetail);
  };

  const handleView = (e) => {
    e.preventDefault();
    navigate(`/order/${orderID}/edit?return_url=${encodeURIComponent(location.pathname)}`);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (customerID === 0) {
      setAlert("Invalid Customer", "danger");
      return;
    }

    if (originID === 0) {
      setAlert("Invalid Origin", "danger");
      return;
    }

    if (destinationID === 0) {
      setAlert("Invalid Destination", "danger");
      return;
    }

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) navigate(`${searchParams.get("return_url")}`);
        else navigate(`${returnUrl}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) navigate(`${searchParams.get("return_url")}`);
        else navigate(`${returnUrl}`);
      });
    }
  };

  const renderStatus = () => {
    return (
      <div className="d-flex order-status">
        {statusList.map((item, index) => {
          if (levelStatus === undefined || levelStatus === null) return null;
          let icon = false;
          if ((item.level <= levelStatus.level && levelStatus.level !== 6) || levelStatus.level === item.level) icon = true;
          return (
            <div key={index} className="d-flex order-status-item">
              <div className="order-status-mark">
                <div className={"order-status-icon d-flex align-items-center justify-content-center " + (icon ? "active" : "")}>{item.icon}</div>
              </div>
              <div className="order-status-text d-flex align-items-center">{item.title}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderHistory = () =>
    shipmentHistories !== undefined &&
    shipmentHistories !== null &&
    shipmentHistories.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">{moment(item.transDate).format("DD-MMM-YYYY HH:mm")}</td>
          <td className="text-left">{item.status}</td>
        </tr>
      );
    });

  const renderItem = () =>
    orderDetails !== undefined &&
    orderDetails !== null &&
    orderDetails.map((item, index) => {
      return (
        <tr key={index}>
          {status === "DRAFT" && (
            <td className="text-center">
              <input type="checkbox" checked={item.checked} onChange={(e) => onDetailCheck(e, index)} />
            </td>
          )}
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <Select2 options={productList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Product"} value={productList === null ? null : productList.filter((option) => option.id === parseInt(item.productID))} handleChange={(e) => onDetailSelectChange(e, "productID", index)} isDisabled={true} />
          </td>
          <td className="text-left">
            <input className="form-control" type="text" name="name" value={item.name} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Name" readOnly={true} />
          </td>
          <td className="text-right">{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="qty" value={item.qty} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly={true} />
          </td>
          <td className="text-right">{item.totalWeight.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td className="text-right">{item.totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td className="text-right">{item.totalSize.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td className="text-right">{item.total.toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
        </tr>
      );
    });

  const element = () => {
    return (
      <Fragment>
        {renderStatus()}
        <div className="row">
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Customer</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Name</label>
                  <span className="required-star">*</span>
                  <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} isDisabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Origin Information</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Address</label>
                  <span className="required-star">*</span>
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Origin"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(originID))} handleChange={(e) => onSelectChange(e, "originID")} isDisabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Destination Information</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Address</label>
                  <span className="required-star">*</span>
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Destination"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(destinationID))} handleChange={(e) => onSelectChange(e, "destinationID")} isDisabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Shipment Information</div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Shipment No</label>
                  <span className="required-star">*</span>
                  <input className="form-control" type="text" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                </div>
                <div className="form-group col-6">
                  <label>Position</label>
                  <input className="form-control" type="text" name="routeType" value={routeType} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Reference No</label>
                  <input className="form-control" type="text" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} placeholder="Enter Reference No" readOnly={true} />
                </div>
                <div className="form-group col-6">
                  <label>Batch No</label>
                  <input className="form-control" type="text" name="batchNo" value={batchNo} onChange={(e) => onChange(e)} placeholder="Enter Batch No" readOnly={true} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Departure Date</label>
                  <span className="required-star">*</span>
                  <DatePicker name="departureDateD" selected={departureDateD} className="form-control" onChange={(date) => setFormData({ ...formData, departureDate: moment(date).format("YYYY-MM-DDTHH:mm:ss"), departureDateD: date })} showTimeSelect readOnly={status !== "DRAFT"} excludeDateIntervals={[{ start: subDays(new Date(), 365), end: new Date() }]} dateFormat="yyyy-MM-dd HH:mm" />
                </div>
                <div className="form-group col-6">
                  <label>Order Type</label>
                  <Select2 options={orderTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Order Type"} value={orderTypeList === null ? null : orderTypeList.filter((option) => option.id === orderType)} handleChange={(e) => onSelectChange(e, "orderType")} isDisabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Fleet Information</div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Fleet Category</label>
                  <Select2 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Category"} value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} isDisabled={true} />
                </div>
                <div className="form-group col-6">
                  <label>Fleet Type</label>
                  <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} isDisabled={true} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Item Type</label>
                  <Select2 options={itemTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Item Type"} value={itemTypeList === null ? null : itemTypeList.filter((option) => option.id === parseInt(itemTypeID))} handleChange={(e) => onSelectChange(e, "itemTypeID")} isDisabled={true} />
                </div>
                <div className="form-group col-6">
                  <label>Order No</label>
                  <input className="form-control" type="text" name="orderNo" value={orderNo} onChange={(e) => onChange(e)} placeholder="Enter Order No" readOnly={true} onClick={(e) => handleView(e)} style={{ cursor: "pointer" }} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Min Temp</label>
                  <NumericFormat className="form-control text-right" name="minTemp" value={minTemp} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={2} readOnly />
                </div>
                <div className="form-group col-6">
                  <label>Max Temp</label>
                  <NumericFormat className="form-control text-right" name="maxTemp" value={maxTemp} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={2} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-12 mb-2 ">
            <div className="detail" style={{ height: "auto", minHeight: "120px", marginBottom: "10px" }}>
              <div className="subTitle">Item Detail</div>
              {status === "DRAFT" && (
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e)}>
                    <FaPlus className="mr-2" /> <span>Add</span>
                  </button>
                  <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                    <FaTimes className="mr-2" /> <span>Delete</span>
                  </button>
                </div>
              )}
              <div className="item-table">
                <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                  <thead>
                    <tr>
                      {status === "DRAFT" && <th style={{ minWidth: 40 }} className="text-center"></th>}
                      <th style={{ minWidth: 40 }} className="text-center">
                        No
                      </th>
                      <th style={{ minWidth: 120 }} className="header">
                        Product
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Name
                      </th>
                      <th style={{ minWidth: 100 }} className="header text-right">
                        Price
                      </th>
                      <th style={{ minWidth: 100 }} className="header text-right">
                        Qty
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Weight
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Volume
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Dimention
                      </th>
                      <th style={{ minWidth: 120 }} className="header text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderItem()}</tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Item Summary</div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Qty</label>
                  <NumericFormat className="form-control text-right" name="qty" value={qty} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
                <div className="form-group col-6">
                  <label>Weight</label>
                  <NumericFormat className="form-control text-right" name="weight" value={weight} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} readOnly />
                </div>
                <div className="form-group col-6">
                  <label>Volume</label>
                  <NumericFormat className="form-control text-right" name="volume" value={volume} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} readOnly />
                </div>
                <div className="form-group col-6">
                  <label>Dimention</label>
                  <NumericFormat className="form-control text-right" name="size" value={size} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Notes Information</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <textarea className="form-control notes" name="notes" value={notes} onChange={(e) => onChange(e)} placeholder="Enter Notes" readOnly={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Histories</div>
              <div className="item-table">
                <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                  <thead>
                    <tr>
                      <th style={{ minWidth: 40 }} className="text-center">
                        No
                      </th>
                      <th style={{ minWidth: 120 }} className="header">
                        Date
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderHistory()}</tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <FormWrapper allowAdd={status === "DRAFT"} allowUpdate={status === "DRAFT" || status === "CONFIRMED"} img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

ShipmentForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadCustomer: PropTypes.func,
  loadFleetCategory: PropTypes.func,
  loadFleetType: PropTypes.func,
  loadProduct: PropTypes.func,
  loadItemType: PropTypes.func,
  loadPool: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool, setAlert })(ShipmentForm);
