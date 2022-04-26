import React from "react";
import moment from "moment";
import SettingsModal from "./settings-modal";
import Countdown from "./countdown";
import "../stylesheets/index.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: "",
      timeValue: "",
      ampmValue: "am",
      countdown: {
        days: "",
        hours: "",
        mins: "",
        secs: "",
      },
      isCountdownSet: true,
      isModalOpen: false,
      infoMessage: "",
      settingsFormError: false,
      errorMessage: "",
    };
    this.timer = null;
    this.countDownDate = {
      dateValue: this.state.dateValue,
      timeValue: this.state.timeValue,
      ampmValue: this.state.ampmValue,
      unixEndDate: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  renderCountdownDate(countDownDate) {
    if (countDownDate) {
      localStorage.setItem(
        "countDownDate",
        JSON.stringify({
          dateValue: "08-20-2021",
          timeValue: "12:00",
          ampmValue: "pm",
          unixEndDate: 1628924400,
        })
      );
    }
    return (
      JSON.parse(localStorage.getItem("countDownDate")) || this.countDownDate
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event, dateValue, timeValue, ampmValue) {
    event.preventDefault();
    const unixEndDate = Number(
      moment(
        `${dateValue} ${timeValue} ${ampmValue}`,
        "MM-DD-YYYY hh:mm A"
      ).format("X")
    );

    if (!moment(dateValue, "MM-DD-YYYY", true).isValid()) {
      this.setState({
        settingsFormError: true,
        errorMessage:
          "Date input must be a valid date set in MM-DD-YYYY format.",
      });
    } else if (!moment(timeValue, "hh:mm", true).isValid()) {
      this.setState({
        settingsFormError: true,
        errorMessage:
          "Time input must be valid according to the 12-hour clock set in hh:mm format.",
      });
    } else if (unixEndDate - moment().format("X") < 1) {
      this.setState({
        settingsFormError: true,
        errorMessage: "The countdown must be set to a future date.",
      });
    } else {
      this.startCountdown(
        this.renderCountdownDate({
          dateValue,
          timeValue,
          ampmValue,
          unixEndDate,
        })
      );
      this.showModal(false);
    }
  }

  startCountdown(endDate) {
    clearInterval(this.timer);
    this.timer = null;

    if (endDate.unixEndDate !== "1") {
      // 1629315506 -1629215306

      this.timer = setInterval(() => this.playTimer(this?.props?.Ctime), 1000);
    } else {
      this.setState({
        isCountdownSet: false,
        infoMessage: "Click the Settings button to start a new countdown.",
      });
    }
  }

  playTimer(unixEndDate) {
    const distance = unixEndDate - moment().format("X");

    if (distance > 0) {
      this.setState({
        countdown: {
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt((distance % (60 * 60 * 24)) / (60 * 60), 10),
          mins: parseInt((distance % (60 * 60)) / 60, 10),
          secs: parseInt(distance % 60, 10),
        },
        isCountdownSet: true,
        infoMessage: "",
      });
    } else {
      clearInterval(this.timer);
      this.timer = null;
      this.renderCountdownDate(this.countDownDate);
      this.setState({
        isCountdownSet: false,
        infoMessage:
          "Countdown ended. Click the Settings button to start a new countdown.",
      });
    }
  }

  clearCountdown() {}

  showModal(status) {
    this.setState({
      dateValue: this.renderCountdownDate().dateValue,
      timeValue: this.renderCountdownDate().timeValue,
      ampmValue: this.renderCountdownDate().ampmValue,
      isModalOpen: status,
      settingsFormError: false,
    });
  }

  componentDidMount() {
    this.startCountdown(this.renderCountdownDate());

    window.addEventListener("click", (event) => {
      if (event.target.id === "modal") {
        this.showModal(false);
      }
    });
  }
  componentDidUpdate(prep, pres) {
    if (prep?.Ctime !== prep?.Ctime) {
      this.setState({ Ctime: prep?.Ctime });
    }
  }
  render() {
    return (
      <>
        <Countdown
          countdown={this.state.countdown}
          unixEndDate={this.renderCountdownDate().unixEndDate}
        />
      </>
    );
  }
}

export default App;
