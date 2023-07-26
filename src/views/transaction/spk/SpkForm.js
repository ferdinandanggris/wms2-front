import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadItem, loadWarehouse } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";


const Spk = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadItem }) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const title = "Add SPK";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/spk";
    const url = "Spk";
    const role = "Transaction - SPK";

    const [formData, setFormData] = useState({
        id: 0,
        voucher: "",
        created: "",
        expedition: "",
        customer: "",
        reference: "",
        date: "",
        shippingdate: "",
        truckno: "",
        warehouse: "",
        item: ""
    });

    const [itemList, setItem] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const { voucher, created, expedition, customer, reference, date, shippingdate, truckno, warehouseId, itemId } = formData;

    useEffect(() => {
        loadItem();
        loadWarehouse();
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
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucher: data.data.voucher,
                    created: data.data.created,
                    expedition: data.data.expedition,
                    customer: data.data.customer,
                    reference: data.data.reference,
                    date: data.data.date,
                    shippingdate: data.data.shippingdate,
                    truckno: data.data.truckno,
                    warehouseId: data.data.warehouseId,
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
                            <input className="form-control text-right" name="created" value={created} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="date" value={date} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Expedition</label>
                        <div className="col">
                            <input className="form-control text-right" name="expedition" value={expedition} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Shipping Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="shippingdate" value={shippingdate} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Customer</label>
                        <div className="col">
                            <input className="form-control text-right" name="customer" value={customer} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Truck No</label>
                        <div className="col">
                            <input className="form-control text-left" name="truckno" value={truckno} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-1 col-form-label">
                            Warehouse<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
            </div>
        );
    };

    return (
        <FormWrapper img={img} title={title} path={path} role={role} id={id} handleSave={handleSave}>
            {element}
        </FormWrapper>
    );
};

Spk.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadItem, loadWarehouse })(Spk);