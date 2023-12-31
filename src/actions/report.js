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

// get report stock by date
// get report stock card
export const getStockByDate = ({ limit = 100, page=0, itemType, trxType, fromDate, toDate, itemId, warehouseId}) => async () => {
    try {
        const res = await axios.get(`/StockByDate?limit=${limit}&page=${page}&itemType=${itemType}&trxType=${trxType}&fromDate=${fromDate}&toDate=${toDate}&itemId=${itemId}&warehouseId=${warehouseId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        let errMessage = "";
        if (err.message) errMessage = err.message;
        if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
        return Promise.reject(errMessage);
    }
};

export const getHistoryCard = ({ limit = 100, page=0,itemId,  warehouseId, }) => async () => {
    try {
        const res = await axios.get(`/HistoryItem?limit=${limit}&page=${page}&itemId=${itemId}&warehouseId=${warehouseId}`);
        return Promise.resolve(res.data);
    } catch (err) {
        let errMessage = "";
        if (err.message) errMessage = err.message;
        if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
        return Promise.reject(errMessage);
    }
};

export const getSpkVsShipping = ({ limit = 100, page=0,fromDate,toDate }) => async () => {
    try {
        const res = await axios.get(`/SpkVsShipping?limit=${limit}&page=${page}&fromDate=${fromDate}&toDate=${toDate}`);
        return Promise.resolve(res.data);
    } catch (err) {
        let errMessage = "";
        if (err.message) errMessage = err.message;
        if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
        return Promise.reject(errMessage);
    }
};