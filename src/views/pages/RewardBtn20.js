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
import Timer from "../../components/timer/components/app";
import Web3 from "web3";
import moment from "moment";
import classnames from "classnames";
import { t10 } from "../../variables/rewardPageData";
import { sells } from "variables/general";
import { useParams } from "react-router-dom";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../variables/contractData";
import { SUPPLY_ABI, SUPPLY_ADDRESS } from "../../variables/totalSupply";
import { REWARD_ABI, REWARD_ADDRESS } from "../../variables/rewardPageContract";
import New_York_Knicks from "../../assets/img/app/New_York_Knicks.png";
import Toronto_Raptors from "../../assets/img/app/Toronto_Raptors.png";
import Nba_logo from "../../assets/img/app/nba_logo.png";
import Los_Angeles_Lakers from "../../assets/img/app/Los_Angeles_Lakers.png";
import Golden_State_Warriors from "../../assets/img/app/Golden_State_Warriors.png";
import Demo from "../../assets/img/app/demo.jpg";
import { Spinner } from "reactstrap";
import TeamCard from "./TeamsCardReward";
import ROI from "./ROI";
import ROIBuyBtn from "./ROIBuyBtnReward";

const images = [
  New_York_Knicks,
  Los_Angeles_Lakers,
  Golden_State_Warriors,
  Toronto_Raptors,
  Nba_logo,
];
//sell teams
const Team = ({ team, index,account,eNames }) => {
  // const [account, setAccount] = useState(null);
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
  const [totalMaxROI, setTotalMaxROI] = useState(0);
  const handleMaxROI = (v) => {
    if (v > totalMaxROI) {
      setTotalMaxROI(v);
    }
  };
  const toggle = () => setModal(!modal);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const checkSale = async () => {
    try {
      const web3 = window.web3;

      //is sale on
      let contract = new web3.eth.Contract(REWARD_ABI, REWARD_ADDRESS);
      let isSaleOn = await contract.methods.isSaleOn(eNames).call();
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

       let totalSupplyData = await supplyContract.methods.totalSupply().call();
        let name = eNames;

        let times = await contract2.methods.isSaleOn(name).call();

        setTime(times?.saleEnd);
        let symbolData = await supplyContract.methods.symbol().call();
        setSymbol(symbolData);
        checkSale();
        localStorage.setItem("account", accounts[0]);
        window.ethereum.on("accountsChanged", async function (accounts) {
        
          let name = eNames;
          let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          let times = await contract2.methods.isSaleOn(name).call();
          setTime(times?.saleEnd);
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

        let contract = new web3.eth.Contract(REWARD_ABI, REWARD_ADDRESS);

        let name = eNames;
        contract.methods
          .sellTokens(name, team, web3.utils.toWei(bnbAmount))
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
    console.log("teamasasdsadsads", team);
    if (account === null) {
      toast.error("Metamask is not installed");
    } else {
      try {
        const web3 = window.web3;
        setLoader(true);

        let tokenContract = new web3.eth.Contract(team?.abi, team?.contract);

        tokenContract.methods
          .approve(REWARD_ADDRESS, web3.utils.toWei("99999999999"))
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

  const handleAddTokenToMetaMask = (team) => {
    try {
      window?.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
              symbol: "USDT",
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
  const getBalance = async (team) => {
    if (account === null) {
      toast.error("Metamask is not installed");
    } else {
      try {
        const web3 = window.web3;

        let contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        let name = eNames;
        let b = await contract.methods
          .balanceOf(name, team.code, account)
          .call();
        // let b = await contract.methods.balanceOf(name,team.code,account).call();

        SetbnbAmount(b / Math.pow(10, 18));
        console.log("balanceOf", b / Math.pow(10, 18));
      } catch (e) {
        toast.error(e.message);
        console.log("errrorrr", e.message);
      }
    }
  };
  return (
    <>
      <Col lg="4" md="6">
        <Card className="card-stats">
          <CardBody style={{ minHeight: "97px" }}>
            <Row>
              <Col xs="3">
                <div
                  className="info-icon text-center icon-warning"
                  style={{
                    backgroundImage: `url(${team?.img ? team?.img : Demo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    borderRadius: "50px",
                    backgroundColor: team?.color ? team?.color : "#000",
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

                    setopenedPanel(openedPanel === index ? -1 : index);
                    SetbnbAmount("");
                  }}
                >
                  {/* <ROI totalSupply1={totalSupply} team={team} 
                            
                            totalMaxROI={totalMaxROI}
                            handleMaxROI={handleMaxROI}
                            /> */}

                  <Row style={{ justifyContent: "space-between" }}>
                    <Col>Details</Col>

                    <Col>
                      <i className="tim-icons icon-minimal-down" />
                    </Col>
                  </Row>
                </a>
              </CardHeader>

              <Collapse role="tabpanel" isOpen={openedPanel === index}>
                <CardBody>
                  <Row
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Col xs="110">
                      <FormGroup>
                        <Input
                          type="number"
                          value={bnbAmount}
                          disabled={!approved}
                          onChange={(e) => {
                            if (e.target.value > -1 || e.target.value === "") {
                              SetbnbAmount(e.target.value);
                            }
                          }}
                          min={0}
                          placeholder="Amount"
                        />
                       
                      </FormGroup>
                    </Col>
                    <Col xs="2" className="pb-2">
                     
                        <Button
                          onClick={(e) => getBalance(team)}
                          color="warning"
                          size="sm"
                          // style={{ width: "8rem" }}
                        >
                          max
                        </Button>
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
                            onClick={(e) => handleAddTokenToMetaMask(team)}
                            color="warning"
                            size="sm"
                            style={{ width: "8rem" }}
                          >
                            Add to wallet
                          </Button>
                        )}
                        {approved ? (
                          <ROIBuyBtn
                            totalSupply1={totalSupply}
                            team={team}
                            buy={buy}
                            sale={sale}
                          />
                        ) : (
                          <Button
                            onClick={(e) => approve(team)}
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
                        <TeamCard team={team} account={account} />

                        {sale?.saleUpdateTime && (
                          <CardTitle tag="h6">
                            End:{" "}
                            {moment(sale?.saleUpdateTime * 1000).format(
                              "DD-MM-YYYY"
                            )}
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
    </>
  );
};

export default Team;
