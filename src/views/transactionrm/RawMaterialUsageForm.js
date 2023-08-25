import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaUserFriends, FaHouseUser, FaPlus, FaTimes, FaTruckLoading } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai"
import { batch, connect } from "react-redux";
import PropTypes from "prop-types";
import Select2 from "../../components/Select2";
import { loadWarehouse } from "../../actions/master";
import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";
import moment from "moment";

const RawMaterialUsageForm = ({ user, data, loadData, loadWarehouse, addData, editData, master }) => {
    let { id, type } = useParams();
    const navigate = useNavigate();
    const title = " Raw Material Usage ";
    const img = <FaTruckLoading className="module-img" />;
    const path = "/transaction-rm/raw-material-usage";
    const url = "RawMaterialUsage";
    const role = "transaction -RawMaterialUsageForm";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "",
        transDate: new Date(),
        postDate: null,
        createdBy: user?.fullName,
        postedBy: user?.fullName,
        vendorId: 0,
        warehouseId: 0,
        warehouses: "",
        vendors: "",
        rawMaterialUsageDetails: []
    });

    const { transDate, postDate, referenceNo, createdBy, postedBy, vendorId, voucherNo, warehouse, warehouseId, rawMaterialUsageDetails } = formData;

    const [status, setStatus] = useState('');

    // List Warehouse
    const [warehouseList, setWarehouseList] = useState(null)

    useEffect(() => {
        if (master && master.warehouse !== undefined && master.warehouse !== null) {
            let list = [...master.warehouse];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "**Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setWarehouseList(list)
        }
    }, [master])

    useEffect(() => {
        loadWarehouse();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadWarehouse]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    status: data.data.status,
                    transDate: data.data.transDate,
                    postDate: data.data.postDate,
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    vendorId: data.data.vendorId,
                    warehouseId: data.data.warehouseId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    warehouse: data.data.warehouse,
                    rawMaterialUsageDetails: data.data.rawMaterialUsageDetails,
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
        let details = data.data.rawMaterialUsageDetails;
        if (details === undefined || details === null) details = [];

        details.push({
            id: 0,
            rawMaterialUsageId: 0,
            voucherNo: "0",
            locationId: 0,
            palletId: 0,
            itemId: 0,
            remark: "",
            qty: 0,
            batchId: 0,
            dateIn: 0,
            dateUp: 0,
            userIn: 0,
            userUp: 0,
            item: "",
            batch: "",
            location: "",
            pallet: ""
        });
        setFormData({ ...formData, rawMaterialUsageDetails: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details = rawMaterialUsageDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, rawMaterialUsageDetails: newDetail });
    };

    // Function Select
    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id })
    }

    // Function Search
    const handleSearch = () => {

    }

    // Function Tabs
    const renderTabs = () => {
        return (
            <Tabs defaultActiveKey="ContactDetail" className="my-3">
                <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Item Detail</span>}>
                    <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                        <div className="row align-items-center">
                            <label className="col-sm-1 col-form-label">Batch No</label>
                            <div className="col-sm-2">
                                <input
                                    className="form-control text-left"
                                    name="BatchNo"
                                    value={batch}
                                    onChange={(e) => onChange(e)}
                                    type="text"
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="checkBoxName"
                                    id="checkBoxId"
                                />
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-success d-flex align-items-center" type="button"><AiOutlineSearch className="mr-2" />Search</button>
                            </div>
                        </div>
                        <RTable className="mt-3" bordered style={{ float: 'center', width: "100%" }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
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
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Created Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="postedBy" value={postedBy} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Posted Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="postDate" value={postDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        )
    }
    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Raw Material Usage</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Voucher # <span className="text-danger">*</span></label>
                        <div className="col-sm-4">
                            <input className="form-control text-left" name="voucherNo" value={voucherNo} placeholder="AUTO" onChange={(e) => onChange(e)} type="text" readOnly />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col-sm-4">
                            <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-3 mb-5">
                        <label className="col-sm-2 col-form-label">WareHouse <span className="text-danger">*</span></label>
                        <div className="col-sm-4">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"** Please Select"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                    {renderTabs()}
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

RawMaterialUsageForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    loadWarehouse: PropTypes.func,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master
});

export default connect(mapStateToProps, { loadData, loadWarehouse, addData, editData })(RawMaterialUsageForm);