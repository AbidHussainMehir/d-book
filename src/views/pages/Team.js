import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardHeader,
  Collapse,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap";
import { Line } from "react-chartjs-2";
import { chartExample6 } from "variables/charts.js";
import moment from "moment";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { events, eventTeams } from "../../variables/eventsData";
import EventDescription from "./EventDescription";
import Web3 from "web3";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../variables/contractData";
import { Badge } from "reactstrap";

import { SUPPLY_ABI, SUPPLY_ADDRESS } from "../../variables/totalSupply";
//events team
const Team = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [balace, setBalance] = useState(0);
  const [sale, setSale] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [time, setTime] = useState(null);
  const [openedPanel, setopenedPanel] = React.useState({
    0: false,
  });
  const [search, setSearch] = React.useState("");
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredTeams, setFilteredTeams] = useState([...eventTeams]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const getEventName = (id) => {
    let name = "";
    events &&
      events.forEach((element) => {
        if (element.id == id) {
          name = element.title;
        }
      });
    return name;
  };

  useEffect(() => {
    let _teams1 = [...eventTeams];
    _teams1 = _teams1.filter((team) => team.pId == id);
    if (search) {
      let _teams = [..._teams1];
      _teams = _teams.filter((team) =>
        team.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTeams([..._teams]);
    } else {
      setFilteredTeams([..._teams1]);
    }
  }, [search]);
  useEffect(() => {
    if (id) {
      let _teams = [...eventTeams];
      _teams = _teams.filter((team) => team.pId == id);

      setFilteredTeams([..._teams]);
    }
  }, [id]);
  const getSellName = (id) => {
    let name = "";
    events &&
      events.forEach((element) => {
        if (element.id == id) {
          name = element.code;
        }
      });
    return name;
  };
  const metamask = async () => {
    let isConnected = false;
    try {
      setErrorState(false);

      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        setErrorState(true);
        // notification.open({
        //     message: 'Metamask is not installed',
        //     description:
        //         ' please install it on your browser to connect.',
        //     duration: 500,
        // });
        // "Metamask is not installed, please install it on your browser to connect.",
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        let supplyContract = new web3.eth.Contract(SUPPLY_ABI, SUPPLY_ADDRESS);
        let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        // console.log("--------", res);
        setAccount(accounts[0]);
        let totalSupplyData = await supplyContract.methods.totalSupply().call();
        let name = getSellName(id);

        let times = await contract2.methods.isSaleOn(name).call();

        setTime(times?.saleEnd);

        localStorage.setItem("account", accounts[0]);
        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
          let name = getSellName(id);
          let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          let times = await contract2.methods.isSaleOn(name).call();
          setTime(times?.saleEnd);
          localStorage.setItem("account", accounts[0]);
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
  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);
      totalSupplyData = await supplyContract.methods.totalSupply().call();
      decimals = await supplyContract.methods.decimals().call();
    } catch (e) {
      console.log(e?.message);
    }
    return totalSupplyData;
  };
  const updateTotalPrize = async () => {
    try {
      let p = 0;
      for (let index = 0; index < filteredTeams.length; index++) {
        const element = filteredTeams[index];
        let n = await getTotalSupply(element?.contract, element?.abi);
        p = parseFloat(p) + parseFloat(n);
      }
      setTotalSupply((p / Math.pow(10, 18)).toFixed(4));
    } catch (e) {}
  };
  useEffect(() => {
    updateTotalPrize();
  }, [filteredTeams]);
  return (
    <>
      <div className="content">
        <div className="header text-center">
          <h3 className="title">{getEventName(id)}</h3>
        </div>

        <Row style={{ justifyContent: "center", marginBottom: "20px" }}>
          <Col xs={12} md={10} lg={7}>
            <InputGroup
              className={classnames({
                "input-group-focus": searchFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="search"
                placeholder="search..."
                type="text"
                onChange={(e) => handleSearch(e)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
              />
            </InputGroup>
          </Col>
        </Row>

        {filteredTeams?.length > 0 ? (
          <Row>
            {filteredTeams?.map((team, index) => {
              return (
                <Col lg="4" md="6" key={index}>
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="3">
                          <div
                            className="info-icon text-center icon-warning"
                            style={{
                              backgroundImage: `url(${team?.img})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              borderRadius: "50px",
                              backgroundColor: "#000",
                              // border:"1px solid #000"
                            }}
                          ></div>
                        </Col>
                        <Col xs="9">
                          <div className="numbers">
                            <CardTitle tag="h3">{team.title}</CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <div
                      aria-multiselectable={true}
                      className="card-collapse"
                      id="accordion"
                      role="tablist"
                    >
                      <Card
                        className="card-plain"
                        style={{ position: "relative" }}
                      >
                        <CardHeader role="tab">
                          {team?.eliminated && (
                            <Badge
                              pill
                              style={{
                                position: "absolute",
                                top: "-12px",
                                right: "20px",
                                textDecoration: "none",
                                fontWeight: "normal",
                                textTransform: "none",
                              }}
                              color="danger"
                            >
                              Eliminated
                            </Badge>
                          )}
                          <a
                            aria-expanded={openedPanel && openedPanel[index]}
                            href="#pablo"
                            data-parent="#accordion"
                            data-toggle="collapse"
                            onClick={(e) => {
                              e.preventDefault();
                              let _openedPanel = { ...openedPanel };
                              _openedPanel[index] = !_openedPanel[index];
                              setopenedPanel({ ..._openedPanel });
                            }}
                          >
                            Details
                            <i className="tim-icons icon-minimal-down" />
                          </a>
                        </CardHeader>

                        <Collapse
                          role="tabpanel"
                          isOpen={openedPanel && openedPanel[index]}
                        >
                          <CardBody>
                            <Row style={{ marginBottom: "5px" }}>
                              <Col
                                xs="12"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <a
                                  href={`https://pancakeswap.finance/swap?inputCurrency=${team?.contract}&outputCurrency=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`}
                                  target="_blank"
                                >
                                  <Button color="warning" size="sm">
                                    Trade on BSC
                                  </Button>
                                </a>
                              </Col>

                              {/* <Col
                                xs="6"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Button color="warning" size="sm">
                                  Trade on Polygon
                                </Button>
                              </Col> */}
                            </Row>
                            <Row
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <EventDescription
                                totalSupply1={totalSupply}
                                account={account}
                                team={team}
                              />

                              {/* <Col
                                xs="6"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <div>
                                  <CardTitle tag="h6">Description</CardTitle>
                                  <CardTitle tag="h6">
                                    Total Supply : 200 ETH
                                  </CardTitle>
                                  <CardTitle tag="h6">
                                    Current Price : 200 ETH
                                  </CardTitle>
                                  <CardTitle tag="h6">
                                    Start:{" "}
                                    {moment(team.start).format("DD-MM-YYYY")}
                                  </CardTitle>
                                  <CardTitle tag="h6">
                                    End:{" "}
                                    {moment(team.start).format("DD-MM-YYYY")}
                                  </CardTitle>
                                </div>
                              </Col> */}
                            </Row>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Row style={{ justifyContent: "center" }}>
            <Col
              xs={6}
              lg={3}
              style={{ textTransform: "capitalize" }}
              className="text-info "
            >
              no records found
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Team;
