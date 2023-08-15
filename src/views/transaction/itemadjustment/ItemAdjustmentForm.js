import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaSearch, FaFile, FaTrashAlt } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable } from "react-bootstrap";
import { loadVendor, loadWarehouse, loadBatch, loadLocation, loadPallet } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import "../style.css";
import moment from "moment";

const ItemAdjustmentForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor, loadBatch }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Item Adjustment";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/item-adjustment";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        createdBy: "",
        transDate: null,
        postedBy: "",
        postDate: null,
        vendor: "",
        warehouse: "",
        batchNo: "",
        file: "",
        status: "Approve",
        itemAdjustmentDetails: []
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [batchList, setBatch] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');
    const { voucherNo, referenceNo, createdBy, transDate, postedBy, postDate, batchNo, vendorId, warehouseId, batchId, file, itemAdjustmentDetails } = formData;

    useEffect(() => {
        loadWarehouse();
        loadVendor();
        loadBatch();
        loadLocation();
        loadPallet();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadBatch, loadLocation, loadPallet]);

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
                    createdBy: data.data.createdBy,
                    transDate: data.data.transDate,
                    postedBy: data.data.postedBy,
                    postDate: data.data.postDate,
                    vendorId: data.data.vendorId,
                    warehouseId: data.data.warehouseId,
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

        let updatedDetails = [...itemAdjustmentDetails];
        updatedDetails.splice(index, 1); // Menghapus item pada index yang diberikan

        setFormData({ ...formData, itemAdjustmentDetails: updatedDetails });
    };

    const handleProductInputKeyDown = (e) => {
        if (e.key === "Enter") {
            const batchCode = e.target.value;
            const selectedBatch = batchList.find((batch) =>
                batch.code.toLowerCase() === batchCode.toLowerCase()
            );

            if (selectedBatch) {
                handleAddBatch(selectedBatch);
            }

            e.target.value = "";
        }
    };

    const handleAddBatch = (selectedBatch) => {
        let details = [...itemAdjustmentDetails];

        const existingBatchIndex = details.findIndex(item => item.batchId === selectedBatch.id);

        if (existingBatchIndex === -1) {
            details.unshift({
                checked: false,
                id: 0,
                warehouseId: 0,
                vendorId: 0,
                batchId: selectedBatch.id,
                qty: 0,
                voucherNo: "",
                referenceNo: "",
            });
            setFormData({ ...formData, itemAdjustmentDetails: details });
        }
    };

    const onDetailCheck = (e, index) => {
        let details = itemAdjustmentDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, itemAdjustmentDetails: details });
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    const getLocationNameById = (locationId) => {
        const location = locationList.find((loc) => loc.id === locationId);
        return location ? location.name : "Unknown Location";
    };

    const getPalletNameById = (palletId) => {
        const pallet = palletList.find((pal) => pal.id === palletId);
        return pallet ? pallet.name : "Unknown Pallet";
    };

    const getBatchCodeById = (batchId) => {
        const batch = batchList.find((bat) => bat.id === batchId);
        return batch ? batch.code : "Unknown Batch";
    };

    const PAGE_SIZE = 10;
    const MAX_VISIBLE_PAGES = 5;

    const getPaginatedDetails = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return itemAdjustmentDetails.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const totalPages = Math.ceil(itemAdjustmentDetails.length / PAGE_SIZE);
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

    const totalPages = Math.ceil(itemAdjustmentDetails.length / PAGE_SIZE);

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
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
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
                                onKeyDown={(e) => handleProductInputKeyDown(e)}
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
                            {paginatedDetails !== undefined &&
                                paginatedDetails !== null &&
                                paginatedDetails.map((details, index) => {
                                    const actualIndex = startIndex + index + 1;
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{actualIndex}</td>
                                            <td style={{ textAlign: 'center' }}>{getBatchCodeById(details.batchId)}</td>
                                            <td style={{ textAlign: 'center', width: '15%'  }}>{details.itemName}</td>
                                            <td style={{ textAlign: 'center' }}>{details.stock}</td>
                                            <td style={{ textAlign: 'center', width: '9%' }}>
                                                <input
                                                    type="text"
                                                    value={details.qty}
                                                    onChange={(e) => onChange(e, index)}
                                                    className="form-control text-center"
                                                    style={{ maxWidth: '80px' }}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{details.uom}</td>
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
                                                    optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code}
                                                    placeholder={"Pick Location"}
                                                    value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(details.locationId))}
                                                    handleChange={(e) => onSelectChange(e, "locationId")}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center', width: '11%' }}>
                                                <input
                                                    type="text"
                                                    value={details.remark}
                                                    onChange={(e) => onChange(e, index)}
                                                    className="form-control text-center"
                                                    style={{ maxWidth: '100px' }}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button className="btn-delete" onClick={(e) => handleDelete(e, index)}>
                                                    <FaTrashAlt style={{ marginTop: "5px" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
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

export default connect(mapStateToProps, { loadData, addData, editData, loadVendor, loadWarehouse, loadBatch })(ItemAdjustmentForm);