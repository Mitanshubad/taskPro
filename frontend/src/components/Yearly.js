import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";

function Yearly(props) {
  const [time, setTime] = useState("");
  const deadlinetime = `${time}`;
  const context = useContext(noteContext);
  const { addYearly, tagchange, setTagchange } = context;

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

    console.log(deadlinetime);
    e.preventDefault();
    addYearly(
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
    <div className="container " style={{ marginTop: "10px" }}>
      <h1>Add Yearly task:</h1>
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
                Deadline
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
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Year
                </label>
                <select
                  className="form-select"
                  id="tag"
                  value={notes.tag}
                  name="tag"
                  required
                  onChange={onChange}
                >
                  <option value="All">Select a Year</option>
                  {/* Generating options for the next 10 years from the current year onwards */}
                  {Array.from({ length: 10 }, (_, index) => (
                    <option
                      key={index}
                      value={new Date().getFullYear() + index}
                    >
                      {new Date().getFullYear() + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleClick}
          style={{ marginTop: "20px" }}
          disabled={
            notes.tag.length < 1 ||
            notes.title.length < 1 ||
            notes.description.length < 1
          }
          className="btn btn-primary"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Yearly;
