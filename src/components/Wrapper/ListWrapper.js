import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { FaBolt, FaCalendar, FaCaretDown, FaPen, FaDownload, FaEye, FaFilter, FaMinus, FaPlus, FaPrint, FaTrash } from "react-icons/fa";

import { BsThreeDotsVertical, BsFileEarmarkDiff } from "react-icons/bs"

import { connect } from "react-redux";
import PropTypes from "prop-types";

import moment from "moment/moment";
import swal from "sweetalert";

import Alert from "../Alert";
import Spinner from "../Spinner";
import { baseURL } from "../../utility/config";

import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ListWrapper = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { img, title, path, url, exportFilename, allowAdd, allowDelete, allowView, allowEdit, allowExport, allowFilter, allowSearch, bulkAction, handleBulkAction, filterDate, columns, data, refreshData, exportData, deleteData, role, roles, condition, customRenderValue } = props;

  const { list, module, page, total, loading } = data;

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  // Order
  const [sort, setSort] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");

  // Filter Search
  const [filter, setFilter] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});

  // Export
  const [exportedData, setExportedData] = useState(null);
  const csvLink = React.createRef();

  // Checkbox
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItem, setCheckedItem] = useState([]);

  // Role
  const [isRead, setIsRead] = useState(true);
  const [isPrint, setIsPrint] = useState(true);
  const [isCreate, setIsCreate] = useState(true);
  const [isDelete, setIsDelete] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);

  // Filter Range
  const [showRange, setShowRange] = useState(false);
  const [rangeString, setRangeString] = useState("");
  const [rangeDate, setRangeDate] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // Card Show
  const [showCard, setShowCard] = useState(0);

  const { handleDeleteItem, handleRefresh } = props;

  // useEffect(() => {
  //   if (exportedData !== null) {
  //     csvLink.current.link.click();
  //     setExportedData(null);
  //   }
  // }, [setExportedData, csvLink]);

  useEffect(() => {
    if (condition !== undefined && condition !== null) {
      setFilterSearch(condition);
    }
  }, [condition]);

  useEffect(() => {
    if (rangeDate !== undefined && rangeDate !== null) {
      setRangeString(moment(rangeDate[0].startDate).format("DD-MM-YYYY") + " to " + moment(rangeDate[0].endDate).format("DD-MM-YYYY"));
    }
  }, [rangeDate]);

  useEffect(() => {
    if (role !== undefined && role !== null && roles !== undefined && roles !== null) {
      const roleData = roles.find((obj) => obj.description === role);
      if (roleData !== undefined && roleData !== null) {
        setIsRead(roleData.isRead);
        setIsCreate(roleData.isCreate);
        setIsDelete(roleData.isDelete);
        setIsUpdate(roleData.isUpdate);
      }
    }
  }, [role, roles]);

  const handleSort = (e) => {
    e.preventDefault();

    const newOrder = e.target.getAttribute("field");
    const newSort = orderBy === newOrder && sortBy === "asc" ? "desc" : "asc";
    const obj = newOrder + (newSort === "" || newSort === "asc" ? "" : ",desc");

    setOrderBy(newOrder);
    setSortBy(newSort);
    setSort(obj);
    refreshData({ url, search, page, limit, sort: obj, filterSearch, rangeDate });
  };

  const handleCheckedAll = () => {
    setCheckedAll(checkedAll ? false : true);
    list.forEach((item) => {
      checkedItem[item.id] = checkedAll ? false : true;
    });
  };

  const handleClick = (e) => {
    setCheckedItem({ ...checkedItem, [e.target.name]: e.target.checked });
  };

  const handleBulk = (e, type) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to " + type + " these selected items ?",
      text: "Click OK to confirm",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (succeed) => {
      if (succeed) {
        for (let id of Object.keys(checkedItem)) {
          if (checkedItem[id]) {
            if (type === "delete")
              await deleteData({ url, id }).then(() => {
                refreshData({ url, search, page, limit, sort, filterSearch, rangeDate });
              });
            else await handleBulkAction(e, type, id);
          }
        }
        setCheckedAll(false);
        setCheckedItem([]);
        refreshData({ url, search, page, limit, sort, filterSearch, rangeDate });
      }
    });
  };

  const handleExport = () => {
    exportData({ url, search, page, limit, sort, filterSearch }).then((obj) => {
      setExportedData(obj);
    });
  };

  const handleShowDate = (e) => {
    e.preventDefault();
    setShowRange(!showRange);
  };

  const handleSelect = (item) => {
    setRangeDate([item.selection]);
    refreshData({ url, search, page, limit, sort, filterSearch, rangeDate: [item.selection] });
    setShowRange(!showRange);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (filter) setFilterSearch({});

    setFilter(!filter);
  };

  const onFilterChange = (e) => {
    setFilterSearch({ ...filterSearch, [e.target.name]: e.target.value });
  };

  const handleApply = (e) => {
    e.preventDefault();
    refreshData({ url, search, page, limit, sort, filterSearch, rangeDate });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    refreshData({ url, search: e.target.value, page, limit, sort, filterSearch, rangeDate });
  };

  const handleLimit = (e, obj) => {
    e.preventDefault();

    setLimit(obj);
    refreshData({ url, search, page, limit: obj, sort, filterSearch, rangeDate });
  };

  const handleNext = (e, page) => {
    e.preventDefault();
    refreshData({ url, search, page: page + 1, limit, sort, filterSearch, rangeDate });
  };

  const handlePrev = (e, page) => {
    e.preventDefault();
    refreshData({ url, search, page: page - 1, limit, sort, filterSearch, rangeDate });
  };

  const handleShowCard = (e, id) => {
    e.preventDefault();
    if (showCard === id) setShowCard(0);
    else setShowCard(id);
  };

  const handleCardDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to delete these items ?",
      text: "Click OK to confirm",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((succeed) => {
      if (succeed) {
        deleteData({ url, id }).then(() => {
          refreshData({ url, search, page, limit, sort, filterSearch, rangeDate });
        });
      }
    });
  };

  const handleView = (e, id) => {
    e.preventDefault();
    navigate(`${path}/${id}/edit?return_url=${encodeURIComponent(location.pathname)}`);
  };

  const renderModule = () => {
    return (
      <div className="module d-flex justify-content-between">
        <div className="module-title d-flex align-items-center">
          {img} <span className="mr-2">{title}</span>
          {/* <span style={{ fontWeight: "normal" }}>Table</span> */}
        </div>
      </div>
    );
  };

  const renderLeftHeader = () => {
    return (
      <div className="d-flex wide-screen">
        {(allowAdd === undefined || allowAdd) && isCreate && (
          <Link to={`${path}/create?return_url=${encodeURIComponent(location.pathname)}`} className="btn btn-primary btn-module d-flex align-items-center justify-content-center mr-2">
            <FaPlus className="mr-2" /> <span>Add</span>
          </Link>
        )}
        {renderBulkAction()}
      </div>
    );
  };

  const renderBulkAction = () => {
    if ((bulkAction === undefined || bulkAction === null) && ((allowDelete !== undefined && !allowDelete) || !isDelete)) return null;
    return (
      <div className="dropdown">
        <button type="button" className="btn btn-primary btn-module d-flex align-items-center justify-content-center dropdown-toggle" data-toggle="dropdown">
          <FaBolt className="mr-2" /> <span>Action</span>
        </button>
        <div className="dropdown-menu">
          {(allowDelete === undefined || allowDelete) && isDelete && (
            <div className="btn dropdown-item border-bottom text-left" onClick={(e) => handleBulk(e, "delete")}>
              Delete Selected
            </div>
          )}
          {bulkAction !== undefined &&
            bulkAction.map((item, index) => (
              <div key={index} className="btn dropdown-item border-bottom text-left" onClick={(e) => handleBulk(e, item.type)}>
                {item.title} Selected
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderCenterHeader = () => {
    return (
      <div className="d-flex justify-content-between narrow-screen">
        {(allowSearch === undefined || allowSearch) && <input className="search-control mr-2" type="text" name="search" placeholder="Search" onChange={(e) => handleSearch(e)} />}
        {(allowAdd === undefined || allowAdd) && isCreate && (
          <Link to={`${path}/create?return_url=${encodeURIComponent(location.pathname)}`} className="btn btn-primary btn-module d-flex align-items-center justify-content-center mr-2">
            <FaPlus />
          </Link>
        )}
        <div className="dropdown">
          <button type="button" className="btn btn-primary btn-module d-flex align-items-center justify-content-center dropdown-toggle" data-toggle="dropdown">
            <span>{limit}</span>
          </button>
          <div className="dropdown-menu limit-menu">
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 10)}>
              10
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 20)}>
              20
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 50)}>
              50
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 100)}>
              100
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 200)}>
              200
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 1000)}>
              1000
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRightHeader = () => {
    return (
      <div className="d-flex wide-screen">
        {filterDate && (
          <div className="wide-screen">
            <div className="date-range mr-2" onClick={(e) => handleShowDate(e)}>
              <FaCalendar />
              <span>{rangeString}</span>
              <FaCaretDown />
            </div>
            {showRange && (
              <div className="date-container">
                <DateRangePicker onChange={(item) => handleSelect(item)} showSelectionPreview={true} moveRangeOnFirstSelection={false} months={2} ranges={rangeDate} inputRanges={[]} direction="horizontal" preventSnapRefocus={true} calendarFocus="backwards" />
              </div>
            )}
          </div>
        )}
        {(allowFilter === undefined || allowFilter) && (
          <button className="btn btn-primary btn-module d-flex align-items-center justify-content-center mr-2" onClick={(e) => handleFilter(e)}>
            <FaFilter className="mr-2" /> <span>Filter</span>
          </button>
        )}
        {(allowSearch === undefined || allowSearch) && <input className="search-control mr-2" type="text" name="search" placeholder="Search" onChange={(e) => handleSearch(e)} />}
        <div className="dropdown">
          <button type="button" className="btn btn-primary btn-module d-flex align-items-center justify-content-center dropdown-toggle" data-toggle="dropdown">
            <span>{limit}</span>
          </button>
          <div className="dropdown-menu limit-menu">
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 10)}>
              10
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 20)}>
              20
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 50)}>
              50
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 100)}>
              100
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 200)}>
              200
            </div>
            <div className="btn dropdown-item limit-item" onClick={(e) => handleLimit(e, 1000)}>
              1000
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = columns.map((item, index) => (
    <th key={index} style={{ minWidth: item.width }} className={"header " + (item.align === "right" ? "text-right" : "text-left") + " " + (orderBy !== item.key || sortBy === "" ? "sorting" : `sorting_${sortBy}`)} field={item.key} onClick={handleSort}>
      {item.label}
    </th>
  ));

  const renderFilterInput = columns.map((item, index) => {
    let isHide = false;
    if (condition !== undefined && condition !== null) {
      Object.entries(condition).forEach(([key, value]) => {
        if (item.key === key) {
          isHide = true;
          return;
        }
      });
    }
    if (isHide)
      return (
        <th key={index} className="text-center header">
          &nbsp;
        </th>
      );
    return (
      <th key={index} className="text-center header">
        <input className="search-input" name={item.key} style={{ width: "100%", margin: 0 }} type="text" onChange={(e) => onFilterChange(e)} />
      </th>
    );
  });

  const renderValue = (col, value, item) => {
    if (value === undefined) return null;
    if (col.type === "date") {
      return value === undefined || value === null ? "" : moment(value).format("DD MMM YYYY");
    } else if (col.type === "datetime") {
      return value === undefined || value === null ? "" : moment(value).format("DD-MMM-YYYY HH:mm");
    } else if (col.type === "number") {
      if (col.decimals !== undefined) return value.toLocaleString(undefined, { maximumFractionDigits: col.decimals });
      else {
        if (value == null) value = 0;
        return value.toLocaleString();
      }
    } else if (col.type === "print") {
      if (item.status === "CANCELED" || item.status === "DRAFT") return null;
      return (
        <a href={`${baseURL}/${url}/${col.url}${value}`} className="download-link">
          <FaPrint />
        </a>
      );
    } else if (customRenderValue !== undefined) {
      var returnValue = customRenderValue(col, value, item);
      if (returnValue === undefined)
        returnValue = value;

      return returnValue;
    } else return value;
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    swal({
      title: "Are you sure you want to delete these selected items ?",
      text: "Click OK to confirm",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((succeed) => {
      if (succeed) {
        handleDeleteItem(e, id);
      }
    });
  }

  const renderAction = (item, path) => {
    return (
      <div className="dropdown action">
        <a className=" d-flex justify-content-center" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <BsThreeDotsVertical style={{ color: "#000000" }} />
        </a>
        <div className="dropdown-menu" aria-labelledby="action">
          {(allowView === undefined || allowView) && isRead && (
            <Link to={`${path}/${item.id}/view`} className="dropdown-item d-flex align-items-center">
              <FaEye className="dropdown-icon" />
              <span className="dropdown-text">Detail Data</span>
            </Link>
          )}
          {(allowEdit === undefined || allowEdit) && isUpdate && (
            <Link to={`${path}/${item.id}/edit`} className="dropdown-item d-flex align-items-center">
              <FaPen className="dropdown-icon" />
              <span className="dropdown-text">Edit Data</span>
            </Link>
          )}
          {(allowDelete === undefined || allowDelete) && isDelete && (
            <button className="dropdown-item dropdown-item-delete d-flex align-items-center" onClick={(e) => handleDelete(e, item.id)}>
              <FaTrash className="dropdown-icon" />
              <span className="dropdown-text">Delete Data</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderData =
    list === undefined || list === null || module !== url
      ? null
      : list.map((item, index) => (
        <tr key={index}>
          {(allowDelete === undefined || allowDelete || bulkAction !== undefined) && (
            <td className="text-center align-middle">
              <input type="checkbox" name={item.id} checked={checkedItem[item.id] !== undefined && checkedItem[item.id]} onChange={handleClick} />
            </td>
          )}
          <td className="text-center align-middle data-item" onClick={(e) => handleView(e, item.id)}>
            {page * limit + index + 1}
          </td>
          {columns.map((col, key) => {
            console.log(col.key)
            return (
              <td key={key} className={"align-middle data-item " + (item["status"] !== undefined && item["status"] !== null ? item["status"] : "") + " " + (col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left")} onClick={(e) => (col.link === undefined ? handleView(e, item.id) : null)}>
                {col.label === "Percentage" ? (
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow={renderValue(col, item[col.key], item)} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                ) : (
                  renderValue(col, item[col.key], item)
                )}
              </td>
            )
          })}


          {(allowView === undefined || allowEdit === undefined || allowDelete === undefined || allowView || allowEdit || allowDelete) && (
            <td className="align-middle">{renderAction(item, path)}</td>
          )}
        </tr>
      ));

  const renderLeftFooter = ({ isCard }) => {
    var row1 = page * limit + 1;
    var row2 = (page + 1) * limit;
    if (row2 > total) row2 = total;
    if (total === 0) return <div className={isCard ? "" : "d-flex justify-content-between align-items-center"}>Showing No Data</div>;
    return (
      <div className={isCard ? "" : "d-flex justify-content-between align-items-center"}>
        Showing {row1}-{row2} from {total} data
      </div>
    );
  };

  const renderRightFooter = () => {
    return (
      <div>
        {renderPrev(page)}
        {renderNext(page, total, limit)}
      </div>
    );
  };

  const renderPrev = (page) => {
    return page === 0 ? null : (
      <Button className="btn-prevnex ml-2" onClick={(e) => handlePrev(e, page, search)}>
        Prev
      </Button>
    );
  };

  const renderNext = (page, total, limit) => {
    const max = (page + 1) * limit;
    return total <= max ? null : (
      <Button className="btn-prevnex ml-2" onClick={(e) => handleNext(e, page, search)}>
        Next
      </Button>
    );
  };

  const renderCardData = () => {
    if (list === undefined || list === null) return null;

    return list.map((item, index) => {
      let idx = 0;
      return (
        <div key={index} className="module-card">
          <div className="module-card-header">
            <div>
              <div className="module-card-title">
                {columns.map((col) => {
                  if (col.cardTitle) return renderValue(col, item[col.key], item);
                  return null;
                })}
                &nbsp;
              </div>
              <div className="module-card-subtitle">
                {columns.map((col) => {
                  if (col.cardSubTitle) {
                    idx++;
                    return (idx === 1 ? "" : " - ") + renderValue(col, item[col.key], item);
                  }
                  return null;
                })}
                &nbsp;
              </div>
            </div>
            <div className="module-card-pointer" onClick={(e) => handleShowCard(e, item.id)}>
              {item.id === showCard ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          <div className={`module-card-body ${item.id === showCard ? "active" : ""}`}>
            <table className="table-card">
              <tbody>
                {columns.map((col, key) => {
                  return (
                    <tr key={key}>
                      <td style={{ width: "40%" }}>{col.label}</td>
                      <td style={{ width: "5%", verticalAlign: "Top" }}>:</td>
                      <td>{renderValue(col, item[col.key], item)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="module-card-action">
              <div className="btn btn-info mr-2" onClick={(e) => handleView(e, item.id)}>
                <FaEye className="mr-2" />
                <span>View</span>
              </div>

              {(allowDelete === undefined || allowDelete) && (
                <div className="btn btn-danger" onClick={(e) => handleCardDelete(e, item.id)}>
                  <FaTrash className="mr-2" />
                  <span>Delete</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCard = () => {
    return (
      <Fragment>
        {renderCardData()}
        <div className="text-center">
          {renderLeftFooter({ isCard: true })}
          {renderRightFooter()}
        </div>
      </Fragment>
    );
  };

  const renderTable = () => {
    return (
      <Table className="table-list" striped responsive hover>
        <thead>

          <tr>
            {(allowDelete === undefined || allowDelete || bulkAction !== undefined) && (
              <th style={{ width: 40 }} className="text-center">
                <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} />
              </th>
            )}

            <th style={{ width: 40 }} className="text-center">
              No
            </th>

            {renderHeader}

            {(allowView === undefined || allowEdit === undefined || allowDelete === undefined || allowView || allowEdit || allowDelete) && (
              <th style={{ width: 100 }} className="text-center">
                Action
              </th>
            )}

          </tr>

          {filter && (
            <tr>
              {(allowDelete === undefined || allowDelete || bulkAction !== undefined) && (
                <th style={{ width: 40 }} className="text-center">
                  &nbsp;
                </th>
              )}
              <th style={{ width: 40 }} className="text-center">
                <button className="btn btn-sm btn-apply rounded" type="button" onClick={(e) => handleApply(e)}>
                  OK
                </button>
              </th>
              {renderFilterInput}
            </tr>
          )}
        </thead>
        <tbody>{renderData}</tbody>
        <tfoot>
          <tr>
            <th colSpan={columns.length + 3}>
              <div className="d-flex justify-content-between">
                {renderLeftFooter({ isCard: false })}
                {renderRightFooter()}
              </div>
            </th>
          </tr>
        </tfoot>
      </Table>
    );
  };

  const renderList = () => {
    return window.innerWidth <= 768 ? renderCard() : renderTable();
  };

  <div className="card-body list-card-body">{loading ? <Spinner /> : renderList()}</div>;


  console.log("TEST ITEM", data)

  return (
    <Fragment>
      {title !== undefined && renderModule()}
      <div className="content">
        <Alert />

        <div className="card">
          <div className="card-header list-card-header">
            {renderLeftHeader()}
            {renderCenterHeader()}
            {renderRightHeader()}
          </div>
          <div className="card-body list-card-body">{loading ? <Spinner /> : renderList()}</div>
        </div>
      </div>
    </Fragment>
  );
};

ListWrapper.propTypes = {
  roles: PropTypes.array,
};

const mapStateToProps = (state) => ({
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(ListWrapper);
