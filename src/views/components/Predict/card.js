import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";
import "./index.css";
const PredictionSteps = ({ title, description1, description2 }) => {
  return (
    <Col md={4} xs={12} lg={6} xl={4}>
      <div style={{ cursor: "pointer" }} className="predict-card">
        <Row>
          <Col md={12} xs={12}>
            <div className="text-center pt-2 pb-2 predict-step text-uppercase">
              {title}
            </div>
          </Col>
          <Col md={12} xs={12}>
            <div className="text-center pt-2 pb-2 step-details ">
              {description1}
            </div>
          </Col>
          <Col md={12} xs={12}>
            <div className="text-center pt-2 pb-2 step-details ">
              {description2}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default PredictionSteps;
