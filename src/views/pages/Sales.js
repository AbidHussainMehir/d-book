import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { sells, eventsPast } from "variables/general";
import Nba_logo from "../../assets/img/app/nba_logo.png";
import Demo from "../../assets/img/app/demo.jpg";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../variables/contractData";
import Web3 from "web3";
import { SUPPLY_ABI, SUPPLY_ADDRESS } from "../../variables/totalSupply";
import SalesDateCard from "../components/Events/card";
import FutureEventsCard from "../components/Events/FutureEventsCard";
import "./css/sale.css";
// import Drawer from "@mui/material/Drawer";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { futureEvents } from "variables/futureEvents";
import EventModal from "components/Modals/event";
import { ReactComponent as InfoIcon } from "../../assets/img/info.svg";
import Dialog from '../components/Events/Dialog'
import { toast } from "react-toastify";

const images = [Nba_logo, Demo];
const Events = () => {
  const history = useHistory();
  const [search, setSearch] = React.useState("");
  const [selectedSports, setSelectedSports] = React.useState("");
  const [selectedSortBy, setSelectedSortBy] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredEvents, setFilteredEvents] = useState([...sells]);
  const [filteredFutureEvents, setFilteredFutureEvents] = useState([
    ...futureEvents,
  ]);
  const [filteredPastEvents, setFilteredPastEvents] = useState([...eventsPast]);
  const [isConnected, setIsConnected] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [saleType, setSaleType] = useState("all");
  const isMobile = useMediaQuery("(max-width:800px)");
  const [isModel, setModel] = React.useState(false);
  const [openTutorial, setOpenTutorial] = React.useState(false);

  const handleClickOpenTutorial = () => {
    setOpenTutorial(true);
  };

  const handleCloseTutorial = () => {
    setOpenTutorial(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    console.log(localStorage.getItem("theme"), "changed");
    setTheme(localStorage.getItem("theme"));
  }, [localStorage.getItem("theme")]);
  useEffect(() => {
    if (search) {
      let _events = [...sells];
      _events = _events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
      let _eventsF = [...futureEvents];
      _eventsF = _eventsF.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
      let _eventsP = [...eventsPast];
      _eventsP = _eventsP.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFutureEvents([..._eventsF]);
      setFilteredPastEvents([..._eventsP]);
      setFilteredEvents([..._events]);
    } else {
      setFilteredEvents([...sells]);
      setFilteredFutureEvents([...futureEvents]);
      setFilteredPastEvents([...eventsPast]);
    }
  }, [search]);
  useEffect(() => {
    if (selectedSports === "all") {
      setFilteredFutureEvents([...futureEvents]);
    } else if (selectedSports) {
      let _events = [...sells];
      _events = _events.filter((event) =>
        event.sports.toLowerCase().includes(selectedSports.toLowerCase())
      );
      setFilteredEvents([..._events]);
      let _events1 = [...futureEvents];
      _events1 = _events1.filter((event) =>
        event.sports.toLowerCase().includes(selectedSports.toLowerCase())
      );
      setFilteredFutureEvents([..._events1]);
      let _events2 = [...eventsPast];
      _events2 = _events2.filter((event) =>
        event.sports.toLowerCase().includes(selectedSports.toLowerCase())
      );
      setFilteredPastEvents([..._events2]);
    } else {
      setFilteredEvents([...sells]);
      setFilteredFutureEvents([...futureEvents]);
      setFilteredPastEvents([...eventsPast]);
    }
  }, [selectedSports]);
  useEffect(() => {
    if (selectedSortBy === "startDate") {
      let _events = [...sells];
      _events.sort(function (a, b) {
        return new Date(b.start) - new Date(a.start);
      });
      setFilteredEvents([..._events]);
    } else if (selectedSortBy === "endDate") {
      let _events = [...sells];
      _events.sort(function (a, b) {
        return new Date(b.end) - new Date(a.end);
      });
      setFilteredEvents([..._events]);
    } else if (selectedSortBy === "prizePool") {
      let _events = [...sells];
      _events.sort(function (a, b) {
        return b.prizePool - a.prizePool;
      });
      setFilteredEvents([..._events]);
    }
  }, [selectedSortBy]);
  const getSellName = (id) => {
    let name = "";
    sells &&
      sells.forEach((element) => {
        if (element.id == id) {
          name = element.code;
        }
      });
    return name;
  };
  const metamask = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        setModel(true)
      }
      setIsConnected(isConnected);
      if (isConnected === true) {
        setModel(false)

        const web3 = window.web3;
        let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        web3.eth.net.getId()
          .then(d => {
            if (d !== 56) {
              setModel(true)

            }
          });

        let name = getSellName(3);
        let times = await contract2.methods.isSaleOn(name).call();
        setTime(times?.saleEnd);
        setStartTime(times?.saleStart);

        window.ethereum.on("accountsChanged", async function (accounts) {
          let name = getSellName(3);
          let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          let times = await contract2.methods.isSaleOn(name).call();
          setTime(times?.saleEnd);
          setStartTime(times?.saleStart);
        });
      }
    } catch (error) {

      console.log("error", error);
      console.log("error message", error?.message);
    }
  };
  const metamaskWithMsg = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        toast.error("Metamask is not installed");

        setModel(true)
      }
      setIsConnected(isConnected);
      if (isConnected === true) {
        setModel(false)

        const web3 = window.web3;
        let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        let name = getSellName(3);
        let times = await contract2.methods.isSaleOn(name).call();
        setTime(times?.saleEnd);
        setStartTime(times?.saleStart);

        window.ethereum.on("accountsChanged", async function (accounts) {
          let name = getSellName(3);
          let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          let times = await contract2.methods.isSaleOn(name).call();
          setTime(times?.saleEnd);
          setStartTime(times?.saleStart);
        });
      }
    } catch (error) {

      console.log("error", error);
      console.log("error message", error?.message);
    }
  };
  useEffect(() => {
    metamask();
  }, []);
  const handleClose = () => {
    setModel(false)
  }
  console.log({ isMobile });
  return (
    <>

      {isModel && <Dialog metamaskWithMsg={metamaskWithMsg} handleClose={handleClose} />}
      <div className="content">
        <Row className="p-2">
          {!isMobile && (
            <Col lg="3" md="6" sm="12" xs="12" className="pr-5">
              <div className="">
                <h5 className="eFilterTitle text-underline">Filters</h5>
              </div>
              <Row style={{ justifyContent: "center", padding: "5px" }}>
                <Input
                  name="search"
                  placeholder="search for an event"
                  type="text"
                  className="search-field"
                  onChange={(e) => handleSearch(e)}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                />
              </Row>
              <div className="">
                <h5 className="eFilterSubTitle">By Sports</h5>
              </div>
              <h5
                className="options"
                style={selectedSports === "all" ? { color: "#3166EC" } : {}}
                onClick={() => setSelectedSports("all")}
              >
                All
              </h5>
              <h5
                className="options"
                style={
                  selectedSports === "basketball" ? { color: "#3166EC" } : {}
                }
                onClick={() => setSelectedSports("basketball")}
              >
                Basketball
              </h5>
              <h5
                className="options"
                style={
                  selectedSports === "football" ? { color: "#3166EC" } : {}
                }
                onClick={() => setSelectedSports("football")}
              >
                Football
              </h5>
              <h5
                className="options"
                style={
                  selectedSports === "americanFootball"
                    ? { color: "#3166EC" }
                    : {}
                }
                onClick={() => setSelectedSports("americanFootball")}
              >
                American Football
              </h5>
              <h5
                className="options"
                style={
                  selectedSports === "motorSports" ? { color: "#3166EC" } : {}
                }
                onClick={() => setSelectedSports("motorSports")}
              >
                Motor Sports
              </h5>
              <h5
                className="options"
                style={selectedSports === "cricket" ? { color: "#3166EC" } : {}}
                onClick={() => setSelectedSports("cricket")}
              >
                Cricket
              </h5>
              <h5
                className="options"
                style={selectedSports === "tennis" ? { color: "#3166EC" } : {}}
                onClick={() => setSelectedSports("tennis")}
              >
                Tennis
              </h5>
              <h5
                className="options"
                style={selectedSports === "eSports" ? { color: "#3166EC" } : {}}
                onClick={() => setSelectedSports("eSports")}
              >
                eSports
              </h5>
              <div
                className="options"
                onClick={() => setSelectedSports("basketball")}
              >
                <h5 className="eFilterSubTitle text-underline">Sort By</h5>
              </div>
              <h5
                className="options"
                onClick={() => setSelectedSortBy("startDate")}
              >
                Start Date
              </h5>
              <h5
                className="options"
                onClick={() => setSelectedSortBy("endDate")}
              >
                End Date
              </h5>
              <h5
                className="options"
                onClick={() => setSelectedSortBy("prizePool")}
              >
                Prize Pool
              </h5>
              <div
                className="options"
                onClick={() => setSelectedSports("basketball")}
              >
                <h5 className="eFilterSubTitle text-underline">Sale</h5>
              </div>
              <h5
                className="options"
                style={saleType === "all" ? { color: "#3166EC" } : {}}
                onClick={() => setSaleType("all")}
              >
                All
              </h5>
              <h5
                className="options"
                style={saleType === "future" ? { color: "#3166EC" } : {}}
                onClick={() => setSaleType("future")}
              >
                Future Sales
              </h5>
              <h5
                className="options"
                style={saleType === "ongoing" ? { color: "#3166EC" } : {}}
                onClick={() => setSaleType("ongoing")}
              >
                Ongoing Sales
              </h5>
              <h5
                className="options"
                style={saleType === "past" ? { color: "#3166EC" } : {}}
                onClick={() => setSaleType("past")}
              >
                Past Sales
              </h5>
            </Col>
          )}
          <Col lg="9" md="6" sm="12" xs="12">
            {(saleType === "ongoing" || saleType === "all") && (
              <>
                <Row style={{ alignItems: "center" }}>
                  <Col lg="10" md="10" sm="10" xs="10">
                    {" "}
                    <div
                      className="header text-center mb-0"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: isMobile ? "flex-start" : "center",
                      }}
                    >
                      {isMobile && (
                        <button
                          className=" btn btn-link btn-just-icon "
                          onClick={() => setDrawer(!drawer)}
                          style={{
                            fontSize: "2rem",
                            padding: 0,
                            margin: "0px 30px 0px 0px",
                          }}
                        >
                          <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
                          <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
                        </button>
                      )}
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <p className="eTitle">Events</p>

                        <h4 className="eSubTitle">
                          Please connect to Metamask to check out more updated
                          details
                        </h4>
                      </div>
                    </div>
                  </Col>
                  <Col
                    lg="2"
                    md="2"
                    sm="2"
                    xs="2"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <InfoIcon onMouseOver={handleClickOpenTutorial} />
                  </Col>
                </Row>

                {filteredEvents?.length > 0 ? (
                  <Row>
                    {filteredEvents?.map((event, index) => {
                      return (
                        <SalesDateCard
                          event={event}
                          name={event.code}
                          account={isConnected}
                        />
                      );
                    })}
                  </Row>
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
              </>
            )}
            {(saleType === "future" || saleType === "all") && (
              <>
                <div
                  className="header text-center mb-0"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: isMobile ? "flex-start" : "center",
                  }}
                >
                  <p className="eTitle">Future Events</p>
                </div>
                {filteredFutureEvents?.length > 0 ? (
                  <Row>
                    {filteredFutureEvents?.map((event, index) => {
                      return (
                        <FutureEventsCard
                          event={event}
                          name={event.code}
                          account={isConnected}
                        />
                      );
                    })}
                  </Row>
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
              </>
            )}
            {(saleType === "past" || saleType === "all") && (
              <>
                <div
                  className="header text-center mb-0"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: isMobile ? "flex-start" : "center",
                  }}
                >
                  <p className="eTitle">Past Events</p>
                </div>
                {filteredPastEvents?.length > 0 ? (
                  <Row>
                    {filteredPastEvents?.map((event, index) => {
                      return (
                        <SalesDateCard
                          event={event}
                          name={event.code}
                          account={isConnected}
                        />
                      );
                    })}
                  </Row>
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
              </>
            )}
          </Col>

          <Drawer open={drawer} onClose={() => setDrawer(false)}>
            <Row
              style={{
                padding: "15px",
                backgroundColor: theme === "theme-dark" && "#1E1E2D",
                height: "100%",
              }}
            >
              <Col lg="12" md="12" sm="12" xs="12" className="pr-5">
                <div className="">
                  <h5 className="eFilterTitle text-underline">Filters</h5>
                </div>
                <Row style={{ justifyContent: "center", padding: "5px" }}>
                  <Input
                    name="search"
                    placeholder="search for an event"
                    type="text"
                    className="search-field"
                    onChange={(e) => handleSearch(e)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                  />
                </Row>
                <div className="">
                  <h5 className="eFilterSubTitle">By Sports</h5>
                </div>
                <h5
                  className="options"
                  style={selectedSports === "all" ? { color: "#3166EC" } : {}}
                  onClick={() => setSelectedSports("all")}
                >
                  All
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("basketball")}
                >
                  Basketball
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("football")}
                >
                  Football
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("americanFootball")}
                >
                  American Football
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("motorSports")}
                >
                  Motor Sports
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("cricket")}
                >
                  Cricket
                </h5>
                <h5
                  className="options"
                  style={
                    selectedSports === "tennis" ? { color: "#3166EC" } : {}
                  }
                  onClick={() => setSelectedSports("tennis")}
                >
                  Tennis
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSports("eSports")}
                >
                  eSports
                </h5>
                <div
                  className="options"
                  onClick={() => setSelectedSports("basketball")}
                >
                  <h5 className="eFilterSubTitle text-underline">Sort By</h5>
                </div>
                <h5
                  className="options"
                  onClick={() => setSelectedSortBy("startDate")}
                >
                  Start Date
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSortBy("endDate")}
                >
                  End Date
                </h5>
                <h5
                  className="options"
                  onClick={() => setSelectedSortBy("prizePool")}
                >
                  Prize Pool
                </h5>
                <div
                  className="options"
                  onClick={() => setSelectedSports("basketball")}
                >
                  <h5 className="eFilterSubTitle text-underline">Sale</h5>
                </div>
                <h5
                  className="options"
                  style={saleType === "all" ? { color: "#3166EC" } : {}}
                  onClick={() => setSaleType("all")}
                >
                  All
                </h5>
                <h5
                  className="options"
                  style={saleType === "future" ? { color: "#3166EC" } : {}}
                  onClick={() => setSaleType("future")}
                >
                  Future Sales
                </h5>
                <h5
                  className="options"
                  style={saleType === "ongoing" ? { color: "#3166EC" } : {}}
                  onClick={() => setSaleType("ongoing")}
                >
                  Ongoing Sales
                </h5>
                <h5
                  className="options"
                  style={saleType === "past" ? { color: "#3166EC" } : {}}
                  onClick={() => setSaleType("past")}
                >
                  Past Sales
                </h5>
              </Col>
            </Row>
          </Drawer>
        </Row>
        <EventModal open={openTutorial} handleClose={handleCloseTutorial} />
      </div>
    </>
  );
};

export default Events;
