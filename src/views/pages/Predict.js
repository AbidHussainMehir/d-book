import React from "react";
import { Row, Col } from "reactstrap";
import PredictionCard from "../components/Predict/card";
import "./css/predict.css";

const steps = [
  {
    title: "Step 1",
    description1:
      "Head over to sales to check out the current sports events. Click in to view the teams participating for those events!",
    description2: "",
  },
  {
    title: "Step 2",
    description1: "Purchase team tokens to predict!",
    description2:
      " Click on approve, then approve it to your MetaMask. Make sure that you have enough USDC on BSC to purchase.",
  },
  {
    title: "Step 3",
    description1:
      "Enter the amount you would like to purchase and then click on Buy!",
    description2:
      "You should be able to see your Total Purchased Token below the Team Card!",
  },
];

const Predict = () => {
  return (
    <>
      <div className="content">
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="9" md="9" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-title">How To Predict</h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                If you need help, let us tell you how to start predicting on
                your favourite team!
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="9" md="9" sm="12" xs="12">
            {steps?.length > 0 ? (
              <Row
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {steps?.map((step, index) => {
                  return (
                    <PredictionCard
                      key={index}
                      title={step.title}
                      description1={step.description1}
                      description2={step.description2}
                    />
                  );
                })}
              </Row>
            ) : (
              <Row style={{ justifyContent: "center" }}>
                <Col
                  xs={6}
                  lg={3}
                  style={{ textTransform: "capitalize" }}
                  className="text-info"
                >
                  no records found
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-title">FAQs</h3>
            </div>
          </Col>
        </Row>

        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Do give all the FAQs a read first. If your question is not here,
                let us know in the Discord Group!
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="faq-subTitle">
                I cannot see the events I'm interested in on the Events page
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                The sales for the event has probably ended. Please check out
                Past Sales on the Events page
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="faq-subTitle">
                The prediction event has concluded, and I'd like to claim my
                winnings!
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Please head over to the rewards page to check out winning team
                tokens that are eligible for prize claims!
              </h3>
            </div>
          </Col>
        </Row>

        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="faq-subTitle">Min and Max ROI</h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Min ROI is derived from the lowest possible winning prize, while
                Max ROI is derived from the highest possible winning prize. So,
                if your selection wins the event, you will be rewarded with the
                Max ROI.
              </h3>
            </div>
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                To check out more specific ROIs, head over to the Prize
                Calculator!
              </h3>
            </div>
          </Col>
        </Row>

        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="faq-subTitle">
                I cannot see my team tokens in my wallet
              </h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Please click on the 'add to wallet' button on the Events page
                for each respective teams.
              </h3>
            </div>
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Alternatively, you can click on Wallet at the top of the page to
                check out your holdings!
              </h3>
            </div>
          </Col>
        </Row>

        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="faq-subTitle">How can I buy the team tokens?</h3>
            </div>
          </Col>
        </Row>
        <Row className="p-2" style={{ justifyContent: "center" }}>
          <Col lg="5" md="5" sm="12" xs="12">
            <div
              className="header text-center mb-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3 className="predict-subTitle">
                Currently, we only support BSC Operations. So, BNB will be
                required for gas, and USDC(BEP20) will be required to purchase
                the team tokens.
              </h3>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Predict;
