import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs, Button } from "react-bootstrap";
import { FaLayerGroup, FaPlus, FaTimes, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaHouseUser, FaSearchLocation, FaTruckLoading } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { loadPallet, loadVendor, loadWarehouse, loadLocation } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../../components/Select2";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { te } from "date-fns/locale";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai';

const ItemConsumptionForm = ({ user, data, loadData, addData, master, editData, loadWarehouse, loadVendor, loadPallet, loadLocation }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const title = " Non Komersil";
    const img = <FaTruckLoading className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path = "/transaction/non-komersil";
    const url = "ItemConsumption";
    const role = "transaction -ItemConsumptionForm";
    
    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "",
        transDateDate: new Date().toISOString(),
        postDate: new Date().toISOString(),
        locationId: 0,
        palletId: 0,
        createdBy: "",
        postedBy: "",
        warehouseId: 0,
        picQc: "",
        picWarehouse: "",
        picExpedisi: "",
        security: "",
        truckNo: "",
        picker: "",
        deliveryOrderNo: "",
        note: "",
        shippingDate: new Date().toISOString(),
        customerName: "",
        type: "",
        dateIn: new Date().toISOString(),
        dateUp: new Date().toISOString(),
        userIn: "",
        userUp: "",
        batchNo:"",
        itemConsumptionDetails: []

    });

    const { name, vendor, locationId,batchNo, itemConsumptionDetails,location,pallet, security, palletId, postedBy, truckNo, picker, picQc, deliveryOrderNo, shippingDate, picExpedisi, picWarehouse, customerName, warehouse, vendorId, warehouseId, type, voucherNo, transDate, postDate, createdBy, productionNo, category, referenceNo, dateIn, dateUp } = formData;
    const [warehouseList, setWarehouse] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [locationlist, setLocation] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [remarks, setRemarks] = useState({});
    const [tempbatchno, settempbatchno] = useState(0);

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            let details = itemConsumptionDetails;
            if (data.data !== undefined && data.data !== null) {
                let details = data.data.itemConsumptionDetails;
                if (details === undefined || details === null) details = [];
                details.map((item) => {
                    item.checked = false;
                    return null;
                });
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    referenceNo: data.data.referenceNo,
                    status: data.data.status,
                    transDate: data.data.transDate,
                    postDate: data.data.postDate,
                    locationId: data.data.locationId,
                    palletId: data.data.palletId,
                    createdBy: data.data.createdBy,
                    postedBy: data.data.postedBy,
                    warehouseId: data.data.warehouseId,
                    picQc: data.data.picQc,
                    picWarehouse: data.data.picWarehouse,
                    picExpedisi: data.data.picExpedisi,
                    security: data.data.security,
                    truckNo: data.data.truckNo,
                    picker: data.data.picker,
                    deliveryOrderNo: data.data.deliveryOrderNo,
                    note: data.data.note,
                    shippingDate: data.data.shippingDate,
                    customerName: data.data.customerName,
                    type: data.data.type,
                    batchId: data.data.batchId,
                    batchNo: data.data.batchNo,
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    itemConsumptionDetails: data.data.itemConsumptionDetails,



                });
            }
        }
    }, [id, data, setFormData]);

    useEffect(() => {
        loadWarehouse();
        loadVendor();
        loadPallet();
        loadLocation();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadVendor, loadPallet, loadLocation]);

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
    }, [master]);
    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });   
        console.log(e)
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
      
    const handleSearch = async () => {
        // Fungsi untuk mencari detail data dan menambahkannya jika ditemukan
        const data = await getDetail();
    
        if (data !== null) {
          handleAddBatch(data.data);
        }
      };
    const onDetailChange = (e, index) => {
        e.preventDefault();

        let details = itemConsumptionDetails;
        if (details === undefined || details === null) details = [];

        details[index][e.target.name] = e.target.value;
        if (e.target.name == "qty") {
            details[index]["qty"] = e.target.value;
        }

        setFormData({ ...formData, orderDetails: details });
    };
    const onDetailSelectChange = async (e, value, index) => {
        let details = itemConsumptionDetails;
        if (details === undefined || details === null) details = [];

        if (value == "locationId") {
            details[index]["locationId"] = e.id;
        } else if (value == "palletId") {
            details[index]["palletId"] = e.id;
        }

        setFormData({ ...formData, orderDetails: details });

    };
    const onSelectChange = (e, name) => {
        if (name === "location") {
            setFormData({ ...formData, [name]: e.code });
        } else {
            setFormData({ ...formData, [name]: e.id });
        }
    }
    const getDetail = async () => {
        try {
          const res = await axios.get(`ItemConsumption/detail?batchCode=`+ batchNo);
    
          return Promise.resolve(res.data);
        } catch (err) {
          let errMessage = "";
          if (err.message) errMessage = err.message;
          if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
          setAlert(errMessage, "danger");
        }
      };
    
    const handleBatchNoKeyDown = async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          var data = await getDetail();
    
          if (data != null) {
            handleAddBatch(data.data);
          }
        }
      };
      const handleAddBatch = (selectedBatch) => {
        let details = [... itemConsumptionDetails];
    
        const existingBatchIndex = details.findIndex(item => item.batchId === selectedBatch.tmpBatchId);
    
        if (existingBatchIndex === -1) {
            details.unshift({
                checked: false,
                id: 0,
                itemConsumptionId: id,
                voucherNo: voucherNo,
                batchId: selectedBatch.tmpBatchId,
                itemId: selectedBatch.itemId,
                qty: 1,
                remark: "",
                stock: selectedBatch.stock,
                batchCode: selectedBatch.batchCode,
                uom: selectedBatch.uom,
                itemName: selectedBatch.itemName
            });
        }
        else {
          details[existingBatchIndex] = {
            ...details[existingBatchIndex],
            qty: details[existingBatchIndex]["qty"] + 1,
          };
        }
        setFormData({ ...formData, itemConsumptionDetails: details });
      };
    const handleNewRow = (e) => {
        e.preventDefault();
        let details = itemConsumptionDetails;
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
            totalPcs: 0,
            pcs:0,
        });
        setFormData({ ...formData, itemConsumptionDetails: details });
    };


    const handleDelete = (e) => {
        e.preventDefault();

        let details = itemConsumptionDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData, itemConsumptionDetails: newDetail });
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const tabIconStyle = {
        marginRight: '5px',
    };

    console.log("itemConsumptionDetails",itemConsumptionDetails)
    const renderItem = () =>
        itemConsumptionDetails !== undefined &&
        itemConsumptionDetails !== null &&
        itemConsumptionDetails.map((details, index) => {
            console.log("details",details)
            return (
                <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center" >
                        <input
                            className="form-control"
                            type="text" style={{ textAlign: "center" }}
                            name="BATCH No"
                            readOnly={true}
                            value={details.batchCode}
                        />
                    </td>

                    <td className="text-center" >
                        <input
                            className="form-control"
                            type="text" style={{ textAlign: "center" }}
                            name="ITEM"
                            readOnly={true}
                            value={details.itemName}
                        />
                    </td>

                    <td className="text-right">
                        <NumericFormat
                            className="form-control text-right"
                            name="QTY" value={details.qty}
                            onChange={(e) => onDetailChange(e, index)}
                            allowNegative={false} thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>

                    <td className="text-center" >
                        <input
                            className="form-control"
                            type="text" style={{ textAlign: "center" }}
                            name="UOM"
                            readOnly={true}
                            value={details.uom}
                        />
                    </td>
                    <td className="text-center" >
                        <input
                            className="form-control"
                            type="text" style={{ textAlign: "center" }}
                            name="PCS"
                            readOnly={true}
                            value={details.pcs}
                        />
                    </td>
                    <td className="text-center" >
                          <input
                           className="form-control"
                           type="text"
                           style={{ textAlign: "center" }}
                           name="TOTAL PCS"
                           readOnly={true}
                           value={details.qty * details.pcs}
                         />
                    </td>

                    <td className="text-right">
                        <input
                            className="form-control text-left"
                            name="REMARK"
                            value={details.remarkk || undefined}
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
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Non Komersil</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input readOnly className="form-control text-left" name="voucher" value={voucherNo} onChange={(e) => onChange(e)}
                                type="text" placeholder="[AUTO]" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                            <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" required />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">shippingDate</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="shippingdate" value={shippingDate === null ? "" : moment(shippingDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Type <span className="text-danger">*</span></label>
                        <div className="col">
                            <select className="form-control" name="type" value={type} onChange={(e) => onChange(e)} required>
                                <option value="">** Please Select</option>
                                <option value="Sample">Sample</option>
                                <option value="Pengganti / Tukar Guling">Pengganti / Tukar Guling</option>
                                <option value="Koreksi Pengiriman">Koreksi Pengiriman</option>
                                <option value="Re-Work">Re-Work</option>
                                <option value="Pemusnahan">Pemusnahan</option>
                                <option value="Lain-lain">Lain-lain</option>
                            </select>
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Location</label>
                        <div className="col-sm-3">
                            <Select2
                                options={locationlist}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code}
                                placeholder={"Pick Location"}
                                value={locationlist === null ? null : locationlist.filter((option) => option.id === parseInt(locationId))}
                                handleChange={(e) => onSelectChange(e, "locationId")} />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Pallet </label>
                        <div className="col">
                            <Select2
                                options={palletList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"** Please Select"}
                                value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(palletId))}
                                handleChange={(e) => onSelectChange(e, "palletId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">PIC QC</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="picQc" value={picQc} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">PIC WareHouse</label>
                        <div className="col">
                            <input className="form-control text-left" name="picWarehouse" value={picWarehouse} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">PIC Expedisi</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="picExpedisi" value={picExpedisi} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">Security</label>
                        <div className="col">
                            <input className="form-control text-left" name="securityt" value={security} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Picker</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="picker" value={picker} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
                        <div className="col">
                            <Select2
                                options={warehouseList}
                                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                                placeholder={"** Please Select"}
                                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                                handleChange={(e) => onSelectChange(e, "warehouseId")} />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Customer</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="customerName" value={customerName} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-2 text-left col-form-label">TruckNo</label>
                        <div className="col">
                            <input className="form-control text-left" name="truckNo" value={truckNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4 mb-3">
                        <label className="col-sm-2 col-form-label">
                            Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                style={{ minHeight: "100px" }}
                                rows={60}
                                name="note"
                                value={formData.note}
                                onChange={onChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Batch No<span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                         <input
                         name="batchNo"
                        value={batchNo}
                         type="text"
                         onChange={(e) => onChange(e)}
                       onKeyDown={(e) => handleBatchNoKeyDown(e)}
                       className="form-control text-left"
                             placeholder="Search..."
                             required
                            />                       
                        </div>
                        <div className="col-sm-2 text-left col-form-label">
                        <Button variant="primary" onClick={handleSearch}>
          <AiOutlineSearch /> Search
        </Button>
              </div>
                        <div className="col-sm-2 text-left col-form-label" style={{ marginLeft: "30px" }}>
                            <label style={{ marginLeft: "5px" }}>
                                <input type="checkbox" /> New Item
                            </label>
                        </div>
                        <div className="col-sm-2 text-left col-form-label" style={{ marginLeft: "30px" }}>
                            <label style={{ marginLeft: "5px" }}>
                                <input type="checkbox" /> Full Pallet
                            </label>
                        </div>
                    </div>
                  
                    <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
                        <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Item Detail</span>}>
                            <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                                <RTable bordered style={{ float: 'center', width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PCS</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                                            <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderItem()}
                                    </tbody>
                                </RTable>
                            </div>
                        </Tab>

                        <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />Change Logs</span>}>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Created</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" readOnly />
                                </div>
                                <label className="col-sm-2 text-left col-form-label">Created Date</label>
                                <div className="col">
                                    <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" readOnly />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Posted</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="postedBy" value={postedBy} onChange={(e) => onChange(e)} type="text" readOnly />
                                </div>
                                <label className="col-sm-2 text-left col-form-label">Posted Date</label>
                                <div className="col">
                                    <input className="form-control text-left" name="postDate" value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" readOnly />
                                </div>
                            </div>
                        </Tab>


                        <Tab eventKey="DeliveryDetail" title={<span><FaSearchLocation style={tabIconStyle} /> Reference Detail</span>}>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Reference No</label>
                                <div className="col-sm-3">
                                    <input
                                        name="code"
                                        value={referenceNo}
                                        type="text"
                                        onChange={(e) => onChange(e)}
                                        className="form-control text-left"
                                        placeholder="Search..."
                                        required
                                    />
                                </div>
                                <div className="col-sm-2 text-left col-form-label">
                                    <Button variant="primary" className="fa fa-plus"> Add</Button>{' '}
                                </div>
                            </div>
                            <RTable bordered style={{ float: 'center', width: "40%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'Center' }}>Reference No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{formData.referenceNo}</td>
                                    </tr>
                                </tbody>
                            </RTable>
                        </Tab>
                    </Tabs>
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

ItemConsumptionForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadVendor: PropTypes.func,
    loadLocation: PropTypes.func,
    loadPallet: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor, loadPallet, loadLocation })(ItemConsumptionForm);