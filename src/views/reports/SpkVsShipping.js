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

            setReportList(SpkVsShipping);
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
                    <tbody>
                        {listSpkvsShippingDetail !== undefined && listSpkvsShippingDetail !== null && listSpkvsShippingDetail.data.length > 0 ?
                            listSpkvsShippingDetail.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.voucherNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.uomName}</td>
                                        <td>{item.customerName}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.shipping}</td>
                                        <td>{item.qty - item.shipping}</td>
                                        <td>{item.status}</td>
                                        <td>{item.outgoing}</td>
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
                                    <button type="button" className="d-flex align-items-center btn btn-success" onClick={e => handleSearch(e)}> <AiOutlineSearch className="mr-2" /> Refresh</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row align-items-left mb-3">
                        <div className="col-1">
                            <label className="col-form-label">Total SPK:</label>
                        </div>
                        <div className="col-1 mt-2">
                            <div>{totalSPk}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">BOX:</label>
                        </div>
                        <div className="col-1 mt-2">
                       <div>{spkBox}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">PCS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{spkPcs}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">OTHERS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{spkOther}</div>
                        </div>
                    </div>
                    <div className="row align-items-left mb-3">
                        <div className="col-1">
                            <label className="col-form-label">Total Shipping:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{totalShipping}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">BOX:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{shippingBox}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">PCS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{shippingPcs}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">OTHERS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{shippingOther}</div>
                        </div>
                    </div>
                    <div className="row align-items-left mb-3">
                        <div className="col-1">
                            <label className="col-form-label">Selisih:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{totalSPk - totalShipping}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">BOX:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{spkBox - shippingBox}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">PCS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{spkPcs - shippingPcs}</div>
                        </div>
                        <div className="col-1">
                            <label className="col-form-label">OTHERS:</label>
                        </div>
                        <div className="col-1 mt-2">
                        <div>{spkOther - shippingOther}</div>
                        </div>
                    </div>
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