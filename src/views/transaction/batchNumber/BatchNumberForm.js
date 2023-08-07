import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLayerGroup, FaInfoCircle, FaPlus, FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { loadItem } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";
import { Table as RTable } from "react-bootstrap";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import ListTransaction from "../../master/customComponent/listTransaction";

const BatchNumberForm = ({ user, data, loadData, addData, editData, master, loadItem }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add Batch Number";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/batch-number/:id?/:type";
    const url = "Batch";
    const role = "Transaction - Batch Number";
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [returnUrl, setReturnUrl] = useState(path);

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
        spListTransactions: []
    });

    const [itemList, setItem] = useState([]);
    const { code, itemId, transDate, status, color, qc, qty, visual, description, spListTransactions } = formData;

    useEffect(() => {
        loadItem();
        if (user !== null && id !== undefined)
            loadData({ url, id });
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
                let details = data.data.spListTransactions;
                if (details === undefined || details === null) details = [];
                details.map((item) => {
                    item.checked = false;
                    return null;
                });
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
                    spListTransactions: data.data.spListTransactions
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
                navigate(`${path}/${formData.id}/edit`);
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

    let totalInitial = 0;
    let totalIncoming = 0;
    let totalOutgoing = 0;
    let totalBalance = 0;

    if (spListTransactions !== undefined && spListTransactions !== null) {
        spListTransactions.forEach((details) => {
            totalInitial += details.initial;
            totalIncoming += details.incoming;
            totalOutgoing += details.outgoing;
            totalBalance += details.balance;
        });
    }

    console.log("ID", id)

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
                                value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")}
                                type="date"
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

                <hr style={{ borderColor: "gray", opacity: 0.5, marginTop: "50px" }} />

                <div style={{ marginTop: "20px" }}></div>

                {/* <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
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
                            {spListTransactions !== undefined &&
                                spListTransactions !== null &&
                                spListTransactions.map((details, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{details.transactionId}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.itemName}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.transDate}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.initial}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.incoming}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.outgoing}</td> { }
                                            <td style={{ textAlign: 'center' }}>{details.balance}</td> { }
                                        </tr>
                                    );
                                })
                            }
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{totalInitial}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{totalIncoming}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{totalOutgoing}</td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{totalBalance}</td>
                            </tr>
                        </tbody>
                    </RTable>
                </div> */}

                <div className="mt-5">
                    <ListTransaction id={id} listType="location" formData={formData} />
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