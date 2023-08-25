import { useEffect, useState } from "react";
import FormWrapper from '../../components/Wrapper/FormWrapper';
import Select2 from "../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getStockByDate } from "../../actions/report";
import { loadWarehouse, loadItem } from "../../actions/master";
import { AiOutlineSearch } from "react-icons/ai"
import { Table } from "react-bootstrap";
import moment from "moment";

const StockByDate = ({ loadWarehouse, loadItem, data, master }) => {
    let { id } = useParams()
    const title = "Report Stock By Date";
    const url = "StockByDate";
    const role = "Report - Stock By Date";

    const [formData, setFormData] = useState({
        id: 0,
        itemType: '',
        trxType: '',
        itemId: 0,
        fromDate: null,
        toDate: null,
        warehouseId: 0,
    });

    const { itemType, trxType, itemId, warehouseId, fromDate, toDate } = formData;

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
            const stockByDate = await getStockByDate({
                itemType,
                trxType,
                fromDate: fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD"),
                toDate: toDate === null ? "" : moment(toDate).format("YYYY-MM-DD"),
                itemId,
                warehouseId,
            })();

            setReportList(stockByDate);
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
                            <td style={{ textAlign: "left" }}>ITEM #</td>
                            <td style={{ textAlign: "left" }}>ITEM</td>
                            <td style={{ textAlign: "left" }}>UOM</td>
                            <td style={{ textAlign: "left" }}>PACKING</td>
                            <td style={{ textAlign: "left" }}>QTY PER PACKING</td>
                            <td style={{ textAlign: "left" }}>TOTAL PALLET</td>
                            <td style={{ textAlign: "left" }}>INITIAL</td>
                            <td style={{ textAlign: "left" }}>IN</td>
                            <td style={{ textAlign: "left" }}>OUT</td>
                            <td style={{ textAlign: "left" }}>BALANCE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList !== undefined && reportList !== null && reportList.data.length > 0 ?
                            reportList.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.uomName}</td>
                                        <td>{item.packingName}</td>
                                        <td>{item.qtyPerPacking}</td>
                                        <td>{item.totalPallet}</td>
                                        <td>{item.initial}</td>
                                        <td>{item.incoming}</td>
                                        <td>{item.outgoing}</td>
                                        <td>{item.balance}</td>
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
                <div className="subTitle">Stock Card Module</div>
                <div className="mt-5 module-card-title card-title">Search Filter</div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Type Item</label>
                    <div className="col-sm-10 d-flex">
                        <div className="form-check">
                            <input
                                name="itemType"
                                id="Finish Goods"
                                value="finish goods"
                                onChange={(e) => onChange(e)}
                                checked={itemType === "finish goods"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="Finish Goods" >Finish Goods</label>
                        </div>
                        <div className="mx-3"></div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="Raw Material"
                                name="itemType"
                                onChange={(e) => onChange(e)}
                                checked={itemType === "raw material"}
                                value="raw material"
                                className="form-check-input"
                                required
                            />
                            <label className="form-check-label" for="Raw Material">Raw Material</label>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Type Transaction</label>
                    <div className="col-sm-10 d-flex">
                        <div className="form-check">
                            <input
                                name="trxType"
                                id="All"
                                value="all"
                                onChange={(e) => onChange(e)}
                                checked={trxType === "all"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="All" >All</label>
                        </div>
                        <div className="mx-3"></div>
                        <div className="form-check">
                            <input
                                name="trxType"
                                id="Warehouse"
                                value="warehouse"
                                onChange={(e) => onChange(e)}
                                checked={trxType === "warehouse"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="Warehouse" >Warehouse</label>
                        </div>
                        <div className="mx-3"></div>
                        <div className="form-check">
                            <input
                                name="trxType"
                                id="Customer"
                                value="customer"
                                onChange={(e) => onChange(e)}
                                checked={trxType === "customer"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="Customer" >Customer</label>
                        </div>
                        <div className="mx-3"></div>
                        <div className="form-check">
                            <input
                                name="trxType"
                                id="Return"
                                value="return"
                                onChange={(e) => onChange(e)}
                                checked={trxType === "return"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="Return" >Return</label>
                        </div>
                        <div className="mx-3"></div>
                        <div className="form-check">
                            <input
                                name="trxType"
                                id="Production"
                                value="production"
                                onChange={(e) => onChange(e)}
                                checked={trxType === "production"}
                                type="radio"
                                className="form-check-input"
                                required
                            />
                            <label class="form-check-label" for="Production" >Production</label>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Item #</label>
                    <div className="col">
                        <Select2
                            options={itemList}
                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.code ? `${option.name} - ${option.code}` : option.name}
                            placeholder={"** Please"}
                            value={itemList === null ? null : itemList.filter((option) => option.id === parseInt(itemId))}
                            handleChange={(e) => onSelectChange(e, "itemId")} />
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Date</label>
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

                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Warehouse</label>
                    <div className="col-sm-3">
                        <Select2
                            options={warehouseList}
                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                            placeholder={"** Please Select"}
                            value={warehouseList === null ? null : warehouseList.filter((option) => option.id === parseInt(warehouseId))}
                            handleChange={(e) => onSelectChange(e, "warehouseId")} />
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <div className="col-sm-2 col-form-label"></div>
                    <div className="col-sm-3">
                        <button type="button" className="d-flex align-items-center btn btn-success" onClick={e => handleSearch(e)}> <AiOutlineSearch className="mr-2" /> Search</button>
                    </div>
                </div>

                {renderTable()}
            </div>
        )
    }

    return (
        <FormWrapper title={title} role={role} allowAdd={false}>
            {element}
        </FormWrapper>
    );
};

StockByDate.propTypes = {
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

export default connect(mapStateToProps, { loadWarehouse, loadItem })(StockByDate);