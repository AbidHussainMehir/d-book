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
// import { t10 } from "variables/general";
import { t10 } from "../../variables/rewardPageData";

import { rewardList } from "variables/general";
import { useParams } from "react-router-dom";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../variables/contractData";
import { SUPPLY_ABI, SUPPLY_ADDRESS } from "../../variables/totalSupply";
import Demo from "../../assets/img/app/demo.jpg";
import { Spinner } from "reactstrap";
import TeamCard from "./TeamsCard";
import ROI from "./ROI";
import ROIBuyBtn from "./ROIBuyBtn";
import TeamDetailCard from "../components/Events/DetailCard";
import RewardBtn from "./RewardBtn";

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
  useEffect(() => {
    console.log("t10", t10);
    let _teams1 = [...t10];
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
    rewardList &&
      rewardList.forEach((element) => {
        if (element.id == id) {
          name = element.code;
        }
      });
    return name;
  };
  const getSellTitle = (id) => {
    let name = "";
    rewardList &&
      rewardList.forEach((element) => {
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
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        let supplyContract = new web3.eth.Contract(SUPPLY_ABI, SUPPLY_ADDRESS);
        let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        setAccount(accounts[0]);
        let totalSupplyData = await supplyContract.methods.totalSupply().call();
        let name = getSellName(id);

        let times = await contract2.methods.isSaleOn(name).call();

        setTime(times?.saleEnd);
        let symbolData = await supplyContract.methods.symbol().call();
        setSymbol(symbolData);
        checkSale();
        localStorage.setItem("account", accounts[0]);
        let ac = localStorage.getItem("approved");


        let chainId= await web3.eth.getChainId()
        let accc = localStorage.getItem("approved2");

        if (accc) {
          let cc = JSON.parse(accc);
          let index = cc.findIndex((i) => i.account === accounts[0]&&i.chainId===chainId);
      
          if (index >-1) {

            setApproved(true);
          }
        }
        // else
        // {
        //   localStorage.setItem("approved2", JSON.stringify([{ account: accounts[0], chainId: chainId }]));
        // }

        // if (ac == accounts[0]) {
        //   setApproved(true);
        // }

        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
          let name = getSellName(id);
          let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
          let times = await contract2.methods.isSaleOn(name).call();
          setTime(times?.saleEnd);
          localStorage.setItem("account", accounts[0]);
          let ac = localStorage.getItem("approved");
          let ac2 = localStorage.getItem("approved2");
          let obj;
          let chainId= await web3.eth.getChainId()

          let accc = localStorage.getItem("approved2");
          if (accc) {
            let cc = JSON.parse(accc);
            let index = cc.findIndex((i) => i.account === accounts[0]&&i.chainId===chainId);
        
            if (index >-1) {
              setApproved(true);
            }
          }
          if (ac == accounts[0]) {
            setApproved(true);
          }
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
  const buy = async (team, bnbAmount) => {
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
        let approve_amount =
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"; //(2^256 - 1 )

        tokenContract.methods
          .approve(
            CONTRACT_ADDRESS,
            approve_amount
            // web3.utils.toWei("99999999999")
          )
          .send({
            from: account,
          })
          .on("transactionHash", async (hash) => {
            console.log(hash);
            toast.info("Your approval is pending");
          })
          .on("receipt", async (receipt) => {
            setApproved(true);
            let chainId= await web3.eth.getChainId()

            let accc = localStorage.getItem("approved2");
            if (accc) {
              let cc = JSON.parse(accc);
              let index = cc.findIndex((i) => i.account === account&&i.chainId===chainId);
              console.log("index",index)
              if (index < 0) {
                cc.push({ account: account, chainId: chainId });
                localStorage.setItem("approved2", JSON.stringify(cc));
              }
            }else{
              localStorage.setItem("approved2", JSON.stringify([{ account: account, chainId: chainId }]));
            }
            localStorage.setItem("approved", account);
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
      let _teams = [...t10];
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

        

        {t10?.filter(a=>a.pId==id)?.length > 0 ? (
          <Row>
            {t10?.filter(a=>a.pId==id)?.map((team, index) => {
              return (
                <RewardBtn
                
                approved1={approved}
                account={account} eNames={team?.eNames} team={team} key={index} index={index}/>
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
