import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadData, addData, editData } from "../../../actions/data";
import { loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment } from "../../../actions/master";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaUser } from "react-icons/fa";
import "../master.css"
import moment from "moment";
const LeadCustomerForm = ({ user, data, loadData, addData, editData, master, loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "LeadCustomerForm";
    const img = <FaUser className="module-img" />;
    const path = "/master/lead-customer/:id?/:type";
    const url =  "LeadCustomer";
    const role = "Master - LeadCustomer";

    const [searchParams] = useSearchParams();
    const [returnUrl, setReturnUrl] = useState(path);

    useEffect(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
    }, []);

    const [formData, setFormData] = useState({
        id: 0,
        resellerId: 0,
        namaResmi: "",
        namaDagang: "",
        pemilik:  "",
        website:  "",
        tipeCustomer: "",
        namaPengiriman: "",
        judulPengiriman:  "",
        emailPengiriman: "",
        phonePengiriman: "",
        provincePengirimanId: 0,
        cityPengirimanId: 0,
        districtPengirimanId: 0,
        kodeposPengiriman: "",
        alamatPengiriman: "",
        namaBilling: "",
        judulBilling:  "",
        emailBilling: "",
        phoneBilling: "",
        provinceBillingId: 0,
        cityBillingId:0,
        jalanBilling:"",
        districtBillingId: 0,
        kodeposBilling: "",
        alamatBilling: "",
        namaBank: "",
        namaCabang:  "",
        currency: "",
        noRekening: "",
        namaRekening:  "",
        imgNpwp: "",
        npwp: "",
        imgSppkp: "",
        sppkp: "",
        tanggalSppkp: null,
        nib: "",
        imgKtp: "",
        ktp: "",
        tanggalKtp: null,
        lastSync: null,
        badanUsaha: "",
        status: 1,
        name: "",
        seller:  "",
        paymentTerm:  "",
        email: "",
        mobile1: "",
        mobile2: "",
        pic:  "",
        country:  "",
        code: null,
        leadResellerId: 0,
        salesId: 0,
        paymentTermId: 0,
        dateIn: null,
        dateUp: null,
        userIn:  "",
        userUp:  "",
        taxType: "",
        tax1: "",
        tax2:"",
        faxPengiriman:"",
        faxBilling:"",
        jalanPengiriman:"",
        regencyDelivery: {},
        districtDelivery: {},
        provinceDelivery: {},
        regencyBilling:  {},
        districtBilling:  {},
        provinceBilling:  {},
        sale:  {},
        termOfPayment:  {},

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

    const { resellerId,namaResmi,namaDagang,pemilik,website,tipeCustomer,namaBank,namaPengiriman,judulPengiriman,emailPengiriman
    ,phonePengiriman,provincePengirimanId,cityPengirimanId,districtBilling,districtBillingId,districtPengirimanId,kodeposBilling,kodeposPengiriman,
alamatPengiriman,namaBilling,judulBilling,emailBilling,phoneBilling,provinceBilling,provinceBillingId,cityBillingId,alamatBilling,namaCabang,
currency,noRekening,namaRekening,npwp,ktp,imgKtp,imgNpwp,imgSppkp,sppkp,tanggalSppkp,nib,tanggalKtp,lastSync,badanUsaha,seller,name,status,paymentTerm,paymentTermId,
email, mobile1, mobile2,pic,tax2,tax1,taxType,faxPengiriman,faxBilling,jalanPengiriman, jalanBilling,country,code,type,leadResellerId,salesId,dateIn,dateUp,userIn,userUp,regencyDelivery, districtDelivery,provinceDelivery,regencyBilling, sale,termOfPayment,termOfPaymentId} = formData;

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
                    resellerId: data.data.resellerId,
                    namaResmi: data.data.namaResmi,
                    namaDagang: data.data,namaDagang,
                    pemilik:  data.data.pemilik,
                    website:  data.data.website,
                    tipeCustomer: data.data.tipeCustomer,
                    namaPengiriman: data.data.namaPengiriman,
                    judulPengiriman:  data.data.judulPengiriman,
                    emailPengiriman: data.data.emailPengiriman,
                    phonePengiriman: data.data.phonePengiriman,
                    provincePengirimanId: data.data.provincePengirimanId,
                    cityPengirimanId: data.data.cityPengirimanId,
                    districtPengirimanId: data.data.districtPengirimanId,
                    kodeposPengiriman: data.data.kodeposPengiriman,
                    alamatPengiriman: data.data.alamatPengiriman,
                    namaBilling: data.data.namaPengiriman,
                    judulBilling:  data.data.judulBilling,
                    emailBilling: data.data.emailBilling,
                    phoneBilling: data.data.phoneBilling,
                    provinceBillingId: data.data.provinceBillingId,
                    cityBillingId:data.data.cityBillingId,
                    districtBillingId: data.data.districtBillingId,
                    kodeposBilling: data.data.kodeposBilling,
                    alamatBilling: data.data.alamatBilling,
                    namaBank: data.data.namaBank,
                    namaCabang:  data.data.namaCabang,
                    currency: data.data.currency,
                    noRekening: data.data.noRekening,
                    namaRekening:  data.data.namaRekening,
                    imgNpwp: data.data.imgNpwp,
                    npwp: data.data.npwp,
                    imgSppkp: data.data.imgSppkp,
                    sppkp: data.data.sppkp,
                    tanggalSppkp: data.data.tanggalSppkp,
                    nib: data.data.nib,
                    jalanBilling:data.data.jalanBilling,
                    imgKtp: data.data.imgKtp,
                    ktp: data.data.ktp,
                    tanggalKtp: data.data.tanggalKtp,
                    lastSync: data.data.lastSync,
                    badanUsaha: data.data.badanUsaha,
                    status: data.data.status,
                    name: data.data.name,
                    seller:  data.data.seller,
                    paymentTerm:  data.data.paymentTerm,
                    email: data.data.email,
                    mobile1: data.data.mobile1,
                    mobile2: data.data.mobile2,
                    pic:  data.data.pic,
                    country:  data.data.country,
                    code: data.data.code,
                    leadResellerId: data.data.leadResellerId,
                    salesId: data.data.salesId,
                    paymentTermId: data.data.paymentTermId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn:  data.data.userIn,
                    userUp:  data.data.userUp,
                    regencyDelivery:data.data.regencyDelivery,
                    districtDelivery: data.data.districtDelivery,
                    provinceDelivery: data.data.provinceDelivery,
                    regencyBilling:  data.data.regencyBilling,
                    districtBilling:  data.data.districtBilling,
                    provinceBilling:  data.data.provinceBilling,
                    sale:  data.data.sale,
                    taxType:data.data.taxType,
                    tax1:data.data.tax1,
                    tax2:data.data.tax2,
                    faxPengiriman:data.data.faxPengiriman,
                    faxBilling:data.data.faxBilling,
                    jalanPengiriman:data.data.jalanPengiriman,
                    termOfPayment: data.data.termOfPayment,
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
          navigate(`${path}`);
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
                            Code 
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                              
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Name 
                        </label>
                        <div className="col-sm-4">
                            <input
                                name="name"
                                value={name}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                               
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Business Entity</label>
                        <div className="col-sm-4">
                            <select className="form-control" type="text" name="badanUsaha" value={badanUsaha} onChange={(e) => onChange(e)}>
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
                                value={namaDagang}
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
                                handleChange={(e) => onSelectChange(e, "termOfPaymentId")}  />
                            
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Tempo</label>
                        <div className="col">
                            <input
                                className="form-control text-right"
                                name="paymentTerm"
                                value={paymentTerm}
                                onChange={(e) => onChange(e)}
                                type="number"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Customer Type</label>
                        <div className="col-sm-3">
                            <select className="form-control" type="text" name="tipeCustomer" value={tipeCustomer} onChange={(e) => onChange(e)}>
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
                                value={sellerList === null ? null : sellerList.filter((option) => option.id === parseInt(resellerId))}
                                handleChange={(e) => onSelectChange(e, "resellerId")} />
                        </div>
                    </div>

                    <div className="row form-group align-items-center">
                        <label className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name=" status"
                                    value={0}
                                    checked={status == 0}
                                    onChange={(e) => onChange(e)} />
                                <label class="form-check-label mr-5" >
                                    In Active
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="status"
                                    value={1}
                                    checked={ status == 1}
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
                                        readOnly
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
                                        readOnly
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Web</label>
                                <div className="col-sm-3">
                                    <input
                                        name="web"
                                        value={website}
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
            className="form-control text-left"
            name="virtualAccount"
            value={`${namaBank} - ${noRekening}`}
            type="text"
        />
    </div>
</div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" name="name" value={name} onChange={(e) => onChange(e)} type="text" placeholder="">
                                        <option value="">Select Title</option>
                                        <option value="bapak">Bapak</option>
                                        <option value="ibu">Ibu</option>
                                        <option value="nona">Nona</option>
                                    </select>
                                </div>

                                <label className="col-sm-1 text-left col-form-label">Name</label>
                                <div className="col-sm-3">
                                    {/* <input
                                        className="form-control text-left"
                                        name="billingName"
                                        value={namaBilling}
                                        type="text"
                                        onChange={(e) => onChange(e)} /> */}
                                         <input
                                name="namaBilling"
                                value={namaBilling}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                               
                            />
                                        
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Province
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
                                        name="phoneBilling"
                                        value={phoneBilling}
                                        type="text"
                                        readOnly
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    City
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
                                        name="kodeposBilling"
                                        value={kodeposBilling}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District
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
                                        value={faxBilling}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-3">
                                    <input
                                        name="billingEmail"
                                        value={emailBilling}
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
                                        value={jalanBilling}
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
                                        value={alamatBilling}
                                        className="form-control text-left memo-like-textarea"
                                        placeholder="Enter delivery address here..."
                                        onChange={(e) => onChange(e)}
                                        style={{ width: "500px", minHeight: "150px" }}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="DeliveryDetail" title={<span><FaCar style={tabIconStyle} /> Delivery Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Title Name
                                </label>
                                <div className="col-sm-3">
                                    <select className="form-control" type="text" name="tipeCustomer" value={tipeCustomer} onChange={(e) => onChange(e)}>
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
                                    <input className="form-control text-left" name="namaPengiriman" value={namaPengiriman} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    Province
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
                                    <input className="form-control text-left" name="phonePengiriman" value={phonePengiriman} type="text" onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    City
                                </label>
                                <div className="col-sm-3">
                                    { <Select2
                                        options={deliveryCityList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick City"} value={deliveryCityList === null ? null : deliveryCityList.filter((option) => option.name === formData.deliveryCity)} handleChange={(e) => onSelectChange(e, "deliveryCity")}
                                    /> }
                                </div>
                                <label className="col-sm-1 text-left col-form-label">
                                    Postal Code
                                </label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="deliveryPostalCode"
                                        value={kodeposPengiriman}
                                        type="text"
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">
                                    District
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
                                        value={faxPengiriman}
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
                                        value={emailPengiriman}
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
                                        value={jalanPengiriman}
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
                                            value={alamatPengiriman}
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
                                    type="file"
                                    className="form-control-file"
                                    placeholder=""
                                    onChange={onChange}
                                  />
                                  {imgKtp && (
                                    <div>
                                      <img src={imgKtp} alt="Foto KTP" width={"70%"}/> {/* Menampilkan gambar */}
                                    </div>
                                  )}
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                            </div>
                            <div className="row align-items-center mt-4 mb-3">
                                <label className="col-sm-2 col-form-label">NIK</label>
                                <div className="col-sm-3">
                                    <input
                                        name="nik"
                                        value={ktp}
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
                                    type="file"
                                    className="form-control-file"
                                    placeholder=""
                                    onChange={onChange}
                                  />
                                  {imgKtp && (
                                    <div>
                                      <img src={imgNpwp} alt="Foto NPWP" width={"70%"}/> 
                                    </div>
                                  )}
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
                                    { <input
                                        className="form-control text-left"
                                        name="tax1"
                                        value={tax1}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />}
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
                                    name="fotoSPPKP"
                                    type="file"
                                    className="form-control-file"
                                    placeholder=""
                                    onChange={onChange}
                                  />
                                  {imgKtp && (
                                    <div>
                                      <img src={imgSppkp} alt="Foto SPPKP" width={"70%"}/> 
                                    </div>
                                  )}
                                    <small className="form-text text-muted">Max Size: 1M</small>
                                </div>
                                <label className="col-sm-1 text-left col-form-label">SP-PKP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="SPPKP"
                                        value={sppkp}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)} />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Tanggal SP-PKP</label>
                                <div className="col-sm-3">
                                <input className="form-control text-left" name="tanggalSppkp" value={tanggalSppkp === null ? "" : moment(tanggalSppkp).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">NIB/SIUP/TDP</label>
                                <div className="col-sm-3">
                                    <input
                                        className="form-control text-left"
                                        name="NIBSIUPTDP"
                                        value={nib}
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

LeadCustomerForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadCountry, loadDistrict, loadProvince, loadCity, loadSeller, loadTermOfPayment })(LeadCustomerForm);