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

import { Spinner } from "reactstrap";


//sell teams
const Team = ({ team }) => {
  const [totalSupply, setTotalSupply] = useState(0);

  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);
      totalSupplyData = await supplyContract.methods.totalSupply().call();
      decimals = await supplyContract.methods.decimals().call();
      setTotalSupply(totalSupplyData / Math.pow(10, decimals));
    } catch (e) {
      console.log(e?.message);
    }
  };
  useEffect(() => {
    getTotalSupply(team?.contract, team?.abi);
  }, []);
  useEffect(() => {
    getTotalSupply(team?.contract, team?.abi);
  }, [team]);

  return (
    <>
      <CardTitle tag="h6">
        Total Purchased Token : {totalSupply}
        {` ${team.code}`}
        {/* {symbol ? symbol : "-"} */}
      </CardTitle>
    </>
  );
};

export default Team;
