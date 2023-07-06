import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaArchive, FaBoxes, FaCarAlt, FaCarSide, FaPeopleCarry, FaPlus, FaTimes, FaTruckPickup, FaVoteYea, FaWindowClose } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";

import { loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool, loadRoute, getPrice, getDistance } from "../../actions/ice";
import Select2 from "../../components/Select2";
import { setAlert } from "../../actions/alert";

import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import "react-datepicker/dist/react-datepicker.css";

import { Wrapper } from "@googlemaps/react-wrapper";
import { googleAPI } from "../../utility/config";
import MapComponent from "./MapComponent";

const OrderForm = ({ user, data, loadData, addData, editData, master, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool, loadRoute, setAlert, getPrice, getDistance }) => {
  let { type, id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const title = "Order";
  const img = <FaCarAlt className="module-img" />;
  const path = "/order";
  const url = "order";
  const role = "Order";

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
    routeType: "",
    notes: "",
    status: "DRAFT",
    orderType: "FTL",
    departureDate: addDays(new Date(), 1).toISOString(),
    departureDateD: addDays(new Date(), 1),
    customerID: 0,
    fleetCategoryID: 0,
    fleetTypeID: 0,
    itemTypeID: 0,
    routeID: 1,
    originID: 0,
    destinationID: 0,
    distance: 0,
    minTemp: 0,
    maxTemp: 0,
    unitPrice: 0,
    point: 0,
    additionalPrice: 0,
    qty: 0,
    weight: 0,
    volume: 0,
    size: 0,
    subTotal: 0,
    tax: 0,
    taxValue: 0,
    netto: 0,
    invoiceNo: "",
    invoiceDate: null,
    paymentNo: "",
    paymentDate: null,
    orderDetails: [],
    shipments: [],
    orderHistories: [],
  });

  const { voucherNo, referenceNo, batchNo, routeType, notes, status, orderType, departureDateD, customerID, fleetCategoryID, itemTypeID, routeID, fleetTypeID, originID, destinationID, minTemp, maxTemp, unitPrice, point, additionalPrice, qty, weight, volume, size, subTotal, tax, taxValue, netto, orderDetails, shipments, orderHistories, invoiceNo, invoiceDate, paymentNo, paymentDate } = formData;
  const [distance, setDistance] = useState(0);
  const [customerList, setCustomer] = useState(null);
  const [fleetCategoryList, setFleetCategory] = useState(null);
  const [fleetTypeList, setFleetType] = useState(null);
  const [productList, setProduct] = useState(null);
  const [itemTypeList, setItemType] = useState(null);
  const [poolList, setPool] = useState(null);
  const [routeList, setRoute] = useState(null);
  const [addressList, setAddress] = useState(null);
  const [levelStatus, setLevelStatus] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [transitList, setTransit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ltl, setLTL] = useState(false);
  const [price, setPrice] = useState(0);
  const [maxPoint, setMaxPoint] = useState(0);
  const [addPrice, setAddPrice] = useState(0);

  const orderTypeList = [
    { id: "LTL", name: "LTL" },
    { id: "FTL", name: "FTL" },
  ];

  const mapProps = {
    apiKey: googleAPI,
    libraries: ["places"],
  };

  useEffect(() => {
    loadCustomer();
    loadFleetCategory();
    loadProduct();
    loadItemType();
    loadRoute();
    loadPool();
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadRoute]);

  useEffect(() => {
    if (fleetCategoryID !== undefined && fleetCategoryID !== null) loadFleetType({ filterSearch: { fleetCategoryID2: fleetCategoryID } });
  }, [loadFleetType, fleetCategoryID]);

  useEffect(() => {
    if (loading) return;
    if (originID !== undefined && originID !== null && originID > 0 && destinationID !== undefined && destinationID !== null && destinationID > 0) {
      if (addressList !== undefined && addressList !== null) {
        const origin = addressList.find((obj) => obj.id === originID);
        const destination = addressList.find((obj) => obj.id === destinationID);
        getDistance({
          origin,
          destination,
          routeID,
        }).then((data) => {
          if (data !== undefined && data != null) setDistance(data.distance);
        });
      }
    }
  }, [originID, destinationID, routeID]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        let details = data.data.orderDetails;
        if (details === undefined || details === null) details = [];

        details.map((item) => {
          item.checked = false;
          return null;
        });

        setFormData({
          ...formData,
          id: id === undefined ? 0 : parseInt(id),
          voucherNo: data.data.voucherNo,
          referenceNo: data.data.referenceNo,
          batchNo: data.data.batchNo,
          routeType: data.data.routeType,
          notes: data.data.notes,
          status: data.data.status,
          orderType: data.data.orderType,
          departureDate: data.data.departureDate,
          departureDateD: data.data.departureDate === null ? null : new Date(data.data.departureDate),
          customerID: data.data.customerID,
          fleetCategoryID: data.data.fleetCategoryID,
          fleetTypeID: data.data.fleetTypeID,
          itemTypeID: data.data.itemTypeID,
          routeID: data.data.routeID,
          minTemp: data.data.minTemp,
          maxTemp: data.data.maxTemp,
          unitPrice: data.data.unitPrice,
          point: data.data.point,
          additionalPrice: data.data.additionalPrice,
          originID: data.data.originID,
          destinationID: data.data.destinationID,
          distance: data.data.distance,
          qty: data.data.qty,
          weight: data.data.weight,
          volume: data.data.volume,
          size: data.data.size,
          subTotal: data.data.subTotal,
          tax: data.data.tax,
          taxValue: data.data.taxValue,
          netto: data.data.netto,
          invoiceNo: data.data.invoiceNo === null ? "" : data.data.invoiceNo,
          invoiceDate: data.data.invoiceDate === null ? null : data.data.invoiceDate,
          paymentNo: data.data.paymentNo === null ? "" : data.data.paymentNo,
          paymentDate: data.data.paymentDate === null ? null : data.data.paymentDate,
          orderDetails: details,
          shipments: data.data.shipments,
          orderHistories: data.data.orderHistories,
        });

        if (data.data.customer !== undefined && data.data.customer !== null) {
          if (data.data.customer.addresses !== undefined && data.data.customer.addresses !== null) {
            let list = [];
            data.data.customer.addresses.map((item) => {
              list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
              return null;
            });
            setAddress(list);
          }
        }
        setLoading(false);
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

    if (master.route !== undefined && master.route !== null) {
      let list = [...master.route];
      setRoute(list);
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
            if (item.isDeleted === null) list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
            return null;
          });
        }
        if (poolList !== undefined && poolList !== null) {
          poolList.map((item) => {
            list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
            return null;
          });
        }
        setAddress(list);
      }
    }
  }, [customerList, poolList, customerID, setAddress]);

  useEffect(() => {
    if (addressList !== undefined && addressList !== null) {
      if (originID !== undefined && originID !== null) {
        const address = addressList.find((obj) => {
          return obj.id === originID;
        });
        setOrigin(address);
      }
      if (destinationID !== undefined && destinationID !== null) {
        const address = addressList.find((obj) => {
          return obj.id === destinationID;
        });
        setDestination(address);
      }
    }
  }, [addressList, originID, destinationID]);

  const statusList = [
    { title: "Draft", value: "DRAFT", level: 0, icon: <FaArchive /> },
    { title: "Confirmed", value: "CONFIRMED", level: 1, icon: <FaVoteYea /> },
    { title: "Pick Up", value: "PICKUP", level: 2, icon: <FaTruckPickup /> },
    { title: "In Hub", value: "INHUB", level: 3, icon: <FaBoxes /> },
    { title: "Delivery", value: "DELIVERY", level: 4, icon: <FaCarSide /> },
    { title: "Closed", value: "CLOSED", level: 5, icon: <FaPeopleCarry /> },
    { title: "Canceled", value: "CANCELED", level: 6, icon: <FaWindowClose /> },
  ];

  useEffect(() => {
    if (status === undefined || status === null) setLevelStatus(statusList[0]);
    else setLevelStatus(statusList.find((obj) => obj.value === status));
  }, [status, setLevelStatus]);

  const calculatePrice = (taxPerc, name, sID, originID, destinationID, routeID, fleetTypeID, customerID, unitPrice, additionalPrice, details) => {
    if (fleetTypeID !== undefined && fleetTypeID !== null && fleetTypeID > 0 && originID !== undefined && originID !== null && originID > 0 && destinationID !== undefined && destinationID !== null && destinationID > 0 && customerID !== undefined && customerID !== null && customerID && routeID !== undefined && routeID !== null && routeID > 0) {
      if (addressList === undefined || addressList === null) {
        return calculate(details, taxPerc, unitPrice, point, additionalPrice, name, sID);
      }
      if (details === undefined || details === null) details = [];

      const origin = addressList.find((obj) => obj.id === originID);
      const destination = addressList.find((obj) => obj.id === destinationID);

      getPrice({
        origin,
        destination,
        routeID,
        fleetTypeID,
        customerID,
        orderDetails: details,
      }).then((data) => {
        setPrice(data.unitPrice);
        setMaxPoint(data.maxPoint);
        setAddPrice(data.addPrice);
        calculate(data.orderDetails, taxPerc, data.unitPrice, point, additionalPrice, name, sID);
      });
    } else {
      calculate(details, taxPerc, unitPrice, point, additionalPrice, name, sID);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "radius" || e.target.name === "latitude" || e.target.name === "longitude") setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    else if (e.target.name === "unitPrice") calculate(orderDetails, tax, e.target.value, point, additionalPrice, null, 0);
    else if (e.target.name === "point") calculate(orderDetails, tax, unitPrice, e.target.value, additionalPrice, null, 0);
    else if (e.target.name === "additionalPrice") calculate(orderDetails, tax, unitPrice, point, e.target.value, null, 0);
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculate = (itemDetails, taxPerc, unitPriceAmt, pointAmt, additionalPriceAmt, name, sID) => {
    let totQty = 0;
    let totWeight = 0;
    let totVolume = 0;
    let totSize = 0;
    let subTotal = 0;

    let unitPrice = changeValue(unitPriceAmt);
    let point = changeValue(pointAmt);
    let additionalPrice = changeValue(additionalPriceAmt);
    if (maxPoint > 0) {
      let diff = point - maxPoint;
      if (diff < 0) diff = 0;
      additionalPrice = diff * addPrice;
    }

    if (itemDetails !== undefined && itemDetails !== null) {
      itemDetails.map((item) => {
        let qty = changeValue(item.qty);
        let length = changeValue(item.length);
        let width = changeValue(item.width);
        let height = changeValue(item.height);
        let volumeRatio = changeValue(item.volumeRatio);
        let volumePrice = changeValue(item.volumePrice);
        let sizeRatio = changeValue(item.sizeRatio);
        let sizePrice = changeValue(item.sizePrice);
        let weight = changeValue(item.weight);
        let weightPrice = changeValue(item.weightPrice);
        let unitPriceDetail = changeValue(item.unitPrice);

        item.qty = qty;
        item.length = length;
        item.width = width;
        item.height = height;
        item.volumeRatio = volumeRatio;
        item.volumePrice = volumePrice;
        item.sizeRatio = sizeRatio;
        item.sizePrice = sizePrice;
        item.weight = weight;
        item.weightPrice = weightPrice;
        item.unitPrice = unitPriceDetail;

        item.volume = (length * width * height) / 1000000;
        item.totalVolume = parseFloat(item.volume) * qty;
        let total = parseFloat(item.totalVolume) * volumeRatio * volumePrice;

        item.size = ((length + width + height) / 3) ** 3 / 1000000;
        item.totalSize = parseFloat(item.size) * qty;
        if (parseFloat(item.totalSize) * sizeRatio * sizePrice > total) total = parseFloat(item.totalSize) * sizeRatio * sizePrice;

        item.totalWeight = weight * qty;
        if (parseFloat(item.totalWeight) * weightPrice > total) total = parseFloat(item.totalWeight) * weightPrice;
        if (qty * unitPriceDetail > total) total = qty * unitPriceDetail;

        item.total = Math.round(total * 100) / 100;

        totQty += item.qty;
        totWeight += item.totalWeight;
        totVolume += item.totalVolume;
        totSize += item.totalSize;
        subTotal += item.total;
      });
    }

    if (subTotal < unitPrice + additionalPrice) subTotal = unitPrice + additionalPrice;

    let taxValue = (subTotal * taxPerc) / 100;
    let netto = subTotal + taxValue;

    if (name === null)
      setFormData({
        ...formData,
        weight: totWeight,
        volume: totVolume,
        qty: totQty,
        size: totSize,
        unitPrice: unitPrice,
        point: point,
        additionalPrice: additionalPrice,
        subTotal: subTotal,
        tax: taxPerc,
        taxValue: taxValue,
        netto: netto,
        orderDetails: itemDetails,
      });
    else
      setFormData({
        ...formData,
        weight: totWeight,
        volume: totVolume,
        qty: totQty,
        size: totSize,
        unitPrice: unitPrice,
        point: point,
        additionalPrice: additionalPrice,
        subTotal: subTotal,
        tax: taxPerc,
        taxValue: taxValue,
        netto: netto,
        orderDetails: itemDetails,
        [name]: sID,
      });
  };

  const changeValue = (obj) => {
    if (typeof obj === "string") {
      let result = obj.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      return parseFloat(result);
    }
    if (typeof obj === "number") return obj;
    return 0;
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    details[index][e.target.name] = e.target.value;

    if (e.target.name === "length" || e.target.name === "width" || e.target.name === "height" || e.target.name === "weight") {
      calculatePrice(tax, null, 0, originID, destinationID, routeID, fleetTypeID, customerID, unitPrice, additionalPrice, details);
    } else {
      calculate(details, tax, unitPrice, point, additionalPrice, null, 0);
    }
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
          list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
          return null;
        });
        if (poolList !== undefined && poolList !== null) {
          poolList.map((item) => {
            list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
            return null;
          });
        }
        setAddress(list);
      }

      let taxVal = 0;
      if (customer.isTax === undefined || customer.isTax === null || !customer.isTax) taxVal = 0;
      else taxVal = 11;

      calculatePrice(taxVal, name, e.id, originID, destinationID, routeID, fleetTypeID, e.id, unitPrice, additionalPrice, orderDetails);
    } else if (name === "originID") {
      if (addressList !== undefined && addressList !== null) {
        const address = addressList.find((obj) => {
          return obj.id === e.id;
        });
        setOrigin(address);
        calculatePrice(tax, name, e.id, destinationID, routeID, fleetTypeID, customerID, unitPrice, additionalPrice, orderDetails);
      }
    } else if (name === "destinationID") {
      if (addressList !== undefined && addressList !== null) {
        const address = addressList.find((obj) => {
          return obj.id === e.id;
        });
        setDestination(address);
        calculatePrice(tax, name, e.id, originID, e.id, routeID, fleetTypeID, customerID, unitPrice, additionalPrice, orderDetails);
      }
    } else if (name === "routeID") {
      const route = master.route.find((obj) => {
        return obj.id === e.id;
      });
      setTransit(route.routeDetails);
      calculatePrice(tax, name, e.id, originID, destinationID, e.id, fleetTypeID, customerID, unitPrice, additionalPrice, orderDetails);
    } else if (name === "fleetTypeID") {
      calculatePrice(tax, name, e.id, originID, destinationID, routeID, e.id, customerID, unitPrice, additionalPrice, orderDetails);
    } else if (name === "itemTypeID") {
      const itemType = itemTypeList.find((obj) => {
        return obj.id === e.id;
      });
      if (itemType === undefined && itemType === null) return;

      setFormData({ ...formData, [name]: e.id, minTemp: itemType.minTemp, maxTemp: itemType.maxTemp });
    } else if (name === "orderType") {
      setLTL(e.id === "LTL");
      if (e.id === "LTL") calculate(orderDetails, tax, 0, 0, 0, name, e.id);
      else calculate(orderDetails, tax, price, point, additionalPrice, name, e.id);
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

      details[index]["weight"] = product.weight;
      details[index]["length"] = product.length;
      details[index]["width"] = product.width;
      details[index]["height"] = product.height;
      details[index]["volume"] = product.volume;
      details[index]["unitPrice"] = product.unitPrice;
      details[index]["size"] = product.size;

      calculatePrice(tax, null, 0, originID, destinationID, routeID, fleetTypeID, customerID, unitPrice, additionalPrice, details);
    }
  };

  const onDetailCheck = (e, index) => {
    let details = orderDetails;
    if (details === undefined || details === null) details = [];

    let checked = details[index]["checked"];
    details[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, orderDetails: details });
  };

  const handleView = (e, id) => {
    e.preventDefault();
    navigate(`/shipment/${id}/edit?return_url=${encodeURIComponent(location.pathname)}`);
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
      length: 0,
      width: 0,
      height: 0,
      volume: 0,
      totalVolume: 0,
      volumeRatio: 1,
      volumePrice: 0,
      size: 0,
      totalSize: 0,
      sizeRatio: 1,
      sizePrice: 0,
      weight: 0,
      totalWeight: 0,
      weightPrice: 0,
      unitPrice: 0,
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
    calculate(newDetail, tax, unitPrice, point, additionalPrice, null, 0);
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

    setFormData({ ...formData, distance: distance });

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

  const renderShipment = () =>
    shipments !== undefined &&
    shipments !== null &&
    shipments.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">{moment(item.deliveryDate).format("DD-MMM-YYYY HH:mm")}</td>
          <td className="text-left" onClick={(e) => handleView(e, item.id)} style={{ cursor: "pointer" }}>
            {item.voucherNo}
          </td>
          <td className="text-left">{item.routeType}</td>
          <td className="text-left">{item.status}</td>
        </tr>
      );
    });

  const renderHistory = () =>
    orderHistories !== undefined &&
    orderHistories !== null &&
    orderHistories.map((item, index) => {
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
          <td className="text-center">
            <input type="checkbox" checked={item.checked !== undefined && item.checked} onChange={(e) => onDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <Select2 options={productList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Product"} value={productList === null ? null : productList.filter((option) => option.id === parseInt(item.productID))} handleChange={(e) => onDetailSelectChange(e, "productID", index)} />
          </td>
          <td className="text-left">
            <input className="form-control" type="text" name="name" value={item.name} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Name" />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="qty" value={item.qty} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="length" value={item.length} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={2} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="width" value={item.width} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={2} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="height" value={item.height} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={2} />
          </td>
          <td className="text-right">{item.volume.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="volumePrice" value={item.volumePrice} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
          <td className="text-right">{item.size.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="sizePrice" value={item.sizePrice} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="weight" value={item.weight} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={2} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="weightPrice" value={item.weightPrice} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="unitPrice" value={item.unitPrice} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
          <td className="text-right">{item.total.toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
        </tr>
      );
    });

  const renderMap = () => {
    return (
      <Wrapper apiKey={mapProps.apiKey} libraries={mapProps.libraries}>
        <MapComponent oList={origin} dList={destination} />
      </Wrapper>
    );
  };

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
                  <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
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
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Origin"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(originID))} handleChange={(e) => onSelectChange(e, "originID")} />
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
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Destination"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(destinationID))} handleChange={(e) => onSelectChange(e, "destinationID")} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Order Information</div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Order No</label>
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
                  <input className="form-control" type="text" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} placeholder="Enter Reference No" />
                </div>
                <div className="form-group col-6">
                  <label>Batch No</label>
                  <input className="form-control" type="text" name="batchNo" value={batchNo} onChange={(e) => onChange(e)} placeholder="Enter Batch No" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Departure Date</label>
                  <span className="required-star">*</span>
                  <DatePicker name="departureDateD" selected={departureDateD} className="form-control" onChange={(date) => setFormData({ ...formData, departureDate: moment(date).format("YYYY-MM-DDTHH:mm:ss"), departureDateD: date })} showTimeSelect excludeDateIntervals={[{ start: subDays(new Date(), 365), end: new Date() }]} dateFormat="yyyy-MM-dd HH:mm" />
                </div>
                <div className="form-group col-6">
                  <label>Order Type</label>
                  <Select2 options={orderTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Order Type"} value={orderTypeList === null ? null : orderTypeList.filter((option) => option.id === orderType)} handleChange={(e) => onSelectChange(e, "orderType")} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-4">
                  <label>Unit Price</label>
                  <span className="required-star">*</span>
                  <NumericFormat className="form-control text-right" name="unitPrice" value={unitPrice} onChange={(e) => onChange(e)} thousandSeparator="," readOnly={ltl} />
                </div>
                <div className="form-group col-4">
                  <label>Drop Point</label>
                  <NumericFormat className="form-control text-right" name="point" value={point} onChange={(e) => onChange(e)} thousandSeparator="," readOnly={ltl} />
                </div>
                <div className="form-group col-4">
                  <label>Additional Price</label>
                  <NumericFormat className="form-control text-right" name="additionalPrice" value={additionalPrice} onChange={(e) => onChange(e)} thousandSeparator="," readOnly={ltl} />
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
                  <Select2 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Category"} value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} />
                </div>
                <div className="form-group col-6">
                  <label>Fleet Type</label>
                  <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Route</label>
                  <Select2 options={routeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Route"} value={routeList === null ? null : routeList.filter((option) => option.id === parseInt(routeID))} handleChange={(e) => onSelectChange(e, "routeID")} />
                </div>
                <div className="form-group col-6">
                  <label>Item Type</label>
                  <Select2 options={itemTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Item Type"} value={itemTypeList === null ? null : itemTypeList.filter((option) => option.id === parseInt(itemTypeID))} handleChange={(e) => onSelectChange(e, "itemTypeID")} />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-4">
                  <label>Distance (km)</label>
                  <span className="required-star">*</span>
                  <input className="form-control" type="text" name="distance" value={distance} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                </div>
                <div className="form-group col-4">
                  <label>Min Temp</label>
                  <NumericFormat className="form-control text-right" name="minTemp" value={minTemp} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={2} readOnly />
                </div>
                <div className="form-group col-4">
                  <label>Max Temp</label>
                  <NumericFormat className="form-control text-right" name="maxTemp" value={maxTemp} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={2} readOnly />
                </div>
              </div>
              {invoiceNo !== "" && (
                <div className="row">
                  <div className="form-group col-6">
                    <label>Invoice No</label>
                    <input className="form-control" type="text" name="invoiceNo" value={invoiceNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                  </div>
                  <div className="form-group col-6">
                    <label>Invoice Date</label>
                    <input className="form-control" type="text" name="invoiceDate" value={invoiceDate === null ? "" : moment(invoiceDate).format("DD MMM YYYY")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                  </div>
                </div>
              )}
              {paymentNo !== "" && (
                <div className="row">
                  <div className="form-group col-6">
                    <label>Payment No</label>
                    <input className="form-control" type="text" name="paymentNo" value={paymentNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                  </div>
                  <div className="form-group col-6">
                    <label>Payment Date</label>
                    <input className="form-control" type="text" name="paymentDate" value={paymentDate === null ? "" : moment(paymentDate).format("DD MMM YYYY")} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-group col-sm-12 mb-2">
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
                        <br />
                        &nbsp;
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Product
                        <br />
                        &nbsp;
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Description
                        <br />
                        &nbsp;
                      </th>
                      <th style={{ minWidth: 100 }} className="header text-right">
                        Qty
                        <br />
                        &nbsp;
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Length
                        <br />
                        (cm)
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Width
                        <br />
                        (cm)
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Height
                        <br />
                        (cm)
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Volume
                        <br />
                        (cbm)
                      </th>
                      <th style={{ minWidth: 150 }} className="header text-right">
                        Volume
                        <br />
                        Price
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Size
                        <br />
                        (cm)
                      </th>
                      <th style={{ minWidth: 150 }} className="header text-right">
                        Size
                        <br />
                        Price
                      </th>
                      <th style={{ minWidth: 80 }} className="header text-right">
                        Weight
                        <br />
                        (kg)
                      </th>
                      <th style={{ minWidth: 150 }} className="header text-right">
                        Weight
                        <br />
                        Price
                      </th>
                      <th style={{ minWidth: 150 }} className="header text-right">
                        Pcs
                        <br />
                        Price
                      </th>
                      <th style={{ minWidth: 100 }} className="header text-right">
                        Amount
                        <br />
                        (Rp)
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
                  <label>Size (cm)</label>
                  <NumericFormat className="form-control text-right" name="size" value={size} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} readOnly />
                </div>
              </div>
              <hr />
              <div className="subTitle">Commercial</div>
              <div className="row">
                <div className="form-group col-sm-4">&nbsp;</div>
                <div className="form-group col-sm-8">
                  <label>Sub Total</label>
                  <NumericFormat className="form-control text-right" name="subTotal" value={subTotal} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label>Tax</label>
                  <NumericFormat className="form-control text-right" name="tax" value={tax} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
                <div className="form-group col-sm-8">
                  <label>Tax Value</label>
                  <NumericFormat className="form-control text-right" name="taxValue" value={taxValue} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-4">&nbsp;</div>
                <div className="form-group col-sm-8">
                  <label>Total</label>
                  <NumericFormat className="form-control text-right" name="netto" value={netto} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-8 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Map Information</div>
              {renderMap()}
            </div>
          </div>
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Notes Information</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <textarea className="form-control notes" name="notes" value={notes} onChange={(e) => onChange(e)} placeholder="Enter Notes" />
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
          <div className="form-group col-sm-4 mb-2">
            <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
              <div className="subTitle">Shipments</div>
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
                        Shipment No
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Route Type
                      </th>
                      <th style={{ minWidth: 200 }} className="header">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderShipment()}</tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

OrderForm.propTypes = {
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
  loadRoute: PropTypes.func,
  loadPool: PropTypes.func,
  setAlert: PropTypes.func,
  getPrice: PropTypes.func,
  getDistance: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadFleetCategory, loadFleetType, loadProduct, loadItemType, loadPool, loadRoute, setAlert, getPrice, getDistance })(OrderForm);
