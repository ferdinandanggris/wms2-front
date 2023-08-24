import { useEffect, useState } from "react";
import FormWrapper from '../../components/Wrapper/FormWrapper';
import Select2 from "../../components/Select2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getStockCard } from "../../actions/report";
import { loadWarehouse, loadLocation, loadPallet, loadVendor, loadBatch, loadItem } from "../../actions/master";
import { AiOutlineSearch } from "react-icons/ai"
import { Table } from "react-bootstrap";
import moment from "moment";

const StockCard = ({ loadWarehouse, loadLocation, loadPallet, loadVendor, loadBatch, loadItem, data, master }) => {
    let { id } = useParams()
    const title = "Report Stock Card";
    const url = "StockCard";
    const role = "Report - Stock Card";

    const [formData, setFormData] = useState({
        id: 0,
        itemType: '',
        trxType: '',
        voucherNo: '',
        itemId: 0,
        fromDate: null,
        toDate: null,
        itemName: '',
        objectId: 0,
        batchId: 0,
        batchName: '',
        typeId: '',
        warehouseId: 0,
        locationId: 0,
        palletId: 0,
    });

    // List Type
    const typeList = [
        {
            id: 0,
            description: "**Please Select",
            value: "all"
        },
        {
            id: 1,
            description: "Shipping",
            value: "shipping"
        },
        {
            id: 2,
            description: "Receiving",
            value: "receiving"
        },
        {
            id: 3,
            description: "Item Adjustment",
            value: "item adjustment"
        },
        {
            id: 4,
            description: "RM Receiving",
            value: "rm receiving"
        },
        {
            id: 5,
            description: "RM Usage",
            value: "rm usage"
        },

    ]

    const { itemType, trxType, voucherNo, itemId, itemName, batchId,
        objectId, typeId, warehouseId, locationId, palletId, fromDate, toDate, batchName
    } = formData;

    // list Batch
    const [batchList, setBatchList] = useState(null)

    // list vendor
    const [vendorList, setVendorList] = useState(null)

    // List Warehouse
    const [warehouseList, setWarehouseList] = useState(null);

    // list Location
    const [locationList, setLocationList] = useState(null);

    // list Pallet
    const [palletList, setPalletList] = useState(null)

    // list Item
    const [itemList, setItemList] = useState(null)

    // Get Report API
    const [reportList, setReportList] = useState(null)

    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        loadWarehouse();
        loadLocation();
        loadPallet();
        loadBatch();
        loadVendor();
        loadItem();
    }, [loadWarehouse, loadLocation, loadPallet, loadBatch, loadVendor, loadItem]);

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
        if (master && master.location !== undefined && master.location !== null) {
            let list = [...master.location];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "** Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setLocationList(list);
        }
        if (master && master.pallet !== undefined && master.pallet !== null) {
            let list = [...master.pallet];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "** Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setPalletList(list);
        }
        if (master && master.batch !== undefined && master.batch !== null) {
            let list = [...master.batch];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setBatchList(list);
        }
        if (master && master.vendor !== undefined && master.vendor !== null) {
            let list = [...master.vendor];
            const obj = list.find((obj) => obj.id === 0);
            if (obj === undefined || obj === null) {
                list.push({
                    name: "** Please Select",
                    id: 0,
                });
                list.sort((a, b) => (a.id > b.id ? 1 : -1));
            }
            setVendorList(list);
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
        if (name === "typeId") {
            setFormData({ ...formData, [name]: e.value })
        } else {
            setFormData({ ...formData, [name]: e.id })
        }
    }

    // dapatkan id ketika user mengetik value
    const handleGetIdChange = (batchName, name) => {
        if (batchName && name === "batchName") {
            try {
                const foundBatch = batchList?.find(batch => batch.code === batchName);
                console.log("match", foundBatch)
                if (foundBatch) {
                    setFormData({ ...formData, batchId: foundBatch.id, batchName: foundBatch.code });
                } else {
                    console.log("Batch not found");
                }
            } catch (error) {
                console.error("Error fetching batch:", error);
            }
        }
    };

    // Get API dari stock card
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            // lempar parameternya
            const stockCardData = await getStockCard({
                itemType,
                trxType,
                fromDate: fromDate === null ? "" : moment(fromDate).format("YYYY-MM-DD"),
                toDate: toDate === null ? "" : moment(toDate).format("YYYY-MM-DD"),
                voucherNo,
                itemId,
                batchId,
                objectId,
                type: typeId,
                warehouseId,
                locationId,
                palletId,
            })();

            setReportList(stockCardData);
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
                            <td style={{ textAlign: "left" }}>BATCH</td>
                            <td style={{ textAlign: "left" }}>VOUCHER NO</td>
                            <td style={{ textAlign: "left" }}>REFERENCE NO</td>
                            <td style={{ textAlign: "left" }}>DATE</td>
                            <td style={{ textAlign: "left" }}>UOM</td>
                            <td style={{ textAlign: "left" }}>PACKING</td>
                            <td style={{ textAlign: "left" }}>QTY PER PACKING</td>
                            <td style={{ textAlign: "left" }}>STATUS</td>
                            <td style={{ textAlign: "left" }}>IN</td>
                            <td style={{ textAlign: "left" }}>OUT</td>
                            <td style={{ textAlign: "left" }}>IN-OUT</td>
                            <td style={{ textAlign: "left" }}>TYPE</td>
                            <td style={{ textAlign: "left" }}>VEND/CUST</td>
                            <td style={{ textAlign: "left" }}>LOCATION</td>
                            <td style={{ textAlign: "left" }}>PALLET</td>
                            <td style={{ textAlign: "left" }}>WAREHOUSE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList !== undefined && reportList !== null && reportList.data.length > 0?
                            reportList.data.map((item, index) => {

                                const warehouse = warehouseList.find((obj) => obj.id === item.warehouseId)
                                const pallet = palletList.find((obj) => obj.id === item.palletId)
                                const location = locationList.find((obj) => obj.id === item.locationId)
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.batchCode}</td>
                                        <td>{item.voucherNo}</td>
                                        <td>{item.referenceNo}</td>
                                        <td>{moment(item.transDate).format("DD MMM YYYY hh:mm:ss")}</td>
                                        <td>{item.uomName}</td>
                                        <td>{item.packingName}</td>
                                        <td>{item.qtyPerPacking}</td>
                                        <td>{item.status === "Y" ? "Posted" : "Waiting"}</td>
                                        <td>{item.incoming}</td>
                                        <td>{item.outgoing}</td>
                                        <td>{item.balance}</td>
                                        <td></td>
                                        <td>{item.objectName}</td>
                                        <td>{location.name}</td>
                                        <td>{pallet.name}</td>
                                        <td>{warehouse.name}</td>
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
                    <label className="col-sm-2 col-form-label">Voucher #</label>
                    <div className="col">
                        <input name="voucherNo" value={voucherNo} type="text" onChange={(e) => onChange(e)} className="form-control text-left"
                            placeholder="" required />
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
                    <label className="col-sm-2 col-form-label">Batch #</label>
                    <div className="col">
                        <input name="batchName" value={batchName} type="text" onChange={(e) => {
                            onChange(e); // Panggil fungsi onChange seperti biasa
                            handleGetIdChange(e.target.value, "batchName"); // Panggil fungsi handleBatchIdChange saat nilai berubah
                        }} className="form-control text-left"
                            placeholder="" required />
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
                    <label className="col-sm-2 col-form-label">Vendor / Customer</label>
                    <div className="col">
                        <Select2
                            options={vendorList}
                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                            placeholder={""}
                            value={vendorList === null ? null : vendorList.filter((option) => option.id === parseInt(objectId))}
                            handleChange={(e) => onSelectChange(e, "objectId")} />
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Type</label>
                    <div className="col-sm-3">
                        <Select2
                            options={typeList}
                            optionValue={(option) => option.value} optionLabel={(option) => option.description}
                            placeholder={"** Please Select"}
                            value={typeList === null ? null : typeList.filter((option) => option.value === typeId)}
                            handleChange={(e) => onSelectChange(e, "typeId")} />
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
                    <label className="col-sm-2 col-form-label">Location</label>
                    <div className="col-sm-3">
                        <Select2
                            options={locationList}
                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                            placeholder={"** Please Select"}
                            value={locationList === null ? null : locationList.filter((option) => option.id === parseInt(locationId))}
                            handleChange={(e) => onSelectChange(e, "locationId")} />
                    </div>
                </div>
                <div className="row align-items-center my-3">
                    <label className="col-sm-2 col-form-label">Palet</label>
                    <div className="col-sm-3">
                        <Select2
                            options={palletList}
                            optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name}
                            placeholder={"** Please Select"}
                            value={palletList === null ? null : palletList.filter((option) => option.id === parseInt(palletId))}
                            handleChange={(e) => onSelectChange(e, "palletId")} />
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

StockCard.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    loadWarehouse: PropTypes.func,
    loadLocation: PropTypes.func,
    loadPallet: PropTypes.func,
    loadBatch: PropTypes.func,
    loadVendor: PropTypes.func,
    loadItem: PropTypes.func,
    master: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { loadWarehouse, loadLocation, loadPallet, loadBatch, loadVendor, loadItem })(StockCard);