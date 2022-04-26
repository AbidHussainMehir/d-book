import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
//sell teams
const Team = ({
  team,
  totalSupply1,
  totalMaxROI,
  handleMaxROI,
  account,
  count,
}) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalSupplyMax, setTotalSupplyMax] = useState(0);

  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      console.log(team, totalSupply1 * 0.31);
      console.log(team, totalSupply1 * 0.16);
      let supplyContract = new web3.eth.Contract(abi, token);
      totalSupplyData = await supplyContract.methods.totalSupply().call();
      decimals = await supplyContract.methods.decimals().call();
      let s = parseFloat(totalSupplyData) / Math.pow(10, decimals);
      let t = (0.16 * parseFloat(totalSupply1)) / s;
      let tMax = parseFloat(totalSupply1) / s;
      if (team?.pId === 93 || team?.pId === 902) {
        tMax = (0.31 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 902 || team?.pId === 61) {
        tMax = (0.5 * parseFloat(totalSupply1)) / s;
        t = (0.3 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 99) {
        tMax = (0.3 * parseFloat(totalSupply1)) / s;
        t = (0.1 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 1002) {
        tMax = (0.30 * parseFloat(totalSupply1)) / s;
        t = (0.15 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 1003) {
        tMax = (0.50 * parseFloat(totalSupply1)) / s;
        t = (0.20 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 1001) {
        tMax = (0.30 * parseFloat(totalSupply1)) / s;
        t = (0.07 * parseFloat(totalSupply1)) / s;
      }
      
      setTotalSupply(t == "Infinity" ? 0 : t);
      setTotalSupplyMax(tMax == "Infinity" ? 0 : tMax);
      if (parseFloat(tMax == "Infinity" ? 0 : tMax)?.toFixed(2) > 0) {
        console.log(
          "parseFloat(tMax==Infinity?0:tMax)?.toFixed(2))",
          parseFloat(tMax == "Infinity" ? 0 : tMax)?.toFixed(2)
        );

        handleMaxROI(parseFloat(tMax == "Infinity" ? 0 : tMax)?.toFixed(2));
      }
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
  }, [totalSupply1, account]);

  return (
    <>
      {/* {totalMaxROI > 1.2 && ( */}
      <Row style={{ justifyContent: "space-between" }}>
        {count > 2 && (
          <Col>
            <p className="min-roi text-center">{`Min ROI: ${
              totalSupply ? totalSupply.toFixed(2) : 0
            }`}</p>
          </Col>
        )}
        <Col>
          <p className="max-roi text-center">{`Max ROI: ${
            totalSupplyMax ? totalSupplyMax.toFixed(2) : 0
          }`}</p>
        </Col>
      </Row>
      {/* )} */}
    </>
  );
};

export default Team;
