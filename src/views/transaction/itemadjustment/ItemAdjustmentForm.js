import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaSearch, FaFile } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable, Modal, Button } from "react-bootstrap";
import { loadVendor, loadWarehouse } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";


const ItemAdjustmentForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Item Adjustment";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/item-adjustment/:id?/:type";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

    const [formData, setFormData] = useState({
        id: 0,
        voucher: "",
        reference: "",
        created: "",
        transdate: "",
        posted: "",
        postdate: "",
        vendor: "",
        warehouse: "",
        batch: "",
        file: "",
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [vendorList, setVendor] = useState([]);

    const { voucher, reference, created, transdate, posted, postdate, vendorId, warehouseId, batch, file } = formData;

    useEffect(() => {
        loadWarehouse();
        loadVendor();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadVendor]);

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
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucher: data.data.voucher,
                    reference: data.data.reference,
                    created: data.data.created,
                    transdate: data.data.transdate,
                    posted: data.data.posted,
                    postdate: data.data.postdate,
                    vendorId: data.data.vendorId,
                    warehouseId: data.data.warehouseId,
                    batch: data.data.batch,
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
                            Voucher #<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col">
                            <input className="form-control text-left" name="voucher" value={voucher} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">
                            Reference #  <span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col">
                            <input className="form-control text-left" name="reference" value={reference} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Created</label>
                        <div className="col">
                            <input className="form-control text-left" name="created" value={created} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Trans Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="transdate" value={transdate} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Posted</label>
                        <div className="col">
                            <input className="form-control text-left" name="posted" value={posted} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Post Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="postdate" value={postdate} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">
                            Vendor<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                            Warehouse<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                            <input
                                name="code"
                                value="batch"
                                type="number"
                                onChange={(e) => onChange(e)}
                                className="form-control text-right"
                                placeholder=""
                            />
                        </div>
                        <div className="input-group-append col-sm-1 col-form-label">
                            <button className="btn btn-primary" >
                                <FaSearch /> Search
                            </button>
                        </div>
                        <div className="col-sm-2" style={{ marginLeft: "30px" }}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="newItemCheckbox"
                                />
                                <label className="form-check-label" htmlFor="newItemCheckbox">
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
                                    className="form-control-file"
                                    name=""
                                    value=""
                                    type="file"
                                    onChange={(e) => onChange(e)}
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

export default connect(mapStateToProps, { loadData, addData, editData, loadVendor, loadWarehouse })(ItemAdjustmentForm);