import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle, FaTimes, FaPlus, FaCheck, FaCubes } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable } from "react-bootstrap";
import { loadItem, loadWarehouse, loadCustomer } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import { useDispatch } from "react-redux";

const SpkForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadItem, loadCustomer }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "SPK";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/spk";
    const url = "Order";
    const role = "Transaction - SPK";

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [returnUrl, setReturnUrl] = useState(path);

    useEffect(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
    }, []);

    const [formData, setFormData] = useState({
        id: 0,
        customerId: 0,
        warehouseId: 0,
        transDate: null,
        shippingDate: null,
        closedDate: null,
        flag: 0,
        voucherNo: "",
        referenceNo: "",
        createdBy: "",
        status: "N",
        truckNo: "",
        expedition: "",
        print: "",
        closedBy: "",
        orderDetails: []
    });

    const [itemList, setItem] = useState([]);
    const [customerList, setCustomer] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleCekStock = () => setShowModal(true);

    const {
        customerId,
        warehouseId,
        transDate,
        shippingDate,
        voucherNo,
        referenceNo,
        createdBy,
        truckNo,
        expedition,
        itemId,
        orderDetails,
    } = formData;

    useEffect(() => {
        loadItem();
        loadWarehouse();
        loadCustomer();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem, loadWarehouse, loadCustomer]);

    useEffect(() => {
        if (master.item !== undefined && master.item !== null) {
            let list = [...master.item];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setItem(list);
        }
        if (master.warehouse !== undefined && master.warehouse !== null) {
            let list = [...master.warehouse];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setWarehouse(list);
        }
        if (master.customer !== undefined && master.customer !== null) {
            let list = [...master.customer];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setCustomer(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.orderDetails;
                if (details === undefined || details === null) details = [];

                details.map((item) => {
                    item.checked = false;
                    return null;
                });
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    customerId: data.data.customerId,
                    warehouseId: data.data.warehouseId,
                    transDate: data.data.transDate,
                    shippingDate: data.data.shippingDate,
                    closedDate: data.data.closedDate,
                    flag: data.data.flag,
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    createdBy: data.data.createdBy,
                    status: data.data.status,
                    truckNo: data.data.truckNo,
                    expedition: data.data.expedition,
                    print: data.data.print,
                    closedBy: data.data.closedBy,
                    itemId: data.data.itemId,
                    orderDetails: data.data.orderDetails,
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
                // navigate(`${path}/${formData.id}/edit`);
                navigate(`${path}`);
            });
        } else {
            editData({ url, body: formData }).then(() => {
                if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) navigate(`${searchParams.get("return_url")}`);
                else navigate(`${returnUrl}`);
            });
        }
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    const onDetailCheck = (e, index) => {
        let details = orderDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, orderDetails: details });
    };

    // Get Detail

    const getDetail = ({ itemId, warehouseId, qty, voucherNo }) => async (dispatch) => {
        try {
            const queryParams = { itemId, warehouseId, qty, voucherNo };
            // console.log(axios.defaults.baseURL);
            const res = await axios.get(`/order/detail`, { params: queryParams });
            return Promise.resolve(res.data);
        } catch (err) {
            let errMessage = "";
            if (err.message) errMessage = err.message;
            if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
            dispatch(setAlert(errMessage, "danger"));
        }
    };

    const onDetailSelectChange = async (e, value, index) => {
        let details = orderDetails;
        if (details === undefined || details === null) details = [];

        const product = itemList.find((obj) => {
            return obj.id === e.id;
        });
        if (product === undefined && product === null) return;

        details[index]["itemId"] = e.id;

        var qty = details[index]["qty"];

        var data = await dispatch(
            getDetail({
                itemId: e.id,
                warehouseId: warehouseId,
                qty: qty,
                voucherNo: voucherNo,
            })
        );

        if (data != null) {
            details[index]["uom"] = data.data.uom;
            details[index]["qtyPerPacking"] = data.data.qtyPerPacking;
            details[index]["totalPcs"] = qty * data.data.qtyPerPacking;
            details[index]["qtyBooked"] = data.data.qtyBooked;
            details[index]["availability"] = data.data.availability;
            details[index]["stock"] = data.data.stock;
            details[index]["diff"] = data.data.diff;
        }

        setFormData({ ...formData, orderDetails: details });

    };

    const onDetailChange = (e, index) => {
        e.preventDefault();

        let details = orderDetails;
        if (details === undefined || details === null) details = [];

        details[index][e.target.name] = e.target.value;
        if (e.target.name == "qty") {
            details[index]["qty"] = e.target.value;
            details[index]["totalPcs"] = e.target.value * details[index]["qtyPerPacking"];
        }

        setFormData({ ...formData, orderDetails: details });
    };

    const renderItem = () =>
        orderDetails !== undefined &&
        orderDetails !== null &&
        orderDetails.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="text-center">
                        <input type="checkbox" checked={item.checked !== undefined && item.checked} onChange={(e) => onDetailCheck(e, index)} />
                    </td>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-left">
                        <Select2
                            maxLength={300}
                            options={itemList}
                            optionValue={(option) => option.id.toString()}
                            optionLabel={(option) => option.name + ' - ' + option.code}
                            placeholder={"Pick Product"}
                            value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(item.itemId))}
                            handleChange={(e) => onDetailSelectChange(e, "itemId", index)}
                        />
                    </td>

                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="qty" value={item.qty}
                            onChange={(e) => onDetailChange(e, index)}
                            allowNegative={false} thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-center" >
                        <input
                            className="form-control"
                            type="text" style={{ textAlign: "center" }}
                            name="uom"
                            readOnly={true}
                            value={item.uom}
                            onChange={(e) => onDetailChange(e, index)}
                            placeholder="Enter Name"
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            width={50}
                            name="qtyPerPacking"
                            readOnly={true}
                            value={item.qtyPerPacking}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="totalPcs"
                            readOnly={true}
                            value={item.totalPcs}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="qtyBooked"
                            readOnly={true}
                            value={item.qtyBooked}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="availability"
                            readOnly={true}
                            value={item.availability}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="stock"
                            readOnly={true}
                            value={item.stock}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="shipping" readOnly={true}
                            value={item.shipping}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="diff"
                            readOnly={true}
                            value={item.diff}
                            allowNegative={false}
                            thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
                    <td className="text-right">
                        <input
                            className="form-control text-left"
                            name="remark"
                            value={item.remark || undefined}
                            type="text"
                            placeholder="Remark"
                            onChange={(e) => onDetailChange(e, index)}
                        />
                    </td>
                </tr >
            );
        });

    const handleNewRow = (e) => {
        e.preventDefault();

        let details = orderDetails;
        if (details === undefined || details === null) details = [];

        details.push({
            checked: false,
            productID: 0,
            id: 0,
            orderId: 0,
            itemId: 0,
            qty: 0,
            voucherNo: "",
            remark: "",
        });
        setFormData({ ...formData, orderDetails: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details = orderDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, orderDetails: newDetail });
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
                            Voucher #<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="voucherNo"
                                value={voucherNo}
                                onChange={(e) => onChange(e)}
                                type="text"
                                placeholder="[AUTO]"
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">
                            Reference #  <span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="referenceNo"
                                value={referenceNo}
                                onChange={(e) => onChange(e)}
                                type="text"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="createdBy" value={createdBy}
                                onChange={(e) => onChange(e)}
                                type="text"
                                placeholder=""
                                readOnly />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="transDate"
                                value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                                readOnly />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Expedition</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="expedition"
                                value={expedition}
                                onChange={(e) => onChange(e)}
                                type="text"
                                placeholder="" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Shipping Date</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="shippingDate"
                                value={shippingDate === null ? "" : moment(shippingDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Customer</label>
                        <div className="col">
                            <Select2
                                options={customerList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick customer"}
                                value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerId))}
                                handleChange={(e) => onSelectChange(e, "customerId")} />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Truck No</label>
                        <div className="col">
                            <input
                                className="form-control text-left"
                                name="truckNo"
                                value={truckNo}
                                onChange={(e) => onChange(e)}
                                type="text"
                                placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Warehouse<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")}
                                required={true}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "30px" }}></div>
                    {/* <hr style={{ borderColor: "gray", opacity: 0.5 }} /> */}

                    {/* <div className="row align-items-center mt-4 mb-4">
                        <label className="col-sm-2 col-form-label">Item No</label>
                        <div className="col-sm-4">
                            <Select2
                                options={itemList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Item"}
                                value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
                                handleChange={(e) => onSelectChange(e, "itemId")}
                            />
                        </div>
                        <div className="col-sm-1 col-form-label">
                            <button className="btn btn-primary ml-4" >
                                <FaCheck /> Select
                            </button>
                        </div>
                        <div className="col-sm-1 col-form-label">
                            <button className="btn btn-primary ml-5" >
                                <FaCubes /> Select
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
                    </div> */}

                    <hr style={{ borderColor: "gray", opacity: 0.5 }} />
                    {/* <div style={{ marginBottom: "40px" }}></div> */}
                </div>

                <div className="d-flex justify-content-end mb-2">
                    <button className="btn btn-primary mr-3" onClick={(e) => handleNewRow(e)}>
                        <FaPlus className="mr-2" /> <span>Add</span>
                    </button>
                    <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                        <FaTimes className="mr-2" /> <span>Delete</span>
                    </button>
                </div>
                <div>
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                <th style={{ minWidth: "200px", width: "200px", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Product</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                                <th style={{ minWidth: "35px", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Uom</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty/Box</th>
                                <th style={{ minWidth: "65px", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Total Pcs</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty Booked</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Availability</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Stock</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Shipping</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Diff</th>
                                <th style={{ minWidth: "auto", backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderItem()}
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

SpkForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadItem, loadWarehouse, loadCustomer })(SpkForm);