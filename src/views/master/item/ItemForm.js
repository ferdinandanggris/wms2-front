import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";
import Select2 from "../../../components/Select2";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaHouseUser, FaSearchLocation, FaPallet } from "react-icons/fa";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { loadCategory, loadItem, loadPacking } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";

const ItemForm = ({ user, data, loadData, addData, editData, master, loadItem, loadCategory, loadPacking }) => {
  let {id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = "Item Type";
  const img = <FaLayerGroup className="module-img" />;
  // const path = "/master/item/:id?/:type";
  const path = "/master/item";
  const url = "Item";
  const role = "Master - Item";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    code: "",
    uomId: 0,
    packingId: "",
    initial: 0,
    incoming: 0,
    outgoing: 0,
    balance: 0,
    exclusive: "",
    category: "",
    type: "",
    qtyPerPacking: 0,
    dateIn: "",
    dateUp: "",
    userIn: "",
    userUp: "",
    isActive: true,
    spWarehouseDetails: [],
    spLocationDetails: [],
    spPalletDetails: [],
    batches: []
  });

  const { name, code, initial, uomId, packingId, isActive, incoming, outgoing, exclusive, category, qtyPerPacking, balance,type,spWarehouseDetails,spLocationDetails, 
    spPalletDetails,batches} = formData;

  useEffect(() => {
    if (user !== null && id !== undefined) {
      loadData({ url, id });
    }

    loadItem();
    loadCategory();
    loadPacking();
  }, [id, user, loadData, loadItem, loadCategory, loadPacking]);
console.log("formdata",formData)
  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        console.log("data",data)
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
          balance: data.data.balance,
          batches:data.data.batches,
          isActive: data.data.isActive,
          spPalletDetails:data.dataspPalletDetails,
          spWarehouseDetails: data.data.spWarehouseDetails,
          spLocationDetails: data.data.spLocationDetails,
          
        });
      }
    }
  }, [id, data, setFormData]);
  

  const onChange = (e) => {
    e.preventDefault();
    let isTrue = false;

    if(e.target.name === "isActive") {
      isTrue = e.target.value === "true";
      setFormData({ ...formData, [e.target.name]: isTrue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        navigate(`${path}/create?`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        console.log("formdata",path)
        navigate(`${path}/${id}/edit?`);
      });
    }
  };


  const tabIconStyle = {
    marginRight: '5px',
  };

  const onSelectChange = (e, name) => {
    console.log(e);
    if(name === "category") {
      setFormData({...formData, [name]: e.code});
    } else if(name === "packingId") {
      setFormData({...formData, [name]: e.id});
    }
  }

  console.log(formData, 'formdata')
  console.log(master, 'master')

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Item</div>
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
              <input name="uomId" value={uomId} type="text" onChange={(e) => onChange(e)} className="form-control text-right" placeholder="" required />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Packing
              <span className="text-danger">*</span></label>
            <div className="col-sm-3">
            
              <Select2
                options={master.packing}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.name}
                placeholder={"** Please select"}
                value={master.packing === null ? null : master.packing?.filter((option) =>
                  option.id === formData.packingId
                )}
                handleChange={(e) => onSelectChange(e, "packingId")}
              />
            </div>
          </div>
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">Qty Per Packing</label>
            <div className="col-sm-10">
              <input name="qtyPerPacking" value={qtyPerPacking} type="text" onChange={(e) => onChange(e)} className="form-control text-right" placeholder="" />
            </div>
          </div>

            <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">
              Type <span className="required-star">*</span>
            </label>
            <div className="col-sm-10">
              <select
                class="form-control"
                name="exclusive"
                onChange={(e) => onChange(e)}
                value={exclusive}
              >
                <option value="Free Item">Free Item</option>
                <option value="Exclusives">Exclusives</option>
              </select>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-3">
              <Select2
                options={master.category}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.code}
                placeholder={"** Please select"}
                value={master.category === null ? null : master.category?.filter((option) =>
                  option.code === formData.category
                )}
                handleChange={(e) => onSelectChange(e, "category")}
              />
            </div>
          </div>
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">Group
              <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="name" value={name} type="text" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
            </div>
          </div>

          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-10">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isActive" value={false} checked={isActive === false} onChange={(e) => onChange(e)} />
                <label class="form-check-label mr-5" >
                  InActive
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="isActive" value={true} checked={isActive === true} onChange={(e) => onChange(e)} />
                <label class="form-check-label">
                  Active
                </label>
              </div>
            </div>
          </div>
        </div>


        <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
          <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Batch Detail</span>}>
            <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
            <RTable bordered style={{ float: 'center', width: "100%" }}>
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
    {batches !== undefined &&
      batches !== null &&
      batches.map((batch, index) => { 
        return (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{batch.code}</td> {}
            <td style={{ textAlign: 'center' }}>{batch.initial}</td> {}
            <td style={{ textAlign: 'center' }}>{batch.incoming}</td> {}
            <td style={{ textAlign: 'center' }}>{batch.outgoing}</td> {}
            <td style={{ textAlign: 'center' }}>{batch.balance}</td> {}
          </tr>
        );
      })}
  </tbody>
</RTable>
            </div>
          </Tab>

          <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />WareHouse Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>WareHouse</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
    {spWarehouseDetails !== undefined &&
      spWarehouseDetails !== null &&
      spWarehouseDetails.map((WarehouseDetails, index) => { 
        return (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{WarehouseDetails.code}</td> {}
            <td style={{ textAlign: 'center' }}>{WarehouseDetails.incoming}</td> {}
            <td style={{ textAlign: 'center' }}>{WarehouseDetails.outgoing}</td> {}
            <td style={{ textAlign: 'center' }}>{WarehouseDetails.balance}</td> {}
          </tr>
        );
      })}
  </tbody>
            </RTable>
          </Tab>


          <Tab eventKey="DeliveryDetail" title={<span><FaSearchLocation style={tabIconStyle} /> Location Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATIOM</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
    {spLocationDetails !== undefined &&
      spLocationDetails !== null &&
      spLocationDetails.map((LocationDetails, index) => { 
        return (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{LocationDetails.code}</td> {}
            <td style={{ textAlign: 'center' }}>{LocationDetails.incoming}</td> {}
            <td style={{ textAlign: 'center' }}>{LocationDetails.outgoing}</td> {}
            <td style={{ textAlign: 'center' }}>{LocationDetails.balance}</td> {}
          </tr>
        );
      })}
  </tbody>
            </RTable>
          </Tab>

          <Tab eventKey="Document" title={<span><FaPallet style={tabIconStyle} /> Pallets Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLETS</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
    {spPalletDetails!== undefined &&
      spPalletDetails !== null &&
      spPalletDetails .map((PalletDetails , index) => { 
        return (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{PalletDetails.code}</td> {}
            <td style={{ textAlign: 'center' }}>{PalletDetails.incoming}</td> {}
            <td style={{ textAlign: 'center' }}>{PalletDetails.outgoing}</td> {}
            <td style={{ textAlign: 'center' }}>{PalletDetails.balance}</td> {}
          </tr>
        );
      })}
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

ItemForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  master: PropTypes.func,
  loadItem: PropTypes.func,
  loadCategory: PropTypes.func,
  loadData: PropTypes.func,
  loadPacking:PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master
});

export default connect(mapStateToProps, { loadData, addData, editData, loadItem, loadCategory, loadPacking })(ItemForm);
