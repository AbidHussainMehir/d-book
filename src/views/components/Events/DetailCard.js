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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap";
import Timer from "../../../components/timer/components/app";
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
import TeamCard from "./TeamsCard";
import TeamsCardTotalSupply from "../../pages/TeamsCardTotalSupply";
import ROI from "./ROI";
import ROIBuyBtn from "./ROIBuyBtn";
import EventPrice from "./EventPrice";

//sell teams
const Team = ({
  team,
  index,
  buy,
  approve,
  account,
  sale,
  totalSupply,
  totalMaxROI,
  approved,
  handleMaxROI,
  count,
}) => {
  const { id } = useParams();
  const [errorState, setErrorState] = useState(false);
  const [balace, setBalance] = useState(0);
  const [time, setTime] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [loader, setLoader] = useState(false);
  const [bnbAmount, SetbnbAmount] = useState(null);
  const [openedPanel, setopenedPanel] = React.useState({
    0: false,
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getSellName = (id) => {
    let name = "";
    sells &&
      sells.forEach((element) => {
        if (element.id == id) {
          name = element.code;
        }
      });
    return name;
  };

  const handleAddTokenToMetaMask = (team) => {
    try {
      window?.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: team?.contract,
              symbol: team?.code?.slice(0, 11),
              decimals: 18,
            },
          },
        })
        .then((success) => {
          if (success) {
            toast.success(`${team?.code} successfully added to wallet!`);
          } else {
            toast.error("Something went wrong.");

            throw new Error("Something went wrong.");
          }
        })
        .catch((e) => toast.error(e?.message));
    } catch (e) {
      toast.error(e?.message);
    }
  };

  return (
    <>
      <Col
        lg="4"
        md="6"
        key={index}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="event-card">
          <div style={{ minHeight: "97px" }}>
            <Row>
              <Col xs="6">
                <div
                  className="team-detail-card-img"
                  style={{
                    backgroundImage: `url(${team?.img})`,
                    // backgroundImage: `url(${images[index]})`,
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: team?.imageCover ? "cover" : "contain",
                    backgroundSize: team?.imageCover ? "contain" : "cover",
                    backgroundPosition: "center",
                    // backgroundColor: team?.color ? team?.color : "#000",
                  }}
                ></div>
              </Col>
              <Col xs="6">
                {/* <div className="numbers"> */}
                <p className="titlee">{team.title}</p>
                {/* </div> */}
              </Col>
            </Row>
          </div>
          <div
            aria-multiselectable={true}
            className="card-collapse"
            id="accordion"
            role="tablist"
          >
            <div className="card-plain">
              <div role="tab">
                <a
                  aria-expanded={openedPanel === index}
                  href="#pablo"
                  data-parent="#accordion"
                  data-toggle="collapse"
                  onClick={(e) => {
                    e.preventDefault();

                    setopenedPanel(openedPanel === index ? -1 : index);
                    SetbnbAmount("");
                  }}
                ></a>

                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col xs="12">
                    {team.id === 90215 ? (
                      <p className="team-info">
                        Note: Min and Max ROI will only be applicable if the
                        team ends up in any of the prized positions. If multiple
                        unlisted players reach the semi-finals, the Any Other
                        Players backer can receive multiple allocated rewards.
                      </p>
                    ) : (
                      <p className="team-info">
                        Note: Min and Max ROI will only be applicable if the
                        team ends up in any of the prized positions.
                      </p>
                    )}
                  </Col>
                  <Col xs="12">
                    <p className="text-center header-title">TOKEN DETAILS</p>
                  </Col>
                  <Col xs="12">
                    <Row>
                      <Col>
                        <p className="team-info">
                          {`Total Supply: `}
                          <TeamsCardTotalSupply team={team} />
                        </p>
                      </Col>
                      <Col>
                        <p className="team-info">
                          {`Current Price: `}
                          <EventPrice
                            totalSupply={totalSupply}
                            team={team}
                            account={account}
                          />
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  {/* {totalMaxROI > 1.2 && ( */}
                  <Col xs="12">
                    <p className="text-center header-title">
                      RETURN ON INVESTMENT
                    </p>
                  </Col>
                  {/* // )} */}
                  <Col xs={12}>
                    <ROI
                      count={count}
                      account={account}
                      totalSupply1={totalSupply}
                      team={team}
                      totalMaxROI={totalMaxROI}
                      handleMaxROI={handleMaxROI}
                    />
                  </Col>
                  <Col xs="12">
                    <p className="text-center header-title ">TRADE TOKEN</p>
                  </Col>
                  <Col xs="12">
                    <Row>
                      <Col>
                        <a
                          href={
                            sale?.saleActive
                              ? ""
                              : `https://pancakeswap.finance/swap?inputCurrency=${team?.contract}&outputCurrency=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d`
                          }
                          target="_blank"
                        >
                          <Button
                            color="warning"
                            size="sm"
                            disabled={sale?.saleActive}
                          >
                            Trade on BSC
                          </Button>
                        </a>
                      </Col>
                      <Col>
                        {team?.contract && (
                          <Button
                            onClick={(e) => handleAddTokenToMetaMask(team)}
                            color="warning"
                            size="sm"
                            style={{ width: "8rem" }}
                          >
                            Add to wallet
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="12">
                    <p className="text-center header-title">
                      APPROVE - PURCHASE
                    </p>
                  </Col>
                  <Col xs="12">
                    <Row>
                      <Col style={{ flexGrow: 1 }}>
                        <FormGroup>
                          <Input
                            type="number"
                            value={bnbAmount}
                            // disabled={!approved}
                            onChange={(e) => {
                              if (
                                e.target.value > -1 ||
                                e.target.value === ""
                              ) {
                                SetbnbAmount(e.target.value);
                              }
                            }}
                            min={0}
                            className="inp"
                            placeholder="Amount"
                          />
                        </FormGroup>
                      </Col>
                      {loader ? (
                        <Col style={{ width: "200px" }}>
                          <Button
                            color="warning"
                            size="sm"
                            style={{ width: "6rem" }}
                            disabled={!sale?.saleActive}
                          >
                            <Spinner
                              color="light"
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                              }}
                            />
                          </Button>
                        </Col>
                      ) : (
                        <Col style={{ width: "120px" }} xs={4}>
                          {approved ? (
                            <ROIBuyBtn
                              totalSupply1={totalSupply}
                              team={team}
                              buy={buy}
                              bnbAmount={bnbAmount}
                              sale={sale}
                            />
                          ) : (
                            <Button
                              onClick={(e) => approve(team.code)}
                              color="warning"
                              size="sm"
                              style={{ width: "6rem" }}
                              disabled={!sale?.saleActive}
                            >
                              Approve
                            </Button>
                          )}
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Col xs="12">
                    <div>
                      <TeamCard team={team} account={account} />

                      {sale?.saleUpdateTime && (
                        <CardTitle tag="h6">
                          End:{" "}
                          {moment(sale?.saleUpdateTime * 1000).format(
                            "DD-MM-YYYY"
                          )}
                        </CardTitle>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Team;
