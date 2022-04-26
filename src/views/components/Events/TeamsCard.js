import React, { useEffect, useState } from "react";
import {
  Col,
} from "reactstrap";

//sell teams
const Team = ({ team,account }) => {
  const [totalSupply, setTotalSupply] = useState(0);
let balance=-1;
  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);
     
      let blnce = await supplyContract.methods.balanceOf(account).call();
    
      decimals = await supplyContract.methods.decimals().call();
      setTotalSupply(blnce /Math.pow(10, decimals));
    } catch (e) {
      console.log(e?.message);
    }
  };
  useEffect(() => {
    getTotalSupply(team?.contract, team?.abi);
  }, []);
  useEffect(() => {
    getTotalSupply(team?.contract, team?.abi);
  }, [team,account]);

  return (
    <>
      <Col xs="12" className="text-center pt-2 pb-2 ">
        <p className="team-info text-center">
        Total Purchased Token : {totalSupply}
        {` ${team.code}`}
    
       </p>
      </Col>
    </>
  );
};

export default Team;
