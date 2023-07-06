import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

const CategoryForm = ({ user, data, loadData, addData, editData }) => {
  let { id } = useParams();

  const navigate = useNavigate();

  const title = "Category";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/category";
  const url = "Category";
  const role = "Master - Category";

  const [formData, setFormData] = useState({
    id: 0,
    code: "",
    name: "",
    type: "finish goods",
    is_active: 1

  });

  const { code, name, type, is_active } = formData;

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
          is_active: data.data.is_active,
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
          <div className="form-group col-sm-12">
            <label>Type</label>
            <span className="required-star">*</span>
            <select class="form-control" name="type" onChange={(e) => onChange(e)} value={type}>
              <option value="finish goods">Finish Goods</option>
              <option value="raw material">Raw Material</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-inline col-sm-12">
            <label className="mr-5">Status</label>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="is_active" value={0} checked={is_active == 0} onChange={(e) => onChange(e)} />
              <label class="form-check-label mr-5" >
                In Active
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="is_active" value={1} checked={is_active == 1} onChange={(e) => onChange(e)} />
              <label class="form-check-label">
                Active
              </label>
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
