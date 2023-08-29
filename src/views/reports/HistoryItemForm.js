import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Tabs, Button } from "react-bootstrap";
import { FaBox, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaTimes, FaPlus } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getHistoryCard} from"../../actions/report";
import { loadData,addData, editData } from "../../actions/data";

import FormWrapper from "../../components/Wrapper/FormWrapper";
import { BsBorderBottom } from "react-icons/bs";
import { loadCategory, loadLocation, loadPallet, loadVendor, loadWarehouse, loadproduction,loadItem } from "../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";
import Select2 from "../../components/Select2";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { AiOutlineSearch } from "react-icons/ai"

const HistoryItemForm= ({ user, data, loadData, addData, master, editData, loadWarehouse, loadproduction, loadVendor, loadCategory, loadPallet, loadLocation,loadItem }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = "History Item Module"
  const img = <FaBox className="module-img" />;
  // const path = "/master/customer/:id?/:customer";
  const path = "/report/history-item/:id?/:type";
  const url = "HistoryItem";
  const role = "transaction - HistoryItemForm";

  const [formData, setFormData] = useState({
    id: 0,
    code: null,
    name: "",
    voucherNo: "",
    objectName: null,
    postDate: new Date().toISOString(),
    qtyPerPacking: 0,
    packingName: "",
    type: "",
    fromDate: null,
    toDate: null,
    warehouse: "",
    initial: 0,
    incoming: 0,
    outgoing: 0,
    balance: 0,
    itemId:0,
    warehouseId:0,

  });

  const { code,name,voucherNo, warehouseId,fromDate,toDate, itemId,objectName,postDate,qtyPerPacking,packingName,type,warehouse,initial,incoming,outgoing,balance } = formData;
  const [warehouseList, setWarehouse] = useState([]);
  const [locationlist, setlocation] = useState([]);
  const [palletList, setpallet] = useState([]);
  const [vendorList, setVendor] = useState([]);
  const [productionList, setproduction] = useState([]);
  const [result,setResult]=useState(null);
  const [itemList, setItemList] = useState(null)


  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [reportList, setReportList] = useState(null)
  const [searchClicked, setSearchClicked] = useState(false);
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
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          code: data.data.code,
          name: data.data.name,
          voucherNo: data.data.voucherNo,
          objectName: data.data,objectName,
          postDate: data.data.postDate,
          qtyPerPacking: data.data.qtyPerPacking,
          packingName: data.data.packingName,
          type: data.data.type,
          warehouse: data.data.warehouse,
          initial: data.data.initial,
          incoming: data.data.incoming,
          outgoing: data.data.outgoing,
          balance: data.data.balance

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
    loadItem();

    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadWarehouse, loadVendor, loadCategory, loadPallet, loadLocation, loadproduction,loadItem]);

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
    if (master && master.item !== undefined && master.item !== null) {
      let list = [...master.item];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
          list.push({
              name: "Name",
              id: 0,
              code: "Code"
          });
          list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setItemList(list);
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

  const onSelectChange = (e, name, index) => {
   
    setFormData({ ...formData, [name]: e.id}); 
  };
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
        // lempar parameternya
        const HistoryItemData = await getHistoryCard({
            itemId,
            warehouseId,
            fromDate: fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD"),
            toDate: toDate === null ? "" : moment(toDate).format("YYYY-MM-DD"),
        })();

        setReportList(HistoryItemData);
        setSearchClicked(true);

    } catch (error) {
        console.error("Error fetching stock card data:", error);
    }
};




  const tabIconStyle = {
    marginRight: '5px',
  };

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle">
        Search Filter
        </div>
        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">
              Item# 
            </label>
            <div className="col-sm-10">
            <Select2
            options={itemList}
            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code}
            placeholder={"** Please"}
            value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
            handleChange={(e) => onSelectChange(e, "itemId")} />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">
              Item Name 
            </label>
            <div className="col-sm-10">
            <Select2
            options={itemList}
            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
            placeholder={"** Please"}
            value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
            handleChange={(e) => onSelectChange(e, "itemId")} />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">
              Date 
            </label>
            <div className="col-3">
  <div className="input-group">
    <input
      className="form-control text-left"
      name="fromDate"
      value={fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD")}
      onChange={(e) => onChange(e)}
      type="date"
      placeholder=""
    />
    <div class="input-group-addon mx-3">to</div>
    <input
      className="form-control text-left"
      name="toDate"
      value={toDate === null ? "" : moment(toDate).format("YYYY-MM-DD")}
      onChange={(e) => onChange(e)}
      type="date"
      placeholder=""
    />
  </div>
</div>
          </div>
          <div className="row align-items-center mb-3 dflex flex">
  <label className="col-sm-2 text-left col-form-label">
    WareHouse 
  </label>
  <div className="col-3">
    <Select2
      options={warehouseList}
      optionValue={(option) => option.id.toString()}
      optionLabel={(option) => option.name}
      placeholder="Pick Warehouse"
      value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
      handleChange={(e) => onSelectChange(e, "warehouseId")} />
  </div>
</div>
<div className="row mb-3">
<div className="col-sm-2 offset-sm-2">
<button type="button" className="d-flex align-items-center btn btn-success" onClick={e => handleSearch(e)}> <AiOutlineSearch className="mr-2" /> Search</button>
  </div>
  </div>
        </div>
        
        <hr style={{ borderColor: "gray", opacity: 0.5 }} />
        
  
        <RTable bordered style={{ float: 'center', width: "100%" }}>
          
          <thead>
            <tr>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM #</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ITEM</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>VOUCHER NO</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>VENDOR/CUSTOMER</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DATE</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PACKING</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>QTY PER PACKING</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>INITIAL</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>IN</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>OUT</th>
              <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>BALANCE</th>
            </tr>
          </thead>
          <tbody>
                        {reportList !== undefined && reportList !== null ?
                            reportList.data.map((item, index) => {

                                const warehouse = warehouseList.find((obj) => obj.id === item.warehouseId)
                                  if (searchClicked && reportList !== undefined && reportList !== null) {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.voucherNo}</td>
                                        <td>{item.objectName}</td>
                                        <td>{moment(item.postDate).format("DD MMM YYYY hh:mm:ss")}</td>
                                        <td>{item.packingName}</td>
                                        <td>{item.qtyPerPacking}</td>
                                        <td>{item.initial}</td>
                                        <td>{item.incoming}</td>
                                        <td>{item.outgoing}</td>
                                        <td>{item.balance}</td>
                                    </tr>
                                )
                              } else {
                                return null; 
                            }
                            }) :
                            <tr>
                                <td colSpan={20} className="text-center">No Data</td>
                            </tr>
                        }

                    </tbody>
        </RTable>
      </div>
      
    ) ;
  };
  
  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave} allowAdd={false}>
      {element}
    </FormWrapper>
  );
};

HistoryItemForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  loadWarehouse: PropTypes.func,
  loadVendor: PropTypes.func,
  loadCategory: PropTypes.func,
  loadPallet: PropTypes.func,
  loadLocation: PropTypes.func,
  loadItem: PropTypes.func,
  loadproduction: PropTypes.func,
  editData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadWarehouse, loadVendor, loadCategory, loadPallet, loadLocation, loadproduction,loadItem })(HistoryItemForm);