import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import moment from "moment/moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Pagination,
  ProgressBar,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import Select from "react-select";
import {
  getHomeListItems,
  getHomeSearchItem,
  getHomeSpkPendingList,
  getHomeSummaryData,
  getHomeTopItemsTotal,
  getHomeWarehouseCapacity,
} from "../actions/home";
import styles from "./home/style";

ChartJS.register(ArcElement, Tooltip);

export const CHARTJS_DOUGHNUT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    doughnutlabel: {
      labels: [
        {
          text: "520",
          font: {
            size: 20,
            weight: "bold",
          },
        },
        {
          text: "total",
        },
      ],
    },
  },
};

const TAB_SUMMARY_KEY = "summary";
const TAB_SPK_PENDING_KEY = "spk-pending-list";
const TAB_TOP_ITEM_KEY = "top-items-total";

const TAB_DEFAULT = TAB_SUMMARY_KEY;

const LIST_TAB_HEADER = [
  { key: TAB_SUMMARY_KEY, label: "Summary" },
  { key: TAB_SPK_PENDING_KEY, label: "SPK Pending List" },
  { key: TAB_TOP_ITEM_KEY, label: "Top Items Total" },
];

const Home3 = ({
  user,
  summary,
  spkPendingList,
  searchItem,
  listItems,
  topItemsTotal,
  warehouseCapacity,
  getHomeSummaryData,
  getHomeSearchItem,
  getHomeWarehouseCapacity,
  getHomeTopItemsTotal,
  getHomeSpkPendingList,
  getHomeListItems,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [spkPendingPage, setSpkPendingPage] = useState(0);
  const [topItemPage, setTopItemPage] = useState(0);
  const [summaryStartDate, setSummaryStartDate] = useState("");
  const [summaryEndDate, setSummaryEndDate] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_SUMMARY_KEY);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuClose = () => {
    setIsMenuOpen(false);
  };

  const onMenuOpen = () => {
    setIsMenuOpen(true);
  };

  // Initial Data
  useEffect(() => {
    getHomeSummaryData({
      startDate: summaryStartDate,
      endDate: summaryEndDate,
    });

    if (
      selectedItemId != 0 &&
      selectedItemId != undefined &&
      selectedItemId != "undefined"
    ) {
      getHomeSearchItem({ itemId: selectedItemId });
    }

    getHomeWarehouseCapacity();
    getHomeTopItemsTotal({ page: spkPendingPage });
    getHomeSpkPendingList({ page: topItemPage });
    getHomeListItems({ search: "" });

    // debug
    console.log("spkPendingList", spkPendingList);
    console.log("searchItem", searchItem);
    console.log("listItems", listItems);
    console.log("topItemsTotal", topItemsTotal);
    console.log("warehouseCapacity", warehouseCapacity);
  }, []);

  useEffect(() => {
    if (
      selectedItemId != 0 &&
      selectedItemId != undefined &&
      selectedItemId != "undefined"
    ) {
      getHomeSearchItem({ itemId: selectedItemId });
    }
  }, [selectedItemId]);

  const handleDropdownDateChange = (event) => {
    const { value } = event.target;
    if (value === "today") {
      let startdate = moment();
      startdate = startdate.format("YYYY-MM-DD");

      let enddate = moment();
      enddate = enddate.subtract(1, "days");
      enddate = enddate.format("YYYY-MM-DD");

      setSummaryStartDate(() => startdate);
      setSummaryEndDate(() => enddate);
    } else if (value === "thisweek") {
      let startdate = moment();
      startdate = startdate.format("YYYY-MM-DD");

      let enddate = moment();
      enddate = enddate.subtract(1, "weeks");
      enddate = enddate.format("YYYY-MM-DD");

      setSummaryStartDate(() => startdate);
      setSummaryEndDate(() => enddate);
    } else if (value === "thismonth") {
      let startdate = moment();
      startdate = startdate.format("YYYY-MM-DD");

      let enddate = moment();
      enddate = enddate.subtract(1, "months");
      enddate = enddate.format("YYYY-MM-DD");

      setSummaryStartDate(() => startdate);
      setSummaryEndDate(() => enddate);
    } else if (value === "thisyear") {
      let startdate = moment();
      startdate = startdate.format("YYYY-MM-DD");

      let enddate = moment();
      enddate = enddate.subtract(1, "years");
      enddate = enddate.format("YYYY-MM-DD");

      setSummaryStartDate(() => startdate);
      setSummaryEndDate(() => enddate);
    }

    getHomeSummaryData({
      startDate: summaryStartDate,
      endDate: summaryEndDate,
    });
  };

  const SummaryTab = () => {
    const CardSpkInfoLabel = ({ title, total = 0, primary = false }) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={styles.cardSpkInfoLabel(primary)}
        >
          <span style={{ color: "white" }}> {title} </span>
          <span style={styles.cardInfoTotal}>{total}</span>
        </div>
      );
    };

    const CardSpkInfo = ({ title, description, total = 0, totalBox = 0 }) => {
      return (
        <Card style={styles.cardInfoBox}>
          <Card.Body className="px-0 pb-0">
            <p className="px-3" style={styles.cardTitle}>
              {title}
            </p>
            <p className="px-3 pb-3" style={{ margin: 0 }}>
              {description}
            </p>
            <Card style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Card.Body className="p-0">
                <CardSpkInfoLabel title={`Total ${title}`} total={total} />
                <CardSpkInfoLabel
                  title={`Total Box ${title}`}
                  total={totalBox}
                  primary={true}
                />
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      );
    };

    return (
      <Tab.Pane eventKey={TAB_SUMMARY_KEY}>
        <Row>
          <Col md={"3"} sm={6} xs={6} className="mb-2">
            <Card style={{ height: 280 }}>
              <Card.Body>
                <p style={styles.cardTitle}>
                  {"% "}SPK yang sudah memiliki shipping
                </p>
                <Doughnut
                  plugins={[
                    {
                      beforeDraw: function (chart) {
                        var width = chart.width,
                          height = chart.height,
                          ctx = chart.ctx;
                        ctx.restore();
                        var fontSize = (height / 160).toFixed(2);
                        ctx.font = fontSize + "em sans-serif";
                        ctx.textBaseline = "top";
                        var text = `${summary?.data?.persentaseSPK ?? 0} %`,
                          textX = Math.round(
                            (width - ctx.measureText(text).width) / 2
                          ),
                          textY = height / 2;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                      },
                    },
                  ]}
                  data={{
                    labels: ["Red", "Blue"],
                    datasets: [
                      {
                        label: "# of Votes",
                        data: [100],
                        backgroundColor: ["#17a2b8"],
                        borderColor: ["#17a2b8"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={CHARTJS_DOUGHNUT_OPTIONS}
                  width={"300"}
                  height={"200"}
                  style={{ margin: "1rem" }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={"3"} sm={6} xs={6} className="mb-2">
            <CardSpkInfo
              title="SPK"
              description="Total dari SPK berdasarkan tanggal yang anda tentukan"
              total={summary?.data?.totalSPK ?? 0}
              totalBox={summary?.data?.totalBoxSPK ?? 0}
            />
          </Col>
          <Col md={"3"} sm={6} xs={6} className="mb-2">
            <CardSpkInfo
              title="Shipping"
              description="Total dari Shipping berdasarkan tanggal yang anda tentukan"
              total={summary?.data?.totalShipping ?? 0}
              totalBox={summary?.data?.totalBoxShipping ?? 0}
            />
          </Col>
          <Col md={"3"} sm={6} xs={6} className="mb-2">
            <CardSpkInfo
              title="Late"
              description="Total dari Late berdasarkan tanggal yang anda tentukan"
              total={summary?.data?.totalLate ?? 0}
              totalBox={summary?.data?.totalBoxLate ?? 0}
            />
          </Col>
        </Row>
      </Tab.Pane>
    );
  };

  const GeneratePaginasi = ({ total = 0, page = 0, perPage = 5, action }) => {
    let totalPage = 0;
    if (total > 0 && perPage > 0) {
      totalPage = Math.ceil(total / perPage);
    }

    if (total == 0 || totalPage == 0) return null;

    const listPage = [];
    const siblingCount = 3;

    const minValue = page - siblingCount;
    const maxValue = page + siblingCount;
    for (let loop = 1; loop <= totalPage; loop++) {
      if (loop >= minValue && loop <= maxValue) {
        listPage.push(loop);
      }
    }

    const leftEllipse = page - siblingCount > 2 + siblingCount;
    const rightEllipse = page + siblingCount < totalPage - siblingCount;

    return (
      <Pagination>
        {page !== 0 && (
          <>
            <Pagination.First onClick={() => action({ page: 1 })} />
            <Pagination.Prev onClick={() => action({ page: page - 1 })} />
          </>
        )}
        {leftEllipse && <Pagination.Ellipsis />}

        {listPage.map((sPage) => {
          return (
            <Pagination.Item
              key={sPage}
              active={page == sPage - 1}
              onClick={() => action({ page: sPage - 1 })}
            >
              {sPage}
            </Pagination.Item>
          );
        })}
        {rightEllipse && <Pagination.Ellipsis />}
        {page <= totalPage - 1 && (
          <>
            <Pagination.Next onClick={() => action({ page: page + 1 })} />
            <Pagination.Last onClick={() => action({ page: totalPage - 1 })} />
          </>
        )}
      </Pagination>
    );
  };

  const SpkPendingTab = () => {
    const columns = [
      { key: "voucherNo", label: "SPK CODE" },
      { key: "warehouseName", label: "WAREHOUSE" },
      { key: "customerName", label: "CUSTOMER" },
      { key: "shippingDate", label: "DATE" },
      { key: "transDate", label: "ESTIMATION DATE" },
      { key: "status", label: "STATUS" },
    ];

    const columnModifier = (data, key) => {
      if (key === "status") {
        if (data.toLowerCase() === "incomplete") {
          return <Badge bg="warning">{data}</Badge>;
        }
        return <Badge bg="success">{data}</Badge>;
      } else if (key === "shippingDate" || key === "transDate") {
        if (data == null) return "-";
        const dateFormatted = moment(data).format("DD MMM YYYY");
        return dateFormatted;
      }
    };

    return (
      <Tab.Pane className="mt-4" eventKey={TAB_SPK_PENDING_KEY}>
        <Row>
          <Col md={"12"} className="mb-2">
            <Card>
              <Card.Body>
                <p style={styles.cardTitle} className="mb-3">
                  SPK Pending List
                </p>
                <Table>
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} style={styles.tableHeader}>
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {spkPendingList?.data?.map((row) => {
                      const tds = columns.map((col) => {
                        const modifier = columnModifier(row[col.key], col.key);
                        return (
                          <td key={col.key}>{modifier ?? row[col.key]}</td>
                        );
                      });

                      return <tr key={row.voucherNo}>{tds}</tr>;
                    })}
                  </tbody>
                </Table>
                <GeneratePaginasi
                  total={spkPendingList?.total ?? 0}
                  page={spkPendingList?.page}
                  action={getHomeSpkPendingList}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    );
  };

  const TopItemTab = () => {
    const columns = [
      { key: "code", label: "ITEM CODE" },
      { key: "name", label: "ITEM NAME" },
      { key: "total", label: "TOTAL QTY" },
      { key: "qty.WH01", label: "QTY NAROGONG 1" },
      { key: "qty.WH02", label: "QTY GAJAH TUNGGAL 1" },
      { key: "qty.WH03", label: "QTY NAROGONG 1" },
    ];

    const columnModifier = (data, key, row) => {
      if (key === "qty.WH01") {
        return row?.warehouse?.filter(
          (warehouse) => warehouse.code === "WH01"
        )[0]?.balance;
      } else if (key === "qty.WH02") {
        return row?.warehouse?.filter(
          (warehouse) => warehouse.code === "WH02"
        )[0]?.balance;
      } else if (key === "qty.WH03") {
        return row?.warehouse?.filter(
          (warehouse) => warehouse.code === "WH03"
        )[0]?.balance;
      }
    };

    return (
      <Tab.Pane eventKey={TAB_TOP_ITEM_KEY}>
        <Row>
          <Col md={"12"}>
            <Card>
              <Card.Body>
                <p style={styles.cardTitle} className="mb-4">
                  Top Items in Total
                </p>
                <Table>
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} style={styles.tableHeader}>
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topItemsTotal?.data?.map((row) => {
                      const tds = columns.map((col) => {
                        const modifier = columnModifier(
                          row[col.key],
                          col.key,
                          row
                        );
                        return (
                          <td key={col.key}>{modifier ?? row[col.key]}</td>
                        );
                      });

                      return <tr key={row.id}>{tds}</tr>;
                    })}
                  </tbody>
                </Table>
                <GeneratePaginasi
                  total={topItemsTotal?.total ?? 0}
                  page={topItemsTotal?.page}
                  action={getHomeTopItemsTotal}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    );
  };

  const DropdownDate = () => {
    return (
      <div>
        <Form.Select
          aria-label="Waktu"
          className="form-control"
          onChange={handleDropdownDateChange}
        >
          <option value="today">Today</option>
          <option value="thisweek">This Week</option>
          <option value="thismonth">This Month</option>
          <option value="thisyear">This Year</option>
        </Form.Select>
      </div>
    );
  };

  const TabHeader = () => {
    return (
      <Card className="mt-3">
        <Card.Body
          style={{ background: "white" }}
          className="d-flex justify-content-between"
        >
          <Nav variant="underline" defaultActiveKey={TAB_DEFAULT}>
            {LIST_TAB_HEADER.map((item) => (
              <Nav.Item key={item.key}>
                <Nav.Link eventKey={item.key}>{item.label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          {activeTab === TAB_SUMMARY_KEY && <DropdownDate />}
        </Card.Body>
      </Card>
    );
  };

  const variantList = ["primary", "warning", "danger", "success"];

  return (
    <div className="mx-3 mt-4 mb-4">
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={TAB_DEFAULT}
        onSelect={(k) => setActiveTab(k)}
      >
        <Container fluid>
          <h3 style={{ color: "#5e5873", fontWeight: 600 }}>Dashboard</h3>
          <TabHeader />

          <Tab.Content className="mt-4">
            <SummaryTab />
            <SpkPendingTab />
            <TopItemTab />
          </Tab.Content>
        </Container>
      </Tab.Container>

      <Row className="mt-2">
        <Col md={6} sm={12} className="mb-2">
          <Card>
            <Card.Body>
              <p style={styles.cardTitleSecondary} className="mb-2">
                Search Item
              </p>

              <Select
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                name="aria-live-color"
                onChange={(opt) => setSelectedItemId(opt.value)}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                options={listItems?.data?.map((item) => {
                  return { value: item.id, label: item.name };
                })}
              />
              <div className="d-flex justify-content-between m-1">
                <div>
                  <p style={styles.cardTitleSecondary} className="mb-2 d-block">
                    Item Name
                  </p>
                  <p>{searchItem?.data?.name}</p>
                </div>
                <div>
                  <p style={styles.cardTitleSecondary} className="mb-2 d-block">
                    Item Code
                  </p>
                  <p>{searchItem?.data?.code}</p>
                </div>
              </div>
              <Row className="mt-2">
                {searchItem?.data?.warehouses?.map((wh) => (
                  <Col sm={6} key={wh.id}>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {wh.name}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        <span className="text-success">{wh.balance}</span>/
                        <span className="text-danger">{wh.booked}</span>
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} className="mb-2">
          <Card>
            <Card.Body>
              <p style={styles.cardTitleSecondary}>Warehouse Capacity</p>
              {warehouseCapacity?.data?.map((item, index) => (
                <div key={item.id}>
                  <span
                    className="pt-2 pb-2 d-block font-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    {item.name}
                  </span>
                  <ProgressBar
                    variant={variantList[index % variantList.length]}
                    now={item.percentage}
                    label={`${item.percentage}%`}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Home3.propTypes = {
  user: PropTypes.object,
  summary: PropTypes.object,

  spkPendingList: PropTypes.object,
  searchItem: PropTypes.object,
  topItemsTotal: PropTypes.object,
  warehouseCapacity: PropTypes.object,
  listItems: PropTypes.object,

  getHomeSummaryData: PropTypes.func,
  getHomeSearchItem: PropTypes.func,
  getHomeWarehouseCapacity: PropTypes.func,
  getHomeTopItemsTotal: PropTypes.func,
  getHomeSpkPendingList: PropTypes.func,
  getHomeListItems: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  summary: state.home.summary,
  spkPendingList: state.home.spkPendingList,
  searchItem: state.home.searchItem,
  topItemsTotal: state.home.topItemsTotal,
  warehouseCapacity: state.home.warehouseCapacity,
  listItems: state.home.listItems,
});

export default connect(mapStateToProps, {
  getHomeSummaryData,
  getHomeSearchItem,
  getHomeWarehouseCapacity,
  getHomeTopItemsTotal,
  getHomeSpkPendingList,
  getHomeListItems,
})(Home3);
