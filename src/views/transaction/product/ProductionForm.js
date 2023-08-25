import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Table, Tabs } from "react-bootstrap";
import { FaBox, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaCheck, FaPlus, FaTimes } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadItem } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import Select2 from "../../../components/Select2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAlert } from "../../../actions/alert";

const ProductionForm = ({ user, data, loadData, addData, editData, master, loadItem }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = " Production Order Form";
    const img = <FaBox className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    // const path = "/transaction/production/:id?/:type";
    const path = "/transaction/production";
    const url = "Production";
    const role = "transaction - ProductionForm";

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        customerId: 0,
        transDate: null,
        createdBy: "",
        status: "N",
        receivingDate: null,
        referenceNo: "",
        closedDate: null,
        closedBy: "",
        dateIn: null,
        dateUp: null,
        userIn: "1",
        userUp: "",
        productionDetails: []

    });

    const { name, type, voucherNo, customerId, transDate, createdBy, receivingDate, referenceNo, closedBy, dateIn, dateUp, userIn, userUp, productionDetails } = formData;

    const [itemList, setItem] = useState([]);

    useEffect(() => {
        loadItem();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem]);

    useEffect(() => {
        if (master.item !== undefined && master.item !== null) {
            let list = [...master.item];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setItem(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    customerId: data.data.customerId,
                    transDate: data.data.transDate,
                    createdBy: data.data.createdBy,
                    status: data.data.status,
                    receivingDate: data.data.receivingDate,
                    referenceNo: data.data.referenceNo,
                    closedBy: data.data.closedBy,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    productionDetails: data.data.productionDetails,
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

        let details = productionDetails;
        if (details === undefined || details === null) details = [];

        details.push({
            id: 0,
            productionId: 0,
            itemId: 0,
            qty: 0,
            voucherNo: "",
            remark: "",
        });
        setFormData({ ...formData, productionDetails: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details = productionDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, productionDetails: newDetail });
    };

    const onDetailCheck = (e, index) => {
        let details = productionDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, productionDetails: details });
    };

    const onDetailSelectChange = async (e, value, index) => {
        let details = productionDetails;
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
                qty: qty,
                voucherNo: e.voucherNo
            })
        );

        if (data != null) {
            details[index]["uom"] = data.data.uom;
            details[index]["qtyPerPacking"] = data.data.qtyPerPacking;
            details[index]["totalPcs"] = qty * data.data.qtyPerPacking;
            details[index]["stock"] = data.data.stock;
            details[index]["receiving"] = data.data.receiving;
            details[index]["diff"] = data.data.diff;
        }

        setFormData({ ...formData, productionDetails: details });

    };

    const onDetailChange = (e, index) => {
        e.preventDefault();

        let details = productionDetails;
        if (details === undefined || details === null) details = [];

        details[index][e.target.name] = e.target.value;
        if (e.target.name == "qty") {
            details[index]["qty"] = e.target.value;
            details[index]["totalPcs"] = e.target.value * details[index]["qtyPerPacking"];
        }

        setFormData({ ...formData, productionDetails: details });
    };

    const getDetail = ({ itemId, qty }) => async (dispatch) => {
        try {
            const queryParams = { itemId, qty };
            // console.log(axios.defaults.baseURL);
            const res = await axios.get(`/production/detail`, { params: queryParams });
            return Promise.resolve(res.data);
        } catch (err) {
            let errMessage = "";
            if (err.message) errMessage = err.message;
            if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
            dispatch(setAlert(errMessage, "danger"));
        }
    };

    const renderItem = () =>
        productionDetails !== undefined &&
        productionDetails !== null &&
        productionDetails.map((item, index) => {
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
                            name="receiving"
                            readOnly={true}
                            value={item.receiving}
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

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Detail Information</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} type="text" readOnly placeholder="[AUTO]" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                            <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" required />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" readOnly />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="dateIn" value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" readOnly />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Receiving Date
                        </label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="receivingDate" value={receivingDate === null ? "" : moment(receivingDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mb-2">
                        <button className="btn btn-primary mr-3" onClick={(e) => handleNewRow(e)}>
                            <FaPlus className="mr-2" /> <span>Add</span>
                        </button>
                        <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                            <FaTimes className="mr-2" /> <span>Delete</span>
                        </button>
                    </div>

                    <div className="item-table">
                        <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>No</th>
                                    <th style={{ minWidth: 200 }} >Product</th>
                                    <th>Qty</th>
                                    <th>Uom</th>
                                    <th>Qty/Box</th>
                                    <th>Total Pcs</th>
                                    <th>Stock</th>
                                    <th>Receiving</th>
                                    <th>Diff</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderItem()}
                            </tbody>
                        </Table>
                    </div>
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

ProductionForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadItem })(ProductionForm);