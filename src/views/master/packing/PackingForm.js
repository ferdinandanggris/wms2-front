import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { FaBoxOpen } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

const PackingForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Packing";
  const img = <FaBoxOpen className="module-img" />;
  const path = "/master/packing";
  const url = "packing";
  const role = "Master - Packing";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    remark: 0
  });

  const { name, remark } = formData;

  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          name: data.data.name,
          remark: data.data.remark,
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
        <div className="col-sm-12 mb-5">
          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">
              Name <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
              <input
                name="name"
                value={name}
                type="text"
                placeholder=""
                required
                onChange={(e) => onChange(e)}
                className="form-control text-left"
              />
            </div>
          </div>

          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">
              Remark
            </label>
            <div className="col-sm-10">
              <input
                name="remark"
                value={remark}
                type="number"
                placeholder=""
                onChange={(e) => onChange(e)}
                className="form-control text-left"
              />
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

PackingForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(PackingForm);
