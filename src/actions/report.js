import axios from "axios";

// get report stock card
export const getStockCard = ({ limit = 100, page=0, itemType, trxType, fromDate, toDate, voucherNo, itemId, batchId, objectId, type, warehouseId, locationId, palletId}) => async () => {
    try {
        const res = await axios.get(`/StockCard?limit=${limit}&page=${page}&itemType=${itemType}&trxType=${trxType}&fromDate=${fromDate}&toDate=${toDate}&voucherNo=${voucherNo}&itemId=${itemId}&batchId=${batchId}&objectId=${objectId}&type=${type}&warehouseId=${warehouseId}&locationId=${locationId}&palletId=${palletId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        let errMessage = "";
        if (err.message) errMessage = err.message;
        if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
        return Promise.reject(errMessage);
    }
};