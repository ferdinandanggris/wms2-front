import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";


import { loadWarehouse } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";

const GroupForm = ({ user, data, loadData, addData, editData, master, loadWarehouse }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Group";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/group";
  const url = "group";
  const role = "Master - Group";

  const [formData, setFormData] = useState({
    id: 0,
    code: "",
    name: "",
    warehouse: ""
  });

  const [warehouseList, setWarehouse] = useState([]);
  const { code, name, warehouseId } = formData;

  useEffect(() => {
    loadWarehouse();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadWarehouse]);

  useEffect(() => {
    if (master.warehouse !== undefined && master.warehouse !== null) {
      let list = [...master.warehouse];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Warehouse",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setWarehouse(list);
    }


  }, [master]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          code: data.data.code,
          name: data.data.name,
          warehouseId: data.data.warehouseId,
        });
      }
    }
  }, [id, data, setFormData]);

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

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle">Detail Information</div>

        <div className="row">
          <div className="form-group col-sm-12">
            <label>Code</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="code" value={code} onChange={(e) => onChange(e)} placeholder="Enter Code" required />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Name</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-lg-6">
            <label>Warehouse</label>
            <span className="required-star">*</span>
            <Select2 options={warehouseList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Warehouse"} value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))} handleChange={(e) => onSelectChange(e, "warehouseId")} />
          </div>
        </div>
      </div >
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

GroupForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse })(GroupForm);
