import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Col,
  Row,
  Container,
  Input,
} from "reactstrap";
import Select from "react-select";
import "./css/calculator.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const eventOptions = [
  { value: "Event 1", label: "Event 1" },
  { value: "Event 2", label: "Event 2" },
  { value: "Event 3", label: "Event 3" },
];
const teamOptions = [
  { value: "Team 1", label: "Team 1" },
  { value: "Team 2", label: "Team 2" },
  { value: "Team 3", label: "Team 3" },
];
const placingOptions = [
  { value: "Placing 1", label: "Placing 1" },
  { value: "Placing 2", label: "Placing 2" },
  { value: "Placing 3", label: "Placing 3" },
];

const Calculator = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [selectedTeam, setSelectedTeam] = React.useState("");
  const [calculatedValue, setCalculatedValue] = React.useState("");
  const [selectedTeamError, setSelectedTeamError] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState("");
  const [selectedEventError, setSelectedEventError] = React.useState(false);
  const [selectedPlacing, setSelectedPlacing] = React.useState("");
  const [selectedPlacingError, setSelectedPlacingError] = React.useState(false);
  const [teamOptions, setTeamOptions] = React.useState([]);
  const [eventOptions, setEventOptions] = React.useState([]);

  return (
    <>
      <div className="content">
        <Container>
          <Row className="p-2" style={{ justifyContent: "center" }}>
            <Col lg="9" md="9" sm="12" xs="12">
              <div
                className="header text-center mb-0"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h3 className="calc-title">Prize Calculator</h3>
              </div>
            </Col>
          </Row>
          <Row className="p-2" style={{ justifyContent: "center" }}>
            <Col lg="9" md="12" sm="12" xs="12">
              <div style={{ cursor: "pointer" }} className="ecard cal-card">
                <Row className="p-2" style={{ justifyContent: "center" }}>
                  <Col className="p-2" xs={12} sm={12} md={4}>
                    <h1 className="calc-subtitle">Event Name</h1>
                    <Select
                      name="search"
                      placeholder="Choose Event"
                      className="input-field"
                      options={eventOptions}
                    />
                  </Col>

                  <Col className="p-2" xs={12} sm={12} md={4}>
                    <h1 className="calc-subtitle">Team Name</h1>
                    <Select
                      name="search"
                      placeholder="Choose Team"
                      className="input-field"
                      options={teamOptions}
                    />
                  </Col>

                  <Col className="p-2" xs={12} sm={12} md={4}>
                    <h1 className="calc-subtitle">Placing</h1>
                    <Select
                      name="search"
                      placeholder="Choose Placing"
                      className="input-field"
                      options={placingOptions}
                    />
                  </Col>
                </Row>
                <Row className="p-2" style={{ justifyContent: "center" }}>
                  <Col xs={12} sm={12} md={6}>
                    <h1 className="calc-subtitle">return on investment</h1>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={12} sm={12} md={6}>
                    <p className="calc-desc">max roi: 12345</p>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={12} sm={12} md={6}>
                    <Row
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                      }}
                    >
                      <div
                        className="mx-2 my-0 p-0 calc-input"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          style={{
                            border: "0px",
                            flexGrow: 1,
                          }}
                          placeholder="Amount"
                          className="calc-input-field"
                        />

                        <button
                          style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                          className="btn-max"
                        >
                          Max
                        </button>
                      </div>
                      {!isMobile && (
                        <button className="btn-approve">Approve</button>
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row className="p-2" style={{ justifyContent: "center" }}>
                  <Col xs={12} sm={12} md={6}>
                    <p className="calc-desc">total profit: 1000</p>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  {isMobile && <button className="btn-approve">Approve</button>}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Calculator;
