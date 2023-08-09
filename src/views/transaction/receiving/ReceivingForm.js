import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs,Button } from "react-bootstrap";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends,FaTimes,FaPlus } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { loadCategory, loadLocation, loadPallet, loadVendor, loadWarehouse,loadproduction } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../../components/Select2";
import moment from "moment";
import { NumericFormat } from "react-number-format";

const ReceivingForm = ({ user, data, loadData, addData, master, editData, loadWarehouse,loadproduction, loadVendor,loadCategory,loadPallet,loadLocation }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = " Receiving Form";
  const img = <FaLayerGroup className="module-img" />;
  // const path = "/master/customer/:id?/:customer";
  const path = "/transaction/receiving";
  const url = "Receiving";
  const role = "transaction - ReceivingForm";

  const [formData, setFormData] = useState({
    id: 0,
    voucherNo: "",
    status: "",
    transDate: 0,
    postDate: 0,
    createdBy: "",
    postedBy: "",
    vendorId: 1,
    warehouseId: 1,
    productionNo: 0,
    category: "",
    referenceNo: "",
    dateIn: "",
    dateUp: null,
    userIn: "",
    userUp: "",
    warehouses: "",
    vendors: "",
    receivingDetails: []

  });

  const { name, vendor, warehouse, vendorId,postedBy, warehouseId, type, voucherNo, transDate, postDate, createdBy, productionNo, category, referenceNo, dateIn, dateUp, receivingDetails } = formData;
  const [warehouseList, setWarehouse] = useState([]);
  const[locationlist,setlocation] = useState([]);
   const[palletList,setpallet]=useState([]);
  const [vendorList, setVendor] = useState([]);
  const[productionList, setproduction] = useState([]);
  const[tempbatchno,settempbatchno]=useState(0);
  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
       let details =receivingDetails;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          voucherNo: data.data.voucherNo,
          status: data.data.status,
          transDate: data.data.transDate,
          postDate: data.data.postDate,
          createdBy: data.data.createdBy,
          postedBy: data.data.postedBy,
          vendorId: data.data.vendorId,
          warehouseId: data.data.vendorId,
          productionNo: data.data.productionNo,
          category: data.data.category,
          referenceNo: data.data.referenceNo,
          dateIn: data.data.dateIn,
          dateUp: data.data.dateUp,
          userIn: data.data.userIn,
          userUp: data.data.userUp,
          warehouses: data.data.warehouse,
          vendors: data.data.vendor,
          receivingDetails: data.data.receivingDetails,

        });
      }
    }
  }, [id, data, setFormData]);
console.log(master)
  useEffect(() => {
    loadWarehouse();
    loadVendor();
    loadCategory();
    loadLocation();
    loadPallet();
    loadproduction();
    
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadWarehouse, loadVendor,loadCategory,loadPallet,loadLocation,loadproduction]);

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
    
    if (master.location !== undefined && master.location !== null) {
      let list = [...master.location];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No location",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setlocation(list);
    }
    if (master.production !== undefined && master.production !== null) {
      let list = [...master.production];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No production",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setproduction(list);
    }
    if (master.pallet !== undefined && master.pallet !== null) {
      let list = [...master.pallet];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No pallet",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setpallet(list);
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
  const onDetailChange = (e, index) => {
    e.preventDefault();

    let details = receivingDetails;
    if (details === undefined || details === null) details = [];

    details[index][e.target.name] = e.target.value;
    if (e.target.name == "qty") {
        details[index]["qty"] = e.target.value;
    }

    setFormData({ ...formData, receivingDetails: details });
};
  const onSelectChange = (e, name) => {
    if (name === "category"){
      e.preventDefault();
      setFormData({ ...formData, [name]: e.target.value });
    }else{
      setFormData({ ...formData, [name]: e.id });
    }
  };
  const handleNewRow = (e) => {
    e.preventDefault();
    let details = receivingDetails;
    if (details === undefined || details === null) details = [];

    details.push({
      id: 0,
      receivingId:0,
      voucherNo: "",
      locationId: 0,
      palletId: 0,
      batchId: 0,
      itemId: 0,
      remark: "",
      qty: 0,
      dateIn: 0,
      dateUp: 0,
      userIn: "",
      userUp: "",
      itemName: "",
      uom: ""
    });
    setFormData({ ...formData, receivingDetails: details });
};

const handleDelete = (e) => {
    e.preventDefault();

    let details =receivingDetails;
    if (details === undefined || details === null) details = [];

    let newDetail = [];

    details.map((item) => {
        if (!item.checked) newDetail.push(item);
        return null;
    });

    setFormData({ ...formData,receivingDetails: newDetail });
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
              <input className="form-control text-left" name="transDate" value={referenceNo} onChange={(e) => onChange(e)} type="text" />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Created</label>
            <div className="col-sm-3">
              <input readOnly className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" />
            </div>
            <label className="col-sm-1 text-left col-form-label">Trans date</label>
            <div className="col">
              <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Posted</label>
            <div className="col-sm-3">
              <input readOnly className="form-control text-left" name="postedBy" value={postedBy} onChange={(e) => onChange(e)} type="text" />
            </div>
            <label className="col-sm-1 text-left col-form-label">Post date</label>
            <div className="col">
              <input className="form-control text-left" name="postDate" value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Production Order</label>
            <div className="col-sm-3">
            <Select2
                options={productionList}
                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.voucherNo}
                placeholder={"Pick Production order"}
                value={productionList === null ? null : productionList.filter((option) => option.id === parseInt(productionNo))}
                handleChange={(e) => onSelectChange(e, "productionNo")} />
            </div>
            <label className="col-sm-1 col-form-label">
              Vendor<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <div className="col">
              <Select2
                options={vendorList}
                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                placeholder={"Pick Vendor"}
                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                handleChange={(e) => onSelectChange(e, "vendorId")} />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-3">
            <select className="form-control" name="category" value={category} onChange={(e) => onSelectChange(e, "category")}>
                <option value="">** Please select</option>
                <option value="REWORK">REWORK</option>
                <option value="PO">PO</option>
                <option value="RETURN">RETURN</option>
              </select>
            </div>
            <label className="col-sm-1 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
            <div className="col">
              <Select2
       options={warehouseList}
       optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
       placeholder={"Pick Warehouse"}
       value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
       handleChange={(e) => onSelectChange(e, "warehouseId")} />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Batch No</label>
            <div className="col-sm-3">
              <input
                name="batchno"
                value={receivingDetails.batchId}
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
          </div>
          <hr style={{ borderColor: "gray", opacity: 0.5 }} />

          <RTable bordered style={{ float: 'center', width: "100%" }}>
            <thead>
              <tr>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Batch No</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Qty</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>UOM</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Pallets</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Location</th>
                <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Remark</th>
              </tr>
            </thead>

<tbody>
  {receivingDetails !== undefined &&
    receivingDetails !== null &&
    receivingDetails.map((details, index) => {
      const location = locationlist.find((obj) => obj.id === details.locationId);
      const pallet = palletList.find((obj) => obj.id === details.palletId);
      return (
        <tr key={index}>
          <td style={{ textAlign: 'center' }}>{index + 1}</td>
          <td style={{ textAlign: 'center' }}>{details.batchId}</td>
          <td style={{ textAlign: 'center' }}>{details.itemName}</td>
          <td className="text-center">
                        <NumericFormat
                            className="form-control text-center"
                            name="QTY" value={details.qty}
                            onChange={(e) => onDetailChange(e, index)}
                            allowNegative={false} thousandSeparator=","
                            decimalScale={0}
                        />
                    </td>
          <td style={{ textAlign: 'center' }}>{details.uom}</td>
          <td style={{ textAlign: 'center' }}>
            {pallet && `${pallet.code} - ${pallet.name}`}
          </td>
          <td style={{ textAlign: 'center' }}>
            {location && `${location.code} - ${location.name}`}
          </td>
          <td style={{ textAlign: 'center' }}>{details.remark}</td>
        </tr>
      );
    })}
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

ReceivingForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  loadWarehouse: PropTypes.func,
  loadVendor: PropTypes.func,
  loadCategory: PropTypes.func,
  loadPallet:PropTypes.func,
  loadLocation:PropTypes.func,
  loadproduction:PropTypes.func,
  editData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor,loadCategory,loadPallet,loadLocation,loadproduction })(ReceivingForm);