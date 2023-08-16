import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUndo, FaInfoCircle, FaSearch, FaUsers, FaFile, FaSitemap, FaTrashAlt } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { loadLocation, loadPallet, loadWarehouse, loadBatch, loadCustomer, loadShipping } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import "../style.css";
import moment from "moment";

const ReturnForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadLocation, loadPallet, loadBatch, loadCustomer, loadShipping }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Return";
    const img = <FaUndo className="module-img" />;
    const path = "/transaction/return";
    const url = "Return";
    const role = "Transaction - Return";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "N",
        transDate: null,
        postDate: null,
        locationId: 0,
        palletId: 0,
        createdBy: "",
        postedBy: "",
        remark: "",
        customerId: 0,
        orderId: 0,
        shippingNo: "",
        truckNo: "",
        picker: "",
        deliveryOrderNo: "",
        warehouseId: 0,
        dateIn: null,
        dateUp: null,
        userIn: "",
        userUp: "",
        shipping: "",
        batchNo: "",
        returnDetails: [],
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [batchList, setBatch] = useState([]);
    const [customerList, setCustomer] = useState([]);
    const [orderList, setOrder] = useState([]);
    const [shippingList, setShipping] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');
    const { voucherNo, referenceNo, postDate, locationId, palletId, createdBy, postedBy, customerId, truckNo, picker, dateIn, shippingId, batchNo, returnDetails } = formData;

    useEffect(() => {
        loadWarehouse();
        loadLocation();
        loadPallet();
        loadBatch();
        loadCustomer();
        loadShipping();
        if (user !== null && id !== undefined) {
            loadData({ url, id });
        }
    }, [id, user, loadData, loadWarehouse, loadPallet, loadBatch, loadLocation, loadCustomer, loadShipping]);

    useEffect(() => {
        if (master.warehouse !== undefined && master.warehouse !== null) {
            let list = [...master.warehouse];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Warehouse",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setWarehouse(list);
        }
        if (master.pallet !== undefined && master.pallet !== null) {
            let list = [...master.pallet];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Pallet",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setPallet(list);
        }
        if (master.location !== undefined && master.location !== null) {
            let list = [...master.location];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Location",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setLocation(list);
        }
        if (master.batch !== undefined && master.batch !== null) {
            let list = [...master.batch];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    code: "No Batch",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBatch(list);
        }
        if (master.customer !== undefined && master.customer !== null) {
            let list = [...master.customer];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Customer",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setCustomer(list);
        }
        if (master.order !== undefined && master.order !== null) {
            let list = [...master.order];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Order",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setOrder(list);
        }
        if (master.shipping !== undefined && master.shipping !== null) {
            let list = [...master.shipping];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Shipping",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setShipping(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.returnDetails;
                if (details === undefined || details === null) details = [];
                details.map((item) => {
                    item.checked = false;
                    return null;
                });
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    transDate: data.data.transDate,
                    postDate: data.data.postdate,
                    locationId: data.data.locationId,
                    palletId: data.data.palletId,
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    remark: data.data.remark,
                    customerId: data.data.customerId,
                    orderId: data.data.orderId,
                    shippingNo: data.data.shippingNo,
                    truckNo: data.data.truckNo,
                    picker: data.data.picker,
                    deliveryOrderNo: data.data.deliveryOrderNo,
                    warehouseId: data.data.warehouseId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    warehouse: data.data.warehouse,
                    customer: data.data.customer,
                    location: data.data.location,
                    pallet: data.data.pallet,
                    shippingId: data.data.shippingId,
                    batchNo: data.data.batchNo,
                    returnDetails: data.data.returnDetails,
                });
            }
        }
    }, [id, data, setFormData]);

    const onDetailCheck = (e, index) => {
        let details = returnDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, returnDetails: details });
    };

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

    const handleDelete = (e, index) => {
        e.preventDefault();

        let updatedDetails = [...returnDetails];
        updatedDetails.splice(index, 1);

        setFormData({ ...formData, returnDetails: updatedDetails });
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle">
                    <FaInfoCircle style={tabIconStyle} />Detail Information
                </div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Voucher #<span className="required-star">*</span>
                        </label>
                        <div className="col">
                            <input
                                name="voucherNo"
                                value={voucherNo}
                                type="text"
                                placeholder="[AUTO]"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Reference #  <span className="required-star">*</span>
                        </label>
                        <div className="col">
                            <input
                                name="referenceNo"
                                value={referenceNo}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Shipping  #
                        </label>
                        <div className="col">
                            <Select2
                                options={shippingList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.voucherNo}
                                placeholder={"Pick Shipping"}
                                value={shippingList === null ? null : shippingList.filter((option) => option.id === parseInt(shippingId))}
                                handleChange={(e) => onSelectChange(e, "shippingId")}
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Truck No
                        </label>
                        <div className="col">
                            <input
                                name="truckNo"
                                value={truckNo}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Customer
                        </label>
                        <div className="col">
                            <Select2
                                options={customerList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Customer"}
                                value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerId))}
                                handleChange={(e) => onSelectChange(e, "customerId")}
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Picker
                        </label>
                        <div className="col">
                            <input
                                name="picker"
                                value={picker}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Location</label>
                        <div className="col">
                            <Select2
                                options={locationList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Location"}
                                value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(locationId))}
                                handleChange={(e) => onSelectChange(e, "locationId")}
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Pallet</label>
                        <div className="col">
                            <Select2
                                options={palletList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Pallet"}
                                value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(palletId))}
                                handleChange={(e) => onSelectChange(e, "palletId")}
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-4">
                            <input
                                name="batchNo"
                                value={batchNo}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                            />
                        </div>
                        <div className="col-sm-2 col-form-label">
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                    name="status"
                                    value={0} checked={status == 0} onChange={(e) => onChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary ml-4" >
                                <FaSearch /> Search
                            </button>
                        </div>
                        <div className="col-sm-0" style={{ marginLeft: "15px" }}>
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="newItemCheckbox">
                                    New Item
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
                <div style={{ marginTop: "50px" }}></div>

                <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
                    <Tab eventKey="ContactDetail" title={<span><FaFile style={tabIconStyle} />Item Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BATCH NO</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>RETURN</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QC</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>OK</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REJECT</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BALANCE</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>WAREHOUSE</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returnDetails !== undefined &&
                                        returnDetails !== null &&
                                        returnDetails.map((details, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        <input type="checkbox" checked={details.checked !== undefined && details.checked} onChange={(e) => onDetailCheck(e, index)} />
                                                    </td>
                                                    <td className="text-center"></td>
                                                    <td style={{ textAlign: 'center' }}>{details.batchId}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.itemId}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.return}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.qc}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.ok}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.reject}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.balance}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{details.uom}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={details.remark}
                                                            onChange={(e) => onChange(e, index)}
                                                            className="form-control text-center"
                                                            style={{ maxWidth: '80px' }}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Select2
                                                            options={warehouseList}
                                                            optionValue={(option) => option.id.toString()}
                                                            optionLabel={(option) => option.code}
                                                            placeholder={"Pick Warehouse"}
                                                            value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(details.warehouseId))}
                                                            handleChange={(e) => onSelectChange(e, "warehouseId")}
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="btn-delete" onClick={(e) => handleDelete(e, index)}>
                                                            <FaTrashAlt style={{ marginTop: "5px" }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </RTable>
                        </div>
                    </Tab>

                    <Tab eventKey="BillingDetail" title={<span><FaSitemap style={tabIconStyle} />Item Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>SHIPPING</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returnDetails !== undefined &&
                                        returnDetails !== null &&
                                        returnDetails.map((details, index) => {
                                            return (
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input type="checkbox" checked={details.checked !== undefined && details.checked} onChange={(e) => onDetailCheck(e, index)} />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}></td>
                                                    <td style={{ textAlign: 'center', width: "95px" }}>{details.code}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.itemName}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.qty}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.shipping}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.diff}</td>
                                                    <td className="text-center">
                                                        <button className="btn-delete" onClick={(e) => handleDelete(e, index)}>
                                                            <FaTrashAlt style={{ marginTop: "5px" }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </RTable>
                        </div>
                    </Tab>

                    <Tab eventKey="DeliveryDetail" title={<span><FaUsers style={tabIconStyle} />Change Logs</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Created</label>
                                <div className="col mr-5">
                                    <input
                                        name="createdBy"
                                        value={createdBy}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                    />
                                </div>
                                <label className="col-sm-0 text-left col-form-label">Created Date</label>
                                <div className="col">
                                    <input
                                        name="dateIn"
                                        value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")}
                                        onChange={(e) => onChange(e)}
                                        type="date"
                                        placeholder=""
                                        className="form-control text-left"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Posted</label>
                                <div className="col mr-5">
                                    <input
                                        name="postedBy"
                                        value={postedBy}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                    />
                                </div>
                                <label className="col-sm-0 text-left col-form-label">Posted Date</label>
                                <div className="col">
                                    <input
                                        name="postDate"
                                        value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")}
                                        onChange={(e) => onChange(e)}
                                        type="date"
                                        placeholder=""
                                        className="form-control text-left"
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div >
        );
    };

    return (
        <FormWrapper img={img} title={title} path={path} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

ReturnForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    addData: PropTypes.func,
    editData: PropTypes.func,
    loadData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadLocation, loadPallet, loadWarehouse, loadBatch, loadCustomer, loadShipping })(ReturnForm);