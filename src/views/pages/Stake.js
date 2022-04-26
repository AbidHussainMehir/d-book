import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  Container
} from "reactstrap";

const Stake = () => {
  const [amount, setAmount] = React.useState("");
  const [amountError, setAmountError] = React.useState(false);

  const handleSubmit = () => {
    if (!amount) {
      setAmountError(true);
    }
  };
  return (
    <>
      <div className="content">
        <Container>
      <Row style={{ justifyContent: "center" }}>
              <Col lg="5" md="6">
                <Card
                  className="card-pricing card-primary"
                  style={{ maxHeight: "200px", minHeight: "200px" }}
                >
                  <CardBody
                    className="d-flex justify-content-center align-items-center"
                    style={{ maxHeight: "200px", minHeight: "200px" }}
                  >
                    <CardTitle tag="h1"></CardTitle>

                    <div className="card-prices">
                      <h3 className="text-on-front">
                     <span> Coming Soon</span>
                        
                      </h3>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </Container>
        {/* <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card>
              <CardBody>
                <Form action="#">
                  <label>Amount</label>
                  <FormGroup className={amountError && "has-danger"}>
                    <Row>
                      <Col sm={9}>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmountError(false);
                        setAmount(e.target.value);
                      }}
                    />
                    {amountError && (
                      <span className="form-text " style={{ color: "red" }}>
                        {`Please Enter Amount`}
                      </span>
                    )}
                  </Col>
                  <Col sm={3}>
                  <Button
                  block
                  // className="mb-3"
                  color="primary"
                  href="#pablo"
                  onClick={(e) => {e.preventDefault()
                    setAmount(200)
                  }}
                  size="sm"
                >
                  All
                </Button>
                </Col>
                </Row>
                </FormGroup>

                </Form>
                <Form action="#">
                  <label>Rate of claim</label>
                  <FormGroup className={amountError && "has-danger"}>
                    <Input
                      type="number"
                      value={amount*60}
                      // onChange={(e) => {
                      //   setAmountError(false);
                      //   setAmount(e.target.value);
                      // }}
                      // disabled
                    />
                     
                    {amountError && (
                      <span className="form-text " style={{ color: "red" }}>
                        {`Please Enter Amount`}
                      </span>
                    )}
                  </FormGroup>
                
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  block
                  className="mb-3"
                  color="primary"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  size="lg"
                >
                  Claim
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Col lg="4" md="6">
            <Card >
              <CardHeader>
                
                <CardTitle tag="h1"> </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="">
                  <Row style={{ marginTop: "5px" }}>
                    <Col xs="6">
                      <CardTitle tag="h1"> 200ETH </CardTitle>
                    </Col>
                  </Row>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  block
                  className="mb-3"
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  Claim Rewards
                </Button>
              </CardFooter>
            </Card>
          </Col>

        </Row>
      */}
      </div>
  
    </>
  );
};

export default Stake;
