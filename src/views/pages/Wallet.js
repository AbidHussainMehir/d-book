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
import { sells } from "variables/general";
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
import WalletCard from "../components/Wallet/card";
import "./css/sale.css";
// import Drawer from "@mui/material/Drawer";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const images = [Nba_logo, Demo];
const Wallet = () => {
  const history = useHistory();
  const [search, setSearch] = React.useState("");
  const [selectedSports, setSelectedSports] = React.useState("");
  const [selectedSortBy, setSelectedSortBy] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredEvents, setFilteredEvents] = useState([...sells]);
  const [isConnected, setIsConnected] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const isMobile = useMediaQuery("(max-width:800px)");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, [localStorage.getItem("theme")]);
  useEffect(() => {
    if (search) {
      let _events = [...sells];
      _events = _events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents([..._events]);
    } else {
      setFilteredEvents([...sells]);
    }
  }, [search]);
  useEffect(() => {
    if (selectedSports) {
      let _events = [...sells];
      _events = _events.filter((event) =>
        event.sports.toLowerCase().includes(selectedSports.toLowerCase())
      );
      setFilteredEvents([..._events]);
    } else {
      setFilteredEvents([...sells]);
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
        // notification.open({
        //     message: 'Metamask is not installed',
        //     description:
        //         ' please install it on your browser to connect.',
        //     duration: 500,
        // });
        // "Metamask is not installed, please install it on your browser to connect.",
      }
      setIsConnected(isConnected);
      if (isConnected === true) {
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

  console.log({ isMobile });
  return (
    <>
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
            </Col>
          )}
          <Col lg="9" md="6" sm="12" xs="12">
            {/* <Card className="card-timeline card-plain">
              <CardBody> */}
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
              <p className="eTitle">Wallet</p>
            </div>
            {filteredEvents?.length > 0 ? (
              <Row>
                {filteredEvents?.map((event, index) => {
                  return <WalletCard event={event} />;
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
            {/* </CardBody>
            </Card> */}
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
              </Col>
            </Row>
          </Drawer>
        </Row>
      </div>
    </>
  );
};

export default Wallet;
