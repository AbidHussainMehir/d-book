import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
//sell teams
const Team = ({ team, totalSupply1 ,
  totalMaxROI,
  handleMaxROI
}) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalSupplyMax, setTotalSupplyMax] = useState(0);

  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);
      totalSupplyData = await supplyContract.methods.totalSupply().call();
      decimals = await supplyContract.methods.decimals().call();
      let s = parseFloat(totalSupplyData) / Math.pow(10, decimals);
      console.log("s", s);
      console.log("totalSupply1", totalSupply1);
      let t = (0.16 * parseFloat(totalSupply1)) / s;
      let tMax = (0.31 * parseFloat(totalSupply1)) / s;
      console.log(t);
      console.log(tMax);
      setTotalSupply(t=="Infinity"?0:t);
      setTotalSupplyMax(tMax=="Infinity"?0:tMax);
      handleMaxROI(parseFloat(tMax)?.toFixed(2))

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
  useEffect(() => {
    getTotalSupply(team?.contract, team?.abi);
  }, [totalSupply1]);

  return (
    <>{(totalMaxROI>1.2)&&
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <span
            style={{ color: "#32CD32" }}
          >{`Max ROI: ${totalSupplyMax.toFixed(2)}`}</span>
        </Col>
        <Col>
          <span style={{ color: "yellow" }}>{`Min ROI: ${totalSupply.toFixed(
            2
          )}`}</span>
        </Col>
      </Row>}
    </>
  );
};

export default Team;
