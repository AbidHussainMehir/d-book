import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { events } from "../../variables/eventsData";
import { futureEvents } from "../../variables/futureEvents";
import "./css/event.css";
const Events = () => {
  const history = useHistory();
  const [search, setSearch] = React.useState("");
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredEvents, setFilteredEvents] = useState([...events]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      let _events = [...events];
      _events = _events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents([..._events]);
    } else {
      setFilteredEvents([...events]);
    }
  }, [search]);

  return (
    <>
      <div className="content">
        <div className="header text-center">
          <h3 className="eTitle">Events</h3>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-timeline card-plain ecard">
              <CardBody>
                {filteredEvents?.length > 0 ? (
                  <ul className="timeline">
                    {filteredEvents?.map((event, index) => {
                      return (
                        <>
                          <li
                            className={
                              index % 2 === 1
                                ? "timeline-inverted-2"
                                : "timeline-inverted"
                            }
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push(`/team/${event.id}`)}
                          >
                            <div
                              className="timeline-badge badge-events"
                              style={{
                                backgroundImage: `url(${event?.img})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "50px",
                                height: "500px",
                                backgroundColor: "#fff",
                              }}
                            ></div>
                            <div className="timeline-panel ">
                              <Col xs="12">
                                <div className="numbers">
                                  <CardTitle tag="h3">{event.title}</CardTitle>
                                </div>
                                <div
                                  className="numbers"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <CardTitle
                                    tag="h6"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <i className="tim-icons icon-calendar-60" />
                                    <span style={{ marginLeft: "7px" }}>
                                      {moment("10-12-2021").format(
                                        "YYYY-MM-DD"
                                      )}
                                    </span>
                                  </CardTitle>
                                  <CardTitle
                                    tag="h6"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <i className="tim-icons icon-calendar-60" />
                                    <span style={{ marginLeft: "7px" }}>
                                      {moment("10-17-2021").format(
                                        "YYYY-MM-DD"
                                      )}
                                    </span>
                                  </CardTitle>
                                </div>
                              </Col>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                ) : (
                  <Row style={{ justifyContent: "center" }}>
                    <Col
                      xs={6}
                      lg={3}
                      style={{ textTransform: "capitalize" }}
                      className="text-info"
                    >
                      no records found
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="header text-center">
            <h3 className="eTitle">Future Events</h3>
          </div>
        </Row>
        <Row>
          <Col md="12">
            <Card className="card-timeline card-plain ecard">
              <CardBody>
                {filteredEvents?.length > 0 ? (
                  <ul className="timeline">
                    {filteredEvents?.map((event, index) => {
                      return (
                        <>
                          <li
                            className={
                              index % 2 === 1
                                ? "timeline-inverted-2"
                                : "timeline-inverted"
                            }
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push(`/team/${event.id}`)}
                          >
                            <div
                              className="timeline-badge "
                              style={{
                                backgroundImage: `url(${event?.img})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                borderRadius: "50px",
                                backgroundColor: "#fff",
                              }}
                            ></div>
                            <div className="timeline-panel ">
                              <Col xs="12">
                                <div className="numbers">
                                  <CardTitle tag="h3">{event.title}</CardTitle>
                                </div>
                                <div
                                  className="numbers"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <CardTitle
                                    tag="h6"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <i className="tim-icons icon-calendar-60" />
                                    <span style={{ marginLeft: "7px" }}>
                                      {moment("10-12-2021").format(
                                        "YYYY-MM-DD"
                                      )}
                                    </span>
                                  </CardTitle>
                                  <CardTitle
                                    tag="h6"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <i className="tim-icons icon-calendar-60" />
                                    <span style={{ marginLeft: "7px" }}>
                                      {moment("10-17-2021").format(
                                        "YYYY-MM-DD"
                                      )}
                                    </span>
                                  </CardTitle>
                                </div>
                              </Col>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                ) : (
                  <Row style={{ justifyContent: "center" }}>
                    <Col
                      xs={6}
                      lg={3}
                      style={{ textTransform: "capitalize" }}
                      className="text-info"
                    >
                      no records found
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Events;
