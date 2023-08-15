import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaSearch, FaUsers, FaFile, FaSitemap, FaTrashAlt } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable, Tab, Tabs, Button } from "react-bootstrap";
import { loadLocation, loadPallet, loadWarehouse, loadBatch, loadCustomer, loadOrder } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import "../style.css";
import moment from "moment";

const ShippingForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadLocation, loadPallet, loadBatch, loadCustomer, loadOrder }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Shipping";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/shipping";
    const url = "Shipping";
    const role = "Transaction - Shipping";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "N",
        transDate: null,
        postDate: null,
        createdBy: "",
        postedBy: "",
        customerId: 0,
        truckNo: "",
        picker: "",
        deliveryOrderNo: "",
        orderId: 0,
        warehouseId: 0,
        picQc: "",
        picWarehouse: "",
        picExpedisi: "",
        security: "",
        shippingDate: null,
        dateIn: null,
        dateUp: null,
        userIn: "",
        userUp: "",
        batchNo: "",
        shippingDetails: [],
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [batchList, setBatch] = useState([]);
    const [customerList, setCustomer] = useState([]);
    const [orderList, setOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');
    const { voucherNo, referenceNo, shippingDate, customerId, truckNo, picQc, picWarehouse, picExpedisi, security, picker, warehouseId, remark, createdBy, dateIn, postedBy, postDate, shippingDetails, batchNo, orderId } = formData;

    useEffect(() => {
        loadWarehouse();
        loadLocation();
        loadPallet();
        loadBatch();
        loadCustomer();
        loadOrder();
        if (user !== null && id !== undefined) {
            loadData({ url, id });
        }
    }, [id, user, loadData, loadWarehouse, loadPallet, loadBatch, loadLocation, loadCustomer, loadOrder]);

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
                    name: "Pick Customer",
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
                    voucherNo: "Pick Order",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setOrder(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.shippingDetails;
                if (details === undefined || details === null) details = [];
                let warehouse = data.data.warehouse;
                if (warehouse === undefined || warehouse === null)
                    warehouse = [];
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
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    status: data.data.status,
                    customerId: data.data.customerId,
                    orderId: data.data.orderId,
                    batchNo: data.data.batchNo,
                    truckNo: data.data.truckNo,
                    picker: data.data.picker,
                    deliveryOrderNo: data.data.deliveryOrderNo,
                    warehouseId: data.data.warehouseId,
                    picQc: data.data.picQc,
                    picWarehouse: data.data.picWarehouse,
                    picExpedisi: data.data.picExpedisi,
                    security: data.data.security,
                    shippingDate: data.data.shippingDate,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    palletId: data.data.palletId,
                    batchId: data.data.batchId,
                    locationId: data.data.locationId,
                    shippingDetails: data.data.shippingDetails,
                    warehouse: data.data.warehouse,
                });
            }
        }
    }, [id, data, setFormData]);

    const onDetailCheck = (e, index) => {
        let details = shippingDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, shippingDetails: details });
    };

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e, name) => {
        if (name === "orderId") {
            const selectedOrderId = e.id;
            const selectedOrder = orderList.find(order => order.id === selectedOrderId);

            setFormData({
                ...formData,
                [name]: selectedOrderId,
                voucherNo: selectedOrder ? selectedOrder.voucherNo : "[AUTO]",
            });
        } else {
            setFormData({
                ...formData,
                [name]: e.id,
            });
        }
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

        let updatedDetails = [...shippingDetails];
        updatedDetails.splice(index, 1);

        setFormData({ ...formData, shippingDetails: updatedDetails });
    };

    const PAGE_SIZE = 10;
    const MAX_VISIBLE_PAGES = 5;

    const getPaginatedDetails = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return shippingDetails.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const totalPages = Math.ceil(shippingDetails.length / PAGE_SIZE);
        const currentPageIndex = currentPage - 1;
        const halfMaxVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);

        if (totalPages <= MAX_VISIBLE_PAGES) {
            return [...Array(totalPages).keys()].map((index) => index + 1);
        }

        if (currentPageIndex < halfMaxVisiblePages) {
            return [...Array(MAX_VISIBLE_PAGES).keys()].map((index) => index + 1);
        }

        if (currentPageIndex >= totalPages - halfMaxVisiblePages) {
            return [...Array(MAX_VISIBLE_PAGES).keys()].map((index) => totalPages - MAX_VISIBLE_PAGES + index + 1);
        }

        const middlePage = currentPageIndex + 1;
        const startPageIndex = middlePage - halfMaxVisiblePages;
        return [...Array(MAX_VISIBLE_PAGES).keys()].map((index) => startPageIndex + index);
    };

    const totalPages = Math.ceil(shippingDetails.length / PAGE_SIZE);

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        const paginatedDetails = getPaginatedDetails();
        const pageNumbers = getPageNumbers();
        const startIndex = (currentPage - 1) * PAGE_SIZE;
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
                        <div className="col-3">
                            <input
                                name="voucherNo"
                                value={voucherNo}
                                type="text"
                                placeholder="[AUTO]"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                readOnly
                                required
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Reference #  <span className="required-star">*</span>
                        </label>
                        <div className="col-5">
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
                            Orders #<span className="required-star">*</span>
                        </label>
                        <div className="col-3">
                            <Select2
                                options={orderList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.voucherNo}
                                placeholder={"Pick order"}
                                value={orderList === null ? null : orderList.filter((option) => option.id === parseInt(orderId))}
                                handleChange={(e) => onSelectChange(e, "orderId")} required />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Shipping Date
                        </label>
                        <div className="col-3">
                            <input
                                name="shippingDate"
                                value={shippingDate === null ? "" : moment(shippingDate).format("YYYY-MM-DD")}
                                type="date"
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
                        <div className="col-3">
                            <Select2
                                options={customerList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Customer"}
                                value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerId))}
                                handleChange={(e) => onSelectChange(e, "customerId")}
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Truck No
                        </label>
                        <div className="col-5">
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
                        <label className="col-sm-2 col-form-label">PIC QC</label>
                        <div className="col-3">
                            <input
                                name="picQc"
                                value={picQc}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">PIC Warehouse</label>
                        <div className="col-5">
                            <input
                                name="picWarehouse"
                                value={picWarehouse}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">PIC Expedisi</label>
                        <div className="col-3">
                            <input
                                name="picExpedisi"
                                value={picExpedisi}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Security</label>
                        <div className="col-5">
                            <input
                                name="security"
                                value={security}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Picker</label>
                        <div className="col-3">
                            <input
                                name="picker"
                                value={picker}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">
                            Warehouse<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-5">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")}
                                required={true} />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-3">
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
                                    name=""
                                    value=""
                                // value={0} checked={status == 0} onChange={(e) => onChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary ml-4" >
                                <FaSearch /> Search
                            </button>
                        </div>
                        <div className="col-sm-0" style={{ marginLeft: "70px" }}>
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
                        <div className="col-sm-0" style={{ marginLeft: "20px" }}>
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="newItemCheckbox">
                                    Full Pallet
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
                <div style={{ marginTop: "50px" }}></div>

                <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
                    <Tab eventKey="ContactDetail" title={<span><FaFile style={tabIconStyle} />Order Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>SHIPPING</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedDetails !== undefined &&
                                        paginatedDetails !== null &&
                                        paginatedDetails.map((details, index) => {
                                            const actualIndex = startIndex + index + 1;
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        <input type="checkbox" checked={details.checked !== undefined && details.checked} onChange={(e) => onDetailCheck(e, index)} />
                                                    </td>
                                                    <td className="text-center">{actualIndex}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Select2
                                                            options={batchList}
                                                            optionValue={(option) => option.id.toString()}
                                                            optionLabel={(option) => option.code}
                                                            placeholder={"Pick Batch"}
                                                            value={batchList === null ? null : batchList.filter((option) => option.id === parseInt(details.batchId))}
                                                            handleChange={(e) => onSelectChange(e, "batchId")}
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{details.itemName}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.qty}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.pcs}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.totalPcs}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.voucherNo}</td>
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
                        <div style={{ marginTop: "20px" }}></div>
                        <ul className="pagination" style={{ marginLeft: "15px" }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                            </li>
                            {pageNumbers.map((pageNumber) => (
                                <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </Tab>

                    <Tab eventKey="BillingDetail" title={<span><FaSitemap style={tabIconStyle} />Item Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BATCH NO</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLET</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATION</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedDetails !== undefined &&
                                        paginatedDetails !== null &&
                                        paginatedDetails.map((details, index) => {
                                            const actualIndex = startIndex + index + 1;
                                            return (
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input type="checkbox" checked={details.checked !== undefined && details.checked} onChange={(e) => onDetailCheck(e, index)} />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{actualIndex}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Select2
                                                            options={batchList}
                                                            optionValue={(option) => option.id.toString()}
                                                            optionLabel={(option) => option.code}
                                                            placeholder={"Pick Batch"}
                                                            value={batchList === null ? null : batchList.filter((option) => option.id === parseInt(details.batchId))}
                                                            handleChange={(e) => onSelectChange(e, "batchId")}
                                                            disabled={true}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center', width: "95px" }}>{details.itemName}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.qty}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.uom}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.pcs}</td>
                                                    <td style={{ textAlign: 'center' }}>{details.totalPcs}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Select2
                                                            options={palletList}
                                                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                                            placeholder={"Pick Pallet"}
                                                            value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(details.palletId))}
                                                            handleChange={(e) => onSelectChange(e, "palletId")}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Select2
                                                            options={locationList}
                                                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                                            placeholder={"Pick Location"}
                                                            value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(details.locationId))}
                                                            handleChange={(e) => onSelectChange(e, "locationId")} />
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={remark}
                                                            placeholder="Remark"
                                                            onChange={(e) => onChange(e)}
                                                            style={{
                                                                width: "70px",
                                                                textAlign: "center",
                                                                color: "rgba(0, 0, 0, 0.3)",
                                                                border: "1px solid rgba(0, 0, 0, 0.3)",
                                                                borderRadius: "5px",
                                                                fontSize: "14px"
                                                            }}
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
                        <div style={{ marginTop: "20px" }}></div>
                        <ul className="pagination" style={{ marginLeft: "15px" }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                            </li>
                            {pageNumbers.map((pageNumber) => (
                                <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </Tab>

                    <Tab eventKey="DeliveryDetail" title={<span><FaUsers style={tabIconStyle} />Change Logs</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Created</label>
                                <div className="col-4 mr-5">
                                    <input
                                        name="createdBy"
                                        value={createdBy}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                        readOnly
                                    />
                                </div>
                                <label className="col-sm-2 text-left col-form-label">Created Date</label>
                                <div className="col-3">
                                    <input
                                        name="dateIn"
                                        value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")}
                                        onChange={(e) => onChange(e)}
                                        type="date"
                                        placeholder=""
                                        className="form-control text-left"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Posted</label>
                                <div className="col-4 mr-5">
                                    <input
                                        name="postedBy"
                                        value={postedBy}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                        readOnly
                                    />
                                </div>
                                <label className="col-sm-2 text-left col-form-label">Posted Date</label>
                                <div className="col-3">
                                    <input
                                        name="postDate"
                                        value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")}
                                        onChange={(e) => onChange(e)}
                                        type="date"
                                        placeholder=""
                                        className="form-control text-left"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="Document" title={<span><FaFile style={tabIconStyle} />Reference Detail</span>}>
                        <div className="form-group col-md-12 col-lg-5 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-3 col-form-label">Reference No</label>
                                <div className="col mr-5">
                                    <input
                                        name="referenceNo"
                                        value={referenceNo}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                    />
                                </div>
                                <div className="col-sm-0 text-left col-form-label">
                                    <Button variant="primary" className="fa fa-plus"> Add</Button>{' '}
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-md-5 col-lg-5 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REFERENCE NO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{formData.referenceNo}</td>
                                    </tr>
                                </tbody>
                            </RTable>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    };

    return (
        <FormWrapper img={img} title={title} path={path} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

ShippingForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadLocation, loadPallet, loadWarehouse, loadBatch, loadCustomer, loadOrder })(ShippingForm);