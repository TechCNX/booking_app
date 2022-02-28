import React from "react";
import ReactDOM from "react-dom";
import { Button, Alert } from "@mui/material";
import Calendar from "react-calendar";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "react-calendar/dist/Calendar.css";

const WEEKDAY_RATE = 100;
const WEEKEND_RATE = 150;
const MINUTES_PER_HOUR = 60;
const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

let weekend = false;
let selectedDate = "";
let startTime = "";
let endTime = "";
let hours = 0;

function App() {
  return (
    <div>
      <h1>Choose a date to book</h1>
      <Calendar onClickDay={onClick} />

      <h1>Choose the Start and end time</h1>
      <h2> Start </h2>
      <TimePicker
        placeholder="Select Time"
        use12Hours
        minuteStep={15}
        showSecond={false}
        focusOnOpen={true}
        format="hh:mm A"
        onChange={(e) => setStartTime(e)}
      />
      <h2> End </h2>
      <TimePicker
        placeholder="Select Time"
        use12Hours
        minuteStep={15}
        showSecond={false}
        focusOnOpen={true}
        format="hh:mm A"
        onChange={(e) => setEndTime(e)}
      />
      <br />
      <br />
      <Button variant="contained" onClick={(e) => onSubmit(e)}>
        Submit
      </Button>
      <br />
      <br />
      <div id="output"></div>
      <br />
    </div>
  );
}

function setStartTime(v) {
  startTime =
    v.hour().toString().padStart(2) + ":" + v.minute().toString().padStart(2);
}

function setEndTime(v) {
  endTime =
    v.hour().toString().padStart(2) + ":" + v.minute().toString().padStart(2);
}

function onClick(v, e) {
  if (v.getDay() === 0 || v.getDay() === 6) {
    weekend = true;
  }

  selectedDate = FORMATTER.format(v);
}

function onSubmit(e) {
  let array = startTime.split(":");
  let st =
    Number.parseFloat(array[0]) +
    Number.parseFloat(array[1] / MINUTES_PER_HOUR);

  array = endTime.split(":");
  let et =
    Number.parseFloat(array[0]) +
    Number.parseFloat(array[1] / MINUTES_PER_HOUR);

  hours = (24 - st + et) % 24;

  let cost = 0;
  if (weekend === true) {
    cost = hours * WEEKEND_RATE;
  }

  if (weekend === false) {
    cost = hours * WEEKDAY_RATE;
  }
  if (selectedDate !== "" && startTime !== "" && endTime !== "") {
    ReactDOM.render(
      <div>
        <Alert severity="info">
          Thank you for your interest! Your booking on {selectedDate} at{" "}
          {startTime} for {hours} hours, will cost ${cost}.
        </Alert>
      </div>,
      document.querySelector("#output")
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
