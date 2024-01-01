import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
import TimeInput from "./TimeInput";

function Monthly(props) {
  const [time, setTime] = useState("");
  const [meridian, setMeridian] = useState("AM");
  const deadlinetime = `${time} ${meridian}`;
  const context = useContext(noteContext);
  const { addNote, addMonthly, tagchange, setTagchange } = context;

  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
    deadline: "",
  });

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    if (tagchange) {
      setTagchange(false);
    } else {
      setTagchange(true);
    }
    notes.title = document.getElementById("title").value;
    notes.description = document.getElementById("description").value;
    notes.tag = document.getElementById("tag").value;
    notes.deadline = document.getElementById("deadline").value;
    e.preventDefault();
    addMonthly(
      notes.title,
      notes.description,
      notes.tag,
      notes.deadline,
      deadlinetime
    );
    setNotes({ title: "", description: "", tag: "", deadline: "" });
    props.showAlert("Added successfully", "success");
  };
  return (
    <div className="container my-3">
      <h1>Add Monthly task:</h1>
      <form style={{ marginTop: "20px" }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={notes.title}
            minLength={5}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={notes.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="md-3">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="description" className="form-label">
                Year and deadline
              </label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                name="deadline"
                value={notes.deadline}
                onChange={onChange}
                style={{ width: "205px" }}
                required
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="tag" className="form-label">
                Month
              </label>
              <select
                className="form-control"
                id="tag"
                value={notes.tag}
                name="tag"
                required
                onChange={onChange}
                style={{ width: "205px" }}
              >
                <option value="">Select a Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleClick}
          disabled={
            notes.tag.length < 1 ||
            notes.title.length < 1 ||
            notes.description.length < 1
          }
          className="btn btn-primary"
          style={{ marginTop: "30px" }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Monthly;
