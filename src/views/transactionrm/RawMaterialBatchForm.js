import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaUserFriends} from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadRawMaterial } from "../../actions/master";
import ListTransaction from "../../views/master/customComponent/listTransaction";

import { loadData, addData, editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../components/Select2";
import moment from "moment";

const RawMaterialBatchForm = ({ user, data, loadData, addData, editData, loadRawMaterial, master }) => {
    let { type, id } = useParams();
    const navigate = useNavigate();
    const title = "Raw Material Batch";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction-rm/raw-material-batch";
    const url = "RawMaterialBatch";
    const role = "transaction -RawMaterialBatchForm";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        itemId: 0,
        status: "",
        expired: new Date(),
        initial: 0,
        incoming: 0,
        outgoing: 0,
        balance: 0,
        color: "",
        qty: "",
        visual: "",
        qc: "",
        number: "",
        description: "",
        transDate: new Date(),
        items: ""
    });

    // set raw material
    const [rawMaterialList, setRawMaterialList] = useState([])
    // Dapatkan code raw material ketika item di select
    const [rawMaterialCode, setRawMaterialCode] = useState('')
    const {item, status, code, itemId, expired, initial, incoming, outgoing, balance, color, qty, visual, qc, number, description, transDate, } = formData;

    useEffect(() => {
        loadRawMaterial();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadRawMaterial]);

    useEffect(() => {
        if (master && master.rawMaterial !== undefined && master.rawMaterial !== null) {
            let list = [...master.rawMaterial];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Item",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setRawMaterialList(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
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
                });
            }
        }
    }, [id, data, setFormData]);

    const onChange = (e) => {
        // e.preventDefault();
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

    const onSelectChange = (e, name) => {
        if (name === "itemId") {
            setRawMaterialCode(e.id)
            setFormData({ ...formData, [name]: e.id, code: `-${e.code}` })
        } else {
            setFormData({ ...formData, [name]: e.id })
        }
    };

    const tabIconStyle = {
        marginRight: '5px',
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
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Code
                            <span className="text-danger">*</span></label>
                        <div className="col-sm-4">
                            <input name="code" value={code} type="text" onChange={(e) => onChange(e)} className="form-control text-left"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Item<span className="text-danger">*</span></label>
                        <div className="col-sm-4">
                            <Select2
                                options={rawMaterialList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Item"}
                                value={rawMaterialList === null ? null : rawMaterialList.filter((option) => option.id === parseInt(itemId))}
                                handleChange={(e) => onSelectChange(e, "itemId")} />
                        </div>
                    </div>
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Batch Date</label>
                        <div className="col-sm-4">
                            <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Status<span className="text-danger">*</span></label>
                        <div className="col-sm-10 d-flex">
                            <div className="form-check">
                                <input
                                    name="status"
                                    id="Approved"
                                    value="Y"
                                    onChange={(e) => onChange(e)}
                                    checked={status === "Y"}
                                    type="radio"
                                    className="form-check-input"
                                    required
                                />
                                <label class="form-check-label" for="Approved" >Approved</label>
                            </div>
                            <div className="mx-3"></div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="Pending"
                                    name="status"
                                    onChange={(e) => onChange(e)}
                                    checked={status === "X"}
                                    value="X"
                                    className="form-check-input"
                                    required
                                />
                                <label className="form-check-label" for="Pending">Pending</label>
                            </div>
                        </div>
                    </div>
                    <div className="border my-3"></div>
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">Color</label>
                        <div className="col-sm-4">
                            <input className="form-control" name="color" value={color} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 col-form-label">QC</label>
                        <div className="col-sm-4">
                            <input className="form-control" name="qc" value={qc} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center my-3">
                        <label className="col-sm-2 col-form-label">QTY</label>
                        <div className="col-sm-4">
                            <input className="form-control text-left" name="qty" value={qty} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Visual</label>
                        <div className="col-sm-4">
                            <input className="form-control text-left" name="visual" value={visual} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 my-3">
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
                    {type === "create" ? "" : <ListTransaction id={id} listType="RawMaterialBatch" formData={formData} />}
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
    loadRawMaterial: propTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadRawMaterial })(RawMaterialBatchForm);