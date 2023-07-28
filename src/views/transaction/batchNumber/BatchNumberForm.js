import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { loadItem } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import { Table as RTable } from "react-bootstrap";

const BatchNumberForm = ({ user, data, loadData, addData, editData, master, loadItem }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Batch Number";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/batch-number/:id?/:type";
    const url = "Batch";
    const role = "Transaction - Batch Number";

    const [formData, setFormData] = useState({
        id: 0,
        code: "",
        item: "",
        transDate: "",
        status: "",
        color: "",
        qc: "",
        qty: 0,
        visual: "",
        description: "",
    });

    const [itemList, setItem] = useState([]);
    const { code, itemId, transDate, status, color, qc, qty, visual, description } = formData;

    const stockData = [
        { no: 1, transaction: "RC0050432", code: "A-11000", item: "Botol Saus", date: "07 Jun 2023", initial: 1, incoming: 0, outgoing: 0, balance: 0 },
        { no: 2, transaction: "RC0050432", code: "A-11000", item: "Botol Saus", date: "07 Jun 2023", initial: 0, incoming: 1, outgoing: 0, balance: 0 },
        { no: 3, transaction: "RC0050432", code: "A-11000", item: "Botol Saus", date: "07 Jun 2023", initial: 0, incoming: 2, outgoing: 0, balance: 0 },
        { no: 4, transaction: "RC0050432", code: "A-11000", item: "Botol Saus", date: "07 Jun 2023", initial: 7, incoming: 0, outgoing: 4, balance: 4 },
        { no: 5, transaction: "RC0050432", code: "A-11000", item: "Botol Saus", date: "07 Jun 2023", initial: 0, incoming: 0, outgoing: 0, balance: 2 },

    ];

    function calculateTotal(data, property) {
        return data.reduce((total, item) => total + item[property], 0);
    }

    useEffect(() => {
        loadItem();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem]);

    console.log(master)

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
                    itemId: data.data.itemId,
                    transDate: data.data.transDate,
                    status: data.data.status,
                    color: data.data.color,
                    qc: data.data.qc,
                    qty: data.data.qty,
                    visual: data.data.visual,
                    description: data.data.description,
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
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Code</label>
                        <div className="col-sm-4">
                            <input
                                name="code"
                                value={code}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
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
                                name="transDate"
                                value={transDate}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row form-group align-items-center">
                        <label className="col-sm-2 col-form-label">Status</label>
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
                </div>
                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Color</label>
                        <div className="col">
                            <input
                                name="color"
                                value={color}
                                type="text"
                                placeholder=""
                                className="form-control text-left"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">QC</label>
                        <div className="col">
                            <input className="form-control text-left" name="qc" value={qc} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">QTY</label>
                        <div className="col">
                            <input
                                name="qty"
                                value={qty}
                                type="number"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-right"
                            />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Visual</label>
                        <div className="col">
                            <input
                                name="visual"
                                value={visual}
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea
                                name="description"
                                value={description}
                                type="text"
                                placeholder=""
                                style={{ width: "360px", minHeight: "100px" }}
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                            />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "50px" }}></div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NO</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TRANSACTION NO</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DATE</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>INITIAL</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>INCOMING</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>OUTGOING</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BALANCE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((item, index) => (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{item.no}</td>
                                    <td style={{ textAlign: 'center' }}>{item.transaction}</td>
                                    <td style={{ textAlign: 'center' }}>{item.item}</td>
                                    <td style={{ textAlign: 'center' }}>{item.date}</td>
                                    <td style={{ textAlign: 'center' }}>{item.initial}</td>
                                    <td style={{ textAlign: 'center' }}>{item.incoming}</td>
                                    <td style={{ textAlign: 'center' }}>{item.outgoing}</td>
                                    <td style={{ textAlign: 'center' }}>{item.balance}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{calculateTotal(stockData, "initial")}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{calculateTotal(stockData, "incoming")}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{calculateTotal(stockData, "outgoing")}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{calculateTotal(stockData, "balance")}</td>
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