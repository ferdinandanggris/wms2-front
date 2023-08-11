import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table as RTable } from "react-bootstrap";
import Select2 from "../../../components/Select2";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { loadData, addData, editData } from "../../../actions/data";
import { loadVendor, loadWarehouse, loadPallet, loadLocation, loadBatch } from "../../../actions/master";
import { FaLayerGroup, FaUserFriends, FaTrashAlt, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import moment from "moment";

const RawMaterialReceivingForm = ({ user, data, loadData, addData, editData, master, loadWarehouse, loadVendor, loadLocation, loadPallet, loadBatch }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = "Raw Material Receiving";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction-rm/raw-material-receiving";
    const url = "RawMaterialReceiving";
    const role = "Transaction - Raw Material Receiving";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "Approve",
        transDate: null,
        postDate: null,
        createdBy: "",
        postedBy: "",
        vendorId: 0,
        warehouseId: 0,
        dateIn: null,
        dateUp: null,
        userIn: "",
        userUp: "",
        batchNo: "",
        palletId: 0,
        locationId: 0,
        batchNo: "",
        batch: "",
        rawMaterialReceivingDetails: []
    });

    const [itemList, setItem] = useState([]);
    const [warehouseList, setWarehouse] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationList, setLocation] = useState([]);
    const [batchList, setBatch] = useState([]);
    const dispatch = useDispatch();

    const { voucherNo, referenceNo, postDate, createdBy, postedBy, vendorId, warehouseId, dateIn, batchNo, rawMaterialReceivingDetails } = formData;

    useEffect(() => {
        loadVendor();
        loadWarehouse();
        loadLocation();
        loadPallet();
        loadBatch();
        if (user !== null && id !== undefined)
            loadData({ url, id });
    }, [id, user, loadData, loadVendor, loadWarehouse, loadLocation, loadPallet, loadBatch]);

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
        if (master.vendor !== undefined && master.vendor !== null) {
            let list = [...master.vendor];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "No Vendor",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setVendor(list);
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
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.rawMaterialReceivingDetails;
                if (details === undefined || details === null) details = [];
                details.map((item) => {
                    item.checked = false;
                    return null;
                });

                console.log("DETAILS", details)

                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    status: data.data.status,
                    transDate: data.data.country,
                    postDate: data.data.deliveryAddress,
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    vendorId: data.data.vendorId,
                    warehouseId: data.data.warehouseId,
                    palletId: data.data.palletId,
                    locationId: data.data.locationId,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    batchNo: data.data.batchNo,
                    batchId: data.data.batchId,
                    rawMaterialReceivingDetails: details,
                });
            }
        }
    }, [id, data, setFormData]);

    const onDetailCheck = (e, index) => {
        let details = rawMaterialReceivingDetails;
        if (details === undefined || details === null) details = [];

        let checked = details[index]["checked"];
        details[index]["checked"] = checked ? false : true;

        setFormData({ ...formData, rawMaterialReceivingDetails: details });
    };

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

    const handleDelete = (e) => {
        e.preventDefault();

        let details = rawMaterialReceivingDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, rawMaterialReceivingDetails: newDetail });
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Raw Material Receiving</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="voucherNo"
                                value={voucherNo}
                                type="text"
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Reference#</label>
                        <div className="col-sm-3 ">
                            <input
                                className="form-control text-left"
                                name="referenceNo"
                                value={referenceNo}
                                onChange={(e) => onChange(e)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created <span className="text-danger">*</span></label>
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="createdBy"
                                value={createdBy}
                                onChange={(e) => onChange(e)}
                                type="text"
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input
                                className="form-control text-left"
                                name="dateIn"
                                value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Posted</label>
                        <div className="col-sm-3 mr-4">
                            <input
                                className="form-control text-left"
                                name="postedBy"
                                value={postedBy}
                                onChange={(e) => onChange(e)}
                                type="text"
                            />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Date</label>
                        <div className="col-sm-3">
                            <input
                                className="form-control text-left"
                                name="postDate"
                                value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Vendor</label>
                        <div className="col-sm-3 mr-4">
                            <Select2
                                options={vendorList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Vendor"}
                                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                                handleChange={(e) => onSelectChange(e, "vendorId")} />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"Pick Warehouse"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-3">
                            <input
                                name="batchNo"
                                value={batchNo}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder=""
                            />
                        </div>
                        <div className="col-sm-2 col-form-label">
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                    name="status"
                                    value={0} checked={status == 0}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary ml-4" >
                                <FaSearch /> Search
                            </button>
                        </div>
                    </div>
                    <hr style={{ borderColor: "gray", margin: "40px 0", opacity: 0.5 }} />
                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Pallets</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Location</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Remark</th>
                                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawMaterialReceivingDetails !== undefined &&
                                rawMaterialReceivingDetails !== null &&
                                rawMaterialReceivingDetails.map((details, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">
                                                <input type="checkbox" checked={details.checked !== undefined && details.checked} onChange={(e) => onDetailCheck(e, index)} />
                                            </td>
                                            <td className="text-center">{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Select2
                                                    options={batchList}
                                                    optionValue={(option) => option.id.toString()}
                                                    optionLabel={(option) => option.code}
                                                    placeholder={"Pick Batch"}
                                                    value={batchList === null ? null : batchList.filter((option) => option.id === parseInt(details.batchId))}
                                                    handleChange={(e) => onSelectChange(e, "batchId")}
                                                    disabled={true}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{details.itemId}</td>
                                            <td style={{ textAlign: 'center' }}>{details.qty}</td>
                                            <td style={{ textAlign: 'center' }}>{details.uom}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Select2
                                                    options={palletList}
                                                    optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                                    placeholder={"Pick Pallet"}
                                                    value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(details.palletId))}
                                                    handleChange={(e) => onSelectChange(e, "palletId")}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Select2
                                                    options={locationList}
                                                    optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code}
                                                    placeholder={"Pick Location"}
                                                    value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(details.locationId))}
                                                    handleChange={(e) => onSelectChange(e, "locationId")} />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{details.remark}</td>
                                            <td className="text-center">
                                                <button className="btn-delete" onClick={(e) => handleDelete(e)}>
                                                    <FaTrashAlt style={{ marginTop: "5px" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
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

RawMaterialReceivingForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    addData: PropTypes.func,
    editData: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadVendor: PropTypes.func,
    loadPallet: PropTypes.func,
    loadLocation: PropTypes.func,
    loadBatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor, loadLocation, loadPallet, loadBatch })(RawMaterialReceivingForm);