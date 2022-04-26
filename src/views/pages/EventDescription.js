import React, { useEffect, useState } from "react";
import { Row, Col, CardTitle, Card, CardHeader, CardBody } from "reactstrap";
import moment, { min } from "moment";

import { Line } from "react-chartjs-2";
const chartExample6 = {
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  },
};
//sell teams
const Team = ({ team,account,totalSupply1}) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [endTime,setEndTime] = useState(0);
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
      setEndTime(totalSupplyData?._blockTimestampLast)
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
  }, [team,account,totalSupply1]);

  return (
    <>
      <Col
        xs="12"
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div>
          <CardTitle tag="h6">Description</CardTitle>
          <CardTitle tag="h6">
            Total Supply : {parseFloat(totalSupply).toFixed(4)}{" "}
            {` ${team.code}`}
          </CardTitle>
          <CardTitle tag="h6">
            Current Price : {currentPrice} {` USD`}
          </CardTitle>
          <CardTitle tag="h6" style={{   color: "#32CD32" }}>
            {`Max ROI: ${maxROI.toFixed(2)}`}
          </CardTitle>
          <CardTitle tag="h6" style={{ color: "yellow" }}>
          {`Min ROI: ${minROI.toFixed(2)}`}
          </CardTitle>
         
          <CardTitle tag="h6">
            Start: {moment("10-12-2021").format("DD-MM-YYYY")}
          </CardTitle>
          <CardTitle tag="h6">
            End: {moment("10-17-2021").format("DD-MM-YYYY")}
          </CardTitle>
         
        </div>
      </Col>
      <Col className="m-0 p-0" xs="12" md="12">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Last week Price</h5>
            {/* <CardTitle tag="h3">
              <i className="tim-icons icon-send text-info" /> 750,000€
            </CardTitle> */}
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Line
                data={(canvas) => {
                  let ctx = canvas.getContext("2d");
                  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                  gradientStroke.addColorStop(1, "rgba(0,135,191,0.2)");
                  gradientStroke.addColorStop(0.8, "rgba(0,135,191,0.1)");
                  gradientStroke.addColorStop(0, "rgba(0,84,119,0)"); //blue colors
                  return {
                    labels: [moment().format("DD MMM")],
                    datasets: [
                      {
                        label: "Data",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#2380f7",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#2380f7",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#2380f7",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: [currentPrice],
                      },
                    ],
                  };
                }}
                options={chartExample6.options}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Team;
