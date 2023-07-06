import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Select3 from "../components/Select3";
import { FaBox, FaCheck, FaSync, FaTruck, FaWeightHanging, FaWindowClose } from "react-icons/fa";
import { getSync, loadFleetCategory, loadFleetType, syncNow } from "../actions/ice";

import subDays from "date-fns/subDays";
import subMonths from "date-fns/subMonths";
import moment from "moment";

const Home = ({ user, master, getSync, syncNow, loadFleetCategory, loadFleetType }) => {
  const reloadList = [
    { id: 15, description: "15 seconds" },
    { id: 30, description: "30 seconds" },
    { id: 60, description: "1 minute" },
  ];
  const achievementList = [
    { id: 1, description: "Last 7 Days" },
    { id: 2, description: "Last Month" },
    { id: 3, description: "Last 3 Months" },
    { id: 4, description: "Last 12 Months" },
  ];
  const [fleetCategoryList, setFleetCategoryList] = useState([]);
  const [fleetTypeList, setFleetTypeList] = useState([]);

  const [formData, setFormData] = useState({
    syncDate: null,
    reloadID: 15,
    fleetCategoryID: 0,
    fleetTypeID: 0,
    achievementID: 1,
    achievementStart: subDays(new Date(), 7),
    achievementEnd: new Date(),
  });

  const { syncDate, reloadID, fleetCategoryID, fleetTypeID, achievementID, achievementStart, achievementEnd } = formData;

  useEffect(() => {
    if (user !== undefined && user !== null) {
      getSync();
      loadFleetCategory();
      loadFleetType({ filterSearch: null });
    }
  }, [user]);

  useEffect(() => {
    if (master.sync !== undefined && master.sync !== null) setFormData({ ...formData, syncDate: master.sync.value });
    if (master.fleetCategory !== undefined && master.fleetCategory !== null) {
      let list = [...master.fleetCategory];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "All Fleet Category",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetCategoryList(list);
    }
    if (master.fleetType !== undefined && master.fleetType !== null) {
      let list = [...master.fleetType];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "All Fleet Type",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetTypeList(list);
    }
  }, [master, setFormData]);

  useEffect(() => {
    let startDate = subDays(new Date(), 7);
    if (achievementID === 2) startDate = subMonths(new Date(), 1);
    else if (achievementID === 3) startDate = subMonths(new Date(), 3);
    else if (achievementID === 4) startDate = subMonths(new Date(), 12);

    setFormData({ ...formData, achievementStart: startDate });
  }, [achievementID]);

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSync = (e) => {
    e.preventDefault();
    setFormData({ ...formData, syncDate: "Synchronizing..." });
    syncNow().then((data) => {
      if (data !== undefined && data !== null && data) {
        getSync();
      }
    });
  };

  const renderHeader = () => {
    return (
      <div className="dashboard d-flex justify-content-between">
        <div className="dashboard-title d-flex align-items-center">
          <span className="mr-2">Dashboard</span> <span style={{ fontWeight: "normal" }}>Table</span>
        </div>
        <div className="d-flex align-items-center">
          {syncDate !== undefined && syncDate !== null && (
            <div className="d-flex align-items-center mr-4">
              <span className="mr-2">
                <strong>Last Sync:</strong>
              </span>
              <span className="mr-2" style={{ fontWeight: "normal" }}>
                {syncDate}
              </span>
              <button className="btn btn-sync" onClick={(e) => handleSync(e)}>
                <FaSync />
              </button>
            </div>
          )}
          <div className="d-flex align-items-center mr-4">
            <span className="mr-2">Auto Reload Every:</span>
            <Select3 options={reloadList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Reload Interval"} className="mr-2" value={reloadList === null ? null : reloadList.filter((option) => option.id === parseInt(reloadID))} handleChange={(e) => onSelectChange(e, "reloadID")} />
            <button className="btn btn-sync">
              <FaSync />
            </button>
          </div>

          <div className="d-flex align-items-center mr-4">
            <span className="mr-2">Fleet Category:</span>
            <Select3 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"All Fleet Category"} className="mr-2" value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} />
          </div>
        </div>
      </div>
    );
  };

  const renderAchievement = () => {
    return (
      <div className="row">
        <div className="col-lg-12 achievement">
          <div className="achievement-wrapper">
            <div className="achievement-head clearfix">
              <div className="achievement-head-title">
                Achievement Order
                <small>
                  <span className="achievement-head-subtitle" id="label-filter-achievement">
                    From {moment(achievementStart).format("DD MMM YYYY")} to {moment(achievementEnd).format("DD MMM YYYY")}
                  </span>
                </small>
              </div>
              <div className="achievement-head-option d-flex flex-row align-items-center">
                <div className="achievement-head-option-item mr-2">
                  <label>Date:</label>
                </div>
                <Select3 options={achievementList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Periods"} className="mr-2" value={achievementList === null ? null : achievementList.filter((option) => option.id === parseInt(achievementID))} handleChange={(e) => onSelectChange(e, "achievementID")} />
              </div>
            </div>
            <div className="achievement-content clearfix">
              <div className="achievement-content-deliver">
                <FaCheck className="mc-fa mr-2" />
                <div>
                  <small>Order Delivered</small>
                  <strong id="achievement-delivered">0</strong>
                </div>
              </div>
              <div className="achievement-content-right clearfix">
                <div>
                  <small>Total Delivered Weight (Kg)</small>
                  <strong id="achievement-weight">0</strong>
                  <FaBox className="mc-fa" />
                </div>
                <div>
                  <small>Total Canceled Order</small>
                  <strong id="achievement-canceled">0</strong>
                  <FaWindowClose className="mc-fa" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShipment = () => {
    return (
      <div className="row">
        <div className="col-lg-12 shipment">
          <div className="shipment-wrapper">
            <div className="shipment-head clearfix">
              <div className="shipment-head-title">Ongoing Shipment</div>
              <div className="shipment-head-option d-flex flex-row align-items-center">
                <div className="shipment-head-option-item mr-4">
                  <label className="mr-2">Today:</label>
                  <strong>{moment(new Date()).format("DD MMM YYYY")}</strong>
                </div>
                <div className="shipment-head-option-item mr-2 d-flex flex-row align-items-center">
                  <label className="mr-2">Fleet Type:</label>
                  <Select3 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"All Types"} className="mr-2" value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
                </div>
              </div>
            </div>
            <div className="row shipment-content">
              <div className="col-lg-4 shipment-content-item ongoing">
                <div>
                  <small>Weight (Kg)</small>
                  <strong id="ongoingorder-total_weight">0</strong>
                  <FaWeightHanging className="mc-fa mc-orange" />
                </div>
              </div>
              <div className="col-lg-4 shipment-content-item ongoing">
                <div>
                  <small>Order</small>
                  <strong id="ongoingorder-total_order">0</strong>
                  <FaBox className="mc-fa mc-purple" />
                </div>
              </div>
              <div className="col-lg-4 shipment-content-item ongoing">
                <div>
                  <small>Fleet</small>
                  <strong id="ongoingorder-total_fleet">0</strong>
                  <FaTruck className="mc-fa mc-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {renderHeader()}
      <div className="dashboard mb-3">
        {renderAchievement()}
        {renderShipment()}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  master: PropTypes.object,
  getSync: PropTypes.func.isRequired,
  syncNow: PropTypes.func.isRequired,
  loadFleetCategory: PropTypes.func,
  loadFleetType: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  master: state.master,
});

export default connect(mapStateToProps, { getSync, syncNow, loadFleetCategory, loadFleetType })(Home);
