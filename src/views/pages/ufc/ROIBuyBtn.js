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
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

//sell teams
const Team = ({ team, totalSupply1, buy, sale }) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalSupplyMax, setTotalSupplyMax] = useState(0);
  const [modal, setModal] = useState(false);
  const [check, setCheck] = useState(false);

  const toggle = () => setModal(!modal);
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

      setTotalSupply(t);
      setTotalSupplyMax(tMax);
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
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Warning!</ModalHeader>
        {parseInt(totalSupply) < 1 ? (
          <ModalBody>
            This team is currently overbought. If this team do not win the event
            but comes up as runner up, the ROI will be lesser than the amount
            invested.
            <br />
            <br />
            Consider looking at other teams that will have a good chance of
            finishing in the other prized positions in order to achieve a
            respectable min ROI at the end of the event.
            <br />
            <br />
            <Input
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
              type="checkbox"
              style={{ margin: "0px 6px", position: "unset" }}
            />
            I understand, and I will not hold Robinos responsible if the ROI
            results in a loss when I buy in now.
          </ModalBody>
        ) : (
          parseInt(totalSupply) < 1 &&
          parseInt(totalSupplyMax) < 1 && (
            <ModalBody>
              This team is currently overbought. If this team wins the the event
              by placing in the top position, the reward will be extremely
              minimal. If this team do not win the event but comes up as runner
              up, the ROI will be lesser than the amount invested.
              <br />
              <br />
              Consider looking at other teams that will have a good chance of
              finishing in the other prized positions in order to achieve a
              respectable ROI at the end of the event.
              <br />
              <br />
              <Input
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
                type="checkbox"
                style={{ margin: "0px 6px", position: "unset" }}
              />
              I understand, and I will not hold Robinos responsible if the ROI
              results in a loss when I buy in now
            </ModalBody>
          )
        )}
        <ModalFooter>
          <Button
            color="primary"
            disabled={!check}
            onClick={() => {
              toggle();
              buy(team.code);
            }}
          >
            Buy
          </Button>{" "}
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {console.log(parseInt(totalSupply) < 1)}
      {console.log(parseInt(totalSupply))}
      <Button
        onClick={(e) => (parseInt(totalSupply) < 1 ? toggle() : buy(team.code))}
        color="warning"
        size="sm"
        style={{ width: "6rem" }}
        disabled={!sale?.saleActive}
      >
        Buy
      </Button>
    </>
  );
};

export default Team;
