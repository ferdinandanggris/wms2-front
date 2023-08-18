import { useEffect, useState } from "react";

import "../style.css";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table as RTable } from "react-bootstrap";
import { setAlert } from "../../../actions/alert";
import Select2 from "../../../components/Select2";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import PagingComponent from "../../../components/Paging/PagingComponent";
import { FaChartBar, FaInfoCircle, FaSearch, FaFile, FaTrashAlt } from "react-icons/fa";

import { loadData, addData, editData } from "../../../actions/data";
import { loadVendor, loadWarehouse, loadBatch, loadLocation, loadPallet, loadItem } from "../../../actions/master";

const ItemAdjustmentForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor, loadBatch, loadLocation, loadPallet }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Item Adjustment";
    const img = <FaChartBar className="module-img" />;
    const path = "/transaction/item-adjustment";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

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
        batchNo: "",
        file: "",
        itemAdjustmentDetails: []
    });

    const [status, setStatus] = useState('');
    const [vendorList, setVendor] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const [locationList, setLocation] = useState([]);

    const [endIndex, setEndIndex] = useState(10);
    const [startIndex, setStartIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { voucherNo, referenceNo, createdBy, transDate, postedBy, postDate, batchNo, vendorId, warehouseId, file, itemAdjustmentDetails } = formData;

    useEffect(() => {
        loadVendor();
        loadPallet();
        loadLocation();
        loadWarehouse();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadBatch, loadLocation, loadLocation, loadPallet]);

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

    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.itemAdjustmentDetails;
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
                    warehouseId: data.data.warehouseId,
                    vendorId: data.data.vendorId,
                    locationId: data.data.locationId,
                    palletId: data.data.palletId,
                    batchId: data.data.batchId,
                    batchNo: data.data.batchNo,
                    file: data.data.file,
                    itemAdjustmentDetails: details
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e, name, index) => {
        setFormData({ ...formData, [name]: e.id });
    };

    const onDetailSelectChange = async (e, value, index) => {
        let details = itemAdjustmentDetails;
        if (details === undefined || details === null) details = [];

        if (value == "locationId") {
            details[index]["locationId"] = e.id;
        } else if (value == "palletId") {
            details[index]["palletId"] = e.id;
        }

        setFormData({ ...formData, orderDetails: details });

    };

    const onDetailChange = (e, index) => {
        e.preventDefault();

        let details = itemAdjustmentDetails;
        if (details === undefined || details === null) details = [];

        details[index][e.target.name] = e.target.value;

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

    const handleDelete = (e, index) => {
        e.preventDefault();

        let updatedDetails = [...itemAdjustmentDetails];
        updatedDetails.splice(index, 1);
        setFormData({ ...formData, itemAdjustmentDetails: updatedDetails });
    };

    const getDetail = async () => {
        try {
            const res = await axios.get(`/ItemAdjustment/detail?batchCode=` + batchNo);
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
        let details = [...itemAdjustmentDetails];

        const existingBatchIndex = details.findIndex(item => item.batchId === selectedBatch.tmpBatchId);

        if (existingBatchIndex === -1) {
            details.unshift({
                checked: false,
                id: 0,
                itemAdjustmentId: id,
                locationId: 0,
                palletId: 0,
                batchId: selectedBatch.tmpBatchId,
                itemId: selectedBatch.itemId,
                qty: 1,
                voucherNo: voucherNo,
                remark: "",
                stock: selectedBatch.stock,
                batchCode: selectedBatch.batchCode,
                uom: selectedBatch.uom,
                itemName: selectedBatch.itemName
            });
        }
        else {
            details[existingBatchIndex] = {
                ...details[existingBatchIndex],
                // Update properti sesuai kebutuhan
                qty: details[existingBatchIndex]["qty"] + 1,
                // ...
            };
        }
        setFormData({ ...formData, itemAdjustmentDetails: details });
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
                <div className="subTitle">
                    <FaInfoCircle style={tabIconStyle} />Detail Information
                </div>

                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Voucher #<span className="required-star" >*</span>
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
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col">
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
                        <label className="col-sm-2 text-left col-form-label">Trans Date</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="transDate"
                                value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col">
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
                        <label className="col-sm-2 text-left col-form-label">Post Date</label>
                        <div className="col">
                            <input
                                name="postDate"
                                value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")}
                                type="date"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">
                            Vendor
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={vendorList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Vendor"}
                                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                                handleChange={(e) => onSelectChange(e, "vendorId")} />
                        </div>
                        <label className="col-sm-2 col-form-label">
                            Warehouse<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()}
                                optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")}
                                required={true} />
                        </div>
                    </div>
                    <div className="row align-items-center d-flex mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-4">
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
                        <div className="input-group-append col-sm-2 col-form-label">
                            <button className="btn btn-primary" >
                                <FaSearch /> Search
                            </button>
                        </div>
                        <div className="col-sm-2" style={{ marginLeft: "30px" }}>
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                    name="status"
                                    value={0} checked={status == 0} onChange={(e) => onChange(e)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="newItemCheckbox"
                                >
                                    New Item
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Import</label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <input
                                    name=""
                                    value={file}
                                    type="file"
                                    onChange={(e) => onChange(e)}
                                    className="form-control-file"
                                />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="input-group">
                                <button className="btn btn-primary" style={{ width: '92px' }}>
                                    <FaFile /> Import
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "gray", opacity: 0.5, marginTop: "50px" }} />

                <div style={{ marginTop: "20px" }}></div>

                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                {/* <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th> */}
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BATCH NO</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STOCK</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLET</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATION</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>

                            {itemAdjustmentDetails !== undefined &&
                                itemAdjustmentDetails !== null &&
                                itemAdjustmentDetails.slice(startIndex, endIndex).map((details, index) => {
                                    const actualIndex = startIndex + index + 1;
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{actualIndex}</td>
                                            <td style={{ textAlign: 'center' }}>{details.batchCode}</td>
                                            <td style={{ textAlign: 'center', width: '15%' }}>{details.itemName}</td>
                                            <td style={{ textAlign: 'center' }}>{details.stock}</td>
                                            <td style={{ textAlign: 'center', width: '9%' }}>
                                                <input
                                                    type="number"
                                                    value={details.qty}
                                                    name="qty"
                                                    onChange={(e) => onDetailChange(e, index)}
                                                    className="form-control text-center"
                                                    style={{ maxWidth: '80px' }}
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
                                            <td style={{ textAlign: 'center', width: '11%' }}>
                                                <input
                                                    type="text"
                                                    value={details.remark}
                                                    onChange={(e) => onDetailChange(e, index)}
                                                    className="form-control text-center"
                                                    name="remark"
                                                    style={{ maxWidth: '100px' }}

                                                />
                                            </td>
                                            <td className="text-center">
                                                <button className="btn-delete" onClick={(e) => handleDelete(e, index)}>
                                                    <FaTrashAlt className="icon-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </RTable>
                </div>
                <div style={{ marginTop: "20px" }}></div>
                <PagingComponent
                    currentPage={currentPage}
                    limit={10}
                    total={itemAdjustmentDetails.length}
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

ItemAdjustmentForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadVendor, loadWarehouse, loadBatch, loadLocation, loadPallet, loadItem })(ItemAdjustmentForm);