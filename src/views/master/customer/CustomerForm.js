import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import "../master.css"

const CustomerForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Add Customer";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path = "/master/customer";
    const url = "Customer";
    const role = "Master - Customer";

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

    const { name, type, isActive, code, businessEntity, businessEntityName, paymentTerm, tempo, customerType, seller, country, pic, mobile1, mobile2, email, web, virtualAccount, billingTitleName, billingName, billingProvince, billingPhone, billingCity, billingPostalCode, billingDistrict, billingFax, billingEmail, billingStreet, billingAddress, deliveryPhone, deliveryProvince, deliveryPostalCode, deliveryFax, deliveryEmail, deliveryCity, deliveryDistrict, deliveryStreet, deliveryAddress, fotoKTP, fotoNPWP, nik, npwp, taxType, tax1, tax2, fotoSPPKP, SPPKP, tanggalSPPKP, NIBSIUPTDP } = formData;

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

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Detail Information</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code</label>
                        <div className="col-sm-10">
                            <input name="code" value={code} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input name="name" value={name} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Business Entity</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="businessEntity" value={businessEntity} onChange={(e) => onChange(e)}>
                                <option value="">Select Business Entity</option>
                                <option value="entity1">Entity 1</option>
                                <option value="entity2">Entity 2</option>
                                <option value="entity3">Entity 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Business Entity Name</label>
                        <div className="col-sm-10">
                            <input name="businessEntityName" value={businessEntityName} type="text" className="form-control text-left" onChange={(e) => onChange(e)} placeholder="" />
                        </div>
                    </div>
                    
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Payment Term</label>
                        <div className="col-sm-3">
                            <select
                                className="form-control"
                                name="paymentTerm"
                                value={paymentTerm}
                                onChange={(e) => onChange(e)}>
                                <option value="">Select Payment Term</option>
                                <option value="C.O.D">C.O.D</option>
                                <option value="term2">Term 2</option>
                                <option value="term3">Term 3</option>
                            </select>
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Tempo</label>
                        <div className="col">
                            <input className="form-control text-right" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="number" />
                        </div>
                    </div>
                    
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Customer Type</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="customerType" value={customerType} onChange={(e) => onChange(e)}>
                                <option value="">Select Customer Type</option>
                                <option value="1">Type 1</option>
                                <option value="2">Type 2</option>
                                <option value="3">Type 3</option>
                            </select>
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Seller</label>
                        <div className="col">
                            <select className="form-control" name="seller" value={seller} onChange={(e) => onChange(e)}>
                                <option value="">Select Seller</option>
                                <option value="IDS1">IDS1</option>
                                <option value="SH">SH</option>
                                <option value="SD">SD</option>
                                <option value="SN">SN</option>
                                <option value="AE01">AE01</option>
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
                <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
                    <Tab eventKey="ContactDetail" title={<span><FaIdCard style={tabIconStyle} /> Contact Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Country</label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="country" value={country} onChange={(e) => onChange(e)}>
                                        <option value="">Select Country</option>
                                        <option value="1">Country 1</option>
                                        <option value="2">Country 2</option>
                                        <option value="3">Country 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">PIC</label>
                                <div className="col-sm-3">
                                    <input name="pic" value={pic} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Mobile 1</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="mobile1" value={mobile1} type="text" placeholder="" onChange={(e) => onChange(e)} />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Mobile 2</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="mobile2" value={mobile2} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input name="email" value={email} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Web</label>
                                <div className="col-sm-3">
                                    <input name="web" value={web} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="BillingDetail" title={<span><FaFileAlt style={tabIconStyle} /> Billing Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Virtual Account</label>
                                <div className="col-sm-3">
                                    <input name="virtualAccount" value={virtualAccount} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="titleNama" value={billingTitleName} type="text" placeholder="" onChange={(e) => onChange(e)} required />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Name</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingName" value={billingName} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Province<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingProvince" value={billingProvince} type="text" placeholder="" onChange={(e) => onChange(e)} required />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Phone</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingPhone" value={billingPhone} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    City<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingCity" value={billingCity} type="text" placeholder="" onChange={(e) => onChange(e)} required />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Postal Code</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingPostalCode" value={billingPostalCode} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingDistrict" value={billingDistrict} type="text" placeholder="" onChange={(e) => onChange(e)} required />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Fax</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="billingFax" value={billingFax} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input name="billingEmail" value={billingEmail} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Billing Street</label>
                                <div className="col-sm-10">
                                    <input name="billingStreet" value={billingStreet} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Billing Address</label>
                                <div className="col-sm-10">
                                    <input name="billingAddress" value={billingAddress} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                        </div>
                    </Tab>


                    <Tab eventKey="DeliveryDetail" title={<span><FaCar style={tabIconStyle} /> Delivery Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="deliveryTitleName" onChange={(e) => onChange(e)} required>
                                        <option value="">Select Title</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="ms">Ms.</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">
                                    Name
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="deliveryName" value={name} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Province<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" value={deliveryProvince} name="deliveryProvince" onChange={(e) => onChange(e)}>
                                        <option value="">Select Province</option>
                                        <option value="31">Province 31</option>
                                        <option value="32">Province 32</option>
                                        <option value="33">Province 33</option>
                                        <option value="34">Province 34</option>
                                        <option value="35">Province 35</option>
                                        <option value="36">Province 36</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">
                                    Phone
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="deliveryPhone" value={deliveryPhone} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    City<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="deliveryCity" value={deliveryCity} onChange={(e) => onChange(e)} required>
                                        <option value="">Select City</option>
                                        <option value="city1">City 1</option>
                                        <option value="city2">City 2</option>
                                        <option value="city3">City 3</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">
                                    Postal Code
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="deliveryPostalCode" value={deliveryPostalCode} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District<span className="text-danger">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="deliveryDistrict" value={deliveryDistrict} onChange={(e) => onChange(e)} required>
                                        <option value="">Select District</option>
                                        <option value="district1">District 1</option>
                                        <option value="district2">District 2</option>
                                        <option value="district3">District 3</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">
                                    Fax
                                </label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="deliveryFax" value={deliveryFax} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input name="deliveryEmail" value={deliveryEmail} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Delivery Street</label>
                                <div className="col-sm-10">
                                    <input name="deliveryStreet" value={deliveryStreet} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Delivery Address</label>
                                <div className="col-sm-10">
                                    <input name="deliveryAddress" value={deliveryAddress} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="Document" title={<span><FaFolderOpen style={tabIconStyle} /> Document</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Foto KTP</label>
                                <div className="col-sm-3">
                                    <input name="fotoKTP" value={fotoKTP} type="file" className="form-control-file" placeholder="" onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">NIK</label>
                                <div className="col-sm-3">
                                    <input name="nik" value={nik} type="text" className="form-control text-left" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Foto NPWP</label>
                                <div className="col-sm-3">
                                    <input name="fotoNPWP" value={fotoNPWP} type="file" className="form-control-file" placeholder="" onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">NPWP</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="npwp" value={npwp} type="text" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Tax Type</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="taxType" value={taxType} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Tax 1</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="tax1" value={tax1} type="text" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Tax 2</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="tax2" value={tax2} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Foto SP-PKP</label>
                                <div className="col-sm-3">
                                    <input className="form-control-file" name="fotoSPPKP" value={fotoSPPKP} type="file" onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                                <label className="col-sm-1 text-left col-form-label">SP-PKP</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="SPPKP" value={SPPKP} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Tanggal SP-PKP</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="tanggalSPPKP" value={tanggalSPPKP} type="text" placeholder="" onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">NIB/SIUP/TDP</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="NIBSIUPTDP" value={NIBSIUPTDP} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );

    };

    return (
        <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

CustomerForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(CustomerForm);