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
const Events = ({ name, account, event, index }) => {
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
        <div
          className="event-image"
          style={{
            backgroundImage: `url(${event?.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Row>
          <Col md={12} xs={12}>
            <p className="text-center  pt-2 pb-2 event-name">{event.title}</p>
          </Col>
          <Col md={12} xs={12}>
            <p className="text-center pt-2 pb-2 event-dates-details">
              {" "}
              DATES AND DETAILS
            </p>
          </Col>
          {account ?
            <Col md={12} xs={12}>
              <Row>
                <Col>
                  <p className="team-info text-left">
                    Sale Start Date:{" "}
                    {moment(startTime * 1000).format("DD MMM YYYY")}
                  </p>
                </Col>
                <Col>
                  <p className="team-info text-left">
                    Sale End Date: {moment(time * 1000).format("DD MMM YYYY")}
                  </p>
                </Col>
              </Row>
            </Col> : <Col md={12} xs={12}>
              <Row>

                <Col className="team-info text-center" style={{display:'flex',justifyContent:'center',marginBottom:'15px'}}>
                  {/* <p className="team-info text-center"> */}
                    <div class="dot-elastic"></div>

                  {/* </p> */}
                </Col>
              </Row>
            </Col>

          }
          <Col md={12} xs={12} className="text-center">
            <button
              className="events-team"
              onClick={() =>
                history.push(
                  event?.redirect === "ufc"
                    ? `/ufc/teams/${event.id}`
                    : `/teams/${event.id}`
                )
              }
            >
              View Teams
            </button>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Events;
