import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaBox } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { NumericFormat } from "react-number-format";

const ProductForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Product";
  const img = <FaBox className="module-img" />;
  const path = "/master/product";
  const url = "product";
  const role = "Master - Product";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    unitPrice: 0,
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    volume: 0,
    size: 0,
  });

  const { name, description, unitPrice, weight, height, length, width, volume, size } = formData;

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
          description: data.data.description,
          unitPrice: data.data.unitPrice,
          weight: data.data.weight,
          height: data.data.height,
          length: data.data.length,
          width: data.data.width,
          volume: data.data.volume,
          size: data.data.size,
        });
      }
    }
  }, [id, data, setFormData]);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "height" || e.target.name === "length" || e.target.name === "width") {
      let volume = 0;
      let size = 0;
      if (e.target.name === "height") {
        volume = parseFloat(length) * parseFloat(width) * parseFloat(e.target.value);
        size = parseFloat(length) + parseFloat(width) + parseFloat(e.target.value);
      }
      if (e.target.name === "length") {
        volume = parseFloat(e.target.value) * parseFloat(width) * parseFloat(height);
        size = parseFloat(e.target.value) + parseFloat(width) + parseFloat(height);
      }
      if (e.target.name === "width") {
        volume = parseFloat(length) * parseFloat(e.target.value) * parseFloat(height);
        size = parseFloat(length) + parseFloat(e.target.value) + parseFloat(height);
      }
      volume = volume / 1000000;
      size = (size / 3) ** 3 / 1000000;

      setFormData({ ...formData, [e.target.name]: e.target.value, volume: volume, size: size });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="row">
        <div className="col-sm-6 mb-2">
          <div className="detail">
            <div className="subTitle">Detail Information</div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Name</label>
                <span className="required-star">*</span>
                <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Description</label>
                <span className="required-star">*</span>
                <input className="form-control" type="text" name="description" value={description} onChange={(e) => onChange(e)} placeholder="Enter Description" required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Unit Price</label>
                <span className="required-star">*</span>
                <NumericFormat className="form-control text-right" name="unitPrice" value={unitPrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-2">
          <div className="detail">
            <div className="subTitle">Size Information</div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Weight (kg)</label>
                <NumericFormat className="form-control text-right" name="weight" value={weight} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Height (cm)</label>
                <NumericFormat className="form-control text-right" name="height" value={height} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Length (cm)</label>
                <NumericFormat className="form-control text-right" name="length" value={length} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Width (cm)</label>
                <NumericFormat className="form-control text-right" name="width" value={width} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Volume (cbm)</label>
                <NumericFormat className="form-control text-right" name="volume" value={volume} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required readOnly />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label>Size (cbm)</label>
                <NumericFormat className="form-control text-right" name="size" value={size} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={2} required readOnly />
              </div>
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

ProductForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(ProductForm);
