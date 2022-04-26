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
          <Col md={12} xs={12}>
            <Row>
              
              <Col>
                <p className="team-info text-center">
                 Coming Soon
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={12} xs={12} className="text-center">
            <button
              className="events-team"
              disabled={true}
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
