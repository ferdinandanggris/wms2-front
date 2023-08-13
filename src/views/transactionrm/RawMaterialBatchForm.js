import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaPlus, FaTimes } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadItem } from "../../actions/master";
import ListTransaction from "../../views/master/customComponent/listTransaction";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../components/Select2";
import moment from "moment";

const RawMaterialBatchForm = ({ user, data, loadData, addData, editData, loadItem, master }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Raw Material Batch";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path = "/transaction-rm/raw-material-batch";
    const url = "RawMaterialBatch";
    const role = "transaction -RawMaterialBatchForm";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        itemId: 0,
        status: "",
        expired: 0,
        initial: 0,
        incoming: 0,
        outgoing: 0,
        balance: 0,
        color: "",
        qty: "",
        visual: "",
        qc: "",
        number: 0,
        description: "",
        transDate: 0,
        dateIn: 0,
        dateUp: 0,
        userIn: "",
        userUp: "",
        item: {
            id: 0,
            code: "",
            itemId: 0,
            status: "",
            expired: 0,
            initial: 0,
            incoming: 0,
            outgoing: 0,
            balance: 0,
            exclusive: "",
            category: "",
            type: "",
            qtyPerPacking: 0,
            isActive: true,
            dateIn: 0,
            dateUp: 0,
            userIn: "",
            userUp: "",
            spWarehouseDetails: [],
            spLocationDetails: [],
            spPalletDetails: [],
            batches: [],
            itemGroupDetails: [],
            uom: []
        }

    });
    const [itemList, setItem] = useState([]);
    const { name, type, item, isActive, status, code, businessEntity, itemId, expired, initial, incoming, outgoing, balance, color, qty, visual, qc, number, description, transDate, dateIn, dateUp, userIn, userUp } = formData;

    useEffect(() => {
        loadItem();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem]);
    useEffect(() => {
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
                console.log('output', data.data)
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    code: data.data.code,
                    itemId: data.data.itemId,
                    status: data.data.status,
                    expired: data.data.expired,
                    initial: data.data.initial,
                    incoming: data.data.incoming,
                    outgoing: data.data.outgoing,
                    balance: data.data.balance,
                    color: data.data.color,
                    qty: data.data.qty,
                    number: data.data.number,
                    qc: data.data.qc,
                    visual: data.data.visual,
                    description: data.data.description,
                    transDate: data.data.transDate,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    item: {
                        id: data.data.item.id,
                        code: data.data.item.code,
                        itemId: data.data.item.itemId,
                        status: data.data.item.state,
                        expired: data.data.item.expired,
                        initial: data.data.item.initial,
                        incoming: data.data.item.incoming,
                        outgoing: data.data.item.outgoing,
                        balance: data.data.item.balance,
                        exclusive: data.data.item.exclusive,
                        category: data.data.item.category,
                        type: data.data.item.type,
                        qtyPerPacking: data.data.item.qtyPerPacking,
                        isActive: data.data.item.isActive,
                        dateIn: data.data.item.dateIn,
                        dateUp: data.data.item.dateUp,
                        userIn: data.data.item.userIn,
                        userUp: data.data.item.userUp,
                        spWarehouseDetails: data.data.item.spWarehouseDetails,
                        spLocationDetails: data.data.item.spLocationDetails,
                        spPalletDetails: data.data.item.spPalletDetails,
                        batches: data.data.item.batches,
                        itemGroupDetails: data.data.item.itemGroupDetails,
                        uom: data.data.item.uom,

                    }

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
                navigate(`${path}/create?`);
            });
        } else {
            editData({ url, body: formData }).then(() => {
                console.log("formdata", path)
                navigate(`${path}/${id}/edit?`);
            });
        }
    };

    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id });
    };


    const tabIconStyle = {
        marginRight: '5px',
    };
    const handleNewRow = (e) => {
        e.preventDefault();
        let details = data.data.item;
        if (details === undefined || details === null) details = [];

        details.push({
            id: 0,
            itemConsumptionId: 0,
            voucherNo: "",
            batchId: 0,
            itemId: 0,
            remark: "null",
            qty: 0,
            dateIn: 0,
            dateUp: 0,
            userIn: "null",
            userUp: " null",
            itemName: "",
            uom: "",
            totalPcs: 0
        });
        setFormData({ ...formData, item: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details = item;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, item: newDetail });
    };
    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Raw Material Batch List</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code
                            <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input name="code" value={code} type="text" onChange={(e) => onChange(e)} className="form-control text-left"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Item<span className="text-danger">*</span></label>
                        <div className="col-sm-10">
                            <Select2
                                options={itemList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Item"}
                                value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
                                handleChange={(e) => onSelectChange(e, "itemId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Batch Date</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Status<span className="text-danger">*</span></label>
                        <div className="col-sm-10">
                            <div class="form-check form-check-inline">
                                <input
                                    name="status"
                                    value="Y"
                                    type="radio"
                                    checked={status === "Y"}
                                    onChange={(e) => onChange(e)}
                                    className="form-check-input"
                                />
                                <label class="form-check-label mr-5" >Approved</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                    type="radio"
                                    name="status"
                                    value="X"
                                    checked={status === "X"}
                                    onChange={(e) => onChange(e)}
                                    className="form-check-input"
                                />
                                <label class="form-check-label">Pending</label>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Color</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="color" value={color} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">QC</label>
                        <div className="col">
                            <input className="form-control text-left" name="qc" value={qc} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">QTY</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="qty" value={qty} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Visual</label>
                        <div className="col">
                            <input className="form-control text-left" name="visual" value={visual} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-10">
                            <textarea
                                name="description"
                                value={description}
                                type="text"
                                placeholder=""
                                style={{ minHeight: "100px" }}
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <ListTransaction id={id} listType="RawMaterialBatch" formData={formData} />
                </div>
            </div >


        );

    };

    return (
        <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

RawMaterialBatchForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    loadItem: propTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadItem })(RawMaterialBatchForm);