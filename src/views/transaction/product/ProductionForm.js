import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaCheck } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import moment from "moment";



const ProductionForm = ({ user, data, loadData, addData, editData }) => {
    let { id } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = " Production Form";
    const img = <FaLayerGroup className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    const path ="/transaction/production/:id?/:type";
    const url = "Production";
    const role = "transaction - ProductionForm";

    const [formData, setFormData] = useState({
      id: 0,
      voucherNo: "",
      customerId: 0,
      transDate: 0,
      createdBy: "",
      status: "",
      receivingDate: 0,
      referenceNo: "",
      closedDate: 0,
      closedBy: "",
      dateIn: 0,
      dateUp: 0,
      userIn: 1,
      userUp: "",
      productionDetails: []

    });

    const { name, type, voucherNo,customerId,transDate,createdBy,receivingDate,referenceNo,closedBy,dateIn,dateUp,userIn,userUp,productionDetails} = formData;

    useEffect(() => {
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo:data.data.voucherNo,
                    customerId:data.data.customerId,
                    transDate:data.data.transDate,
                    createdBy:data.data.createdBy,
                    receivingDate:data.data.receivingDate,
                    referenceNo:data.data.referenceNo,
                    closedBy:data.data.closedBy,
                    dateIn:data.data.dateIn,
                    dateUp:data.data.dateUp,
                    userIn:data.data.userIn,
                    userUp:data.data.userUp,
                    productionDetails:data.data.productionDetails,
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
                navigate(`${path}`);
            });
        } else {
            editData({ url, body: formData }).then(() => {
                navigate(`${path}`);
            });
        }
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
                        <input className="form-control text-left" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
                        <div className="col">
                            <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <label className="col-sm-2 col-form-label">Created</label>
                        <div className="col-sm-3">
                        <input className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" />
                        </div>
                        <label className="col-sm-1 text-left col-form-label">Date</label>
                        <div className="col">
                        <input className="form-control text-left" name="dateIn" value={dateIn === null ? "" : moment(dateIn).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
                        </div>
                    </div>
 
<div  style={{borderBottom:"1px solid gray"}} className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Receiving Date
              </label>
            <div className="col-sm-10">
            <input className="form-control text-left" name="receivingDate" value={receivingDate === null ? "" : moment(receivingDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
            </div>
          </div>

<div className="row align-items-center mb-3">
<label className="col-sm-1 text-left col-form-label">item No </label>
  <div className="col">
    <select className="form-control" name=" customerId" value={customerId} onChange={(e) => onChange(e)}>
      <option value="">** Please select</option>
      <option value="SH">SH</option>
      <option value="SD">SD</option>
      <option value="SN">SN</option>
      <option value="AE01">AE01</option>
    </select>
  </div>
     <div className="input-group-append col-sm-1 col-form-label">
                            <button className="btn btn-primary" >
                                <FaCheck /> Select
                            </button>
                        </div>
                        <div className="col-sm-2" style={{ marginLeft: "30px" }}>
                            <div className="form-check">
                                <input
                                    id="newItemCheckbox"
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="newItemCheckbox"
                                >
                                    New Item
                                </label>
                            </div>
                        </div>
                    </div>



                    <RTable bordered style={{ float: 'center', width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CODE</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>NAME</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY/BOX</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>TOTAL PCS</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STOCK</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>RECEIVING</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DIFF</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>REMARK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{formData.code}</td>
                    <td style={{ textAlign: 'center' }}>{formData.initial}</td>
                    <td style={{ textAlign: 'center' }}>{formData.incoming}</td>
                    <td style={{ textAlign: 'center' }}>{formData.outgoing}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                    <td style={{ textAlign: 'center' }}>{formData.balance}</td>
                  </tr>
                </tbody>
              </RTable>
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

ProductionForm.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
});

export default connect(mapStateToProps, { loadData, addData, editData })(ProductionForm);