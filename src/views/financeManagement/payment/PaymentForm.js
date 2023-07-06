import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaReceipt } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { loadCustomer, loadAccount, loadUnpaidInvoice } from "../../../actions/ice";
import Select2 from "../../../components/Select2";

const PaymentForm = ({ user, data, master, loadData, addData, editData, loadCustomer, loadAccount, loadUnpaidInvoice }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Payment";
  const img = <FaReceipt className="module-img" />;
  const path = "/finance-management/payment";
  const url = "payment";
  const role = "Finance Management - Payment";

  const [formData, setFormData] = useState({
    id: 0,
    paymentNo: "",
    notes: "",

    customerID: 0,
    accountID: 0,

    transDate: new Date().toISOString(),
    transDateD: new Date(),

    netto: 0,
    details: [],
  });

  const { paymentNo, notes, customerID, accountID, transDate, transDateD, netto, details } = formData;

  const [customerList, setCustomer] = useState(null);
  const [accountList, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
    loadAccount();
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          paymentNo: data.data.paymentNo,
          notes: data.data.notes,

          customerID: data.data.customerID,
          accountID: data.data.accountID,

          transDate: data.data.transDate,
          transDateD: data.data.transDate === null ? null : new Date(data.data.transDate),

          netto: data.data.netto,
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

    if (master.account !== undefined && master.account !== null) {
      let list = [...master.account];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Account",
          id: 0,
          value: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setAccount(list);
    }
    if (loading) return;
    if (master.unpaid !== undefined && master.unpaid !== null) {
      let list = [];
      let curNetto = 0;
      master.unpaid.current.map((item) => {
        curNetto += item.Netto;
        list.push({
          checked: true,
          id: item.id,
          invoiceNo: item.invoiceNo,
          referenceNo: item.referenceNo,
          transDate: item.transDate,
          netto: item.netto,
        });
      });
      master.unpaid.outstanding.map((item) => {
        list.push({
          checked: false,
          id: item.id,
          invoiceNo: item.invoiceNo,
          referenceNo: item.referenceNo,
          transDate: item.transDate,
          netto: item.netto,
        });
      });

      calculate(list);
    }
  }, [master]);

  useEffect(() => {
    if (customerID !== undefined && customerID !== null) {
      loadUnpaidInvoice({ customerID, id });
    }
  }, [loadUnpaidInvoice, id, customerID]);

  const calculate = (list) => {
    let curNetto = 0;
    list.map((item) => {
      if (item.checked) curNetto += item.netto;
    });

    setFormData({ ...formData, netto: curNetto, details: list });
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
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
    calculate(list);
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
          <td className="text-left">{item.invoiceNo}</td>
          <td className="text-left">{item.referenceNo}</td>
          <td className="text-left">{moment(item.transDate).format("DD MMM YYYY")}</td>
          <td className="text-right">{item.netto.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
        </tr>
      );
    });
  };

  const element = () => {
    return (
      <div className="row">
        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Payment Information</div>
            <div className="row">
              <div className="form-group col-sm-4 col-6">
                <label>Payment No</label>
                <input className="form-control" type="text" name="paymentNo" value={paymentNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Date</label>
                <DatePicker name="transDateD" selected={transDateD} className="form-control" onChange={(date) => setFormData({ ...formData, transDate: moment(date).format("YYYY-MM-DD"), transDateD: date })} dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group col-sm-4 col-12">
                <label>Customer</label>
                <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Account</label>
                <Select2 options={accountList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Account"} value={accountList === null ? null : accountList.filter((option) => option.id === parseInt(accountID))} handleChange={(e) => onSelectChange(e, "accountID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Total Payment</label>
                <NumericFormat className="form-control text-right" name="netto" value={netto} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
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
                      Invoice #
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Reference #
                    </th>
                    <th style={{ minWidth: 150 }} className="header">
                      Date
                    </th>
                    <th style={{ minWidth: 50 }} className="header text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>{renderOutstanding()}</tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-4 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Notes Information</div>
            <textarea className="form-control notes" name="notes" value={notes} onChange={(e) => onChange(e)} placeholder="Enter Notes" />
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

PaymentForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
  loadCustomer: PropTypes.func,
  loadAccount: PropTypes.func,
  loadUnpaidInvoice: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadAccount, loadUnpaidInvoice })(PaymentForm);
