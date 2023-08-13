import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import ListTransaction from "../customComponent/listTransaction";

const WarehouseForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Warehouse";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/warehouse";
  const url = "warehouse";
  const role = "Master - Warehouse";

  const [formData, setFormData] = useState({
    id: 0,
    code: "",
    name: "",
    occupancy: "",
  });

  const { code, name, occupancy } = formData;

  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          code: data.data.code,
          name: data.data.name,
          occupancy: data.data.occupancy,
          initial: data.data.initial,
          incoming: data.data.incoming,
          outgoing: data.data.outgoing,
          balance: data.data.balance,
        });
      }
    }
  }, [id, data, setFormData]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2 ">
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">
              Code <span className="required-star">*</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" type="text" name="code" value={code} onChange={(e) => onChange(e)} placeholder="Enter Code" required />
            </div>
          </div>
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">
              Name <span className="required-star">*</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
            </div>
          </div>
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">
              Occupancy <span className="required-star">*</span>
            </label>
            <div className="col-sm-4">
              <input className="form-control" type="text" name="occupancy" value={occupancy} onChange={(e) => onChange(e)} placeholder="Enter Occupancy" required />
            </div>
          </div>

        </div>

        <div className="mt-5">
          <ListTransaction id={id} listType="warehouse" formData={formData} />
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

WarehouseForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { loadData, addData, editData })(WarehouseForm);
