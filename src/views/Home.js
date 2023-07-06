import React, { useState, useEffect, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Select3 from "../components/Select3";
import { Bar } from "react-chartjs-2";

import moment from "moment";
import subDays from "date-fns/subDays";
import subMonths from "date-fns/subMonths";
import { FaBox, FaCheck, FaWindowClose } from "react-icons/fa";
import { getDashboardAchievement, getDashboardDocumentStatus, getDashboardFleetOrder, getDashboardFleetStatus } from "../actions/dashboard";
import { loadFleetType } from "../actions/ice";

const Home = ({ user, master, dashboard, loadFleetType, getDashboardAchievement, getDashboardFleetOrder, getDashboardFleetStatus, getDashboardDocumentStatus }) => {
  const achievementList = [
    { id: 1, description: "Last 7 Days" },
    { id: 2, description: "Last Month" },
    { id: 3, description: "Last 3 Months" },
    { id: 4, description: "Last 12 Months" },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false, } },
    scales: {
      y: { ticks: { font: { size: 12 } } },
      x: { ticks: { font: { size: 10 } } },
    },
  };

  const data2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81],
        backgroundColor: ["rgba(50, 140, 180, 0.5)"],
        borderColor: ["rgb(50, 140, 180)"],
        borderWidth: 1,
      },
    ],
  };

  const data4 = {
    labels: ["Big", "Medium", "Small"],
    datasets: [
      {
        data: [3, 7, 10],
        backgroundColor: ["rgba(13, 68, 145, 0.5)", "rgba(50, 140, 180, 0.5)", "rgba(255, 167, 64, 0.5)"],
        borderColor: ["rgb(13, 68, 145)", "rgb(50, 140, 180)", "rgb(255, 167, 64)"],
        borderWidth: 1,
      },
    ],
  };

  const [formData, setFormData] = useState({
    reloadID: 15,
    fleetCategoryID: 0,
    fleetTypeID: 0,
    achievementID: 1,
    achievementStart: subDays(new Date(), 7),
    achievementEnd: new Date(),
  });

  const { reloadID, fleetCategoryID, fleetTypeID, achievementID, achievementStart, achievementEnd } = formData;
  const [loading, setLoading] = useState(true);
  const [fleetTypeList, setFleetType] = useState(null);
  const [achievement, setAchievement] = useState(null);
  const [fleetOrder, setFleetOrder] = useState(null);
  const [fleetStatus, setFleetStatus] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);

  useEffect(() => {
    if (user !== null && loading)
      getDashboardAchievement({
        startDate: moment(achievementStart).format("yyyy-MM-DD"),
        endDate: moment(achievementEnd).format("yyyy-MM-DD")
      });
    getDashboardFleetOrder({ fleetTypeID });
    getDashboardFleetOrder();
    getDashboardDocumentStatus();
    setLoading(false);
  }, [user, loading, getDashboardAchievement, getDashboardFleetOrder]);

  useEffect(() => {
    let startDate = subDays(new Date(), 7);
    if (achievementID === 2) startDate = subMonths(new Date(), 1);
    else if (achievementID === 3) startDate = subMonths(new Date(), 3);
    else if (achievementID === 4) startDate = subMonths(new Date(), 12);

    if (user !== null)
      getDashboardAchievement({
        startDate: moment(startDate).format("yyyy-MM-DD"),
        endDate: moment(achievementEnd).format("yyyy-MM-DD")
      });

    setFormData({ ...formData, achievementStart: startDate });
  }, [achievementID, getDashboardAchievement]);

  useEffect(() => {
    if (user !== null)
      getDashboardFleetOrder({ fleetTypeID });
  }, [fleetTypeID, getDashboardFleetOrder]);

  useEffect(() => {
    if (dashboard.achievement !== undefined && dashboard.achievement !== null)
      setAchievement(dashboard.achievement);
    if (dashboard.fleetOrder !== undefined && dashboard.fleetOrder !== null)
      setFleetOrder(dashboard.fleetOrder);
    if (dashboard.fleetStatus !== undefined && dashboard.fleetStatus !== null) {
      const item = {
        labels: dashboard.fleetStatus.label,
        datasets: [
          {
            data: dashboard.fleetStatus.data,
            backgroundColor: ["rgba(13, 68, 145, 0.5)", "rgba(50, 140, 180, 0.5)", "rgba(255, 167, 64, 0.5)"],
            borderColor: ["rgb(13, 68, 145)", "rgb(50, 140, 180)", "rgb(255, 167, 64)"],
            borderWidth: 1,
          },
        ],
      };
      setFleetStatus(item);
    }
    if (dashboard.documentStatus !== undefined && dashboard.documentStatus !== null) {
      const item = {
        labels: dashboard.documentStatus.label,
        datasets: [
          {
            data: dashboard.documentStatus.data,
            backgroundColor: ["rgba(13, 68, 145, 0.5)", "rgba(50, 140, 180, 0.5)", "rgba(255, 167, 64, 0.5)", "rgba(19, 124, 85, 0.5)"],
            borderColor: ["rgb(13, 68, 145)", "rgb(50, 140, 180)", "rgb(255, 167, 64)", "rgb(19, 124, 85)"],
            borderWidth: 1,
          },
        ],
      };
      setDocumentStatus(item);
    }
  }, [dashboard]);

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const renderHeader = () => {
    return (
      <div className="dashboard clearfix">
        <div className="dashboard-title">
          <span className="mr-2">Dashboard</span>
        </div>
      </div>
    );
  };

  const renderAchievement = () => {
    return (
      <div className="row">
        <div className="col-sm-12 achievement">
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
              <div className="achievement-head-option">
                <Select3 options={achievementList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Periods"} className="mr-2" value={achievementList === null ? null : achievementList.filter((option) => option.id === parseInt(achievementID))} handleChange={(e) => onSelectChange(e, "achievementID")} />
              </div>
            </div>
            <div className="achievement-content clearfix">
              <div className="achievement-content-left">
                <FaCheck className="mc-fa mr-2" />
                <div>
                  <small>Order Delivered</small>
                  <strong>35</strong>
                </div>
              </div>
              <div className="achievement-content-right clearfix">
                <div>
                  <small>Total Weight (Kg)</small>
                  <strong>{achievement?.totalWeight}</strong>
                  <FaBox className="mc-fa" />
                </div>
                <div>
                  <small>Total Canceled</small>
                  <strong>{achievement?.totalCanceled}</strong>
                  <FaWindowClose className="mc-fa" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFleetOrder = () => {
    return (
      <div className="row">
        <div className="col-sm-12 fleet-order">
          <div className="fleet-order-wrapper">
            <div className="fleet-order-head clearfix">
              <div className="fleet-order-head-title">Ongoing Fleet Order</div>
              <div className="fleet-order-head-option d-flex">
                <div className="fleet-order-head-option-item d-flex align-items-center mr-4">
                  <label className="mr-2">Today:</label>
                  <strong>{moment(new Date()).format("DD MMM YYYY")}</strong>
                </div>
                <div className="fleet-order-head-option-item d-flex align-items-center">
                  <label className="mr-2">Fleet Type:</label>
                  <Select3 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"All Types"} className="mr-2" value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
                </div>
              </div>
            </div>
            <div className="fleet-order-content">
              <div className="row">
                <div className="col-4 fleet-order-content-item">
                  <div className="mc-orange">
                    <small>Weight (Kg)</small>
                    <strong>{fleetOrder?.weight}</strong>
                    <i className="mc-fa  fa fa-weight-hanging"></i>
                  </div>
                </div>
                <div className="col-4 fleet-order-content-item">
                  <div className="mc-purple">
                    <small>Order</small>
                    <strong>{fleetOrder?.order}</strong>
                    <i className="mc-fa fa fa-box"></i>
                  </div>
                </div>
                <div className="col-4 fleet-order-content-item">
                  <div className="mc-green">
                    <small>Fleet</small>
                    <strong>{fleetOrder?.fleet}</strong>
                    <i className="mc-fa fa fa-truck"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="row">
        <div className="col-sm-12 order">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">All Status Order</div>
              <div className="order-head-option d-flex">
                <div className="order-head-option-item d-flex align-items-center mr-4">
                  <label className="mr-2">Today:</label>
                  <strong>{moment(new Date()).format("DD MMM YYYY")}</strong>
                </div>
              </div>
            </div>
            <div className="order-content">
              <div className="row">
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small>draft</small>
                    <strong>3</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small>confirmed</small>
                    <strong>5</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small className="mc-orange">scheduled</small>
                    <strong>1</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small className="mc-blue">progress</small>
                    <strong>5</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small className="mc-green">delivered</small>
                    <strong>7</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small className="mc-red">canceled</small>
                    <strong>2</strong>
                  </div>
                </div>
                <div className="col-sm col-12 order-content-total">
                  <div>
                    <small>total order</small>
                    <strong>23</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOutstanding = () => {
    return (
      <div className="row">
        <div className="col-sm-6 order">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Outstanding Order</div>
            </div>
            <div className="order-content">
              <div className="row">
                <div className="col-sm col-6 order-content-item">
                  <div>
                    <small>draft</small>
                    <strong>3</strong>
                  </div>
                </div>
                <div className="col-sm col-6 order-content-item">
                  <div>
                    <small>confirmed</small>
                    <strong>5</strong>
                  </div>
                </div>
                <div className="col-sm col-6 order-content-item">
                  <div>
                    <small className="mc-orange">scheduled</small>
                    <strong>1</strong>
                  </div>
                </div>
                <div className="col-sm col-6 order-content-item">
                  <div>
                    <small className="mc-blue">progress</small>
                    <strong>5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 order">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Tomorrow Order</div>
            </div>
            <div className="order-content">
              <div className="row">
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small>draft</small>
                    <strong>1</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small>confirmed</small>
                    <strong>2</strong>
                  </div>
                </div>
                <div className="col-sm col-4 order-content-item">
                  <div>
                    <small className="mc-orange">scheduled</small>
                    <strong>1</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChart = () => {
    return (
      <div className="row">
        <div className="col-sm-4 reminder">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Document Status</div>
            </div>
            <div className="order-content chart">
              {documentStatus !== null && (<Bar options={options} data={documentStatus} />)}
            </div>
          </div>
        </div>
        <div className="col-sm-4 reminder">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Fleet Category</div>
            </div>
            <div className="order-content chart">
              <Bar options={options} data={data4} />
            </div>
          </div>
        </div>
        <div className="col-sm-4 reminder">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Reminder</div>
            </div>
            <div className="order-content">
              <table className="table table-reminder">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th className="text-right title">Overdue</th>
                    <th className="text-right title">Due Soon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="title">STNK</span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          33
                        </a>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-warning ml-auto stnk0">
                        <a href="#" className="text-white">
                          28
                        </a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="title">KIR</span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          33
                        </a>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          28
                        </a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="title">SIU</span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          33
                        </a>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          28
                        </a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="title">Insurance</span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          33
                        </a>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          28
                        </a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="title">SIM</span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          33
                        </a>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="badge badge-pill badge-danger ml-auto stnk0">
                        <a href="#" className="text-white">
                          28
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFleet = () => {
    return (
      <div className="row">
        <div className="col-sm-4 reminder">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Fleet Status</div>
            </div>
            <div className="order-content chart">
              {fleetStatus !== null && (<Bar options={options} data={fleetStatus} />)}
            </div>
          </div>
        </div>
        <div className="col-sm-8 reminder">
          <div className="order-wrapper">
            <div className="order-head clearfix">
              <div className="order-head-title">Order Performance</div>
            </div>
            <div className="order-content chart">
              <Bar options={options} data={data2} />
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
        {renderFleetOrder()}
        {renderFleet()}
        {renderOrder()}
        {renderOutstanding()}
        {renderChart()}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  master: PropTypes.object,
  dashboard: PropTypes.object,
  loadFleetType: PropTypes.func,
  getDashboardAchievement: PropTypes.func,
  getDashboardFleetOrder: PropTypes.func,
  getDashboardFleetStatus: PropTypes.func,
  getDashboardDocumentStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  master: state.master,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { loadFleetType, getDashboardAchievement, getDashboardFleetOrder, getDashboardFleetStatus, getDashboardDocumentStatus })(Home);
