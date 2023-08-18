import { useEffect, useState } from "react";

import "../master.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select2 from "../../../components/Select2";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaUser } from "react-icons/fa";

import { loadData, addData, editData } from "../../../actions/data";
import { loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment } from "../../../actions/master";

const CustomerForm = ({ user, data, loadData, addData, editData, master, loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Customer";
    const img = <FaUser className="module-img" />;
    const path = "/master/customer";
    const url = "Customer";
    const role = "Master - Customer";

    const [searchParams] = useSearchParams();
    const [returnUrl, setReturnUrl] = useState(path);

    useEffect(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
    }, []);

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
        billingName: "",
        billingEmail: "",
        billingStreet: "",
        deliveryAddress: "",
        deliveryPostalCode: "",
        deliveryPhone: "",
        deliveryFax: "",
        deliveryProvince: "",
        deliveryCity: "",
        deliveryDistrict: "",
        deliveryName: "",
        deliveryEmail: "",
        deliveryStreet: "",
        businessEntity: "",
        category: "",
        tempo: 0,
        fotoKTP: "",
        fotoNPWP: "",
        fotoSPPKP: "",
        SPPKP: "",
        tanggalSPPKP: "",
        NIBSIUPTDP: "",

    });

    const [countryList, setCountry] = useState([]);
    const [billingDistrictList, setBillingDistrict] = useState([]);
    const [billingProvinceList, setBillingProvince] = useState([]);
    const [billingCityList, setBillingCity] = useState([]);

    const [deliveryDistrictList, setDeliveryDistrict] = useState([]);
    const [deliveryProvinceList, setDeliveryProvince] = useState([]);
    const [deliveryCityList, setDeliveryCity] = useState([]);

    const [sellerList, setSeller] = useState([]);
    const [termOfPaymentList, setTermOfPayment] = useState([]);

    const { name, type, isActive, code, businessEntity, businessEntityName, deliveryTitleName, tempo, customerType, country, pic, mobile1, mobile2, email, web, virtualAccount, billingTitleName, billingName, billingPhone, billingPostalCode, billingFax, billingEmail, billingStreet, billingAddress, deliveryPhone, deliveryPostalCode, deliveryFax, deliveryEmail, deliveryStreet, deliveryAddress, fotoKTP, fotoNPWP, nik, npwp, taxType, tax1, tax2, fotoSPPKP, SPPKP, tanggalSPPKP, NIBSIUPTDP, sellerId, termOfPaymentId } = formData;

    useEffect(() => {
        loadCountry();
        loadDistrict();
        loadProvince();
        loadCity();
        loadSeller();
        loadTermOfPayment();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment]);

    useEffect(() => {
        if (master.country !== undefined && master.country !== null) {
            let list = [...master.country];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Country",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setCountry(list);
        }
        if (master.district !== undefined && master.district !== null) {
            let list = [...master.district];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No District",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBillingDistrict(list);
            setDeliveryDistrict(list);
        }
        if (master.province !== undefined && master.province !== null) {
            let list = [...master.province];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Province",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBillingProvince(list);
            setDeliveryProvince(list);
        }
        if (master.city !== undefined && master.city !== null) {
            let list = [...master.city];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No City",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBillingCity(list);
            setDeliveryCity(list);
        }
        if (master.seller !== undefined && master.seller !== null) {
            let list = [...master.seller];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Seller",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setSeller(list);
        }
        if (master.termOfPayment !== undefined && master.termOfPayment !== null) {
            let list = [...master.termOfPayment];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Term Of Payment",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setTermOfPayment(list);
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
                    seller: data.data.seller,
                    city: data.data.city,
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
                    deliveryCity: data.data.deliveryCity,
                    deliveryDistrict: data.data.deliveryDistrict,
                    deliveryProvince: data.data.deliveryProvince,
                    country: data.data.country,
                    billingProvince: data.data.billingProvince,
                    billingDistrict: data.data.billingDistrict,
                    billingCity: data.data.billingCity,
                    isActive: data.data.isActive,
                    countryId: data.data.countryId,
                    districtId: data.data.districtId,
                    provinceId: data.data.provinceId,
                    cityId: data.data.cityId,
                    sellerId: data.data.sellerId,
                    termOfPaymentId: data.data.termOfPaymentId,
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e, name) => {
        let updatedValue;

        if (["billingDistrict", "deliveryDistrict", "deliveryProvince", "billingProvince", "billingCity", "deliveryCity"].includes(name)) {
            updatedValue = e.name;
        } else {
            updatedValue = e.id;
        }

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue
        }));
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
                        <label className="col-sm-2 col-form-label">
                            Code <span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Name <span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="name"
                                value={name}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Business Entity</label>
                        <div className="col-sm-4">
                            <select className="form-control" type="text" name="businessEntity" value={businessEntity} onChange={(e) => onChange(e)}>
                                <option value="">Select Business Entity</option>
                                <option value="individu">Individu</option>
                                <option value="pt">PT</option>
                                <option value="cv">CV</option>
                                <option value="ud">UD</option>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Business Entity Name</label>
                        <div className="col-sm-4">
                            <input
                                name="businessEntityName"
                                value={businessEntityName}
                                type="text"
                                className="form-control text-left"
                                onChange={(e) => onChange(e)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Payment Term</label>
                        <div className="col-sm-3">
                            <Select2
                                options={termOfPaymentList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Term Of Payment"}
                                value={termOfPaymentList === null ? null : termOfPaymentList.filter((option) => option.id === parseInt(termOfPaymentId))}
                                handleChange={(e) => onSelectChange(e, "termOfPaymentId")} required />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Tempo</label>
                        <div className="col">
                            <input
                                className="form-control text-right"
                                name="tempo"
                                value={tempo}
                                onChange={(e) => onChange(e)}
                                type="number"
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Customer Type</label>
                        <div className="col-sm-3">
                            <select className="form-control" type="text" name="customerType" value={customerType} onChange={(e) => onChange(e)}>
                                <option value="">Select Customer Type</option>
                                <option value="reseller">Reseller</option>
                                <option value="enduser">End User</option>
                            </select>
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Seller</label>
                        <div className="col">
                            <Select2
                                options={sellerList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Seller"}
                                value={sellerList === null ? null : sellerList.filter((option) => option.id === parseInt(sellerId))}
                                handleChange={(e) => onSelectChange(e, "sellerId")} required />
                        </div>
                    </div>

                    <div className="row form-group align-items-center">
                        <label className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="isActive"
                                    value={0}
                                    checked={isActive == 0}
                                    onChange={(e) => onChange(e)} />
                                <label class="form-check-label mr-5" >
                                    In Active
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="isActive"
                                    value={1}
                                    checked={isActive == 1}
                                    onChange={(e) => onChange(e)} />
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
                                    <Select2
                                        options={countryList}
                                        optionValue={(option) => option.name}
                                        optionLabel={(option) => option.name}
                                        placeholder={"Pick Country"}
                                        value={country ? countryList.find(option => option.name === country) : null}
                                        handleChange={(e) => onSelectChange(e, "country")}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">PIC</label>
                                <div className="col-sm-3">
                                    <input
                                        name="pic"
                                        value={pic}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Mobile 1</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="mobile1"
                                        value={mobile1}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Mobile 2</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="mobile2"
                                        value={mobile2}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input
                                        name="email"
                                        value={email}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Web</label>
                                <div className="col-sm-3">
                                    <input
                                        name="web"
                                        value={web}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="BillingDetail" title={<span><FaFileAlt style={tabIconStyle} /> Billing Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Virtual Account</label>
                                <div className="col-sm-3">
                                    <input
                                        name="virtualAccount"
                                        value={virtualAccount}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="billingTitleName" value={billingTitleName} onChange={(e) => onChange(e)} type="text" placeholder="">
                                        <option value="">Select Title</option>
                                        <option value="bapak">Bapak</option>
                                        <option value="ibu">Ibu</option>
                                        <option value="nona">Nona</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Name</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="billingName"
                                        value={billingName}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Province<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={billingProvinceList}
                                        optionValue={(option) => option.id.toString()}
                                        optionLabel={(option) => option.name}
                                        placeholder={"Pick Province"}
                                        value={billingProvinceList === null ? null : billingProvinceList.filter((option) => option.name === formData.billingProvince)}
                                        handleChange={(e) => onSelectChange(e, "billingProvince")}
                                    />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Phone</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="billingPhone"
                                        value={billingPhone}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    City<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={billingCityList}
                                        optionValue={(option) => option.id.toString()}
                                        optionLabel={(option) => option.name}
                                        placeholder={"Pick City"}
                                        value={billingCityList === null ? null : billingCityList.filter((option) => option.name === formData.billingCity)}
                                        handleChange={(e) => onSelectChange(e, "billingCity")}
                                    />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Postal Code</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="billingPostalCode"
                                        value={billingPostalCode}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={billingDistrictList}
                                        optionValue={(option) => option.id.toString()}
                                        optionLabel={(option) => option.name}
                                        placeholder={"Pick District"}
                                        value={billingDistrictList === null ? null : billingDistrictList.filter((option) => option.name === formData.billingDistrict)}
                                        handleChange={(e) => onSelectChange(e, "billingDistrict")}
                                    />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Fax</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="billingFax"
                                        value={billingFax}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input
                                        name="billingEmail"
                                        value={billingEmail}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Billing Street</label>
                                <div className="col-sm-7">
                                    <input
                                        name="billingStreet"
                                        value={billingStreet}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Billing Address</label>
                                <div className="col-sm-7" >
                                    <textarea
                                        name="billingAddress"
                                        type="text"
                                        value={billingAddress}
                                        className="form-control text-left memo-like-textarea"
                                        placeholder="Enter delivery address here..."
                                        onChange={(e) => onChange(e)}
                                        style={{ width: "500px", minHeight: "150px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="DeliveryDetail" title={<span><FaCar style={tabIconStyle} /> Delivery Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" type="text" name="deliveryTitleName" value={deliveryTitleName} onChange={(e) => onChange(e)}>
                                        <option value="">Select Title</option>
                                        <option value="bapak">Bapak</option>
                                        <option value="ibu">Ibu</option>
                                        <option value="nona">Nona</option>
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
                                    Province<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={deliveryProvinceList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Province"} value={deliveryProvinceList === null ? null : deliveryProvinceList.filter((option) => option.name === formData.deliveryProvince)} handleChange={(e) => onSelectChange(e, "deliveryProvince")}
                                    />
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
                                    City<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={deliveryCityList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick City"} value={deliveryCityList === null ? null : deliveryCityList.filter((option) => option.name === formData.deliveryCity)} handleChange={(e) => onSelectChange(e, "deliveryCity")}
                                    />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">
                                    Postal Code
                                </label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="deliveryPostalCode"
                                        value={deliveryPostalCode}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District<span className="required-star">*</span>
                                </label>
                                <div className="col-sm-3">
                                    <Select2
                                        options={deliveryDistrictList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick District"} value={deliveryDistrictList === null ? null : deliveryDistrictList.filter((option) => option.name === formData.deliveryDistrict)} handleChange={(e) => onSelectChange(e, "deliveryDistrict")}
                                    />
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Fax</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="deliveryFax"
                                        value={deliveryFax}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input
                                        name="deliveryEmail"
                                        value={deliveryEmail}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Delivery Street</label>
                                <div className="col-sm-7">
                                    <input
                                        name="deliveryStreet"
                                        value={deliveryStreet}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Delivery Address</label>
                                <div className="col-sm-7">
                                    <div className="memo-like-input">
                                        <textarea
                                            name="deliveryAddress"
                                            type="text"
                                            value={deliveryAddress}
                                            className="form-control text-left memo-like-textarea"
                                            placeholder="Enter delivery address here..."
                                            onChange={(e) => onChange(e)}
                                            style={{ width: "500px", minHeight: "150px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="Document" title={<span><FaFolderOpen style={tabIconStyle} /> Document</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Foto KTP</label>
                                <div className="col-sm-3">
                                    <input
                                        name="fotoKTP"
                                        value={fotoKTP}
                                        type="file"
                                        className="form-control-file"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">NIK</label>
                                <div className="col-sm-3">
                                    <input
                                        name="nik"
                                        value={nik}
                                        type="text"
                                        className="form-control text-left"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Foto NPWP</label>
                                <div className="col-sm-3">
                                    <input
                                        name="fotoNPWP"
                                        value={fotoNPWP}
                                        type="file"
                                        className="form-control-file"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">NPWP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="npwp"
                                        value={npwp}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Tax Type</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="taxType"
                                        value={taxType}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Tax 1</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="tax1"
                                        value={tax1}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Tax 2</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="tax2"
                                        value={tax2}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Foto SP-PKP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control-file"
                                        name="fotoSPPKP"
                                        value={fotoSPPKP}
                                        type="file"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                                <label className="col-sm-1 text-left col-form-label">SP-PKP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="SPPKP"
                                        value={SPPKP}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Tanggal SP-PKP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="tanggalSPPKP"
                                        value={tanggalSPPKP}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">NIB/SIUP/TDP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="NIBSIUPTDP"
                                        value={NIBSIUPTDP}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
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
    master: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment })(CustomerForm);