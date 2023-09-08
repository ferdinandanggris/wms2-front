import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table as RTable, Tab, Table, Tabs } from "react-bootstrap";
import { FaBox, FaCar, FaFileAlt, FaFolderOpen, FaIdCard, FaUserFriends, FaCheck, FaPlus, FaTimes, FaLayerGroup, FaHouseUser, FaSearchLocation } from "react-icons/fa";

import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadBatch, loadItem } from "../../actions/master";
import { loadData,addData,editData } from "../../actions/data";
import FormWrapper from "../../components/Wrapper/FormWrapper";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import Select2 from "../../components/Select2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import PagingComponent from "../../components/Paging/PagingComponent";

const SPKPendingList = ({ user, data, loadData, addData, editData, master, loadItem }) => {
    let { id,type } = useParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const title = " SPK Pending List";
    const img = <FaBox className="module-img" />;
    // const path = "/master/customer/:id?/:customer";
    // const path = "/transaction/production/:id?/:type";
    const path = "/admin";
    const url = "Dashboard/SpkPendingList";
    const role = "Admin";

    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        id: 0,
        voucherNo: "",
        customerName: "",
        transDate: null,
        shippingDate: null,
        warehouseName: "",
        status: ""

    });

    const tabIconStyle = {
      marginRight: '5px',
  };

    const { voucherNo,customerName,transDate,shippingDate,warehouseName} = formData;

    const [itemList, setItem] = useState([]);
    const total = useSelector(state => state.master.total);
    const page = useSelector(state => state.master.page);
    useEffect(() => {
        loadItem();
        if (user !== null && id !== undefined) loadData({ url, id });
    }, [id, user, loadData, loadItem]);

    useEffect(() => {
        if (master.item !== undefined && master.item !== null) {
            let list = [...master.item];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setItem(list);
        }
    }, [master]);

    useEffect(() => {
        if (data !== undefined && data !== null && id !== undefined) {
            if (data.module !== url) return;
            if (data.data !== undefined && data.data !== null) {
                setFormData({
                    id: id === undefined ? 0 : parseInt(id),
                    voucherNo: data.data.voucherNo,
                    transDate: data.data.transDate,
                    customerName: data.data.customerName,
                    shippingDate: data.data.shippingDate,
                    warehouseName: data.data.warehouseName,
                    status: data.data.status,
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
   
    const [batches, setBatches] = useState([]);
    const [spWarehouseDetails, setSpWarehouseDetails] = useState([]);
    const [spLocationDetails, setSpLocationDetails] = useState([]);
    const handlePageChange = (page) => {
        dispatch(loadBatch({ limit: 10, page: page - 1, filterSearch: "rawmaterialid:" + id }));
      };

    const getDetail = ({ itemId, qty }) => async (dispatch) => {
        try {
            const queryParams = { itemId, qty };
            // console.log(axios.defaults.baseURL);
            const res = await axios.get(`/production/detail`, { params: queryParams });
            return Promise.resolve(res.data);
        } catch (err) {
            let errMessage = "";
            if (err.message) errMessage = err.message;
            if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
            dispatch(setAlert(errMessage, "danger"));
        }
    };



    const element = () => {
        return (
          <div>
            <div className="subTitle">SPK Pending List</div>
            <div className="item-table">
              <Tabs defaultActiveKey="ContactDetail" className="mt-5 mb-5">
                <Tab eventKey="ContactDetail" title={<span><FaLayerGroup style={tabIconStyle} /> Summary</span>}>
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
                   
                  </div>
                </Tab>
      
                <Tab eventKey="BillingDetail" title={<span><FaHouseUser style={tabIconStyle} />SPK Pending List</span>}>
                  <RTable bordered style={{ float: 'center', width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>SPK CODE</th>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>WAREHOUSE</th>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>CUSTOMER</th>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>DATE</th>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>ESTIMATION DATE</th>
                        <th style={{ backgroundColor: '#0e81ca', color: 'white', textAlign: 'center' }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spWarehouseDetails !== undefined &&
                        spWarehouseDetails !== null &&
                        spWarehouseDetails.map((warehouse, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ textAlign: 'center' }}>{index + 1}</td>
                              <td style={{ textAlign: 'center' }}>{warehouse.code}</td>
                              <td style={{ textAlign: 'center' }}>{warehouse.incoming}</td>
                              <td style={{ textAlign: 'center' }}>{warehouse.outgoing}</td>
                              <td style={{ textAlign: 'center' }}>{warehouse.balance}</td>
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
                </Tab>
      
                <Tab eventKey="DeliveryDetail" title={<span><FaSearchLocation style={tabIconStyle} /> Top Items Total</span>}>
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
                      {spLocationDetails !== undefined &&
                        spLocationDetails !== null &&
                        spLocationDetails.map((location, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ textAlign: 'center' }}>{index + 1}</td>
                              <td style={{ textAlign: 'center' }}>{location.code}</td>
                              <td style={{ textAlign: 'center' }}>{location.incoming}</td>
                              <td style={{ textAlign: 'center' }}>{location.outgoing}</td>
                              <td style={{ textAlign: 'center' }}>{location.balance}</td>
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

SPKPendingList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadItem })(SPKPendingList);