import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardHeader,
  Collapse,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap";
import Timer from "../../../components/timer/components/app";
import Web3 from "web3";
import moment from "moment";
import classnames from "classnames";
import { sellTeams } from "variables/general";
import { sells } from "variables/general";
import { useParams } from "react-router-dom";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../../variables/contractData";
import { SUPPLY_ABI, SUPPLY_ADDRESS } from "../../../variables/totalSupply";

import Demo from "../../../assets/img/app/demo.jpg";
import { Spinner } from "reactstrap";
import TeamCard from "./TeamsCard";
import ROI from "./ROI";
import ROIBuyBtn from "./ROIBuyBtn";

//sell teams
const Team = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [balace, setBalance] = useState(0);
  const [sale, setSale] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [time, setTime] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [approved, setApproved] = useState(false);
  const [loader, setLoader] = useState(false);

  const [bnbAmount, SetbnbAmount] = useState(null);
  const [openedPanel, setopenedPanel] = React.useState({
    0: false,
  });
  const [search, setSearch] = React.useState("");
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [modal, setModal] = useState(false);
  const [ totalMaxROI, setTotalMaxROI] = useState(0);
const handleMaxROI=(v)=>{
  if(v>totalMaxROI){
    setTotalMaxROI(v)
  }
}
  const toggle = () => setModal(!modal);
  useEffect(() => {
    console.log("sellTeams",sellTeams)
    let _teams1 = [...sellTeams];
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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
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
  const getSellTitle = (id) => {
    let name = "";
    sells &&
      sells.forEach((element) => {
        if (element.id == id) {
          name = element.title;
        }
      });
    return name;
  };
  const checkSale = async () => {
    try {
      const web3 = window.web3;

      //is sale on
      let contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      let name = getSellName(id);

      let isSaleOn = await contract.methods.isSaleOn(name).call();
      setSale({ ...isSaleOn });
      //end is sale on
      console.log("isSaleOn", isSaleOn);
    } catch (error) {
      console.log("error message", error?.message);
    }
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
        let symbolData = await supplyContract.methods.symbol().call();
        setSymbol(symbolData);
        checkSale();
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
  const buy = async (team) => {
    if (account === null) {
      toast.error("Metamask is not installed");
    } else {
      try {
        setLoader(true);
        const web3 = window.web3;

        let contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        let name = getSellName(id);
        console.log("name, team", name, team);
        contract.methods
          .buyTokens(name, team, web3.utils.toWei(bnbAmount))
          .send({
            from: account,
            gas: 500000,
            // value: web3.utils.toWei(bnbAmount),
          })
          .on("transactionHash", async (hash) => {
            console.log("hash", hash);

            toast.info("Your transaction is pending");
          })
          .on("receipt", async (receipt) => {
            console.log("receipt", receipt);

            SetbnbAmount(null);
            setLoader(false);

            toast.success("Your transaction is confirmed");
          })
          .on("error", async (error) => {
            toast.error(error.message);
            setLoader(false);
          });
      } catch (e) {
        setLoader(false);

        toast.error(e.message);
        console.log("errrorrr", e.message);
      }
    }
  };
  const approve = async (team) => {
    if (account === null) {
      toast.error("Metamask is not installed");
    } else {
      try {
        const web3 = window.web3;
        setLoader(true);

        let tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
        console.log(
          " we",
          tokenContract.methods.approve(
            CONTRACT_ADDRESS,
            web3.utils.toWei("999999999")
          )
        );
        tokenContract.methods
          .approve(CONTRACT_ADDRESS, web3.utils.toWei("99999999999"))
          .send({
            from: account,
          })
          .on("transactionHash", async (hash) => {
            console.log(hash);
            toast.info("Your approval is pending");
          })
          .on("receipt", async (receipt) => {
            setApproved(true);

            console.log(receipt);
            setLoader(false);

            toast.success("Your approval is confirmed");
          })
          .on("error", async (error) => {
            console.log(error.message);
            setLoader(false);

            toast.error(error.message);
          });
      } catch (e) {
        toast.error(e.message);
        setLoader(false);

        console.log("errrorrr989", e.message);
      }
    }
  };
  useEffect(() => {
    if (id) {
      let _teams = [...sellTeams];
      _teams = _teams.filter((team) => team.pId == id);
      setFilteredTeams([..._teams]);
    }
  }, [id]);
  const handleAddTokenToMetaMask = (team) => {
    try {
      window?.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: team?.contract,
              symbol: team?.code?.slice(0, 11),
              decimals: 18,
            },
          },
        })
        .then((success) => {
          if (success) {
            toast.success(`${team?.code} successfully added to wallet!`);
          } else {
            toast.error("Something went wrong.");

            throw new Error("Something went wrong.");
          }
        })
        .catch((e) => toast.error(e?.message));
    } catch (e) {
      toast.error(e?.message);
    }
  };

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
          <h3 className="title">{getSellTitle(id)}</h3>
        </div>
        
        {time && <Timer sale={sale} Ctime={time} />}
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col lg="4" md="6" sm={12}>
            <Card className="card-stats">
              <CardBody>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                  Prize Pool
                </h1>
                <p style={{ display: "flex", justifyContent: "center" }}>
                  {totalSupply}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row style={{ justifyContent: "center", marginBottom: "20px" }}>
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
        </Row> */}

        {filteredTeams?.length > 0 ? (
          <Row>
            {filteredTeams?.map((team, index) => {
              return (<>
                <Col lg="4" md="6" key={index}>
                  <Card className="card-stats">
                    <CardBody style={{minHeight:"97px"}}>
                      <Row>
                        <Col xs="3">
                          <div
                            className="info-icon text-center icon-warning"
                            style={{
                              backgroundImage: `url(${
                                team?.img ? team?.img : Demo
                              })`,
                              // backgroundImage: `url(${images[index]})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100% 100%",
                              backgroundPosition: "center",
                              borderRadius: "50px",
                              minHeight:"100px",
                              backgroundColor:team?.color ? team?.color :  "#000",
                              // backgroundColor: "#F5F6FA",
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
                      <Card className="card-plain">
                        <CardHeader role="tab">
                          <a
                            aria-expanded={openedPanel === index}
                            href="#pablo"
                            data-parent="#accordion"
                            data-toggle="collapse"
                            onClick={(e) => {
                              e.preventDefault();

                              setopenedPanel(
                                openedPanel === index ? -1 : index
                              );
                              SetbnbAmount("");
                            }}
                          >
                            <ROI totalSupply1={totalSupply} team={team} 
                            
                            totalMaxROI={totalMaxROI}
                            handleMaxROI={handleMaxROI}
                            />

                            <Row style={{ justifyContent: "space-between" }}>
                              <Col>Details</Col>

                              <Col>
                                <i className="tim-icons icon-minimal-down" />
                              </Col>
                            </Row>
                          </a>
                        </CardHeader>

                        <Collapse
                          role="tabpanel"
                          isOpen={openedPanel === index}
                        >
                          <CardBody>
                            <Row
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Col xs="12">
                              <p>
                                Note: Min and Max ROI will only be applicable if the team ends up in any of the prized positions.
                              </p>
                                </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Input
                                    type="number"
                                    value={bnbAmount}
                                    disabled={!approved}
                                    onChange={(e) => {
                                      if (
                                        e.target.value > -1 ||
                                        e.target.value === ""
                                      ) {
                                        SetbnbAmount(e.target.value);
                                      }
                                    }}
                                    min={0}
                                    placeholder="Amount"
                                  />
                                </FormGroup>
                              </Col>
                              {loader ? (
                                <Col
                                  xs="12"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button
                                    color="warning"
                                    size="sm"
                                    style={{ width: "6rem" }}
                                    disabled={!sale?.saleActive}
                                  >
                                    <Spinner
                                      color="light"
                                      style={{
                                        width: "1.5rem",
                                        height: "1.5rem",
                                      }}
                                    />
                                  </Button>
                                </Col>
                              ) : (
                                <Col
                                  xs="12"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  {team?.contract && (
                                    <Button
                                      onClick={(e) =>
                                        handleAddTokenToMetaMask(team)
                                      }
                                      color="warning"
                                      size="sm"
                                      style={{ width: "8rem" }}
                                    >
                                      Add to wallet
                                    </Button>
                                  )}
                                  {approved ? (
                                    <ROIBuyBtn totalSupply1={totalSupply} team={team}  buy={buy} sale={sale}/>
                                    
                                  ) : (
                                    <Button
                                      onClick={(e) => approve(team.code)}
                                      color="warning"
                                      size="sm"
                                      style={{ width: "6rem" }}
                                      disabled={!sale?.saleActive}
                                    >
                                      Approve
                                    </Button>
                                  )}
                                </Col>
                              )}
                            </Row>
                            <Row
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Col
                                xs="12"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <div>
                                  <CardTitle tag="h6">Description</CardTitle>
                                  <TeamCard team={team} />
                                  {/* <CardTitle tag="h6">
                                    Total Supply :{" "}
                                    {getTotalSupply(team?.contract, team?.abi)
                                      ? getTotalSupply(
                                          team?.contract,
                                          team?.abi
                                        )
                                      : ""}
                                    {` ${team.code}`}
                                    
                                  </CardTitle> */}
                                  {/* <CardTitle tag="h6">
                                    Current Price : 200 ETH
                                  </CardTitle>
                                  <CardTitle tag="h6">
                                    Start:{" "}
                                    {moment(team.start).format("DD-MM-YYYY")}
                                  </CardTitle> */}
                                  {sale?.saleUpdateTime && (
                                    <CardTitle tag="h6">
                                      End:{" "}
                                      {moment(
                                        sale?.saleUpdateTime * 1000
                                      ).format("DD-MM-YYYY")}
                                    </CardTitle>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Collapse>
                      </Card>
                    </div>
                  </Card>
                </Col>
                {index===0&&<Col lg="4" md="12" className="d-flex justify-content-center align-items-center">
                  <p className="vs">
                  VS</p>
                  </Col>}
             </> );
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
