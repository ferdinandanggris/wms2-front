import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaSearch, FaUsers, FaFile, FaSitemap } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { loadLocation, loadPallet, loadWarehouse, loadBatch, loadShipping, loadShippingDetail, loadCustomer } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";

const ShippingForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadLocation, loadPallet, loadBatch, loadShippingDetail, loadCustomer }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Shipping";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/shipping/:id?/:type";
    const url = "Shipping";
    const role = "Transaction - Shipping";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        orderNo: "",
        shippingDate: "",
        customerId: "",
        truckNo: "",
        picQc: "",
        picWarehouse: "",
        picExpedisi: "",
        security: "",
        picker: "",
        warehouse: "",
        batch: "",

        //orderdetail
        code: "",
        name: "",
        qty: "",
        pcs: "",
        totalpcs: "",
        shipping: "",
        diff: "",

        //itemdetail
        item: "",
        uom: "",
        pallet: "",
        location: "",
        remark: "",

        //changelog
        createdBy: "",
        createDate: "",
        postedBy: "",
        postDate: "",
    });

    const [warehouseList, setWarehouse] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [batchList, setBatch] = useState([]);
    const [shippingDetailList, setShippingDetail] = useState([]);
    const [customerList, setCustomer] = useState([]);

    const { voucherNo, referenceNo, orderNo, shippingDate, customerId, truckNo, picQc, picWarehouse, picExpedisi, security, picker, code, name, qty, pcs, totalpcs, shipping, diff, palletId, warehouseId, item, uom, locationId, remark, createdBy, createDate, postedBy, postDate, batchId } = formData;

    useEffect(() => {
        loadWarehouse();
        loadLocation();
        loadPallet();
        loadBatch();
        loadCustomer();
        if (user !== null && id !== undefined) {
            loadData({ url, id });
            loadShippingDetail({ url, id });
        }
    }, [id, user, loadData, loadWarehouse, loadPallet, loadLocation, loadShippingDetail, loadCustomer]);

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
                    name: "No Batch",
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
            setShippingDetail(list);
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
                    orderNo: data.data.orderNo,
                    shippingDate: data.data.shippingDate,
                    customerId: data.data.customerId,
                    truckNo: data.data.truckNo,
                    picQc: data.data.picQc,
                    picWarehouse: data.data.picWarehouse,
                    picExpedisi: data.data.picExpedisi,
                    security: data.data.security,
                    picker: data.data.picker,
                    warehouseId: data.data.warehouseId,
                    batchId: data.data.batchId,
                    code: data.data.code,
                    name: data.data.name,
                    qty: data.data.qty,
                    pcs: data.data.pcs,
                    totalpcs: data.data.totalpcs,
                    shipping: data.data.shipping,
                    diff: data.data.diff,
                    item: data.data.item,
                    uom: data.data.uom,
                    palletId: data.data.palletId,
                    locationId: data.data.locationId,
                    remark: data.data.remark,
                    createdBy: data.data.created,
                    createDate: data.data.createDate,
                    postedBy: data.data.posted,
                    postDate: data.data.postdate,

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

    console.log("TEST SHIPPING", master.shippingDetail)

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle">
                    <FaInfoCircle style={tabIconStyle} />Detail Information
                </div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">
                            Voucher #<span className="required-star">*</span>
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
                        <label className="col-sm-1 col-form-label">
                            Orders #<span className="required-star">*</span>
                        </label>
                        <div className="col">
                            <input
                                name="orderNo"
                                value={orderNo}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">
                            Shipping Date  <span className="required-star">*</span>
                        </label>
                        <div className="col">
                            <input
                                name="shippingDate"
                                value={shippingDate}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">
                            Customer<span className="required-star">*</span>
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
                        <label className="col-sm-1 text-left col-form-label">
                            Truck No  <span className="required-star">*</span>
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
                        <label className="col-sm-1 col-form-label">PIC QC</label>
                        <div className="col">
                            <input
                                name="picQc"
                                value={picQc}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">PIC Warehouse</label>
                        <div className="col">
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
                        <label className="col-sm-1 col-form-label">PIC Expedisi</label>
                        <div className="col">
                            <input
                                name="picExpedisi"
                                value={picExpedisi}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Security</label>
                        <div className="col">
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
                        <label className="col-sm-1 col-form-label">Picker</label>
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
                                handleChange={(e) => onSelectChange(e, "batchId")}
                            />
                        </div>
                        <div className="col-sm-1 col-form-label">
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
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
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>SHIPPING</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
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
                                    </tr>
                                </tbody>
                            </RTable>
                        </div>
                    </Tab>
                    <Tab eventKey="BillingDetail" title={<span><FaSitemap style={tabIconStyle} />Item Detail</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <RTable bordered style={{ float: 'center', width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BATCH NO</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLET</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATION</th>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                type="text"
                                                value={qty}
                                                placeholder="Enter QTY"
                                                onChange={(e) => onChange(e)}
                                                style={{
                                                    textAlign: "center",
                                                    color: "rgba(0, 0, 0, 0.3)",
                                                    border: "1px solid rgba(0, 0, 0, 0.3)",
                                                    borderRadius: "5px",
                                                    fontSize: "14px"
                                                }}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Select2
                                                options={palletList}
                                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                                placeholder={"Pick Pallet"}
                                                value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(palletId))}
                                                handleChange={(e) => onSelectChange(e, "palletId")}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Select2
                                                options={locationList}
                                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                                placeholder={"Pick Location"}
                                                value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(locationId))}
                                                handleChange={(e) => onSelectChange(e, "locationId")} />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                type="text"
                                                value={remark}
                                                placeholder="Remark"
                                                onChange={(e) => onChange(e)}
                                                style={{
                                                    textAlign: "center",
                                                    color: "rgba(0, 0, 0, 0.3)",
                                                    border: "1px solid rgba(0, 0, 0, 0.3)",
                                                    borderRadius: "5px",
                                                    fontSize: "14px"
                                                }}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </RTable>
                        </div>
                    </Tab>
                    <Tab eventKey="DeliveryDetail" title={<span><FaUsers style={tabIconStyle} />Change Logs</span>}>
                        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-1 col-form-label">Created</label>
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
                                        name="createDate"
                                        value={createDate}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-1 col-form-label">Posted</label>
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
                                        value={postDate}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
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
                                        name="createdBy"
                                        value={createdBy}
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                    />
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
                                        <td style={{ textAlign: 'center' }}></td>
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
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
    loadData: PropTypes.func,
    loadPallet: PropTypes.func,
    loadLocation: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadShippingDetail: PropTypes.func,
    loadCustomer: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadLocation, loadPallet, loadWarehouse, loadBatch, loadShippingDetail, loadCustomer })(ShippingForm);