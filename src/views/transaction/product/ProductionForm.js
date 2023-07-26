import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";



const ProductionForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = " Production Form";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path ="/transaction/production/:id?/:type";
    const url = "Customer";
    const role = "transaction - ProductionForm";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        name: "",
        country: 0,
        pic: "",
        mobile1: "",
        mobile2: "",
        email: "",
        web: "",
        paymentTerm: "",
        customerType: "",
        nik: "",
        npwp: "",
        taxType: "",
        tax1: "",
        tax2: "",
        virtualAccount: "",
        seller: "",
        isActive: 1,

        billingAddress: "",
        billingPostalCode: "",
        billingPhone: "",
        billingFax: "",
        billingProvince: "",
        billingCity: "",
        billingDistrict: "",

        deliveryAddress: "",
        deliveryPostalCode: "",
        deliveryPhone: "",
        deliveryFax: "",
        deliveryProvince: "",
        deliveryCity: "",
        deliveryDistrict: "",

        billingTitleName: "",
        billingName: "",
        billingEmail: "",
        billingStreet: "",

        businessEntity: "",
        category: "",
        tempo: 0,

        deliveryName: "",
        deliveryEmail: "",
        deliveryStreet: "",

        fotoKTP: "",
        fotoNPWP: "",
        fotoSPPKP: "",
        SPPKP: "",
        tanggalSPPKP: "",
        NIBSIUPTDP: "",

    });

    const { name, type, isActive, code, businessEntity, businessEntityName, paymentTerm, tempo, customerType, seller, country, pic, mobile1, mobile2, email, web, virtualAccount, billingTitleName, billingName, billingProvince, billingPhone, billingCity, billingPostalCode, billingDistrict, billingFax, billingEmail, billingStreet, billingAddress, deliveryName, deliveryPhone, deliveryProvince, deliveryPostalCode, deliveryFax, deliveryEmail, deliveryCity, deliveryDistrict, deliveryStreet, deliveryAddress, fotoKTP, fotoNPWP, nik, npwp, taxType, tax1, tax2, fotoSPPKP, SPPKP, tanggalSPPKP, NIBSIUPTDP } = formData;

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
                    seller: data.data.seller,
                    country: data.data.country,
                    deliveryAddress: data.data.deliveryAddress,
                    deliveryPostalCode: data.data.deliveryPostalCode,
                    deliveryPhone: data.data.deliveryPhone,
                    deliveryFax: data.data.deliveryFax,
                    billingAddress: data.data.billingAddress,
                    billingPostalCode: data.data.billingPostalCode,
                    billingPhone: data.data.billingPhone,
                    billingFax: data.data.billingFax,
                    pic: data.data.pic,
                    mobile1: data.data.mobile1,
                    mobile2: data.data.mobile2,
                    email: data.data.email,
                    web: data.data.web,
                    paymentTerm: data.data.paymentTerm,
                    currency: data.data.currency,
                    customerType: data.data.customerType,
                    nik: data.data.nik,
                    npwp: data.data.npwp,
                    taxType: data.data.taxType,
                    tax1: data.data.tax1,
                    tax2: data.data.tax2,
                    virtualAccount: data.data.virtualAccount,
                    seller: data.data.seller,
                    deliveryProvince: data.data.deliveryProvince,
                    deliveryCity: data.data.deliveryCity,
                    deliveryDistrict: data.data.deliveryDistrict,
                    deliveryProvince: data.data.deliveryProvince,
                    billingProvince: data.data.billingProvince,
                    billingCity: data.data.billingCity,
                    billingDistrict: data.data.billingDistrict,
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
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };
    
    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Receiving</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                            <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
 
<div  style={{borderBottom:"1px solid gray"}} className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Receiving Date
              </label>
            <div className="col-sm-10">
              <input name="name" value={name} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
          </div>

<div className="row align-items-center mb-3">
<label className="col-sm-1 text-left col-form-label">item No </label>
  <div className="col">
    <select className="form-control" name="seller" value={seller} onChange={(e) => onChange(e)}>
      <option value="">** Please select</option>
      <option value="SH">SH</option>
      <option value="SD">SD</option>
      <option value="SN">SN</option>
      <option value="AE01">AE01</option>
    </select>
  </div>
  <div className="col-sm-1">
    <div className="input-group-text" style={{ background: "#0e81ca", color: "white" }}>
      <input
        type="checkbox"
        className="form-check-input"
        style={{ marginRight: "6px" }} // Add margin to the checkbox
        // Add onChange prop here for checkbox functionality
      />
      <i className="fa fa-check" aria-hidden="true">Select</i>  {/* Add the search icon here */}
    </div>
  </div>
  <div className="col-sm-2">
    <div className="form-check mt-2">
      <input
        type="checkbox"
        className="form-check-input"
        // Add onChange prop here for checkbox functionality
      />
      <label className="form-check-label">New Item</label>
    </div>
  </div>
</div>




                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY/BOX</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STOCK</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>RECEIVING</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{formData.code}</td>
                    <td style={{ textAlign: 'center' }}>{formData.initial}</td>
                    <td style={{ textAlign: 'center' }}>{formData.incoming}</td>
                    <td style={{ textAlign: 'center' }}>{formData.outgoing}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                  </tr>
                </tbody>
              </RTable>
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

ProductionForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(ProductionForm);