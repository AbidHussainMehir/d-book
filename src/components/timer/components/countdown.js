import React from "react";
import moment from "moment";

const Countdown = ({ countdown }) => {
  return (
    <div
      className="row px-3 mx-1 card-stats mb-3"
      style={{ background: "#7B0000", borderRadius: "5px" ,
       display: "flex", justifyContent: "center" }}
    >
      <div
        className=" col  p-2 m-2 pool"
        style={{
          maxWidth: "20%",
          background: "#7B0000",
          borderRadius: "5px",
        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontSize: "34px",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            overflow:"hidden"
          }}
        >
          {countdown.days||0}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            textTransform:"uppercase"

          }}
        >
          Days
        </p>
      </div>
      <div
        className=" col p-2 m-2 pool"
        style={{
          maxWidth: "20%",
          background: "#7B0000",
          borderRadius: "5px",
        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontSize: "34px",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {countdown.hours||0}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            textTransform:"uppercase"

          }}
        >
          Hours
        </p>
      </div>
      <div
        className="col p-2 m-2 pool"
        style={{
          maxWidth: "20%",
          background: "#7B0000",
          borderRadius: "5px",

        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontSize: "34px",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {countdown.mins||0}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            textTransform:"uppercase"

          }}
        >
          Mins
        </p>
      </div>
      <div
        className="col p-2  m-2 pool"
        style={{
          maxWidth: "20%",
          background: "#7B0000",
          borderRadius: "5px",
        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontSize: "34px",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {countdown.secs||0}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            textTransform:"uppercase"
          }}
        >
          Secs
        </p>
      </div>
    </div>
  );
};

export default Countdown;
