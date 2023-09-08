import React from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);
export const data = {
  labels: ["Red", "Blue"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["#17a2b8", "#fff"],
      borderColor: ["#17a2b8", "#17a2b8"],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: false,
  maintainAspectRatio: false,
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

const Home = () => {
  return (
    <div className="mx-3 mt-4">
      <Tab.Container id="left-tabs-example" defaultActiveKey="summary">
        <Container fluid>
          <h3 style={{ color: "#5e5873", fontWeight: 600 }}>Dashboard</h3>
          <Card className="mt-3">
            <Card.Body style={{ background: "white" }}>
              <Nav variant="underline" defaultActiveKey="summary">
                <Nav.Item>
                  <Nav.Link eventKey={"summary"}>Summary</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="spk-pending-list">SPK Pending List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="top-items-total">Top Items Total</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>

          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="summary">
              <Row>
                <Col md={"3"}>
                  <Card style={{ height: 280 }}>
                    <Card.Body>
                      <p style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>%SPK yang sudah memiliki shipping</p>
                      <Doughnut data={data} options={options} width={"300"} height={"200"} style={{ marginTop: "10px" }} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={"3"}>
                  <Card style={{ height: 280, position: "relative" }}>
                    <Card.Body className="px-0 pb-0">
                      <p className="px-3" style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>
                        SPK
                      </p>
                      <p className="px-3 pb-3" style={{ margin: 0 }}>
                        Total dari SPK berdasarkan tanggal yang anda tentukan
                      </p>
                      <Card style={{ position: "absolute", bottom: 0, width: "100%" }}>
                        <Card.Body className="p-0">
                          <div className="d-flex justify-content-around align-items-center bg-info" style={{ height: "80px" }}>
                            <span style={{ color: "white" }}> Total SPK </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                          <div className="d-flex justify-content-around align-items-center" style={{ height: "80px", background: "#2AB6C7" }}>
                            <span style={{ color: "white" }}> Total Box SPK </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={"3"}>
                  <Card style={{ height: 280, position: "relative" }}>
                    <Card.Body className="px-0 pb-0">
                      <p className="px-3" style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>
                        Shipping
                      </p>
                      <p className="px-3 pb-3" style={{ margin: 0 }}>
                        Total dari Shipping berdasarkan tanggal yang anda tentukan
                      </p>
                      <Card style={{ position: "absolute", bottom: 0, width: "100%" }}>
                        <Card.Body className="p-0">
                          <div className="d-flex justify-content-around align-items-center bg-info" style={{ height: "80px" }}>
                            <span style={{ color: "white" }}> Total Shipping </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                          <div className="d-flex justify-content-around align-items-center" style={{ height: "80px", background: "#2AB6C7" }}>
                            <span style={{ color: "white" }}> Total Box Shipping </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={"3"}>
                  <Card style={{ height: 280, position: "relative" }}>
                    <Card.Body className="px-0 pb-0">
                      <p className="px-3" style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>
                        LATE
                      </p>
                      <p className="px-3 pb-3" style={{ margin: 0 }}>
                        Total dari Late berdasarkan tanggal yang anda tentukan
                      </p>
                      <Card style={{ position: "absolute", bottom: 0, width: "100%" }}>
                        <Card.Body className="p-0">
                          <div className="d-flex justify-content-around align-items-center bg-info" style={{ height: "80px" }}>
                            <span style={{ color: "white" }}> Total Late </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                          <div className="d-flex justify-content-around align-items-center" style={{ height: "80px", background: "#2AB6C7" }}>
                            <span style={{ color: "white" }}> Total Box Late </span>
                            <span style={{ color: "white", marginTop: "5px", fontWeight: "bold" }}>0</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane className="mt-4" eventKey="spk-pending-list">
              <Row>
                <Col md={"12"}>
                  <Card style={{ height: 280 }}>
                    <Card.Body>
                      <p style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>%SPK yang sudah memiliki shipping</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="top-items-total">
              <Row>
                <Col md={"12"}>
                  <Card style={{ height: 280 }}>
                    <Card.Body>
                      <p style={{ color: "#2AB6C7", fontWeight: "bold", margin: "0px", fontSize: "20px" }}>%SPK yang sudah memiliki shipping</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Container>
      </Tab.Container>
    </div>
  );
};

export default Home;
// export default connect(mapStateToProps, { getSync, syncNow })(Home);
