import { useEffect, useState } from "react";
import FormWrapper from '../../components/Wrapper/FormWrapper';
import Select2 from "../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getSpkVsShipping } from "../../actions/report";
import { loadWarehouse, loadItem } from "../../actions/master";
import { AiOutlineSearch } from "react-icons/ai"
import { Table } from "react-bootstrap";
import moment from "moment";
import * as XLSX from 'xlsx';

const SpkVsShipping = ({ loadWarehouse, loadItem, data, master }) => {
    let { id } = useParams()
    const title = "Report Spk VS Shipping";
    const url = "SpkVsShipping";
    const role = "Report - Spk VS Shipping";
    const path = "/report/spk-vs-shipping";

    const [formData, setFormData] = useState({
        id: 0,
        totalSPk: 0,
        spkBox: 0,
        spkPcs: 0,
        spkOther: 0,
        totalShipping: 0,
        shippingBox: 0,
        shippingPcs: 0,
        shippingOther: 0,
        fromDate: null,
        toDate: null,
        warehouseId: 0,
        listSpkvsShippingDetail: {}
    });

    const { totalSPk, spkBox, spkPcs, spkOther, totalShipping, shippingBox, shippingPcs, shippingOther, fromDate, toDate, warehouseId, listSpkvsShippingDetail } = formData;

    // List Warehouse
    const [warehouseList, setWarehouseList] = useState(null);

    // list Item
    const [itemList, setItemList] = useState(null)

    // Get Report API
    const [reportList, setReportList] = useState(null)

    const [searchClicked, setSearchClicked] = useState(false);
    const [exportData, setExportData] = useState([]);
    useEffect(() => {
        loadWarehouse();
        loadItem();
    }, [loadWarehouse, loadItem]);

    useEffect(() => {
        if (master && master.warehouse !== undefined && master.warehouse !== null) {
            let list = [...master.warehouse];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "** Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setWarehouseList(list);
        }
        if (master && master.item !== undefined && master.item !== null) {
            let list = [...master.item];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "**Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setItemList(list);
        }
    }, [master]);

    // Function ubah value type text
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
   const XLSX = require('xlsx');

// Fungsi untuk menyiapkan dan mengatur data yang akan diekspor
const prepareDataForExport = () => {
  // Inisialisasi data yang akan diekspor
  const dataToExport = [];

  // Pastikan data dari reportList tersedia dan memiliki panjang yang lebih dari nol
  if (
    reportList !== undefined &&
    reportList !== null &&
    reportList.listSpkvsShippingDetail.data.length > 0
  ) {
    reportList.listSpkvsShippingDetail.data.forEach((item, index) => {
      dataToExport.push({
        NO: index + 1,
        "NO SPK": item.voucherNo,
        SUBMIT: item.transDate,
        PIC: item.createdBy,
        CUSTOMER: item.customerName,
        QTY: item.qty,
        SHIPPING: item.shipping,
        SELISIH: item.qty - item.shipping,
        STATUS: item.status,
        NOTE: "",
      });
    });
  }

  // Tambahkan data dari elementData jika ada
  if (reportList !== undefined && reportList !== null && reportList.listSpkvsShippingDetail.data.length > 0) {
    dataToExport.push({
     "Total SPK": reportList.totalSPk.toLocaleString(),
     "BOX SPK": reportList.spkBox.toLocaleString(),
     "PCS SPK":reportList.spkPcs.toLocaleString(),
     "Other SPK":reportList.spkOther.toLocaleString(),
    "Total Shipping": reportList.totalShipping.toLocaleString(),
     "BOX Shipping": reportList.shippingBox.toLocaleString(),
     "PCS Shipping":reportList.shippingPcs.toLocaleString(),
     "Other Shipping":reportList.shippingOther.toLocaleString(),
     " Selisih": (reportList.totalSPk - reportList.totalShipping).toLocaleString(),
     "BOX Selisih": (reportList.spkBox - reportList.shippingBox).toLocaleString(),
     "PCS Selisih":(reportList.spkPcs - reportList.shippingPcs).toLocaleString(),
     "Other Selisih":(reportList.spkOther - reportList.shippingOther).toLocaleString(),
      NO: "", 
      "NO SPK": "", 
      SUBMIT: "", 
      PIC: "", 
      CUSTOMER: "",
      QTY: "", 
      SHIPPING: "",
      SELISIH: "", 
      STATUS: "",
      NOTE: "", 
    });
  }

  return dataToExport;
};

// Fungsi untuk mengkonversi dan mengekspor data ke Excel
const exportToExcel = () => {
  const dataToExport = prepareDataForExport();

  if (dataToExport.length > 0) {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  } else {
    console.log("Tidak ada data untuk diekspor.");
  }
};

    // Function ubah select value
    const onSelectChange = (e, name) => {
        setFormData({ ...formData, [name]: e.id })
    }

    // Get API dari stock by date
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            // lempar parameternya
            const SpkVsShipping = await getSpkVsShipping({
                fromDate: fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD"),
                toDate: toDate === null ? "" : moment(toDate).format("YYYY-MM-DD"),
            })();

            setReportList(SpkVsShipping.data);
            setSearchClicked(true);
        } catch (error) {
            console.error("Error fetching stock card data:", error);
        }
    };

    // Table ketika difilter
    const renderTable = () => {
        if (searchClicked) {
            return (
                <Table className="table-list mt-2" striped responsive hover>
                    <thead>
                        <tr>
                            <td className="text-center" style={{ width: 50 }}>NO</td>
                            <td style={{ textAlign: "left" }}>NO SPK</td>
                            <td style={{ textAlign: "left" }}>SUBMIT</td>
                            <td style={{ textAlign: "left" }}>PIC</td>
                            <td style={{ textAlign: "left" }}>CUSTOMER</td>
                            <td style={{ textAlign: "left" }}>QTY</td>
                            <td style={{ textAlign: "left" }}>SHIPPING</td>
                            <td style={{ textAlign: "left" }}>SELISIH</td>
                            <td style={{ textAlign: "left" }}>STATUS</td>
                            <td style={{ textAlign: "left" }}>NOTE</td>
                        </tr>
                    </thead>
                    {console.log("reportList", reportList)}
                    <tbody>
                        {reportList !== undefined && reportList !== null && reportList.listSpkvsShippingDetail.data.length > 0 ?
                            reportList.listSpkvsShippingDetail.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.voucherNo}</td>
                                        <td>{item.transDate}</td>
                                        <td>{item.createdBy}</td>
                                        <td>{item.customerName}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.shipping}</td>
                                        <td>{item.qty - item.shipping}</td>
                                        <td>{item.status}</td>
                                        <td></td>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td colSpan={20} className="text-center">No Data</td>
                            </tr>
                        }

                    </tbody>
                </Table>
            )
        } else {
            return null; // Return null if searchClicked is false or reportList is not available
        }
    }

    const element = () => {
        return (
            <div className="detail">
                <div className="form-group col-md-12 col-lg-12 order-1 order-md-2 order-lg-2">
                    <div className="row align-items-left mb-3">
                        <label className="col-form-label">Periods</label>
                        <div class="col d-flex align-items-center">
                            <input
                                className="form-control text-left col-sm-2"
                                name="fromDate"
                                value={fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                            <div class="input-group-addon mx-3">to</div>
                            <input
                                className="form-control text-left col-sm-2"
                                name="toDate"
                                value={toDate === null ? "" : moment(toDate).format("YYYY-MM-DD")}
                                onChange={(e) => onChange(e)}
                                type="date"
                                placeholder=""
                            />
                            <div className="row align-items-center my-3">
                                <div className="col-sm-2 col-form-label"></div>
                                <div className="col-sm-3">
                                <button
                            type="button"
                            className="d-flex align-items-center btn btn-success"
                            onClick={e => handleSearch(e)}
                            style={{ backgroundColor: '#28c76f' }} 
                            >
                         <AiOutlineSearch className="mr-2" />
                           Refresh
                         </button>

                                </div>
                                
                            </div>
                            <div className="row align-items-center my-3">
                           <div className="col-sm-2 col-form-label"></div>
                          <div className="col-sm-3">
                          <button
                           type="button"
                         className="d-flex align-items-center btn btn-success"
                         onClick={exportToExcel}
                         style={{ backgroundColor: '#FF9F43' }}
                         >
                         <i className="fa fa-upload mr-2"></i> Export Data
                         </button>
                           </div>
                      </div>

                        </div>

                    </div>
                    {reportList !== undefined && reportList !== null && reportList.listSpkvsShippingDetail.data.length > 0 && (
                        <>
                           <div className="row align-items-left mb-3">
    <div className="col-1">
        <label className="col-form-label">Total SPK:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.totalSPk.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">BOX:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.spkBox.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">PCS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.spkPcs.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">OTHERS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.spkOther.toLocaleString()}</div>
    </div>
</div>
<div className="row align-items-left mb-3">
    <div className="col-1">
        <label className="col-form-label">Total Shipping:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.totalShipping.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">BOX:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.shippingBox.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">PCS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.shippingPcs.toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">OTHERS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{reportList.shippingOther.toLocaleString()}</div>
    </div>
</div>
<div className="row align-items-left mb-3">
    <div className="col-1">
        <label className="col-form-label">Selisih:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{(reportList.totalSPk - reportList.totalShipping).toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">BOX:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{(reportList.spkBox - reportList.shippingBox).toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">PCS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{(reportList.spkPcs - reportList.shippingPcs).toLocaleString()}</div>
    </div>
    <div className="col-1">
        <label className="col-form-label">OTHERS:</label>
    </div>
    <div className="col-1 mt-2">
        <div>{(reportList.spkOther - reportList.shippingOther).toLocaleString()}</div>
    </div>
</div>

                        </>
                    )}
                </div>
                {renderTable()}
            </div>

        );

    };


    return (
        <FormWrapper title={title} role={role} allowAdd={false}>
            {element}
        </FormWrapper>
    );
};

SpkVsShipping.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadItem: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadWarehouse, loadItem })(SpkVsShipping);