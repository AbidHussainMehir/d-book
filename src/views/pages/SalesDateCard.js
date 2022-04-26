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
import { ABI, CONTRACT_ADDRESS } from "../../variables/contractData";
import Web3 from "web3";
const Events = ({ name,account }) => {
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
    <>
      <div
        className="numbers"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {startTime && (
          <CardTitle
            tag="h6"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="tim-icons icon-calendar-60" />
            <span style={{ marginLeft: "7px" }}>
              {moment(startTime * 1000).format("YYYY-MM-DD")}
            </span>
          </CardTitle>
        )}
        {time && (
          <CardTitle
            tag="h6"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="tim-icons icon-calendar-60" />
            <span style={{ marginLeft: "7px" }}>
              {moment(time * 1000).format("YYYY-MM-DD")}
            </span>
          </CardTitle>
        )}
      </div>
    </>
  );
};

export default Events;
