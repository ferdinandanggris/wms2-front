import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaSearch, FaFile } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable } from "react-bootstrap";
import { loadVendor, loadWarehouse, loadBatch } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";

const ItemAdjustmentForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor, loadBatch }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Item Adjustment";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/item-adjustment/:id?/:type";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        createdBy: "",
        transDate: "",
        postedBy: "",
        postDate: "",
        vendor: "",
        warehouse: "",
        batch: "",
        file: "",
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [batchList, setBatch] = useState([]);

    const { voucherNo, referenceNo, createdBy, transDate, postedBy, postDate, vendorId, warehouseId, batchId, file } = formData;

    useEffect(() => {
        loadWarehouse();
        loadVendor();
        loadBatch();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadBatch]);

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
                    name: "No Batch",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBatch(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
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
                    batchId: data.data.batchId,
                    file: data.data.file,
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
                        <label className="col-sm-1 col-form-label">
                            Voucher #<span className="required-star" >*</span>
                        </label>
                        <div className="col">
                            <input
                                name="voucherNo"
                                value={voucherNo}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">
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
                        <label className="col-sm-1 col-form-label">Created</label>
                        <div className="col">
                            <input
                                name="createdBy"
                                value={createdBy}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Trans Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="transDate" value={transDate} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Posted</label>
                        <div className="col">
                            <input
                                name="postedBy"
                                value={postedBy}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Post Date</label>
                        <div className="col">
                            <input
                                name="postDate"
                                value={postDate}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">
                            Vendor<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-5">
                            <Select2
                                options={vendorList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Vendor"}
                                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                                handleChange={(e) => onSelectChange(e, "vendorId")} />
                        </div>
                        <label className="col-sm-1 col-form-label">
                            Warehouse<span className="required-star">*</span>
                        </label>
                        <div className="col-sm-5">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-1 col-form-label">Batch No</label>
                        <div className="col-sm-5">
                            <Select2
                                options={batchList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code}
                                placeholder={"Pick Batch"}
                                value={batchList === null ? null : batchList.filter((option) => option.id === parseInt(batchId))}
                                handleChange={(e) => onSelectChange(e, "bacthId")} />
                        </div>
                        <div className="input-group-append col-sm-1 col-form-label">
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
                        <label className="col-sm-1 col-form-label">Import</label>
                        <div className="col-sm-5">
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
                <div style={{ marginTop: "50px" }}></div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BATCH NO</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STOCK</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLET</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATION</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
                                <td style={{ textAlign: 'center' }}></td>
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