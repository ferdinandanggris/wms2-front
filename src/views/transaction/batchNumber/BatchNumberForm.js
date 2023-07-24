import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaPallet } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadItem } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";

const BatchNumberForm = ({ user, data, loadData, addData, editData, master, loadItem }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Add Batch Number";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/batch-number";
    const url = "batch-number";
    const role = "Transaction - Batch Number";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        item: "",
        batchDate: "",
        status: 1,
        color: "",
        qty: 0,
        qc: "",
        visual: "",
        description: "",
    });

    const [itemList, setItem] = useState([]);
    const { code, batchDate, status, color, qc, qty, visual, description, itemId } = formData;

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
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    code: data.data.code,
                    item: data.data.item,
                    batchDate: data.data.batchDate,
                    status: data.data.status,
                    color: data.data.color,
                    qty: data.data.qty,
                    qc: data.data.qc,
                    visual: data.data.visual,
                    description: data.data.description,
                    itemId: data.data.itemId,
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
                    <FaPallet style={tabIconStyle} />Detail Information
                </div>

                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code</label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Item <span className="required-star">*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={itemList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Item"}
                                value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
                                handleChange={(e) => onSelectChange(e, "itemId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch Date</label>
                        <div className="col-sm-4">
                            <input
                                name="batchDate"
                                value={batchDate}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-right"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row form-group align-items-center">
                        <label className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="isActive" value={0} checked={status == 0} onChange={(e) => onChange(e)} />
                                <label class="form-check-label mr-5" >
                                    Approved
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="isActive" value={1} checked={status == 1} onChange={(e) => onChange(e)} />
                                <label class="form-check-label">
                                    Pending
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Color</label>
                        <div className="col">
                            <input className="form-control text-right" name="color" value={color} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">QC</label>
                        <div className="col">
                            <input className="form-control text-right" name="qc" value={qc} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">QTY</label>
                        <div className="col">
                            <input className="form-control text-right" name="qty" value={qty} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Visual</label>
                        <div className="col">
                            <input className="form-control text-right" name="visual" value={visual} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-4">
                            <textarea
                                name="description"
                                value={description}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                                style={{ height: "500px" }}
                            />
                        </div>
                    </div>
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

BatchNumberForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadItem })(BatchNumberForm);