import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaVest } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadFleetCategory } from "../../../actions/ice";
import Select2 from "../../../components/Select2";

const FleetTypeForm = ({ user, data, loadData, addData, editData, master, loadFleetCategory }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Fleet Type";
  const img = <FaVest className="module-img" />;
  const path = "/fleet-management/fleet-type";
  const url = "fleetType";
  const role = "Fleet Management - Fleet Type";

  const [formData, setFormData] = useState({
    id: 0,
    description: "",
    fleetCategoryID: 0,
    tonase: 0,
  });

  const { description, fleetCategoryID, tonase } = formData;
  const [fleetCategoryList, setFleetCategory] = useState(null);

  useEffect(() => {
    loadFleetCategory();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadFleetCategory, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          description: data.data.description,
          fleetCategoryID: data.data.fleetCategoryID,
          tonase: data.data.tonase,
        });
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
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
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();

    if (e.target.name === "tonase") setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const element = () => {
    return (
      <div className="detail mb-2">
        <div className="subTitle">Detail Information</div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Description</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="description" value={description} onChange={(e) => onChange(e)} placeholder="Enter Description" required />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>Fleet Category</label>
            <span className="required-star">*</span>
            <Select2 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Category"} value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Tonase</label>
            <span className="required-star">*</span>
            <input className="form-control number" type="number" name="tonase" value={tonase} onChange={(e) => onChange(e)} required />
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

FleetTypeForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadFleetCategory: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadFleetCategory })(FleetTypeForm);
