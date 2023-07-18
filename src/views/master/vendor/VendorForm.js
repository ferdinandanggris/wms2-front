import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";

const VendorForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Vendor";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/vendor";
  const url = "vendor";
  const role = "Master - Vendor";

  const [formData, setFormData] = useState({
    id: 0,
    code: "",
    name: "",
    kategori: "",
  });

  const { code, name, kategori } = formData;

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
          kategori: data.data.kategori,
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

  const kategoriList = [
    { id: "Karton Box", name: "Karton Box" },
    { id: "Cap", name: "Cap" },
    { id: "Pewarna", name: "Pewarna" },
    { id: "Plastik", name: "Plastik" },
    { id: "Resin", name: "Resin" },
    { id: "Trass", name: "Trass" },
  ];
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
            <label className="col-sm-2 col-form-label">Kategori</label>
            <div className="col-sm-10">
              <Select2 options={kategoriList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick kategori"} value={kategoriList === null ? null : kategoriList.filter((option) => option.id === kategori)} handleChange={(e) => onSelectChange(e, 'kategori')} isDisabled={false} />
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

VendorForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(VendorForm);
