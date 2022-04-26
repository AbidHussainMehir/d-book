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
import { sellTeams } from "variables/general";
import { sells } from "variables/general";
import { useParams } from "react-router-dom";
import {
  ABI,
  CONTRACT_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../../variables/contractData";
import { REWARD_ABI,REWARD_ADDRESS } from "../../variables/rewardPageContract";
import New_York_Knicks from "../../assets/img/app/New_York_Knicks.png";
import Toronto_Raptors from "../../assets/img/app/Toronto_Raptors.png";
import Nba_logo from "../../assets/img/app/nba_logo.png";
import Los_Angeles_Lakers from "../../assets/img/app/Los_Angeles_Lakers.png";
import Golden_State_Warriors from "../../assets/img/app/Golden_State_Warriors.png";
import Demo from "../../assets/img/app/demo.jpg";
import { Spinner } from "reactstrap";


const Team = ({ team ,account,eName}) => {
  const [totalSupply, setTotalSupply] = useState(0);
// console.log("log",team,account,eName)
  const getTotalSupply = async (code) => {
    const web3 = window.web3;

    let decimals = 18;
    try {
      let rewardContract = new web3.eth.Contract(REWARD_ABI, REWARD_ADDRESS);
      let rewardContractDate = await rewardContract.methods.getRate(eName,code).call();
      // console.log("rewardContractDaterewardContractDate",rewardContractDate)
      setTotalSupply(rewardContractDate?.numerator/rewardContractDate?.denominator);
    } catch (e) {
      console.log(e?.message);
    }
  };
  useEffect(() => {
    
    getTotalSupply(team?.code);
  }, []);
  useEffect(() => {
    getTotalSupply(team?.code);
  }, [team,account]);

  return (
    <>
      <CardTitle tag="h6" style={{display:"flex",justifyContent:"center"}}>
        Rate : {totalSupply}
      </CardTitle>
    </>
  );
};

export default Team;
