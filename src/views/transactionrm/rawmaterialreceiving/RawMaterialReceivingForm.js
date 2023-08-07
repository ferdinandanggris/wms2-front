import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaUserFriends, FaPlus, FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import moment from "moment";

const RawMaterialReceivingForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = "Raw Material Receiving";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction-rm/raw-material-receiving/:id?/:type";
    const url = "RawMaterialReceiving";
    const role = "Transaction - Raw Material Receiving";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: 0,
        transDate: "",
        postDate: "",
        createdBy: "",
        postedBy: "",
        vendorId: "",
        warehouseId: "",
        dateIn: "",
        dateUp: "",
        userIn: "",
        userUp: "",
        rawMaterialReceivingDetails: []
    });

    const { voucherNo, referenceNo, transDate, postDate, createdBy, postedBy, vendorId, warehouseId, dateIn, dateUp, userIn, userUp, rawMaterialReceivingDetails } = formData;

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    status: data.data.status,
                    transDate: data.data.country,
                    postDate: data.data.deliveryAddress,
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    vendorId: data.data.vendorId,
                    warehouseId: data.data.warehouseId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
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

    const handleNewRow = (e) => {
        e.preventDefault();
        let details = data.data.rawMaterialReceivingDetails;
        if (details === undefined || details === null) details = [];
        details.push({
            id: 0,
            itemConsumptionId: 0,
            voucherNo: "",
            batchId: 0,
            itemId: 0,
            remark: "null",
            qty: 0,
            dateIn: 0,
            dateUp: 0,
            userIn: "null",
            userUp: " null",
            itemName: "",
            uom: "",
            totalPcs: 0
        });
        setFormData({ ...formData, rawMaterialReceivingDetails: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details = rawMaterialReceivingDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, rawMaterialReceivingDetails: newDetail });
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Raw Material Receiving</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Reference#</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Vendor</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="" value="" onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-3">
                            <input name="" value="" type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
                        </div>
                    </div>

                    <hr style={{ borderColor: "gray", margin: "40px 0", opacity: 0.5 }} />
                    <div style={{ marginTop: "45px" }}></div>

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
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Pallets</th>
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
        <FormWrapper img={img} title={title} path={path} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

RawMaterialReceivingForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(RawMaterialReceivingForm);