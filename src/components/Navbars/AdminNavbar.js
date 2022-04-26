import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  UncontrolledTooltip,
  NavItem,
} from "reactstrap";
import Web3 from "web3";

const AdminNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [modalSearch, setModalSearch] = React.useState(false);
  const [account, setAccount] = useState(null);

  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor("navbar-transparent");
    } else {
      setColor("bg-white");
    }
    setCollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setModalSearch(!modalSearch);
  };
  const metamask = async () => {
    console.log("weeee=======================");

    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("weeee=======================");

        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
        console.log("weeee=======================", "2");
      } else {
        isConnected = false;
        const web3 = window.web3;
        console.log("weeeqqe=======================", accounts);

        let accounts = await web3.eth.getAccounts();
        console.log("weeee=======================", accounts);
        setAccount(accounts[0]);
      }
      if (isConnected === true) {
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error message", error?.message);
    }
  };
  React.useEffect(() => {
    metamask();
  }, []);
  React.useEffect(() => {
    metamask();
  }, [window]);
  const StyledChip = withStyles({
    root: {
      position: "absolute",
      bottom: 25,
      right: -10,
      background: "transparent",
      color: "#b72620",
    },
  })(Chip);
  return (
    <>
      <Navbar
        className={classNames("navbar-absolute", {
          [color]: props.location.pathname.indexOf("full-screen-map") === -1,
        })}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            {/* <div className="navbar-minimize d-inline">
              <Button
                className="minimize-sidebar btn-just-icon"
                color="link"
                id="tooltip209599"
                onClick={props.handleMiniClick}
              >
                <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
                <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip209599"
                placement="right"
              >
                Sidebar toggle
              </UncontrolledTooltip>
            </div> */}
            <div className="connect-div">
              {account
                ? `${account.slice(0, 5)}...${account.slice(
                    account.length - 5,
                    account.length
                  )}`
                : "Connect Wallet"}
            </div>
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              {/* <button
                className="navbar-toggler"
                type="button"
                onClick={props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button> */}
            </div>
            {/* <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {"props.brandText"}
            </NavbarBrand> */}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar" tag="li">
                <Button
                  color="link"
                  data-target="#searchModal"
                  data-toggle="modal"
                  id="search-button"
                  onClick={toggleModalSearch}
                >
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      You have 5 more tasks
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Your friend Michael is in town
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another notification
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            */}

              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink href="/">Events</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/wallet">Wallet</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/stake">Stake</NavLink>
                </NavItem>
                <NavItem>
                  {/* <NavLink href="/calculator">Prize Calculator</NavLink> */}
                  <NavLink style={{ position: "relative" }}>
                    <StyledChip size="small" label="Coming Soon"></StyledChip>
                    Prize Calculator
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/reward">Reward</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/prediction">How to Predict</NavLink>
                </NavItem>
              </Nav>
              <UncontrolledDropdown nav>
                {/* <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/icon_dex.svg").default}
                    />
                  </div>
                </DropdownToggle> */}
                {/* <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu> */}
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AdminNavbar;
