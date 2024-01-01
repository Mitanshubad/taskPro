import React, { useState } from "react";

const TimeInput = ({ time, setTime }) => {
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      <label htmlFor="time" className="form-label">
        Select time:
      </label>
      <input
        type="text"
        id="time"
        value={time}
        onChange={handleChangeTime}
        placeholder="Start time-End time (example: 10:00am-11:00am)"
        style={{ marginLeft: "10px", width: "400px" }}
        className="form-control"
      />
    </>
  );
};

export default TimeInput;
