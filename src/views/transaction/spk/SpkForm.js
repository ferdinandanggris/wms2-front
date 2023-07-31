import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import Select2 from "../../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable, Modal, Button } from "react-bootstrap";
import { loadItem, loadWarehouse } from "../../../actions/master";
import { loadData, addData, editData } from "../../../actions/data";


const SpkForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadItem }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const title = "Add SPK";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/spk/:id?/:type";
    const url = "Spk";
    const role = "Transaction - SPK";

    const [formData, setFormData] = useState({
        id: 0,
        voucher: "",
        reference: "",
        created: "",
        date: "",
        expedition: "",
        shippingdate: "",
        customer: "",
        truckno: "",
        warehouse: "",
        item: ""
    });

    const [itemList, setItem] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleCekStock = () => setShowModal(true);
    const { voucher, reference, created, date, expedition, shippingdate, customer,  truckno, warehouseId, itemId } = formData;

    const stockData = [
        { warehouse: "Warehouse A", stock: 50, booked: 10, availability: 40 },
        { warehouse: "Warehouse B", stock: 30, booked: 5, availability: 25 },
    ];

    useEffect(() => {
        loadItem();
        loadWarehouse();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem, loadWarehouse]);

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
                    reference: data.data.reference,
                    created: data.data.created,
                    date: data.data.date,
                    expedition: data.data.expedition,
                    shippingdate: data.data.shippingdate,
                    customer: data.data.customer,
                    truckno: data.data.truckno,
                    warehouseId: data.data.warehouseId,
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
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="date" value={date} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Expedition</label>
                        <div className="col">
                            <input className="form-control text-left" name="expedition" value={expedition} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Shipping Date</label>
                        <div className="col">
                            <input className="form-control text-left" name="shippingdate" value={shippingdate} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-1 col-form-label">Customer</label>
                        <div className="col">
                            <input className="form-control text-left" name="customer" value={customer} onChange={(e) => onChange(e)} type="text" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Truck No</label>
                        <div className="col">
                            <input className="form-control text-right" name="truckno" value={truckno} onChange={(e) => onChange(e)} type="number" placeholder="" />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4 mb-3">
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
                </div>
                <hr style={{ borderColor: "gray", margin: "30px 0", opacity: 0.5 }} />
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-1 col-form-label">
                            Item No<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
                        </label>
                        <div className="col-sm-5">
                            <Select2
                                options={itemList}
                                optionValue={(option) => option.id.toString()}
                                optionLabel={(option) => option.name}
                                placeholder={"Pick Item"}
                                value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
                                handleChange={(e) => onSelectChange(e, "itemId")}
                            />
                        </div>
                        <div className="col-sm-1 text-left col-form-label">
                            <Button variant="primary"> &#x2713; Select</Button>{' '}
                        </div>
                        <div className="col-sm-1 text-left col-form-label" style={{ marginLeft: "10px" }}>
                            <Button variant="primary" onClick={handleCekStock}>
                                📋 Cek Stock
                            </Button>{' '}
                        </div>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Stock Item</Modal.Title>

                            </Modal.Header>
                            <Modal.Body>
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th>WAREHOUSE</th>
                                            <th>STOCK</th>
                                            <th>BOOKED</th>
                                            <th>AVAILABILITY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stockData.map((item, index) => (
                                            <tr key={index} className="text-center">
                                                <td>{item.warehouse}</td>
                                                <td>{item.stock}</td>
                                                <td>{item.booked}</td>
                                                <td>{item.availability}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="col-sm-2 text-left col-form-label" style={{ marginLeft: "30px" }}>
                            <label style={{ marginLeft: "5px" }}>
                                <input type="checkbox" /> New Item
                            </label>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "50px" }}></div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY/BOX</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY BOOKED</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>AVAILABILITY</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STOCK</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>SHIPPING</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
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

SpkForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadItem, loadWarehouse })(SpkForm);