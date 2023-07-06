import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaPlus, FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadCategory, loadIndustry } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";
import moment from "moment";

const CustomerForm = ({ user, data, loadData, addData, editData, master, loadCategory, loadIndustry, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Customer";
  const img = <FaUserFriends className="module-img" />;
  const path = "/customer-management/customer";
  const url = "customer";
  const role = "Customer Management - Customer";

  const [formData, setFormData] = useState({
    id: 0,
    phoneNo: "",
    email: "",
    code: "",
    name: "",
    companyName: "",
    companyAddress: "",
    taxNo: "",
    categoryID: 0,
    industryID: 0,
    isTax: false,
  });

  const { phoneNo, email, code, name, companyName, companyAddress, taxNo, categoryID, industryID, isTax } = formData;
  const [categoryList, setCategory] = useState(null);
  const [industryList, setIndustry] = useState(null);
  const [addresses, setAddress] = useState([]);
  const [contracts, setContract] = useState([]);

  useEffect(() => {
    loadCategory();
    loadIndustry();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadCategory, loadIndustry]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          phoneNo: data.data.phoneNo,
          email: data.data.email,
          code: data.data.code,
          name: data.data.name,
          companyName: data.data.companyName,
          companyAddress: data.data.companyAddress,
          taxNo: data.data.taxNo,
          categoryID: data.data.categoryID,
          industryID: data.data.industryID,
          isTax: data.data.isTax,
        });
        setAddress(data.data.addresses);
        setContract(data.data.contracts);
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.category !== undefined && master.category !== null) {
      let list = [...master.category];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Category",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setCategory(list);
    }

    if (master.industry !== undefined && master.industry !== null) {
      let list = [...master.industry];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Industry",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setIndustry(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheck = (e) => {
    setFormData({ ...formData, isTax: isTax ? false : true });
  };

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (categoryID === 0) {
      setAlert("Invalid Category", "danger");
      return;
    }

    if (industryID === 0) {
      setAlert("Invalid Industry", "danger");
      return;
    }

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

  const renderAddress = () => {
    if (addresses === undefined || addresses === null) return null;
    return addresses.map((item, index) => {
      return (
        <tr key={index} onClick={(e) => handleView(e, "address", item.id)}>
          <td className="text-center align-middle">{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.sector?.name}</td>
          <td>{item.city}</td>
        </tr>
      );
    });
  };

  const renderContract = () => {
    if (contracts === undefined || contracts === null) return null;
    return contracts.map((item, index) => {
      return (
        <tr key={index} onClick={(e) => handleView(e, "contract", item.id)}>
          <td className="text-center align-middle">{index + 1}</td>
          <td>{moment(item.startDate).format("DD MMM yyyy")}</td>
          <td>{moment(item.endDate).format("DD MMM yyyy")}</td>
          <td>{item.fleetType.description}</td>
          <td>{item.origin.name}</td>
          <td>{item.destination.name}</td>
        </tr>
      );
    });
  };

  const handleNewRow = (e, val) => {
    e.preventDefault();
    const currentPage = `/customer-management/customer/${id}/edit`;
    navigate(`/customer-management/${val}/create?return_url=${encodeURIComponent(currentPage)}`);
  };

  const handleView = (e, val, id2) => {
    e.preventDefault();
    const currentPage = `/customer-management/customer/${id}/edit`;
    navigate(`/customer-management/${val}/${id2}/edit?return_url=${encodeURIComponent(currentPage)}`);
  };

  const element = () => {
    return (
      <div className="row">
        <div className="form-group col-sm-6 mb-2">
          <div className="detail">
            <div className="subTitle">Detail Information</div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label>Name</label>
                <span className="required-star">*</span>
                <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} required placeholder="Enter Name" />
              </div>
              <div className="form-group col-sm-6">
                <label>Alias Name</label>
                <input className="form-control" type="text" name="code" value={code} onChange={(e) => onChange(e)} placeholder="Enter Alias Name" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label>Phone No</label>
                <input className="form-control" type="text" name="phoneNo" value={phoneNo} onChange={(e) => onChange(e)} placeholder="Enter Phone No" />
              </div>
              <div className="form-group col-sm-6">
                <label>Email</label>
                <input className="form-control" type="text" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter Email" />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Company Name</label>
                <input className="form-control" type="text" name="companyName" value={companyName} onChange={(e) => onChange(e)} placeholder="Enter Company Name" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Company Address</label>
                <input className="form-control" type="text" name="companyAddress" value={companyAddress} onChange={(e) => onChange(e)} placeholder="Enter Company Address" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label>Tax No</label>
                <input className="form-control" type="text" name="taxNo" value={taxNo} onChange={(e) => onChange(e)} placeholder="Enter Tax No" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <div className="d-flex flex-row">
                  <label className="switch">
                    <input type="checkbox" name="isTax" checked={isTax} onChange={(e) => onCheck(e)} />
                    <span className="slider round"></span>
                  </label>
                  <div className="remember-me">Use Tax</div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="form-group col-sm-6">
                <label>Category</label>
                <span className="required-star">*</span>
                <Select2 options={categoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Category"} value={categoryList === null ? null : categoryList.filter((option) => option.id === parseInt(categoryID))} handleChange={(e) => onSelectChange(e, "categoryID")} />
              </div>
              <div className="form-group col-sm-6">
                <label>Industry</label>
                <span className="required-star">*</span>
                <Select2 options={industryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Industry"} value={industryList === null ? null : industryList.filter((option) => option.id === parseInt(industryID))} handleChange={(e) => onSelectChange(e, "industryID")} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group col-sm-6 mb-2">
          <div className="detail">
            <div className="subTitle">Address Information</div>
            {type === "edit" && (
              <div className="row mb-2">
                <div className="col-12">
                  <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e, "address")}>
                    <FaPlus className="mr-2" /> <span>Add</span>
                  </button>
                </div>
              </div>
            )}
            <Table className="table-list" striped responsive hover>
              <thead>
                <tr>
                  <th style={{ width: 40 }} className="text-center">
                    No
                  </th>
                  <th className="header">Name</th>
                  <th className="header">Sector</th>
                  <th className="header">City</th>
                </tr>
              </thead>
              <tbody>{renderAddress()}</tbody>
            </Table>
            <hr />
            <div className="subTitle">Contracts Information</div>
            {type === "edit" && (
              <div className="row mb-2">
                <div className="col-12">
                  <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e, "contract")}>
                    <FaPlus className="mr-2" /> <span>Add</span>
                  </button>
                </div>
              </div>
            )}
            <Table className="table-list" striped responsive hover>
              <thead>
                <tr>
                  <th style={{ width: 40 }} className="text-center">
                    No
                  </th>
                  <th className="header">Start Date</th>
                  <th className="header">End Date</th>
                  <th className="header">Fleet Type</th>
                  <th className="header">Origin</th>
                  <th className="header">Destination</th>
                </tr>
              </thead>
              <tbody>{renderContract()}</tbody>
            </Table>
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

CustomerForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadCategory: PropTypes.func,
  loadIndustry: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCategory, loadIndustry, setAlert })(CustomerForm);
