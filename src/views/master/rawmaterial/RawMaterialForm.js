import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaHouseUser, FaSearchLocation, FaPallet,FaCubes } from "react-icons/fa";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { NumericFormat } from "react-number-format";


const RawMaterialForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = "RawMaterialForm";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/raw-material/:id?/:type";
  const url = "RawMaterialForm";
  const role = "Master - RawMaterial";

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    uomId: 1,
    packingId: 1,
    initial: 0,
    incoming: 0,
    outgoing: 0,
    balance: 0,
    exclusive: "",
    category: "",
    type: "",
    qtyPerPacking: 0,
    isActive: 1,
    dateIn: "",
    dateUp: "",
    userIn: "",
    userUp: "",
    spWarehouseDetails: "",
    spLocationDetails: "",
    spPalletDetails: "",
    batches: ""
  });

  const { name, code, initial, uomId, packingId, incoming, outgoing, exclusive, category, qtyPerPacking, balance } = formData;

  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          name: data.data.name,
          code: data.data.code,
          initial: data.data.initial,
          uomId: data.data.uomId,
          packingId: data.data.packingId,
          incoming: data.data.incoming,
          outgoing: data.data.outgoing,
          exclusive: data.data.exclusive,
          category: data.data.category,
          type: data.data.type,
          qtyPerPacking: data.data.qtyPerPacking,
          balance: data.data.balance
        });
      }
    }
  }, [id, data, setFormData]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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

  console.log(formData,'formdata')

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle"> <FaCubes style={tabIconStyle} />Add Raw Material</div>
        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">Code
              <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="code" value={code} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Name
              <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="name" value={name} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">UOM
              <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="uomId" value={uomId} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Packing
              <span className="text-danger">*</span></label>
            <div className="col-sm-3">
              <select className="form-control" name="packingId" value={packingId} onChange={(e) => onChange(e)} required>
                <option value="">** Please select</option>
                <option value="term1">Term 1</option>
                <option value="term2">Term 2</option>
                <option value="term3">Term 3</option>
              </select>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-3">
              <select className="form-control" name="category" value={category} onChange={(e) => onChange(e)}>
                <option value="">** Please select</option>
                <option value="term1">Term 1</option>
                <option value="term2">Term 2</option>
                <option value="term3">Term 3</option>
              </select>
            </div>
          </div>
        </div>


        <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
          <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Batch Detail</span>}>
            <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
              <RTable bordered style={{ float: 'center' ,width:"100%"}}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Initial</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                  </tr>
                </tbody>
              </RTable>
            </div>

          </Tab>

          <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />WareHouse Detail</span>}>
          <RTable bordered style={{ float: 'center' ,width:"100%"}}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>WareHouse</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                  </tr>
                </tbody>
              </RTable>
          </Tab>


          <Tab eventKey="DeliveryDetail" title={<span><FaSearchLocation style={tabIconStyle} /> Location Detail</span>}>
          <RTable bordered style={{ float: 'center' ,width:"100%"}}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATIOM</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                  </tr>
                </tbody>
              </RTable>
          </Tab>

          <Tab eventKey="Document" title={<span><FaPallet style={tabIconStyle} /> Pallets Detail</span>}>
          <RTable bordered style={{ float: 'center' ,width:"100%"}}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLETS</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                  </tr>
                </tbody>
              </RTable>
          </Tab>
        </Tabs>
      </div>

    );

  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

RawMaterialForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(RawMaterialForm);
