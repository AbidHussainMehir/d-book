import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { sells } from "variables/general";
import { ABI, CONTRACT_ADDRESS } from "../../../variables/contractData";
import Web3 from "web3";
import "./index.css";
const WalletCard = ({ name, account, event, index }) => {
  const history = useHistory();
  const [search, setSearch] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [searchFocus, setSearchFocus] = React.useState("");
  const [filteredEvents, setFilteredEvents] = useState([...sells]);

  const metamask = async () => {
    try {
      const web3 = window.web3;
      let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      let times = await contract2.methods.isSaleOn(name).call();
      setTime(times?.saleEnd);
      setStartTime(times?.saleStart);

      window.ethereum.on("accountsChanged", async function (accounts) {
        let contract2 = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
        let times = await contract2.methods.isSaleOn(name).call();
        setTime(times?.saleEnd);
        setStartTime(times?.saleStart);
      });
    } catch (error) {
      console.log("error", error);
      console.log("error message", error?.message);
    }
  };
  useEffect(() => {
    metamask();
  }, []);
  useEffect(() => {
    metamask();
  }, [account]);
  return (
    <Col md={12} xs={12} lg={6} xl={4}>
      <div style={{ cursor: "pointer" }} className="ecard">
        <Row style={{ alignItems: "center", justifyContent: "center" }}>
          <Col
            md={5}
            xs={5}
            lg={5}
            // style={{ background: "red" }}
            className="wallet-image"
            style={{
              backgroundImage: `url(${event?.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          ></Col>
          <Col md={6} xs={6} lg={6}>
            <p className="text-center pt-2 pb-2 wallet-title">Team Name</p>
            <p className="text-center pt-2 pb-2 wallet-title">Event Name</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} lg={12}>
            <p className="text-center pt-2 pb-2 wallet-title "> Wallet</p>
          </Col>
          <Col md={12} xs={12} lg={12}>
            <p className="text-center pt-2 pb-2 wallet-subtitle">
              BALANCE: 1234
            </p>
          </Col>
          <Col md={12} xs={12} lg={12}>
            <p className="text-center pt-2 pb-2 wallet-subtitle">
              TOTAL APPROVED IN POOL: 1200
            </p>
          </Col>
          <Col md={12} xs={12} lg={12}>
            <p className="text-center pt-2 pb-2 wallet-title">token details</p>
          </Col>
          <Col md={6} xs={6} lg={6}>
            <p className="text-center pt-2 pb-2 wallet-subtitle">
              TOTAL SUPPLY: 10000.00
            </p>
          </Col>
          <Col md={6} xs={6} lg={6}>
            <p className="text-center pt-2 pb-2 wallet-subtitle">
              CURRENT PRICE: 1 USDC{" "}
            </p>
          </Col>
          <Col md={6} xs={6} lg={6}>
            <div className="text-center pt-2 pb-2 min-roi">
              MIN PRICE: 0.9230
            </div>
          </Col>
          <Col md={6} xs={6} lg={6}>
            <div className="text-center pt-2 pb-2 max-roi">
              MAX PRICE: 1.2345
            </div>
          </Col>
          <Col md={12} xs={12} lg={12}>
            <p className="text-center pt-2 pb-2 wallet-title">
              Return On Investment
            </p>
          </Col>

          <Col md={6} xs={6} lg={6}>
            <div className="text-center pt-2 pb-2 min-roi">
              MIN PRICE: 0.9230
            </div>
          </Col>
          <Col md={6} xs={6} lg={6}>
            <div className="text-center pt-2 pb-2 max-roi">
              MAX PRICE: 1.2345
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default WalletCard;
