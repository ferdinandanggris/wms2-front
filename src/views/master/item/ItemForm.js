import { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { } from "react-icons/fa";
import Select2 from "../../../components/Select2";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaLayerGroup, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaHouseUser, FaSearchLocation, FaPallet, FaBoxes } from "react-icons/fa";
import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";
import { Table as RTable, Tab, Tabs } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { loadCategory, loadItem, loadPacking, loadGroup, loadUom, loadBatch, loadPallet, loadWarehouse, loadLocation } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";

import { useSelector, useDispatch } from 'react-redux';
import PagingComponent from "../../../components/Paging/PagingComponent";

const ItemForm = ({ user, data, loadData, addData, editData, master, loadItem, loadCategory, loadPacking, loadGroup, loadUom, loadBatch, loadPallet, loadWarehouse, loadLocation }) => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const title = "Item Type";
  const img = <FaBoxes className="module-img" />;
  const path = "/master/item";
  const url = "Item";
  const role = "Master - Item";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    code: null,
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
    dateIn: null,
    dateUp: null,
    userIn: "",
    userUp: "",
    isActive: true,
    itemGroupDetails: [],
    spWarehouseDetails: [],
    spLocationDetails: [],
    spPalletDetails: [],
    batches: []
  });



  const { name, code, initial, uomId, packingId, isActive, incoming, outgoing, exclusive, category, qtyPerPacking, balance, type, spWarehouseDetails, spLocationDetails,
    spPalletDetails, itemGroupDetails, batches } = formData;
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [palletPage, setPalletPage] = useState(0);
  const [locationPage, setLocationPage] = useState(0);
  const [warehousePage, setWarehousePage] = useState(0);

  const dispatch = useDispatch();
  const dataBatches = useSelector(state => state.master.batch);
  const dataPallet = useSelector(state => state.master.pallet);
  const dataLocation = useSelector(state => state.master.location);
  const dataWarehouse = useSelector(state => state.master.warehouse);
  const total = useSelector(state => state.master.total);
  const page = useSelector(state => state.master.page);

  useEffect(() => {
    if (user !== null && id !== undefined) {
      loadData({ url, id });
    }

    loadItem();
    loadCategory();
    loadPacking();
    loadGroup();
    loadUom();
    loadBatch({ limit: 10, page: 0, filterSearch: "itemid:" + id });
    loadPallet({ limit: 10, page: 0, filterSearch: "itemid:" + id });
    loadWarehouse({ limit: 10, page: 0, filterSearch: "itemid:" + id });
    loadLocation({ limit: 10, page: 0, filterSearch: "itemid:" + id });

  }, [id, user, loadData, loadItem, loadCategory, loadPacking, loadGroup, loadUom, loadBatch, loadPallet, loadWarehouse, loadLocation]);
  const handlePageChange = (page) => {
    dispatch(loadBatch({ limit: 10, page: page - 1, filterSearch: "itemid:" + id }));
  };
  const handlePalletPageChange = (page) => {
    setPalletPage(page - 1);
    dispatch(loadPallet({ limit: 10, page: page - 1, filterSearch: "itemid:" + id }));
  };
  const handleWarehousePageChange = (page) => {
    setWarehousePage(page - 1);
    dispatch(loadWarehouse({ limit: 10, page: page - 1, filterSearch: "itemid:" + id }));
  };
  const handleLocationPageChange = (page) => {
    setLocationPage(page - 1);
    dispatch(loadLocation({ limit: 10, page: page - 1, filterSearch: "itemid:" + id }));
  };
console.log("formData",formData)
  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        const newItemGroupDetail = {
          id: 0,
          name: "",
          code: "",
          dateIn: null,
          dateUp: null,
          userIn: null,
          userUp: null,
          groupId: 0,
        };
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
          group: data.data.group,
          batches: data.data.batches,
          isActive: data.data.isActive,
          itemGroupDetails: data.data.itemGroupDetails,
          spWarehouseDetails: data.data.spWarehouseDetails,
          spPalletDetails: data.data.spPalletDetails,
          spLocationDetails: data.data.spLocationDetails
        });

      }
    }
  }, [id, data, setFormData]);



  const onChange = (e) => {
    e.preventDefault();
    let isTrue = false;

    if (e.target.name === "isActive") {
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

  const onSelectChange = (e, name) => {
    if (name === "category") {
      setFormData({ ...formData, [name]: e.code });
    } else if (name === "packingId") {
      setFormData({ ...formData, [name]: e.id });
    }
    else if (name === "group") {
      let groupDetails = [];

      e.map((item) => {
        groupDetails.push({
          id: 0,
          itemId: id,
          itemCode: code,
          groupId: item.id,
          orderId: 0
        });
      });

      setFormData({ ...formData, itemGroupDetails: groupDetails })
    }
    else if (name === "uomId") {
      setFormData({ ...formData, [name]: e.id });
    }
  }

  const element = () => {
    return (
      <div className="detail">
        <div className="subTitle"> <FaUserFriends style={tabIconStyle} />Add Item</div>
        <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">Code
              <span className="text-danger">*</span></label>
            <div className="col-sm-10">
              <input name="code" value={code} type="number" onChange={(e) => onChange(e)} className="form-control text-left" placeholder="" required />
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
            <div className="col-sm-2">
              <Select2
                options={master.uom}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.name}
                placeholder={"** Please select"}
                required
                value={master.uom === null ? null : master.uom?.filter((option) =>
                  option.id === formData.uomId
                )}
                handleChange={(e) => onSelectChange(e, "uomId")}
              />
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Packing
              <span className="text-danger">*</span></label>
            <div className="col-sm-2">

              <Select2
                options={master.packing}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.name}
                placeholder={"** Please select"}
                required
                value={master.packing === null ? null : master.packing?.filter((option) =>
                  option.id === formData.packingId
                )}
                handleChange={(e) => onSelectChange(e, "packingId")}
              />
            </div>
          </div>
          <div className="row align-items-center mt-4 mb-3">
            <label className="col-sm-2 col-form-label">Qty Per Packing</label>
            <div className="col-sm-2">
              <input name="qtyPerPacking" value={qtyPerPacking} type="number" onChange={(e) => onChange(e)} className="form-control text-right" placeholder="" />
            </div>
          </div>

          <div className="row form-group align-items-center">
            <label className="col-sm-2 col-form-label">
              Type <span className="required-star">*</span>
            </label>
            <div className="col-sm-2">
              <select
                class="form-control"
                name="exclusive"
                onChange={(e) => onChange(e)}
                required
                value={exclusive}
              >

                <option value="Free Item">Free Item</option>
                <option value="Exclusive">Exclusive</option>
              </select>
            </div>
          </div>
          <div className="row align-items-center mb-3">
            <label className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-2">
              <Select2
                options={master.category}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => option.name}
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
              <Select2
                options={master.group}
                optionValue={(option) => option.id.toString()}
                optionLabel={(option) => (String(option.code)).concat(" - ", option.warehouse.name)}
                placeholder={"** Please select"}
                required
                value={master.group !== null ? master.group.filter((obj) =>
                  itemGroupDetails?.some((obj3) => obj.id === obj3.groupId)
                ) : null}
                isMulti={true}
                handleChange={(e) => {
                  onSelectChange(e, "group");
                }}
              />
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
                    <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
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
                          <td style={{ textAlign: 'center' }}>{index + 1}</td>
                          <td style={{ textAlign: 'center' }}>{batch.code}</td>
                          <td style={{ textAlign: 'center' }}>{batch.initial}</td>
                          <td style={{ textAlign: 'center' }}>{batch.incoming}</td>
                          <td style={{ textAlign: 'center' }}>{batch.outgoing}</td>
                          <td style={{ textAlign: 'center' }}>{batch.balance}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </RTable>
              <PagingComponent
                currentPage={page + 1}
                limit={10}
                total={total}
                onPageChange={handlePageChange}
              />
            </div>
          </Tab>

          <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />WareHouse Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>WareHouse</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                { spWarehouseDetails !== undefined &&
                  spWarehouseDetails !== null &&
                  spWarehouseDetails.map((warehouse, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}>{warehouse.code}</td> { }
                        <td style={{ textAlign: 'center' }}>{warehouse.incoming}</td> { }
                        <td style={{ textAlign: 'center' }}>{warehouse.outgoing}</td> { }
                        <td style={{ textAlign: 'center' }}>{warehouse.balance}</td> { }
                      </tr>
                    );
                  })}
              </tbody>
            </RTable>
            <PagingComponent
              currentPage={warehousePage + 1}
              limit={10}
              total={total}
              onPageChange={handleWarehousePageChange}
            />
          </Tab>


          <Tab eventKey="DeliveryDetail" title={<span><FaSearchLocation style={tabIconStyle} /> Location Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>LOCATIOM</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                { spLocationDetails !== undefined &&
                  spLocationDetails !== null &&
                  spLocationDetails.map((location, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}>{location.code}</td> { }
                        <td style={{ textAlign: 'center' }}>{location.incoming}</td> { }
                        <td style={{ textAlign: 'center' }}>{location.outgoing}</td> { }
                        <td style={{ textAlign: 'center' }}>{location.balance}</td> { }
                      </tr>
                    );
                  })}
              </tbody>
            </RTable>
            <PagingComponent
              currentPage={locationPage + 1}
              limit={10}
              total={total}
              onPageChange={handleLocationPageChange}
            />
          </Tab>

          <Tab eventKey="Document" title={<span><FaPallet style={tabIconStyle} /> Pallets Detail</span>}>
            <RTable bordered style={{ float: 'center', width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>No</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>PALLETS</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Incoming</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Outgoing</th>
                  <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                { spPalletDetails !== undefined &&
                   spPalletDetails !== null &&
                   spPalletDetails.map((pallet, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}>{pallet.code}</td> { }
                        <td style={{ textAlign: 'center' }}>{pallet.incoming}</td> { }
                        <td style={{ textAlign: 'center' }}>{pallet.outgoing}</td> { }
                        <td style={{ textAlign: 'center' }}>{pallet.balance}</td> { }
                      </tr>
                    );
                  })}
              </tbody>
            </RTable>
            <PagingComponent
              currentPage={palletPage + 1}
              limit={10}
              total={total}
              onPageChange={handlePalletPageChange}
            />
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
  loadUom: propTypes.func,
  loadPacking: PropTypes.func,
  loadLocation: propTypes.func,
  loadWarehouse: propTypes.func,
  loadGroup: propTypes.func,
  loadBatch: propTypes.func,
  loadPallet: propTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master
});

export default connect(mapStateToProps, { loadData, addData, editData, loadItem, loadCategory, loadPacking, loadGroup, loadUom, loadBatch, loadPallet, loadLocation, loadWarehouse })(ItemForm);
