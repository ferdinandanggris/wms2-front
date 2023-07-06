import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaFileInvoice, FaPlus, FaTimes } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import { loadCustomer, loadTermOfPayment, loadReadyOrder } from "../../../actions/ice";
import Select2 from "../../../components/Select2";

const InvoiceForm = ({ user, data, master, loadData, addData, editData, loadCustomer, loadTermOfPayment, loadReadyOrder }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Invoice";
  const img = <FaFileInvoice className="module-img" />;
  const path = "/finance-management/invoice";
  const url = "invoice";
  const role = "Finance Management - Invoice";

  const [formData, setFormData] = useState({
    id: 0,
    invoiceNo: "",
    referenceNo: "",
    address: "",
    taxNo: "",
    notes: "",

    customerID: 0,
    termOfPaymentID: 0,

    transDate: new Date().toISOString(),
    transDateD: new Date(),
    taxDate: null,
    taxDateD: null,
    dueDate: new Date().toISOString(),
    dueDateD: new Date(),

    orderAmount: 0,
    additionalAmount: 0,
    subTotal: 0,
    disc: 0,
    discValue: 0,
    total: 0,
    tax: 0,
    taxValue: 0,
    netto: 0,
    details: [],
    invoiceDetails: [],
  });

  const {
    invoiceNo,
    referenceNo,
    address,
    taxNo,
    notes,

    customerID,
    termOfPaymentID,

    transDate,
    transDateD,
    taxDateD,
    dueDateD,

    orderAmount,
    additionalAmount,
    subTotal,
    disc,
    discValue,
    total,
    tax,
    taxValue,
    netto,
    details,
    invoiceDetails,
  } = formData;

  const [customerList, setCustomer] = useState(null);
  const [topValue, setTopValue] = useState(0);
  const [termOfPaymentList, setTermOfPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
    loadTermOfPayment();
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          invoiceNo: data.data.invoiceNo,
          referenceNo: data.data.referenceNo,
          address: data.data.address,
          taxNo: data.data.taxNo,
          notes: data.data.notes,

          customerID: data.data.customerID,
          termOfPaymentID: data.data.termOfPaymentID,

          transDate: data.data.transDate,
          transDateD: data.data.transDate === null ? null : new Date(data.data.transDate),
          taxDate: data.data.taxDate,
          taxDateD: data.data.taxDate === null ? null : new Date(data.data.taxDate),
          dueDate: data.data.dueDate,
          dueDateD: data.data.dueDate === null ? null : new Date(data.data.dueDate),

          orderAmount: data.data.orderAmount,
          additionalAmount: data.data.additionalAmount,
          subTotal: data.data.subTotal,
          disc: data.data.disc,
          discValue: data.data.discValue,
          total: data.data.total,
          tax: data.data.tax,
          taxValue: data.data.taxValue,
          netto: data.data.netto,
          invoiceDetails: data.data.invoiceDetails,
        });
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

    if (master.termOfPayment !== undefined && master.termOfPayment !== null) {
      let list = [...master.termOfPayment];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Term Of Payment",
          id: 0,
          value: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setTermOfPayment(list);
    }
    if (loading) return;
    if (master.ready !== undefined && master.ready !== null) {
      let list = [];
      let curOrderAmount = 0;
      master.ready.current.map((item) => {
        curOrderAmount += item.subTotal;
        list.push({
          checked: true,
          id: item.id,
          customerName: item.customer.name,
          orderNo: item.voucherNo,
          referenceNo: item.referenceNo,
          departureDate: item.departureDate,
          batchNo: item.batchNo,
          origin: item.origin.name,
          destination: item.destination.name,
          subTotal: item.subTotal,
        });
      });
      master.ready.outstanding.map((item) => {
        list.push({
          checked: false,
          id: item.id,
          customerName: item.customer.name,
          orderNo: item.voucherNo,
          referenceNo: item.referenceNo,
          departureDate: item.departureDate,
          batchNo: item.batchNo,
          origin: item.origin.name,
          destination: item.destination.name,
          subTotal: item.subTotal,
        });
      });

      calculate(list, invoiceDetails, disc, 0, tax);
    }
  }, [master]);

  useEffect(() => {
    if (customerID !== undefined && customerID !== null) {
      loadReadyOrder({ customerID, id });
    }
  }, [loadReadyOrder, id, customerID]);

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

  const calculate = (list, list2, disc, discValue, tax) => {
    let curOrderAmount = 0;
    list.map((item) => {
      if (item.checked) curOrderAmount += item.subTotal;
    });

    let curAdditionalAmount = 0;
    if (list2 !== undefined && list2 !== null) {
      list2.map((item) => {
        curAdditionalAmount += changeValue(item.amount);
      });
    }

    let curTotal = curOrderAmount + curAdditionalAmount;
    let curDisc = 0;
    let curDiscValue = 0;
    if (disc !== 0) {
      curDiscValue = (curTotal * changeValue(disc)) / 100;
      curDisc = changeValue(disc);
    } else if (discValue !== 0) {
      curDisc = (changeValue(discValue) / curTotal) * 100;
      curDiscValue = changeValue(discValue);
    }

    let curDPP = curTotal - curDiscValue;
    let curTaxValue = (changeValue(tax) * curDPP) / 100;
    let curNetto = curDPP + curTaxValue;
    setFormData({ ...formData, orderAmount: curOrderAmount, additionalAmount: curAdditionalAmount, disc: curDisc, subTotal: curTotal, discValue: curDiscValue, tax: tax, taxValue: curTaxValue, total: curDPP, netto: curNetto, details: list, invoiceDetails: list2 });
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "disc") calculate(details, invoiceDetails, e.target.value, 0, tax);
    else if (e.target.name === "discValue") calculate(details, invoiceDetails, 0, e.target.value, tax);
    else if (e.target.name === "tax") calculate(details, invoiceDetails, disc, 0, e.target.value);
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    if (name === "termOfPaymentID") {
      const termOfPayment = termOfPaymentList.find((obj) => {
        return obj.id === e.id;
      });
      if (termOfPayment === undefined && termOfPayment === null) {
        setFormData({ ...formData, dueDate: transDate, dueDateD: new Date(transDate), [name]: e.id });
      } else {
        setTopValue(termOfPayment.value);
        setFormData({ ...formData, dueDate: addDays(transDateD, termOfPayment.value).toISOString(), dueDateD: addDays(transDateD, termOfPayment.value), [name]: e.id });
      }
    } else if (name === "customerID") {
      const customer = customerList.find((obj) => {
        return obj.id === e.id;
      });
      if (customer === undefined && customer === null) {
        setFormData({ ...formData, address: "", tax: 0, [name]: e.id });
      } else {
        setFormData({ ...formData, address: customer.companyAddress, tax: customer.isTax ? 11 : 0, [name]: e.id });
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    }
  };

  const onDetailCheck = (e, index) => {
    let list = details;
    if (list === undefined || list === null) return;
    list[index]["checked"] = list[index]["checked"] ? false : true;
    calculate(list, invoiceDetails, disc, 0, tax);
  };

  const handleNewRow = (e) => {
    e.preventDefault();

    let list = invoiceDetails;
    if (list === undefined || list === null) list = [];

    list.push({
      checked: false,
      description: "",
      amount: 0,
    });
    setFormData({ ...formData, invoiceDetails: list });
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let list = invoiceDetails;
    if (list === undefined || list === null) list = [];

    list[index][e.target.name] = e.target.value;

    if (e.target.name === "amount") {
      calculate(details, list, disc, 0, tax);
    } else {
      setFormData({ ...formData, invoiceDetails: list });
    }
  };

  const onInvoiceDetailCheck = (e, index) => {
    let list = invoiceDetails;
    if (list === undefined || list === null) list = [];

    let checked = list[index]["checked"];
    list[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, invoiceDetails: list });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let list = invoiceDetails;
    if (list === undefined || list === null) list = [];

    let newDetail = [];

    list.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });
    calculate(details, newDetail, disc, 0, tax);
  };

  const renderOutstanding = () => {
    if (details === undefined || details === null) return null;

    return details.map((item, index) => {
      // if (orderFilter !== "" && !item.customerName.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.orderNo.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.shipmentNo.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.origin.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.destination.toLowerCase().includes(shipmentFilter.toLowerCase()) && !item.orderType.toLowerCase().includes(shipmentFilter.toLowerCase())) return null;
      return (
        <tr key={index}>
          <td className="text-center">
            <input type="checkbox" checked={item.checked} onChange={(e) => onDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">{item.orderNo}</td>
          <td className="text-left">{item.referenceNo}</td>
          <td className="text-left">{item.batchNo}</td>
          <td className="text-left">{moment(item.departureDate).format("DD MMM YYYY HH:mm")}</td>
          <td className="text-left">{item.origin}</td>
          <td className="text-left">{item.destination}</td>
          <td className="text-right">{item.subTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
        </tr>
      );
    });
  };

  const renderInvoiceDetail = () => {
    if (invoiceDetails === undefined || invoiceDetails === null) return null;

    return invoiceDetails.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            <input type="checkbox" checked={item.checked !== undefined && item.checked} onChange={(e) => onInvoiceDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <input className="form-control" type="text" name="description" value={item.description} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Name" />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="amount" value={item.amount} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
        </tr>
      );
    });
  };

  const element = () => {
    return (
      <div className="row">
        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Invoice Information</div>
            <div className="row">
              <div className="form-group col-sm-4 col-6">
                <label>Invoice No</label>
                <input className="form-control" type="text" name="invoiceNo" value={invoiceNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Date</label>
                <DatePicker name="transDateD" selected={transDateD} className="form-control" onChange={(date) => setFormData({ ...formData, transDate: moment(date).format("YYYY-MM-DD"), transDateD: date, dueDate: addDays(date, topValue).toISOString(), dueDateD: addDays(date, topValue) })} dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group col-sm-4 col-12">
                <label>Customer</label>
                <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Term Of Payment</label>
                <Select2 options={termOfPaymentList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Term Of Payment"} value={termOfPaymentList === null ? null : termOfPaymentList.filter((option) => option.id === parseInt(termOfPaymentID))} handleChange={(e) => onSelectChange(e, "termOfPaymentID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Due Date</label>
                <DatePicker name="dueDateD" selected={dueDateD} className="form-control" onChange={(date) => setFormData({ ...formData, dueDate: moment(date).format("YYYY-MM-DD"), dueDateD: date })} dateFormat="yyyy-MM-dd" readOnly={true} />
              </div>
              <div className="form-group col-sm-4 col-12">
                <label>Reference No</label>
                <input className="form-control" type="text" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} placeholder="Enter Reference No" />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Tax No</label>
                <input className="form-control" type="text" name="taxNo" value={taxNo} onChange={(e) => onChange(e)} placeholder="Enter Reference No" />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Tax Date</label>
                <DatePicker name="taxDateD" selected={taxDateD} className="form-control" onChange={(date) => setFormData({ ...formData, taxDate: moment(date).format("YYYY-MM-DD"), taxDateD: date })} dateFormat="yyyy-MM-dd" />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Order Detail</div>
            <div className="item-table">
              <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: 40 }} className="header text-center"></th>
                    <th style={{ minWidth: 40 }} className="header text-center">
                      No
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Order #
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Reference #
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Batch #
                    </th>
                    <th style={{ minWidth: 150 }} className="header">
                      Date
                    </th>
                    <th style={{ minWidth: 150 }} className="header">
                      Origin
                    </th>
                    <th style={{ minWidth: 150 }} className="header">
                      Destination
                    </th>
                    <th style={{ minWidth: 50 }} className="header text-right">
                      Sub Total
                    </th>
                  </tr>
                </thead>
                <tbody>{renderOutstanding()}</tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Additional Order</div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e)}>
                <FaPlus className="mr-2" /> <span>Add</span>
              </button>
              <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                <FaTimes className="mr-2" /> <span>Delete</span>
              </button>
            </div>

            <div className="item-table">
              <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: 40 }} className="header text-center"></th>
                    <th style={{ minWidth: 40 }} className="header text-center">
                      No
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Description
                    </th>
                    <th style={{ minWidth: 50 }} className="header text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>{renderInvoiceDetail()}</tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-4 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Address Information</div>
            <textarea className="form-control notes" name="address" value={address} onChange={(e) => onChange(e)} placeholder="Enter Address" />
          </div>
        </div>
        <div className="form-group col-sm-4 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Notes Information</div>
            <textarea className="form-control notes" name="notes" value={notes} onChange={(e) => onChange(e)} placeholder="Enter Notes" />
          </div>
        </div>
        <div className="form-group col-sm-4 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Amount Information</div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Order</div>
              </div>
              <div className="form-group col-9">
                <NumericFormat className="form-control text-right" name="orderAmount" value={orderAmount} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Additional</div>
              </div>
              <div className="form-group col-9">
                <NumericFormat className="form-control text-right" name="additionalAmount" value={additionalAmount} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Total</div>
              </div>
              <div className="form-group col-9">
                <NumericFormat className="form-control text-right" name="subTotal" value={subTotal} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Disc</div>
              </div>
              <div className="form-group col-3">
                <NumericFormat className="form-control text-right" name="disc" value={disc} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
              </div>
              <div className="form-group col-6">
                <NumericFormat className="form-control text-right" name="discValue" value={discValue} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">DPP</div>
              </div>
              <div className="form-group col-9">
                <NumericFormat className="form-control text-right" name="total" value={total} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Tax</div>
              </div>
              <div className="form-group col-3">
                <NumericFormat className="form-control text-right" name="tax" value={tax} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
              </div>
              <div className="form-group col-6">
                <NumericFormat className="form-control text-right" name="taxValue" value={taxValue} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-3">
                <div className="label-total">Netto</div>
              </div>
              <div className="form-group col-9">
                <NumericFormat className="form-control text-right" name="netto" value={netto} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

InvoiceForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
  loadCustomer: PropTypes.func,
  loadTermOfPayment: PropTypes.func,
  loadReadyOrder: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadTermOfPayment, loadReadyOrder })(InvoiceForm);
