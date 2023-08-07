import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";

import imgSpinner from "../../../assets/images/loading.gif";

const ListTransaction = (props) => {
  const { id, listType, formData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { total, page } = data;
  const [limit, setLimit] = useState(10);

  const Spinner = () => (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '10vh' }}>
      <img src={imgSpinner} style={{ width: '100px', margin: 'auto', display: 'block' }} alt="Loading..." />
    </div>
  )

  async function getData(page = 0, limit = 10) {
    try {
      const fetchedData = await fetchData(page, limit);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  async function fetchData(page, limit) {
    try {
      const res = await axios.get(`/${listType}/transaction/${id}?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const handleNext = (e, page) => {
    e.preventDefault();
    getData(page + 1);
  };

  const handlePrev = (e, page) => {
    e.preventDefault();
    getData(page - 1);
  };

  console.log("DATA", data)

  const renderData = () => {
    if (data.data != null) {
      return data.data.map((item, index) =>
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.voucherNo}</td>
          <td>{item.batchCode}</td>
          <td>{item.itemName}</td>
          <td>{moment(item.transDate).format("DD MMM YYYY")}</td>
          <td className="text-right">{item.initial.toLocaleString()}</td>
          <td className="text-right">{item.incoming.toLocaleString()}</td>
          <td className="text-right">{item.outgoing.toLocaleString()}</td>
          <td className="text-right">{item.balance.toLocaleString()}</td>
        </tr>
      );
    } else if (loading) {
      return <tr className="text-center font-weight-bold"><td colSpan={9}><Spinner /> </td></tr>;
    } else {
      return <tr className="text-center font-weight-bold"><td colSpan={9}><b>======== No Data ========</b></td></tr>
    }
  }

  const renderPrev = (page) => {
    return page === 0 ? null : (
      <Button className="btn-prevnex ml-2" onClick={(e) => handlePrev(e, page)}>
        Prev
      </Button>
    );
  };

  const renderNext = (page, total, limit) => {
    const max = (page + 1) * limit;
    return total <= max ? null : (
      <Button className="btn-prevnex ml-2" onClick={(e) => handleNext(e, page)}>
        Next
      </Button>
    );
  };

  const renderLeftFooter = ({ isCard }) => {
    const row1 = page * limit + 1;
    let row2 = (page + 1) * limit;
    if (row2 > total) row2 = total;

    if (total === 0) {
      return <div className={isCard ? "" : "d-flex justify-content-between align-items-center"}>Showing No Data</div>;
    } else {
      return (
        <div className={isCard ? "" : "d-flex justify-content-between align-items-center"}>
          Showing {row1}-{row2} from {total} data
        </div>
      );
    }
  };

  const renderRightFooter = () => {
    return (
      <div>
        {renderPrev(page)}
        {renderNext(page, total, limit)}
      </div>
    );
  };

  // const renderTotal = () => {
  //   if (formData) {
  //     return (
  //       <tr className="table-list">
  //         <th colSpan={5}>TOTAL</th>
  //         <th className="text-right">{formData.initial?.toLocaleString()}</th>
  //         <th className="text-right">{formData.incoming?.toLocaleString()}</th>
  //         <th className="text-right">{formData.outgoing?.toLocaleString()}</th>
  //         <th className="text-right">{formData.balance?.toLocaleString()}</th>
  //       </tr>
  //     )
  //   } else {
  //     return (
  //       <tr className="table-list">
  //         <th colSpan={5}>TOTAL</th>
  //         <th className="text-right">0</th>
  //         <th className="text-right">0</th>
  //         <th className="text-right">0</th>
  //         <th className="text-right">0</th>
  //       </tr>
  //     )
  //   }
  // }

  const renderTotal = () => {
    if (data.data != null && data.data.length > 0) {
      const totalInitial = data.data.reduce((init, item) => init + item.initial, 0);
      const totalIncoming = data.data.reduce((income, item) => income + item.incoming, 0);
      const totalOutgoing = data.data.reduce((out, item) => out + item.outgoing, 0);
      const totalBalance = data.data.reduce((bal, item) => bal + item.balance, 0);
      return (
        <tr className="table-list">
          <th colSpan={5}>TOTAL</th>
          <th className="text-right">{totalInitial.toLocaleString()}</th>
          <th className="text-right">{totalIncoming.toLocaleString()}</th>
          <th className="text-right">{totalOutgoing.toLocaleString()}</th>
          <th className="text-right">{totalBalance.toLocaleString()}</th>
        </tr>
      )
    } else {
      return (
        <tr className="table-list">
          <th colSpan={5}>TOTAL</th>
          <th className="text-right">0</th>
          <th className="text-right">0</th>
          <th className="text-right">0</th>
          <th className="text-right">0</th>
        </tr>
      )
    }
  }

  return (
    <Table className="table-list" striped responsive hover>
      <thead>
        <tr>
          <th style={{ width: 30 }} className="text-center">No</th>
          <th style={{ width: 80 }} className="text-center">Transaction No</th>
          <th style={{ width: 80 }} className="text-center">Code</th>
          <th style={{ width: 130 }} className="text-center">Item</th>
          <th style={{ width: 70 }} className="text-center">Date</th>
          <th style={{ width: 30 }} className="text-center">Initial</th>
          <th style={{ width: 30 }} className="text-center">Incoming</th>
          <th style={{ width: 30 }} className="text-center">Outgoing</th>
          <th style={{ width: 30 }} className="text-center">Balance</th>
        </tr>
      </thead>
      <tbody>
        {renderData()}
      </tbody>
      <tfoot>
        {renderTotal()}
        <tr>
          <th colSpan={9}>
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

export default ListTransaction;
