import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaPlus, FaTimes } from "react-icons/fa";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadCustomer, loadFleetType } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { NumericFormat } from "react-number-format";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

const DefaultCostForm = ({ user, data, loadData, addData, editData, master, loadCustomer, loadFleetType }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Default Cost";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/cost-management/default-cost";
  const url = "defaultCost";
  const role = "Cost Management - Default Cost";

  const [formData, setFormData] = useState({
    id: 0,
    customerID: 0,
    originID: 0,
    destinationID: 0,
    fleetTypeID: 0,
    defaultCostDetails: [],
  });

  const { customerID, originID, destinationID, fleetTypeID, defaultCostDetails } = formData;
  const [customerList, setCustomer] = useState([]);
  const [addressList, setAddress] = useState(null);
  const [fleetTypeList, setFleetType] = useState([]);

  const typeList = [
    { id: "Qty", name: "Qty" },
    { id: "Amount", name: "Amount" },
  ];

  useEffect(() => {
    loadCustomer();
    loadFleetType({ filterSearch: null });
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadCustomer, loadFleetType]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          customerID: data.data.customerID,
          originID: data.data.originID,
          destinationID: data.data.destinationID,
          fleetTypeID: data.data.fleetTypeID,
          defaultCostDetails: data.data.defaultCostDetails,
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
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setCustomer(list);
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
  }, [master]);

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
        setAddress(list);
      }
      setFormData({ ...formData, [name]: e.id });
    } else {
      setFormData({ ...formData, [name]: e.id });
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

  const handleNewRow = (e) => {
    e.preventDefault();

    let list = defaultCostDetails;
    if (list === undefined || list === null) list = [];

    list.push({
      checked: false,
      description: "",
      type: "Amount",
      amount: 0,
    });
    setFormData({ ...formData, defaultCostDetails: list });
  };

  const onDefaultCostDetailCheck = (e, index) => {
    let list = defaultCostDetails;
    if (list === undefined || list === null) list = [];

    let checked = list[index]["checked"];
    list[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, defaultCostDetails: list });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let list = defaultCostDetails;
    if (list === undefined || list === null) list = [];

    let newDetail = [];

    list.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let list = defaultCostDetails;
    if (list === undefined || list === null) list = [];

    list[index][e.target.name] = e.target.value;
    setFormData({ ...formData, defaultCostDetails: list });
  };

  const onDetailSelectChange = (e, name, index) => {
    let details = defaultCostDetails;
    if (details === undefined || details === null) details = [];

    details[index][name] = e.id;

    setFormData({ ...formData, defaultCostDetails: details });
  };

  const renderDefaultCostDetail = () => {
    if (defaultCostDetails === undefined || defaultCostDetails === null) return null;

    return defaultCostDetails.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            <input type="checkbox" checked={item.checked !== undefined && item.checked} onChange={(e) => onDefaultCostDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <input className="form-control" type="text" name="description" value={item.description} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Description" />
          </td>
          <td className="text-left">
            <Select2 options={typeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name.toString()} placeholder={"Pick Type"} value={typeList === null ? null : typeList.filter((option) => option.id === item.type)} handleChange={(e) => onDetailSelectChange(e, "type", index)} />
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
            <div className="subTitle">Default Cost Information</div>
            <div className="row">
              <div className="form-group col-sm-4 col-6">
                <label>Customer</label>
                <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Origin</label>
                <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Origin"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(originID))} handleChange={(e) => onSelectChange(e, "originID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Destination</label>
                <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Destination"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(destinationID))} handleChange={(e) => onSelectChange(e, "destinationID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Fleet Type</label>
                <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Default Cost Detail</div>
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
                    <th style={{ minWidth: 120 }} className="header">
                      Type
                    </th>
                    <th style={{ minWidth: 50 }} className="header text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>{renderDefaultCostDetail()}</tbody>
              </Table>
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

DefaultCostForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  master: PropTypes.object,
  addData: PropTypes.func,
  editData: PropTypes.func,
  loadCostCenter: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadFleetType })(DefaultCostForm);
