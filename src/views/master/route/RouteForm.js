import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaMapMarkedAlt, FaPlus, FaTimes } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadPool } from "../../../actions/ice";
import Select2 from "../../../components/Select2";

const RouteForm = ({ user, data, loadData, addData, editData, master, loadPool }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Route";
  const img = <FaMapMarkedAlt className="module-img" />;
  const path = "/master/route";
  const url = "route";
  const role = "Master - Route";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    routeDetails: [],
  });

  const { name, routeDetails } = formData;
  const [poolList, setPool] = useState(null);

  useEffect(() => {
    loadPool();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadPool]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        let details = data.data.routeDetails;
        if (details === undefined || details === null) details = [];

        details.map((item) => {
          item.checked = false;
          return null;
        });

        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          name: data.data.name,
          routeDetails: details,
        });
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
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
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let details = routeDetails;
    if (details === undefined || details === null) details = [];

    details[index][e.target.name] = e.target.value;

    setFormData({ ...formData, routeDetails: details });
  };

  const onDetailCheck = (e, index) => {
    let details = routeDetails;
    if (details === undefined || details === null) details = [];

    let checked = details[index]["checked"];
    details[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, routeDetails: details });
  };

  const onDetailSelectChange = (e, name, index) => {
    let details = routeDetails;
    if (details === undefined || details === null) details = [];

    details[index][name] = e.id;

    setFormData({ ...formData, routeDetails: details });
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

    let details = routeDetails;
    if (details === undefined || details === null) details = [];

    details.push({
      checked: false,
      addressID: 0,
      name: "",
    });
    setFormData({ ...formData, routeDetails: details });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let details = routeDetails;
    if (details === undefined || details === null) details = [];

    let newDetail = [];

    details.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });

    setFormData({ ...formData, routeDetails: newDetail });
  };

  const renderItem = () =>
    routeDetails !== undefined &&
    routeDetails !== null &&
    routeDetails.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            <input type="checkbox" checked={item.checked} onChange={(e) => onDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <input className="form-control" type="text" name="name" value={item.name} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Name" />
          </td>
          <td className="text-left">
            <Select2 options={poolList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Pool"} value={poolList === null ? null : poolList.filter((option) => option.id === parseInt(item.addressID))} handleChange={(e) => onDetailSelectChange(e, "addressID", index)} />
          </td>
        </tr>
      );
    });

  const element = () => {
    return (
      <div className="detail mb-2">
        <div className="subTitle">Detail Information</div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Name</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Description" required />
          </div>
        </div>
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
                <th style={{ minWidth: 40, width: 40 }} className="text-center"></th>
                <th style={{ minWidth: 40, width: 40 }} className="text-center">
                  No
                </th>
                <th style={{ minWidth: 120 }} className="header">
                  Name
                </th>
                <th style={{ minWidth: 200 }} className="header">
                  Pool
                </th>
              </tr>
            </thead>
            <tbody>{renderItem()}</tbody>
          </Table>
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

RouteForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadPool: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,

  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadPool })(RouteForm);
