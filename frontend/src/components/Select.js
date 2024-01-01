import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Select = ({ notes, monthText }) => {
  const context = useContext(noteContext);
  const { tags, selectedValue, setSelectedValue } = context;
  console.log("this is the tags", tags);

  const uniquetags = new Set(tags);
  console.log("uniquetags", uniquetags);
  const uniqueTagsArray = Array.from(uniquetags);
  console.log("this is the selected value", selectedValue);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const renderOptions = () => {
    if (monthText === "Task") {
      return (
        <>
          <option value="All">Select Task</option>
          {console.log("this is the unique tags", uniqueTagsArray)}
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </>
      );
    } else if (monthText === "Month") {
      return (
        <>
          <option value="">Select Month</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </>
      );
    } else if (monthText === "Year") {
      console.log("this is the unique tags++", uniqueTagsArray);
      return (
        <>
          <option value="">Select Year</option>
          {uniqueTagsArray.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </>
      );
    }

    return null; // Default case
  };

  return (
    <div
      className="mb-3 col-md-4"
      style={{ marginTop: "10px", marginLeft: "0px" }}
    >
      <select
        className="form-control"
        id="tag"
        value={selectedValue}
        name="tag"
        required
        onChange={handleSelectChange}
        style={{ width: "205px" }}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export default Select;
