import { useEffect, useState } from "react";

import "../style.css";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";
import { Table as RTable } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import PagingComponent from "../../../components/Paging/PagingComponent";
import { FaBox, FaUserFriends, FaTrashAlt, FaSearch } from "react-icons/fa";

import { loadData, addData, editData } from "../../../actions/data";
import { loadVendor, loadWarehouse, loadPallet, loadLocation, loadBatch, loadItem } from "../../../actions/master";

const RawMaterialReceivingForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor, loadLocation, loadPallet, loadBatch, loadItem }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = "Raw Material Receiving";
    const img = <FaBox className="module-img" />;
    const path = "/transaction-rm/raw-material-receiving";
    const url = "RawMaterialReceiving";
    const role = "Transaction - Raw Material Receiving";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "Approve",
        transDate: null,
        postDate: null,
        createdBy: user.fullName,
        postedBy: "",
        vendor: "",
        warehouse: "",
        dateIn: null,
        dateUp: null,
        userIn: "",
        userUp: "",
        batchNo: "",
        palletId: 0,
        locationId: 0,
        rawMaterialReceivingDetails: []
    });

    const [itemList, setItem] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [batchList, setBatch] = useState([]);
    const dispatch = useDispatch();
    const { voucherNo, referenceNo, postDate, createdBy, postedBy, vendorId, warehouseId, dateIn, batchNo, rawMaterialReceivingDetails } = formData;

    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    useEffect(() => {
        loadBatch();
        loadVendor();
        loadPallet();
        loadLocation();
        loadWarehouse();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadVendor, loadWarehouse, loadLocation, loadPallet, loadBatch]);

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
        if (master.vendor !== undefined && master.vendor !== null) {
            let list = [...master.vendor];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Vendor",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setVendor(list);
        }
        if (master.pallet !== undefined && master.pallet !== null) {
            let list = [...master.pallet];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    code: "",
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
                    code: "",
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
                    name: "No Batch",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBatch(list);
        }
        if (master.item !== undefined && master.item !== null) {
            let list = [...master.item];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Item",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setItem(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.rawMaterialReceivingDetails;
                if (details === undefined || details === null) details = [];
                details.map((item) => {
                    item.checked = false;
                    return null;
                });
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
                    palletId: data.data.palletId,
                    locationId: data.data.locationId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    batchNo: data.data.batchNo,
                    batchId: data.data.batchId,
                    itemId: data.data.itemId,
                    rawMaterialReceivingDetails: details,
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id });
    };

    const onDetailSelectChange = async (e, value, index) => {
        let details = rawMaterialReceivingDetails;
        if (details === undefined || details === null) details = [];

        if (value == "locationId") {
            details[index]["locationId"] = e.id;
        } else if (value == "palletId") {
            details[index]["palletId"] = e.id;
        }

        setFormData({ ...formData, orderDetails: details });

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

    const getDetail = async () => {
        try {
            const res = await axios.get(`/RawMaterialReceiving/detail?batchCode=` + batchNo);

            return Promise.resolve(res.data);
        } catch (err) {
            let errMessage = "";
            if (err.message) errMessage = err.message;
            if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
            setAlert(errMessage, "danger");
        }
    };

    const handleBatchNoKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            var data = await getDetail();

            if (data != null) {
                handleAddBatch(data.data);
            }
        }
    };

    const handleAddBatch = (selectedBatch) => {
        let details = [...rawMaterialReceivingDetails];

        const existingBatchIndex = details.findIndex(item => item.batchId === selectedBatch.tmpBatchId);

        if (existingBatchIndex === -1) {
            details.unshift({
                checked: false,
                id: 0,
                rawMaterialReceivingId: 0,
                batchId: selectedBatch.tmpBatchId,
                batchCode: selectedBatch.batchCode,
                itemId: selectedBatch.itemId,
                itemName: selectedBatch.itemName,
                uom: selectedBatch.uom,
                locationId: 0,
                palletId: 0,
                qty: 1,
                voucherNo: voucherNo,
                remark: "",
            });
        }
        else {
            details[existingBatchIndex] = {
                ...details[existingBatchIndex],
                qty: details[existingBatchIndex]["qty"] + 1,
            };
        }
        setFormData({ ...formData, rawMaterialReceivingDetails: details });
    };

    const getItemNameById = (itemId) => {
        const item = itemList.find((item) => item.id === itemId);
        return item ? item.name : "Unknown Item";
    };

    const handlePageChange = (pageNumber) => {
        setStartIndex((pageNumber - 1) * 10);
        setEndIndex(pageNumber * 10);
        setCurrentPage(pageNumber);
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
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="voucherNo"
                                value={voucherNo}
                                type="text"
                                onChange={(e) => onChange(e)}
                                placeholder="[AUTO]"
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Reference #<span className="text-danger">*</span></label>
                        <div className="col-sm-3 ">
                            <input
                                className="form-control text-left"
                                name="referenceNo"
                                value={referenceNo}
                                onChange={(e) => onChange(e)}
                                type="text"
                                required
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="createdBy"
                                value={createdBy}
                                onChange={(e) => onChange(e)}
                                type="text"
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input
                                className="form-control text-left"
                                name="dateIn"
                                value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="postedBy"
                                value={postedBy}
                                onChange={(e) => onChange(e)}
                                type="text"
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input
                                className="form-control text-left"
                                name="postDate"
                                value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Vendor</label>
                        <div className="col-sm-3 mr-4">
                            <Select2
                                options={vendorList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Vendor"}
                                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                                handleChange={(e) => onSelectChange(e, "vendorId")} />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                    <div className="row align-items-center d-flex mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-3">
                            <input
                                name="batchNo"
                                type="text"
                                value={batchNo}
                                onChange={(e) => onChange(e)}
                                onKeyDown={(e) => handleBatchNoKeyDown(e)}
                                className="form-control text-left"
                                placeholder="Input Batch"
                            />
                        </div>
                        <div className="col-sm-2 col-form-label d-flex align-items-center">
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                    name="status"
                                    value={0} checked={status == 0}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary ml-4" >
                                <FaSearch /> Search
                            </button>
                        </div>
                    </div>
                    <hr style={{ borderColor: "gray", margin: "40px 0", opacity: 0.5 }} />
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Pallets</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Location</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Remark</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawMaterialReceivingDetails !== undefined &&
                                rawMaterialReceivingDetails !== null &&
                                rawMaterialReceivingDetails.slice(startIndex, endIndex).map((details, index) => {
                                    const actualIndex = startIndex + index + 1;
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{actualIndex}</td>
                                            <td style={{ textAlign: 'center' }}>{details.batchCode}</td>
                                            <td style={{ textAlign: 'center' }}>{details.itemName}</td>
                                            <td style={{ textAlign: 'center', width: '9%' }}>
                                                <input
                                                    type="text"
                                                    value={details.qty}
                                                    onChange={(e) => onChange(e, index)}
                                                    className="form-control text-center"
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{details.uom}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Select2
                                                    options={palletList}
                                                    optionValue={(option) => option.id.toString()}
                                                    optionLabel={(option) => (option.code != "" ? option.code + ' - ' + option.name : option.name)}
                                                    placeholder={"Pick Pallet"}
                                                    value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(details.palletId))}
                                                    handleChange={(e) => onDetailSelectChange(e, "palletId", actualIndex - 1)}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Select2
                                                    options={locationList}
                                                    optionValue={(option) => option.id.toString()}
                                                    optionLabel={(option) => (option.code != "" ? option.code + ' - ' + option.name : option.name)}
                                                    placeholder={"Pick Location"}
                                                    value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(details.locationId))}
                                                    handleChange={(e) => onDetailSelectChange(e, "locationId", actualIndex - 1)}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={details.remark}
                                                    onChange={(e) => onChange(e, index)}
                                                    className="form-control text-center"
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button className="btn-delete" onClick={(e) => handleDelete(e)}>
                                                    <FaTrashAlt className="icon-trash" />
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
                <PagingComponent
                    currentPage={currentPage}
                    limit={10}
                    total={rawMaterialReceivingDetails.length}
                    onPageChange={handlePageChange}
                />
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

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor, loadLocation, loadPallet, loadBatch, loadItem })(RawMaterialReceivingForm);