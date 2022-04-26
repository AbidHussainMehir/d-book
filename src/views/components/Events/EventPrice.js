import React, { useEffect, useState } from "react";

const Team = ({ team, account, totalSupply1 }) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [minROI, setminROI] = useState(0);
  const [maxROI, setmaxROI] = useState(0);
  const getTotalSupply = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);
      totalSupplyData = await supplyContract.methods.totalSupply().call();
      // decimals = await supplyContract.methods.decimals().call();
      let s = parseFloat(totalSupplyData) / Math.pow(10, 18);
      setTotalSupply(s);

      let t = (0.16 * parseFloat(totalSupply1)) / s;
      let tMax = (0.31 * parseFloat(totalSupply1)) / s;
      console.log(" totalSupplyData", totalSupplyData);
      console.log(" supplyContracmethods", totalSupply1);

      setminROI(t);
      setmaxROI(tMax);
    } catch (e) {
      console.log(e?.message);
    }
  };
  const getCurrentPrice = async (token, abi) => {
    const web3 = window.web3;

    let totalSupplyData = 0;
    let decimals = 18;
    try {
      let supplyContract = new web3.eth.Contract(abi, token);

      totalSupplyData = await supplyContract.methods.getReserves().call();
      decimals = await supplyContract.methods.decimals().call();
      setEndTime(totalSupplyData?._blockTimestampLast);
      setCurrentPrice(totalSupplyData?._reserve0 / totalSupplyData?._reserve1);
      // let s = parseFloat(totalSupplyData) / Math.pow(10, decimals);
      // setTotalSupply(s);
    } catch (e) {
      console.log(e?.message);
    }
  };
  useEffect(() => {
    if (team?.contract) {
      getCurrentPrice(team?.contractE, team?.abiE);
      getTotalSupply(team?.contract, team?.abi);
    }
  }, []);
  useEffect(() => {
    getCurrentPrice(team?.contractE, team?.abiE);
    getTotalSupply(team?.contract, team?.abi);
  }, [team, account, totalSupply1]);

  return (
    <>
     {team?.pId===91?"1":currentPrice} {` USDC`}
    </>
  );
};

export default Team;
