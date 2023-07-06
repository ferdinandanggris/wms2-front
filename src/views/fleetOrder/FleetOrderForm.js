import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaRoute } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";

import { loadDriver, loadFleetCategory, loadFleetType, loadFleet, loadPool, loadOutstandingShipment } from "../../actions/ice";
import Select2 from "../../components/Select2";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { setAlert } from "../../actions/alert";

const FleetOrderForm = ({ user, data, loadData, addData, editData, master, loadDriver, loadFleetCategory, loadFleetType, loadFleet, loadPool, loadOutstandingShipment, setAlert }) => {
  let { orderType, type, id } = useParams();

  const navigate = useNavigate();

  const title = "Fleet Order";
  const img = <FaRoute className="module-img" />;
  const path = "/fleet-order";
  const url = "fleetOrder";
  const role = "Fleet Order";

  const [searchParams] = useSearchParams();
  const [returnUrl, setReturnUrl] = useState(path);
  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, []);

  const [formData, setFormData] = useState({
    id: 0,
    driverID: 0,
    fleetCategoryID: 0,
    fleetTypeID: 0,
    fleetID: 0,
    poolID: 0,
    voucherNo: "",
    referenceNo: "",
    driverName: "",
    driverMobile1: "",
    driverMobile2: "",
    helperName: "",
    helperMobile1: "",
    helperMobile2: "",
    shipFrom: "",
    fleetNo: "",
    type: orderType === "int" ? "INTERNAL" : "EXTERNAL",
    deliveryTime: addDays(new Date(), 1).toISOString(),
    deliveryTimeD: addDays(new Date(), 1),
    startTime: null,
    endTime: null,
    qty: 0,
    weight: 0,
    volume: 0,
    size: 0,
    minTemp: 0,
    maxTemp: 0,
    status: "New",
    confirmedDate: null,
    startedDate: null,
    deliveredDate: null,
    canceledDate: null,
    details: [],
  });

  const {
    driverID,
    fleetCategoryID,
    fleetTypeID,
    fleetID,
    poolID,
    fleetNo,
    deliveryTimeD,

    driverName,
    driverMobile1,
    driverMobile2,
    helperName,
    helperMobile1,
    helperMobile2,

    voucherNo,
    referenceNo,
    status,

    qty,
    weight,
    volume,
    size,
    minTemp,
    maxTemp,

    confirmedDate,
    startedDate,
    deliveredDate,
    canceledDate,
    details,
  } = formData;
  const [driverList, setDriver] = useState(null);
  const [fleetCategoryList, setFleetCategory] = useState(null);
  const [fleetTypeList, setFleetType] = useState([]);
  const [fleetList, setFleet] = useState([]);
  const [poolList, setPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ftl, setFTL] = useState(0);
  const [shipmentFilter, setShipmentFilter] = useState("");

  useEffect(() => {
    loadDriver();
    loadFleetCategory();
    loadPool();
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData, loadDriver, loadFleetCategory, loadPool]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          ...formData,
          id: id === undefined ? 0 : parseInt(id),
          driverID: data.data.driverID,
          fleetCategoryID: data.data.fleetCategoryID,
          fleetTypeID: data.data.fleetTypeID,
          fleetID: data.data.fleetID,
          poolID: data.data.poolID,
          voucherNo: data.data.voucherNo,
          referenceNo: data.data.referenceNo,
          status: data.data.status,
          type: data.data.type,
          driverName: data.data.driverName,
          driverMobile1: data.data.driverMobile1,
          driverMobile2: data.data.driverMobile2,
          helperName: data.data.helperName,
          helperMobile1: data.data.helperMobile1,
          helperMobile2: data.data.helperMobile2,
          deliveryTime: data.data.deliveryTime,
          deliveryTimeD: data.data.deliveryTime === null ? null : new Date(data.data.deliveryTime),
          shipFrom: data.data.shipFrom,
          fleetNo: data.data.fleetNo,
          startTime: data.data.startTime,
          endTime: data.data.endTime,
          confirmedDate: data.data.confirmedDate,
          startedDate: data.data.startedDate,
          deliveredDate: data.data.deliveredDate,
          canceledDate: data.data.canceledDate,
        });
        setLoading(false);
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (fleetCategoryID !== undefined && fleetCategoryID !== null) loadFleetType({ filterSearch: { fleetCategoryID2: fleetCategoryID } });
  }, [loadFleetType, fleetCategoryID]);

  useEffect(() => {
    if (fleetTypeID !== undefined && fleetTypeID !== null) {
      loadFleet({ filterSearch: { fleetTypeID2: fleetTypeID } });
      loadOutstandingShipment({ fleetTypeID, id });
    }
  }, [loadFleet, id, fleetTypeID]);

  // useEffect(() => {
  //   // console.log("aaa");
  //   // if (details !== undefined && details !== null) {
  //   //   const ftl = details.find((obj) => obj.orderType === "TFL" && obj.checked);
  //   //   console.log(ftl);
  //   // }
  // }, [details]);

  useEffect(() => {
    if (master.driver !== undefined && master.driver !== null) {
      let list = [...master.driver];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Driver",
          mobileNo1: "",
          mobileNo2: "",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setDriver(list);
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
    if (master.pool !== undefined && master.pool !== null) {
      let list = [...master.pool];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Pool",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setPool(list);
    }
    if (loading) return;
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
    if (master.fleet !== undefined && master.fleet !== null) {
      let list = [...master.fleet];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          policeNo: "No Fleet",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleet(list);
    }
    if (master.shipment !== undefined && master.shipment !== null) {
      let list = [];
      let curQty = 0;
      let curWeight = 0;
      let curVolume = 0;
      let curSize = 0;
      let curMinTemp = 0;
      let curMaxTemp = 0;
      let curFTL = 0;
      master.shipment.current.map((item) => {
        curQty += item.qty;
        curWeight += item.weight;
        curVolume += item.volume;
        curSize += item.size;
        if (item.minTemp < curMinTemp || curMinTemp === 0) curMinTemp = item.minTemp;
        if (item.maxTemp > curMaxTemp || curMaxTemp === 0) curMaxTemp = item.maxTemp;
        curFTL = item.orderType === "FTL" ? 1 : 2;
        list.push({
          checked: true,
          id: item.id,
          customerName: item.customer.name,
          orderNo: item.order.voucherNo,
          shipmentNo: item.voucherNo,
          referenceNo: item.referenceNo,
          batchNo: item.batchNo,
          orderType: item.orderType,
          itemType: item.itemType.name,
          minTemp: item.minTemp,
          maxTemp: item.maxTemp,
          origin: item.origin.name,
          destination: item.destination.name,
          qty: item.qty,
          weight: item.weight,
          volume: item.volume,
          size: item.size,
        });
      });
      master.shipment.outstanding.map((item) =>
        list.push({
          checked: false,
          id: item.id,
          customerName: item.customer.name,
          orderNo: item.order.voucherNo,
          shipmentNo: item.voucherNo,
          referenceNo: item.referenceNo,
          batchNo: item.batchNo,
          orderType: item.orderType,
          itemType: item.itemType.name,
          minTemp: item.minTemp,
          maxTemp: item.maxTemp,
          origin: item.origin.name,
          destination: item.destination.name,
          qty: item.qty,
          weight: item.weight,
          volume: item.volume,
          size: item.size,
        })
      );
      setFTL(curFTL);
      setFormData({ ...formData, qty: curQty, weight: curWeight, volume: curVolume, size: curSize, minTemp: curMinTemp, maxTemp: curMaxTemp, details: list });
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    if (name === "driverID") {
      const driver = driverList.find((obj) => {
        return obj.id === e.id;
      });
      if (driver === undefined && driver === null) {
        setFormData({ ...formData, driverName: "", driverMobile1: "", driverMobile2: "", [name]: e.id });
      } else {
        setFormData({ ...formData, driverName: driver.name, driverMobile1: driver.mobileNo1, driverMobile2: driver.mobileNo2, [name]: e.id });
      }
    } else if (name === "poolID") {
      const pool = poolList.find((obj) => {
        return obj.id === e.id;
      });
      if (pool === undefined && pool === null) {
        setFormData({ ...formData, shipFrom: "", [name]: e.id });
      } else {
        setFormData({ ...formData, shipFrom: pool.name, [name]: e.id });
      }
    } else if (name === "fleetID") {
      const fleet = fleetList.find((obj) => {
        return obj.id === e.id;
      });
      if (fleet === undefined && fleet === null) {
        setFormData({ ...formData, fleetNo: "", driverID: 0, [name]: e.id });
      } else {
        const driver = driverList.find((obj) => {
          return obj.id === fleet.driverID;
        });
        if (driver === undefined && driver === null) {
          setFormData({ ...formData, fleetNo: fleet.policeNo, driverID: fleet.driverID, driverName: "", driverMobile1: "", driverMobile2: "", [name]: e.id });
        } else {
          setFormData({ ...formData, fleetNo: fleet.policeNo, driverID: fleet.driverID, driverName: driver.name, driverMobile1: driver.mobileNo1, driverMobile2: driver.mobileNo2, [name]: e.id });
        }
      }
    } else {
      setFormData({ ...formData, [name]: e.id });
    }
  };

  const onDetailCheck = (e, index) => {
    let list = details;
    if (list === undefined || list === null) return;
    list[index]["checked"] = list[index]["checked"] ? false : true;
    let curQty = 0;
    let curWeight = 0;
    let curVolume = 0;
    let curSize = 0;
    let curFTL = 0;
    let curMinTemp = 0;
    let curMaxTemp = 0;
    list.map((item) => {
      if (item.checked) {
        curQty += item.qty;
        curWeight += item.weight;
        curVolume += item.volume;
        curSize += item.size;
        if (item.minTemp < curMinTemp || curMinTemp === 0) curMinTemp = item.minTemp;
        if (item.maxTemp > curMaxTemp || curMaxTemp === 0) curMaxTemp = item.maxTemp;
        curFTL = item.orderType === "FTL" ? 1 : 2;
      }
    });
    setFTL(curFTL);
    setFormData({ ...formData, qty: curQty, weight: curWeight, volume: curVolume, size: curSize, minTemp: curMinTemp, maxTemp: curMaxTemp, details: list });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (fleetCategoryID === 0) {
      setAlert("Invalid Fleet Category", "danger");
      return;
    }

    if (fleetNo === undefined || fleetNo === null || fleetNo === "") {
      setAlert("Invalid Fleet", "danger");
      return;
    }

    if (driverName === undefined || driverName === null || driverName === "") {
      setAlert("Invalid Driver", "danger");
      return;
    }

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        navigate(`${returnUrl}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        navigate(`${returnUrl}`);
      });
    }
  };

  const renderOutstanding = () => {
    if (details === undefined || details === null) return null;

    return details.map((item, index) => {
      if (shipmentFilter !== "" && !item.customerName.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.orderNo.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.shipmentNo.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.origin.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.destination.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.orderType.toLowerCase().includes(shipmentFilter.toLowerCase())) return null;
      return (
        <tr key={index}>
          <td className="text-center">{ftl === 0 || (ftl === 1 && item.checked) || (ftl === 2 && item.orderType !== "FTL") ? <input type="checkbox" checked={item.checked} onChange={(e) => onDetailCheck(e, index)} /> : null}</td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">{item.customerName}</td>
          <td className="text-left">{item.orderNo}</td>
          <td className="text-left">{item.shipmentNo}</td>
          <td className="text-left">{item.referenceNo}</td>
          <td className="text-left">{item.batchNo}</td>
          <td className="text-left">{item.origin}</td>
          <td className="text-left">{item.destination}</td>
          <td className="text-left">{item.orderType}</td>
          <td className="text-left">{item.itemType}</td>
          <td className="text-right">{item.minTemp}</td>
          <td className="text-right">{item.maxTemp}</td>
          <td className="text-right">{item.qty}</td>
          <td className="text-right">{item.weight}</td>
          <td className="text-right">{item.volume}</td>
          <td className="text-right">{item.size}</td>
        </tr>
      );
    });
  };

  const shipmentTable = () => {
    return (
      <div className="item-table">
        <div className="form-group col-sm-6">
          <input className="form-control" type="text" name="shipmentFilter" value={shipmentFilter} onChange={(e) => setShipmentFilter(e.target.value)} placeholder="Search Order by Customer Name, Order No, Shipment No, Origin, Destination, Type" />
        </div>
        <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
          <thead>
            <tr>
              <th style={{ minWidth: 40 }} className="header text-center"></th>
              <th style={{ minWidth: 40 }} className="header text-center">
                No
              </th>
              <th style={{ minWidth: 120 }} className="header">
                Customer
              </th>
              <th style={{ minWidth: 120 }} className="header">
                Order #
              </th>
              <th style={{ minWidth: 120 }} className="header">
                Shipment #
              </th>
              <th style={{ minWidth: 120 }} className="header">
                Reference #
              </th>
              <th style={{ minWidth: 120 }} className="header">
                Batch #
              </th>
              <th style={{ minWidth: 150 }} className="header">
                Origin
              </th>
              <th style={{ minWidth: 150 }} className="header">
                Destination
              </th>
              <th style={{ minWidth: 50 }} className="header">
                Type
              </th>
              <th style={{ minWidth: 50 }} className="header">
                Item
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Min
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Max
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Qty
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Weight
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Volume
              </th>
              <th style={{ minWidth: 50 }} className="header text-right">
                Size
              </th>
            </tr>
          </thead>
          <tbody>{renderOutstanding()}</tbody>
        </Table>
      </div>
    );
  };

  const element = () => {
    return (
      <div className="row">
        <div className="form-group col-sm-12 mb-2">
          <div className="detail">
            <div className="subTitle">Detail Information</div>
            <div className="row">
              <div className="form-group col-sm-4">
                <label>Fleet Order No</label>
                <input className="form-control" type="text" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-4">
                <label>Reference No</label>
                <input className="form-control" type="text" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} placeholder="Enter Reference No" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Ship From</label>
                <Select2 options={poolList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Pool"} value={poolList === null ? null : poolList.filter((option) => option.id === parseInt(poolID))} handleChange={(e) => onSelectChange(e, "poolID")} isDisabled={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Fleet Category</label>
                <Select2 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Category"} value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} isDisabled={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Fleet Type</label>
                <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} isDisabled={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Fleet No</label>
                {orderType === "int" ? <Select2 options={fleetList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.policeNo} placeholder={"Pick Fleet"} value={fleetList === null ? null : fleetList.filter((option) => option.id === parseInt(fleetID))} handleChange={(e) => onSelectChange(e, "fleetID")} isDisabled={status === "CANCELED"} /> : <input className="form-control" type="text" name="fleetNo" value={fleetNo} onChange={(e) => onChange(e)} placeholder="Enter Fleet No" readOnly={status === "CANCELED"} />}
              </div>
              <div className="form-group col-sm-4">
                <label>Driver Name</label>
                {orderType === "int" ? <Select2 options={driverList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Driver"} value={driverList === null ? null : driverList.filter((option) => option.id === parseInt(driverID))} handleChange={(e) => onSelectChange(e, "driverID")} isDisabled={status === "CANCELED"} /> : <input className="form-control" type="text" name="driverName" value={driverName} onChange={(e) => onChange(e)} placeholder="Enter Driver Name" readOnly={status === "CANCELED"} />}
              </div>
              <div className="form-group col-sm-4">
                <label>Driver Mobile 1</label>
                <input className="form-control" type="text" name="driverMobile1" value={driverMobile1} onChange={(e) => onChange(e)} placeholder="Enter Driver Mobile 1" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Driver Mobile 2</label>
                <input className="form-control" type="text" name="driverMobile2" value={driverMobile2} onChange={(e) => onChange(e)} placeholder="Enter Driver Mobile 2" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Helper Name</label>
                <input className="form-control" type="text" name="helperName" value={helperName} onChange={(e) => onChange(e)} placeholder="Enter Helper Name" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Helper Mobile 1</label>
                <input className="form-control" type="text" name="helperMobile1" value={helperMobile1} onChange={(e) => onChange(e)} placeholder="Enter Helper Mobile 1" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Helper Mobile 2</label>
                <input className="form-control" type="text" name="helperMobile2" value={helperMobile2} onChange={(e) => onChange(e)} placeholder="Enter Helper Mobile 2" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Delivery Plan</label>
                <DatePicker name="deliveryTime" selected={deliveryTimeD} className="form-control" onChange={(date) => setFormData({ ...formData, deliveryTime: moment(date).format("YYYY-MM-DDTHH:mm:ss"), deliveryTimeD: date })} showTimeSelect excludeDateIntervals={[{ start: subDays(new Date(), 365), end: new Date() }]} dateFormat="yyyy-MM-dd HH:mm:ss" readOnly={status === "CANCELED"} />
              </div>
              <div className="form-group col-sm-4">
                <label>Status</label>
                <input className="form-control" type="text" name="status" value={status} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-12 mb-2">
          <div className="detail">
            <div className="subTitle">Item Information</div>
            <div className="row">
              <div className="form-group col-sm-2">
                <label>Qty</label>
                <input className="form-control text-right" type="text" name="qty" value={qty} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-2">
                <label>Weight</label>
                <input className="form-control text-right" type="text" name="weight" value={weight} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-2">
                <label>Volume</label>
                <input className="form-control text-right" type="text" name="volume" value={volume} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-2">
                <label>Size</label>
                <input className="form-control text-right" type="text" name="size" value={size} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-2">
                <label>Min Temp</label>
                <input className="form-control text-right" type="text" name="minTemp" value={minTemp} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-2">
                <label>Max Temp</label>
                <input className="form-control text-right" type="text" name="maxTemp" value={maxTemp} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-12 mb-2">
          <div className="detail">
            <div className="subTitle">Date Information</div>
            <div className="row">
              <div className="form-group col-sm-3">
                <label>Confirmed</label>
                <input className="form-control" type="text" name="confirmedDate" value={confirmedDate === null ? "" : moment(confirmedDate).format("DD MMM YYYY (HH:mm)")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-3">
                <label>Started</label>
                <input className="form-control" type="text" name="startedDate" value={startedDate === null ? "" : moment(startedDate).format("DD MMM YYYY (HH:mm)")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-3">
                <label>Delivered</label>
                <input className="form-control" type="text" name="deliveredDate" value={deliveredDate === null ? "" : moment(deliveredDate).format("DD MMM YYYY (HH:mm)")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-3">
                <label>Canceled</label>
                <input className="form-control" type="text" name="canceledDate" value={canceledDate === null ? "" : moment(canceledDate).format("DD MMM YYYY (HH:mm)")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
            </div>
          </div>
        </div>
        {status !== "CANCELED" && (
          <div className="form-group col-sm-12 mb-2">
            <div className="detail">
              <div className="subTitle">Order List</div>
              {shipmentTable()}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

FleetOrderForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadDriver: PropTypes.func,
  loadFleetCategory: PropTypes.func,
  loadFleetType: PropTypes.func,
  loadFleet: PropTypes.func,
  loadPool: PropTypes.func,
  loadOutstandingShipment: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadDriver, loadFleetCategory, loadFleetType, loadFleet, loadPool, loadOutstandingShipment, setAlert })(FleetOrderForm);
