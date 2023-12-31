import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaList } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

const CategoryForm = ({ user, data, loadData, addData, editData }) => {
  let { id } = useParams();

  const navigate = useNavigate();

  const title = "Category";
  const img = <FaList className="module-img" />;
  const path = "/master/category";
  const url = "Category";
  const role = "Master - Category";

  const [formData, setFormData] = useState({
    id: 0,
    code: "",
    name: "",
    type: "finish goods",
    isActive: 1
  });

  const { code, name, type, isActive } = formData;
  const [selectedType, setSelectedType] = useState('');
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
          type: data.data.type,
          isActive: data.data.isActive,
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
            <label className="col-sm-2 col-form-label">Code <span className="required-star">*</span></label>

            <div className="col-sm-10">
              <input className="form-control" type="text" name="code" value={code} onChange={(e) => onChange(e)} placeholder="Enter Code" required />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">Name <span className="required-star">*</span></label>

            <div className="col-sm-10">
              <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
            </div>
          </div>

          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">
              Type <span className="required-star">*</span>
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                name="type"
                onChange={(e) => onChange(e)}
                required
                value={type}
              >
                <option value="" disabled>Select an option</option>
                <option value="finish goods">Finish Goods</option>
                <option value="raw material">Raw Material</option>
              </select>
            </div>
          </div>

          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-10">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isActive" value={0} checked={isActive == 0} onChange={(e) => onChange(e)} />
                <label class="form-check-label mr-5" >
                  In Active
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isActive" value={1} checked={isActive == 1} onChange={(e) => onChange(e)} />
                <label class="form-check-label">
                  Active
                </label>
              </div>
            </div>
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

CategoryForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(CategoryForm);
