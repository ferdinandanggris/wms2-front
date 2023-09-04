import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs, Button } from "react-bootstrap";
import { FaBox, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaTimes, FaPlus } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { loadCategory, loadLocation, loadPallet, loadVendor, loadWarehouse, loadproduction } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../../components/Select2";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import PagingComponent from "../../../components/Paging/PagingComponent";
import { AiOutlineSearch } from 'react-icons/ai';

const ReceivingForm = ({ user, data, loadData, addData, master, editData, loadWarehouse, loadproduction, loadVendor, loadCategory, loadPallet, loadLocation }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = " Receiving Form";
  const img = <FaBox className="module-img" />;
  // const path = "/master/customer/:id?/:customer";
  const path = "/transaction/receiving";
  const url = "Receiving";
  const role = "transaction - ReceivingForm";

  const [formData, setFormData] = useState({
    id: 0,
    voucherNo: "",
    status: "",
    transDate: null,
    postDate: null,
    createdBy: user.fullName,
    postedBy: "",
    vendorId: "",
    warehouseId: "",
    productionNo: "",
    category: "",
    referenceNo: "",
    dateIn: null,
    dateUp: null,
    userIn: "",
    userUp: "",
    warehouses: null,
    vendors: null,
    batchNo: "",
    receivingDetails: []

  });

  const { name, vendor, warehouse, vendorId, postedBy, warehouseId, type, voucherNo, transDate, postDate, createdBy, productionNo, category, referenceNo, batchNo, dateIn, dateUp, receivingDetails } = formData;
  const [warehouseList, setWarehouse] = useState([]);
  const [locationlist, setlocation] = useState([]);
  const [palletList, setpallet] = useState([]);
  const [vendorList, setVendor] = useState([]);
  const [productionList, setproduction] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  const handlePageChange = (pageNumber) => {
    setStartIndex((pageNumber - 1) * 10);
    setEndIndex(pageNumber * 10);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      let details = receivingDetails;
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

  useEffect(() => {
    loadWarehouse();
    loadVendor();
    loadCategory();
    loadLocation();
    loadPallet();
    loadproduction();

    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadWarehouse, loadVendor, loadCategory, loadPallet, loadLocation, loadproduction]);

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
  const onSelectChange = (e, name, index) => {
    if (name === "category") {
      e.preventDefault();
      setFormData({ ...formData, [name]: e.target.value });
    } else if (name === "location") {
      let details = receivingDetails;

      details[index]["locationId"] = e.id;

      setFormData({ ...formData, receivingDetails: details });
    } else if (name === "pallet") {
      let details = receivingDetails;

      details[index]["palletId"] = e.id;

      setFormData({ ...formData, receivingDetails: details });
    }
    else if (name === "productionNo") {
          setFormData({ ...formData,[name]: e.voucherNo});

    } else {
      setFormData({ ...formData, [name]: e.id });
    }
  };

  const onDetailSelectChange = async (e, value, index) => {
    let details = receivingDetails;
    if (details === undefined || details === null) details = [];

    if (value == "locationId") {
      details[index]["locationId"] = e.id;
    } else if (value == "palletId") {
      details[index]["palletId"] = e.id;
    }


    setFormData({ ...formData, orderDetails: details });
  };

  const handleNewRow = (e) => {
    e.preventDefault();
    let details = receivingDetails;
    if (details === undefined || details === null) details = [];

    details.push({
      id: 0,
      receivingId: 0,
      voucherNo: "",
      locationId: 0,
      palletId: 0,
      batchId: 0,
      itemId: 0,
      remark: "",
      qty: 0,
      dateIn: null,
      dateUp: null,
      userIn: "",
      userUp: "",
      itemName: "",
      uom: ""
    });
    setFormData({ ...formData, receivingDetails: details });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let details = receivingDetails;
    if (details === undefined || details === null) details = [];

    let newDetail = [];

    details.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });

    setFormData({ ...formData, receivingDetails: newDetail });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const getDetail = async () => {
    try {
      const res = await axios.get(`/receiving/detail?batchCode=` + batchNo);

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
  const handleSearch = async () => {
    // Fungsi untuk mencari detail data dan menambahkannya jika ditemukan
    const data = await getDetail();

    if (data !== null) {
      handleAddBatch(data.data);
    }
  };

  const handleAddBatch = (selectedBatch) => {
    let details = [...receivingDetails];

    const existingBatchIndex = details.findIndex(item => item.batchId === selectedBatch.tmpBatchId);

    if (existingBatchIndex === -1) {
      details.unshift({
        checked: false,
        id: 0,
        receivingId: 0,
        locationId: 0,
        palletId: 0,
        batchId: selectedBatch.tmpBatchId,
        itemId: selectedBatch.itemId,
        qty: 1,
        voucherNo: voucherNo,
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
        // Update properti sesuai kebutuhan
        qty: details[existingBatchIndex]["qty"] + 1,
        // ...
      };
    }
    setFormData({ ...formData, receivingDetails: details });
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
              <input readOnly className="form-control text-left" name="voucher" value={voucherNo} onChange={(e) => onChange(e)} type="text" placeholder="[AUTO]" />
            </div>
            <label className="col-sm-2 text-left col-form-label">Reference# <span className="text-danger">*</span></label>
            <div className="col">
              <input className="form-control text-left" name="referenceNo" value={referenceNo} onChange={(e) => onChange(e)} type="text" required />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Created</label>
            <div className="col-sm-3">
              <input readOnly className="form-control text-left" name="createdBy" value={createdBy} onChange={(e) => onChange(e)} type="text" />
            </div>
            <label className="col-sm-2 text-left col-form-label">Trans date</label>
            <div className="col">
              <input className="form-control text-left" name="transDate" value={transDate === null ? "" : moment(transDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Posted</label>
            <div className="col-sm-3">
              <input readOnly className="form-control text-left" name="postedBy" value={postedBy} onChange={(e) => onChange(e)} type="text" />
            </div>
            <label className="col-sm-2 text-left col-form-label">Post date</label>
            <div className="col">
              <input className="form-control text-left" name="postDate" value={postDate === null ? "" : moment(postDate).format("YYYY-MM-DD")} onChange={(e) => onChange(e)} type="date" placeholder="" />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Production Order</label>
            <div className="col-sm-3">
              <Select2
                options={productionList}
                optionValue={(option) => option.voucherNo}
                optionLabel={(option) => option.voucherNo}
                placeholder={"Pick Production order"}
                value={productionList === null ? null : productionList.filter((option) => option.voucherNo === productionNo)}
                handleChange={(e) => onSelectChange(e, "productionNo")} />
            </div>
            <label className="col-sm-2 col-form-label">
              Vendor<span className="required" style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <div className="col">
              <Select2
                options={vendorList}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.name}
                placeholder={"Pick Vendor"}
                value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(vendorId))}
                handleChange={(e) => onSelectChange(e, "vendorId")}
                required={true} />
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
            <label className="col-sm-2 text-left col-form-label">WareHouse <span className="text-danger">*</span></label>
            <div className="col">
              <Select2
                options={warehouseList}
                optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                placeholder={"Pick Warehouse"}
                value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                handleChange={(e) => onSelectChange(e, "warehouseId")}
                required={true} />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Batch No<span className="required-star">*</span></label>
            <div className="col-sm-3">
              <input
                name="batchNo"
                value={receivingDetails.batchId}
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
                receivingDetails.slice(startIndex, endIndex).map((details, index) => {

                  return (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'center' }}>{details.batchCode}</td>
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
                        <Select2
                          options={master.pallet}
                          optionValue={(option) => option.id.toString()}
                          optionLabel={(option) => (String(option.code)).concat(" - ", option.name)}
                          placeholder={"** Please select"}
                          required
                          value={master.pallet !== null ? master.pallet.find((obj) => obj.id === details.palletId) : ""}
                          handleChange={(e) => {
                            onDetailSelectChange(e, "palletId", index);
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Select2
                          options={master.location}
                          optionValue={(option) => option.id.toString()}
                          optionLabel={(option) => (String(option.code)).concat(" - ", option.name)}
                          placeholder={"** Please select"}
                          required
                          value={master.location !== null ? master.location.find((obj) => obj.id === details.locationId) : ""}
                          handleChange={(e) => {
                            onDetailSelectChange(e, "locationId", index);
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="text"
                          value={details.remark}
                          onChange={(e) => onDetailChange(e, index)}
                          className="form-control text-center"
                          name="remark"
                          style={{ maxWidth: '100px' }}

                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </RTable>
          <PagingComponent
            currentPage={currentPage}
            limit={10}
            total={receivingDetails.length}
            onPageChange={handlePageChange}
          />
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
  loadPallet: PropTypes.func,
  loadLocation: PropTypes.func,
  loadproduction: PropTypes.func,
  editData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor, loadCategory, loadPallet, loadLocation, loadproduction })(ReceivingForm);