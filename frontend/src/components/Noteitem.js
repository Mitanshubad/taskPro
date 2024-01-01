import React from "react";
import { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, updateNote, notes } = props;
  const context = useContext(noteContext);
  const { deleteNote, deleteMonthly, tagchange, setTagchange, deleteYearly } =
    context;
  const formatDateWithTime = (dateString) => {
    // Check if the provided dateString is invalid
    if (
      !dateString ||
      !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString)
    ) {
      throw new Error("Invalid date string provided");
    }

    // Create a new Date object from the string
    const dateObject = new Date(dateString);

    // Extract the day, month, year, hour, minute, and period
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString().substring(2);
    const hour = dateObject.getHours().toString().padStart(2, "0");
    const minute = dateObject.getMinutes().toString().padStart(2, "0");
    const period = dateObject.getHours() >= 12 ? "PM" : "AM";

    // Format the date string
    return `${day}-${month}-${year} (${hour}:${minute} ${period})`;
  };

  function formatDate(dateStr) {
    // Parse the date string using the ISO 8601 format
    const dateObj = new Date(dateStr);

    // Get the day, month, and year
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString().slice(-2);

    // Return the date in the desired format
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <div
        className="card border-success mb-3 "
        style={{ maxWidth: "18rem", margin: "10px" }}
      >
        <div
          className="card-header bg-transparent border-success"
          style={{ padding: "10px" }}
        >
          <div>{note.tag}</div>
        </div>

        <div className="d-flex " style={{ marginTop: "20px" }}>
          <h5 className="card-title p-2 flex-grow-1 " style={{ margin: "5px" }}>
            Task:
          </h5>
          <i
            className="fa-solid fa-pen-to-square p-2"
            onClick={() => {
              updateNote(note);
              props.showAlert("Updated successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-trash  p-2"
            onClick={() => {
              const confirmation = prompt(
                `Are you sure you want to delete this task?
               `,
                "Yes"
              );
              if (confirmation === "Yes") {
                if (props.path === "Monthly") {
                  deleteMonthly(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                } else if (props.path === "Yearly") {
                  deleteYearly(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                } else {
                  deleteNote(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                }
              }
              props.showAlert("Deleted successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-square-check p-2"
            onClick={() => {
              const confirmation = prompt(
                `Are you sure you want to complete this task?
               `,
                "Yes"
              );
              if (confirmation === "Yes") {
                if (props.path === "Monthly") {
                  deleteMonthly(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                } else if (props.path === "Yearly") {
                  deleteYearly(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                } else {
                  deleteNote(note._id);
                  if (tagchange) {
                    setTagchange(false);
                  } else {
                    setTagchange(true);
                  }
                }
              }
            }}
          ></i>
        </div>
        <div>
          <h5
            className="card-title p-2 flex-grow-1 "
            style={{ marginLeft: "5px", borderRadius: "5px" }}
          >
            {note.title}
          </h5>
        </div>
        <div
          className="card-body text-success"
          style={{ marginBottom: "10px" }}
        >
          <p className="card-text">{note.description}</p>
        </div>
        <div className="card-footer bg-transparent border-success">
          <small className="text-muted">
            Created at: {formatDateWithTime(note.date)}
          </small>

          <div className="text-muted mt-2">
            <small>
              Deadline: {formatDate(note.deadline)} ({note.deadlinetime})
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
