import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends,FaHouseUser,FaPlus,FaTimes } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";


const RawMaterialBatchReceivingForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = " Raw Material Usage ";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path ="/transaction-rm/raw-material-usage/:id?/:type";
    const url = "RawMaterialUsage";
    const role = "transaction -RawMaterialUsageForm";

    const [formData, setFormData] = useState({
        "id": 2790,
        "voucherNo": "RMU0002798",
        "referenceNo": "OUT- RESIN # SA 135 20/03/2023",
        "status": "N",
        "transDate": "2023-03-20T13:28:37",
        "postDate": null,
        "createdBy": "Junan & RONI",
        "postedBy": null,
        "vendorId": null,
        "warehouseId": 1,
        "dateIn": null,
        "dateUp": null,
        "userIn": null,
        "userUp": null,
        "warehouse": null,
        "rawMaterialUsageDetails": null

    });

    const { name, type, isActive, code,itemConsumptionDetails, businessEntity, businessEntityName, paymentTerm, tempo, customerType, seller, country, pic, mobile1, mobile2, email, web, virtualAccount, billingTitleName, billingName, billingProvince, billingPhone, billingCity, billingPostalCode, billingDistrict, billingFax, billingEmail, billingStreet, billingAddress, deliveryName, deliveryPhone, deliveryProvince, deliveryPostalCode, deliveryFax, deliveryEmail, deliveryCity, deliveryDistrict, deliveryStreet, deliveryAddress, fotoKTP, fotoNPWP, nik, npwp, taxType, tax1, tax2, fotoSPPKP, SPPKP, tanggalSPPKP, NIBSIUPTDP } = formData;

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
                    itemConsumptionDetails:data.data.itemConsumptionDetails,
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
    const handleNewRow = (e) => {
        e.preventDefault();
        let details = data.data. itemConsumptionDetails;
        if (details === undefined || details === null) details = [];
  
        details.push({
            id: 0,
            itemConsumptionId: 0,
            voucherNo: "",
            batchId:0,
            itemId: 0,
            remark: "null",
            qty: 0,
            dateIn:0,
            dateUp: 0,
            userIn: "null",
            userUp:" null",
            itemName: "",
            uom: "",
            totalPcs: 0
        });
        setFormData({ ...formData, itemConsumptionDetails: details });
    };
  
    const handleDelete = (e) => {
        e.preventDefault();
  
        let details =itemConsumptionDetails;
        if (details === undefined || details === null) details = [];
  
        let newDetail = [];
  
        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });
  
        setFormData({ ...formData,itemConsumptionDetails: newDetail });
    };
    
    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Raw Material Usage</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher # <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">WareHouse <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="code" value={code} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
                    </div>
                    <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
          <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Item Detail</span>}>
       <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2"></div>     
            <div className="row align-items-center mb-3">
            <div className="row align-items-center mb-3">
    <label className="col-sm-2 col-form-label">Batch No</label>
    <div className="col-sm-8"> {/* Increased the column size to make the text box wider */}
        <input
            className="form-control text-left"
            name="tempo"
            value={tempo}
            onChange={(e) => onChange(e)}
            type="text"
        />
    </div>
    <div className="col-sm-1">
        <input
            className="form-check-input"
            type="checkbox"
            name="checkBoxName"
            id="checkBoxId"
            // Add any additional props or event handlers for the checkbox as needed
        />
    </div>
</div>
<hr style={{ borderColor: "gray", opacity: 0.5 }} />

<div className="d-flex justify-content-end mb-2">
    <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e)}>
        <FaPlus className="mr-2" /> <span>Add</span>
    </button>
    <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
        <FaTimes className="mr-2" /> <span>Delete</span>
    </button>
</div>
              <RTable bordered style={{ float: 'center', width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Item</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Pallet</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Location</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{formData.code}</td>
                    <td style={{ textAlign: 'center' }}>{formData.initial}</td>
                    <td style={{ textAlign: 'center' }}>{formData.incoming}</td>
                    <td style={{ textAlign: 'center' }}>{formData.outgoing}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.outgoing}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                  </tr>
                </tbody>
              </RTable>
            </div>
          </Tab>
         
          <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />Change Logs</span>}>
        

<div className="d-flex justify-content-end mb-2">
    <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e)}>
        <FaPlus className="mr-2" /> <span>Add</span>
    </button>
    <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
        <FaTimes className="mr-2" /> <span>Delete</span>
    </button>
</div>
          <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Created Date</label>
                        <div className="col">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Posted Date</label>
                        <div className="col">
                        <input className="form-control text-left" name="tempo" value={tempo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
          </Tab>
          </Tabs>

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

RawMaterialBatchReceivingForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(RawMaterialBatchReceivingForm);