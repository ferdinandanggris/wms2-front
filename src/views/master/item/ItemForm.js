import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import {  Table } from 'react-bootstrap';
const ItemTypeForm = ({ user, data, loadData, addData, editData }) => {
  let {id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [activeLabel, setActiveLabel] = useState('');
  const title = "Item";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/item/:id?/:type";
  const url = "Item";
  const role = "Master - Item Type";
  const [activeTab, setActiveTab] = useState('');

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    category:"",
    code: 0,
    uomId: 0,
    packingId: 0,
    initial: 0,
    incoming:0,
    outgoing: 0,
    balance: 0,
    exclusive: "",
    category: "",
    type: "",
    qtyPerPacking: 0,
    isActive: "",
  });

  const { name,category,uomId,packingId,qtyPerPacking,initial,incoming,outgoing,balance,exclusive,type,qty,isActive,code} = formData;

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
          category:data.data.category,
          code: data.data.code,
          uomId: data.data.uomId,
          packingId: data.data.packingId,
          initial: data.data.initial,
          incoming:data.data.incoming,
          outgoing: data.data.outgoing,
          balance: data.data.balance,
         exclusive: data.data.exclusive,
         category: data.data.category,
         type: data.data.type,
          qtyPerPacking: data.data.qtyPerPacking,
         isActive: data.data.isActive,
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
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

const tabData = [
  {
    key: 'Batch Detail',
    label: 'Batch Detail',
    active: activeTab === 'Batch Detail',
  },
  {
    key: 'Warehouse Detail',
    label: 'Warehouse Detail',
    active: activeTab === 'Warehouse Detail',
  },
  {
    key: 'Location Detail',
    label: 'Location Detail',
    active: activeTab === 'Location Detail',
  },
  {
    key: 'Pallet Details',
    label: 'Pallet Details',
    active: activeTab === 'Pallet Details',
  },
];

const getTabStyle = (tabKey) => {
  const activeTabData = tabData.find((tab) => tab.key === tabKey);
  if (activeTabData && activeTabData.active) {
    return {
      borderBottom: '2px solid blue',
      color: 'blue',
    };
  } else {
    return {};
  }
};

  const handleLabelClick = (label) => {
    setActiveLabel(label);
  };

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle">Add Item</div>
        <div className="row">
  {/* <div className="form-group col-sm-4 d-flex align-items-right">
    <label className="mr-2">Code</label>
    <span className="required-star">*</span>
    <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
  </div> */}
</div>
<div className="row">
  <div className="form-group col-sm-12">
    <label>Code</label>
    <span className="required-star">*</span>
    <input className="form-control" type="text" name="code" value={code} onChange={(e) => onChange(e)} required />
  </div>
</div>
<div className="row">
  <div className="form-group col-sm-12">
    <label>Name</label>
    <span className="required-star">*</span>
    <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
  </div>
</div>

        <div className="row">
  <div className="form-group col-sm-12">
    <label>UOM</label>
    <span className="required-star">*</span>
    <NumericFormat className="form-control" name="minTemp" value={uomId} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={0} required />
  </div>
</div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Packing</label>
            <span className="required-star">*</span>
            <select className="form-control" name="minTemp" value={packingId} onChange={(e) => onChange(e)}>
          <option value="category"> ** Please select </option>
        </select>
            
          </div>
        </div>
        <div className="row">
  <div className="form-group col-sm-12">
    <label>Qty Per Packing</label>
    <NumericFormat className="form-control" name="minTemp" value={qtyPerPacking} onChange={(e) => onChange(e)} thousandSeparator="," decimalScale={0} required />
  </div>
</div>
        <div className="row">
      <div className="form-group col-sm-12">
        <label>Type</label>
        <select className="form-control" name="minTemp" value={type} onChange={(e) => onChange(e)}>
          <option value="type"> ** Please select  </option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-sm-12">
        <label>Category</label>
        <select className="form-control" name="minTemp" value={category} onChange={(e) => onChange(e)}>
          <option value="category"> ** Please select </option>
        </select>
      </div>
    </div>
    <div className="row">
          <div className="form-group col-sm-12">
            <label>Group</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)}  required />
          </div>
        </div>
        <div className="row">
  <div className="form-group col-sm-12 d-flex align-items-center" >
    <label className="mr-4">Status<span className="required-star">*</span></label>
    <div className="d-flex">
      <div className="mr-3">
        <label>
          <input type="radio" name="status" value="inactive" onChange={handleStatusChange} />
          Inactive
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="status" value="active" onChange={handleStatusChange} />
          Active
        </label>
      </div>
    </div>
  </div>
</div>


   {/* <div className="col-sm-12 d-flex align-items-center justify-content-between">
      <div className="row">
        <div
          className="form-group col-sm-12 d-flex align-items-center"
          style={{
            borderBottom: activeLabel === 'Batch Detail' ? '4px solid #0e81ca' : 'none',
            cursor: 'pointer',
            color: activeLabel === 'Batch Detail' ? '#0e81ca' : 'initial',
          }}
          onClick={() => handleLabelClick('Batch Detail')}
        >
          <label className="mr-2 text-right flex-grow-1">Batch Detail</label>
        </div>
      </div>
      <div className="row">
        <div
          className="form-group col-sm-12 d-flex align-items-center"
          style={{
            borderBottom: activeLabel === 'Warehouse Detail' ? '4px solid #0e81ca' : 'none',
            cursor: 'pointer',
            color: activeLabel === 'Warehouse Detail' ? '#0e81ca' : 'initial',
          }}
          onClick={() => handleLabelClick('Warehouse Detail')}
        >
          <label className="mr-2 text-right flex-grow-1">Warehouse Detail</label>
        </div>
      </div>
      <div className="row">
        <div
          className="form-group col-sm-12 d-flex align-items-center"
          style={{
            borderBottom: activeLabel === 'Location Detail' ? '4px solid #0e81ca' : 'none',
            cursor: 'pointer',
            color: activeLabel === 'Location Detail' ? '#0e81ca' : 'initial',
          }}
          onClick={() => handleLabelClick('Location Detail')}
        >
          <label className="mr-2 text-right flex-grow-1">Location Detail</label>
        </div>
      </div>
      <div className="row">
        <div
          className="form-group col-sm-12 d-flex align-items-center"
          style={{
            borderBottom: activeLabel === 'Pallet Detail' ? '4px solid #0e81ca' : 'none',
            cursor: 'pointer',
            color: activeLabel === 'Pallet Detail' ? '#0e81ca' : 'initial',
          }}
          onClick={() => handleLabelClick('Pallet Detail')}
        >
          <label className="mr-2 text-right flex-grow-1">Pallet Detail</label>
        </div>
      </div>
    </div> */}
    
    <Tabs defaultActiveKey="Standard" className="mt-5 mb-5">
  {tabData.map((tab) => (
    <Tab
      key={tab.key}
      eventKey={tab.key}
      title={
        <div
          className="col-sm-12 d-flex align-items-center justify-content-between"
          style={getTabStyle(tab.key)}
          onClick={() => handleTabClick(tab.key)}
        >
          <div className="row">
            <div className="form-group col-sm-12 d-flex align-items-center">
              <label className="mr-2 text-right flex-grow-1">{tab.label}</label>
            </div>
          </div>
        </div>
      }
    >
      <div className="container">
        <div className="row align-items-center mb-3 mt-3">
          <div className="col-sm-12">
            <Table bordered style={{ float: 'center' }}>
              <thead>
                <tr>
                  <th style={getTabStyle(tab.key)}>Batch No</th>
                  <th style={getTabStyle(tab.key)}>Initial</th>
                  <th style={getTabStyle(tab.key)}>Incoming</th>
                  <th style={getTabStyle(tab.key)}>Outgoing</th>
                  <th style={getTabStyle(tab.key)}>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={getTabStyle(tab.key)}></td>
                  <td style={getTabStyle(tab.key)}></td>
                  <td style={getTabStyle(tab.key)}></td>
                  <td style={getTabStyle(tab.key)}></td>
                  <td style={getTabStyle(tab.key)}></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Tab>
  ))}
  <Tab
    eventKey="Warehouse Detail"
    title={
      <div
        className="col-sm-12 d-flex align-items-center justify-content-between"
        style={getTabStyle('Warehouse Detail')}
        onClick={() => handleTabClick('Warehouse Detail')}
      >
        <div className="row">
          <div className="form-group col-sm-12 d-flex align-items-center">
            <label className="mr-2 text-right flex-grow-1">Warehouse Detail</label>
          </div>
        </div>
      </div>
    }
  >
    <div className="container">
      <div className="row align-items-center mb-3 mt-3">
        <div className="col-sm-12">
          {/* Konten spesifik untuk Warehouse Detail */}
          <Table bordered style={{ float: 'right' }}>
            <thead>
              <tr>
                <th style={getTabStyle('Warehouse Detail')}>Warehouse</th>
                <th style={getTabStyle('Warehouse Detail')}>Initial</th>
                <th style={getTabStyle('Warehouse Detail')}>Incoming</th>
                <th style={getTabStyle('Warehouse Detail')}>Outgoing</th>
                <th style={getTabStyle('Warehouse Detail')}>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={getTabStyle('Warehouse Detail')}></td>
                <td style={getTabStyle('Warehouse Detail')}></td>
                <td style={getTabStyle('Warehouse Detail')}></td>
                <td style={getTabStyle('Warehouse Detail')}></td>
                <td style={getTabStyle('Warehouse Detail')}></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  </Tab>
  <Tab
    eventKey="Location Detail"
    title={
      <div
        className="col-sm-12 d-flex align-items-center justify-content-between"
        style={getTabStyle('Location Detail')}
        onClick={() => handleTabClick('Location Detail')}
      >
        <div className="row">
          <div className="form-group col-sm-12 d-flex align-items-center">
            <label className="mr-2 text-right flex-grow-1">Location Detail</label>
          </div>
        </div>
      </div>
    }
  >
    <div className="container">
      <div className="row align-items-center mb-3 mt-3">
        <div className="col-sm-12">
          {/* Konten spesifik untuk Location Detail */}
          <Table bordered style={{ float: 'right' }}>
            <thead>
              <tr>
                <th style={getTabStyle('Location Detail')}>Location</th>
                <th style={getTabStyle('Location Detail')}>Incoming</th>
                <th style={getTabStyle('Location Detail')}>Outgoing</th>
                <th style={getTabStyle('Location Detail')}>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={getTabStyle('Location Detail')}></td>
                <td style={getTabStyle('Location Detail')}></td>
                <td style={getTabStyle('Location Detail')}></td>
                <td style={getTabStyle('Location Detail')}></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  </Tab>
  <Tab
    eventKey="Pallet Details"
    title={
      <div
        className="col-sm-12 d-flex align-items-center justify-content-between"
        style={getTabStyle('Pallet Details')}
        onClick={() => handleTabClick('Pallet Details')}
      >
        <div className="row">
          <div className="form-group col-sm-12 d-flex align-items-center">
            <label className="mr-2 text-right flex-grow-1">Pallet Details</label>
          </div>
        </div>
      </div>
    }
  >
    <div className="container">
      <div className="row align-items-center mb-3 mt-3">
        <div className="col-sm-12">
          {/* Konten spesifik untuk Pallet Details */}
          <Table bordered style={{ float: 'center' }}>
            <thead>
              <tr>
                <th style={getTabStyle('Pallet Details')}>Pallets</th>
                <th style={getTabStyle('Pallet Details')}>Incoming</th>
                <th style={getTabStyle('Pallet Details')}>Outgoing</th>
                <th style={getTabStyle('Pallet Details')}>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={getTabStyle('Pallet Details')}></td>
                <td style={getTabStyle('Pallet Details')}></td>
                <td style={getTabStyle('Pallet Details')}></td>
                <td style={getTabStyle('Pallet Details')}></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
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

ItemTypeForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData })(ItemTypeForm);
