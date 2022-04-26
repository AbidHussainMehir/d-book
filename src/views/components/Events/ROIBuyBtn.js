import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

//sell teams
const Team = ({ team, totalSupply1, buy, sale, bnbAmount }) => {
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

      // let t = (0.16 * parseFloat(totalSupply1)) / s;
      // let tMax = (0.31 * parseFloat(totalSupply1)) / s;
      let t = (0.16 * parseFloat(totalSupply1)) / s;
      let tMax = parseFloat(totalSupply1) / s;
      if (team?.pId === 93 || team?.pId === 902) {
        tMax = (0.31 * parseFloat(totalSupply1)) / s;
      }
      if (team?.pId === 902 || team?.pId === 61) {
        tMax = (0.5 * parseFloat(totalSupply1)) / s;
        t = (0.3 * parseFloat(totalSupply1)) / s;
      }
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
        <ModalHeader toggle={toggle}>Sorry!</ModalHeader>
        {parseFloat(totalSupplyMax) < 1.3 && (
          <ModalBody>
            This transaction will not be allowed because it will result in a
            loss with the current ROI even if your pick wins the grand prize.
            Please take a look at the other options, and remember, at Robinos,
            we reward the other positions as well other than the champion! So,
            you might want to choose another team that can perform strongly, and
            with a better ROI currently.
            <br />
            <br />
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
      <Button
        onClick={(e) =>
          parseFloat(totalSupplyMax) < 1.3
            ? toggle()
            : buy(team.code, bnbAmount)
        }
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
