import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs,Button  } from "react-bootstrap";
import { FaLayerGroup,FaPlus,FaTimes, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaHouseUser, FaSearchLocation, } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { loadPallet, loadVendor, loadWarehouse } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../../components/Select2";
import moment from "moment";
import { te } from "date-fns/locale";

const TransactionItemConsumptionForm = ({ user, data, loadData, addData, master, editData, loadWarehouse, loadVendor,loadPallet }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const title = " Transaction Item ConsumptionForm";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path = "/transaction/non-komersil";
    const url = "ItemConsumption";
    const role = "transaction -TransactionItemConsumptionForm";

    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        referenceNo: "",
        status: "",
        transDate: 0,
        postDate: 0,
        locationId: "",
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
        deliveryOrderNo: 0,
        note: "",
        shippingDate: 0,
        customerName: "",
        type: "",
        dateIn: 0,
        dateUp: 0,
        userIn: "",
        userUp: "",
        location: "",
        pallet: "",
        warehouse: "",
        itemConsumptionDetails: []

    });

    const { name, vendor, locationId, location, itemConsumptionDetails, pallet, security, palletId, postedBy, truckNo, picker, picQc, deliveryOrderNo, shippingDate, picExpedisi, picWarehouse, customerName, warehouse, vendorId, warehouseId, type, voucherNo, transDate, postDate, createdBy, productionNo, category, referenceNo, dateIn, dateUp } = formData;
    const [warehouseList, setWarehouse] = useState([]);
    const [palletList, setPallet] = useState([]);
    const [vendorList, setVendor] = useState([]);
    const [remarks, setRemarks] = useState({});
    const[tempbatchno,settempbatchno]=useState(0);

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            let details = itemConsumptionDetails;
            if (data.data !== undefined && data.data !== null) {
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
                    dateIn: data.data.dateIn,
                    dateUp: data.data.dateUp,
                    userIn: data.data.userIn,
                    userUp: data.data.userUp,
                    location: data.data.location,
                    pallet: data.data.pallet,
                    warehouse: data.data.warehouse,
                    itemConsumptionDetails:data.data.itemConsumptionDetails,



                });
            }
        }
    }, [id, data, setFormData]);

    useEffect(() => {
        loadWarehouse();
        loadVendor();
        loadPallet();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadWarehouse, loadVendor,loadPallet]);

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
    }, [master]);
    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if(e.target.name === "batchno"){
            settempbatchno(e.target.value)
        }

    };

    const handleSave = (e) => {
        e.preventDefault();
    
        if (id === undefined) {
          addData({ url, body: formData }).then(() => {
            navigate(`${path}/create?`);
          });
        } else {
          editData({ url, body: formData }).then(() => {
            navigate(`${path}/${id}/edit?`);
          });
        }
      };
    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id });
    };
    const handleNewRow = (e) => {
        e.preventDefault();
        let details =itemConsumptionDetails;
        if (details === undefined || details === null) details = [];

        details.push({
            id: 0,
            itemConsumptionId: 0,
            voucherNo: "",
            batchId:0,
            itemId: 0,
            remark: "null",
            qty: 0,
            dateIn:0,
            dateUp: 0,
            userIn: "null",
            userUp:" null",
            itemName: "",
            uom: "",
            totalPcs: 0
        });
        setFormData({ ...formData, itemConsumptionDetails: details });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        let details =itemConsumptionDetails;
        if (details === undefined || details === null) details = [];

        let newDetail = [];

        details.map((item) => {
            if (!item.checked) newDetail.push(item);
            return null;
        });

        setFormData({ ...formData,itemConsumptionDetails: newDetail });
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const tabIconStyle = {
        marginRight: '5px',
    };
     
    const element = () => {
        return (
            <div className="detail">
                <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Receiving</div>
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Voucher#  <span className="text-danger">*</span></label>
                        <div className="col-sm-3">
                            <input readOnly className="form-control text-left" name="voucher" value={voucherNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                            <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">shippingDate</label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="shippingdate" value={shippingDate === null ? "" : moment(shippingDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Type <span className="text-danger">*</span></label>
                        <div className="col">
                            <select className="form-control" name="type" value={type} onChange={(e) => onChange(e)}>
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
                            <input className="form-control text-left" name="location" value={location} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Pallet </label>
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
                        <label className="col-sm-1 text-left col-form-label">PIC WareHouse</label>
                        <div className="col">
                            <input className="form-control text-left" name="picWarehouse" value={picWarehouse} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">PIC Expedisi</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="picExpedisi" value={picExpedisi} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Security</label>
                        <div className="col">
                            <input className="form-control text-left" name="securityt" value={security} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Picker</label>
                        <div className="col-sm-3">
                            <input className="form-control text-left" name="picker" value={picker} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
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
                        <label className="col-sm-1 text-left col-form-label">TruckNo</label>
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
                        <label className="col-sm-2 col-form-label">Batch No</label>
                        <div className="col-sm-3">
                            <input
                                name="batchno"
                                value={itemConsumptionDetails.batchId}
                                type="text"
                                onChange={(e) => onChange(e)}
                                className="form-control text-left"
                                placeholder="Search..."
                                required
                            />
                        </div>
                        <div className="col-sm-1 text-left col-form-label">
                            <Button variant="primary" className="fa fa-search"> Search</Button>{' '}
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
    {  itemConsumptionDetails!== undefined &&
       itemConsumptionDetails !== null &&
       itemConsumptionDetails .map((details , index) => { 
        return (
          <tr key={index}>
               <td style={{ textAlign: 'center' }}>{index + 1}</td>
            <td style={{ textAlign: 'center' }}>{details.batchId}</td> {}
            <td style={{ textAlign: 'center' }}>{details.itemName}</td> {}
            <td style={{ textAlign: 'center' }}>{details.qty}</td> {}
            <td style={{ textAlign: 'center' }}>{details.uom}</td> {}
            <td style={{ textAlign: 'center' }}>{details.remark}</td> {}
            <td style={{ textAlign: 'center' }}>{details.totalPcs}</td> {}
            <td style={{ textAlign: 'center' }}>
                  <input
                    type="text"
                    value={remarks[index] || ""}
                    onChange={(e) => setRemarks({ ...remarks, [index]: e.target.value })}
                  />
                </td>
          </tr>
        );
      })}
  </tbody>
                                </RTable>
                            </div>
                        </Tab>

                        <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />Change Logs</span>}>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Created</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Created Date</label>
                                <div className="col">
                                <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <label className="col-sm-2 col-form-label">Posted</label>
                                <div className="col-sm-3">
                                    <input className="form-control text-left" name="postedBy" value={postedBy} onChange={(e) => onChange(e)} type="text" />
                                </div>
                                <label className="col-sm-1 text-left col-form-label">Posted Date</label>
                                <div className="col">
                                <input className="form-control text-left" name="postDate" value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
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
                                <div className="col-sm-1 text-left col-form-label">
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

TransactionItemConsumptionForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadVendor: PropTypes.func,
    loadPallet:PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor,loadPallet })(TransactionItemConsumptionForm);