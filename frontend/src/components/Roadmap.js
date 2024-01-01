import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
import Tables from "./Tables";
import { Link } from "react-router-dom";
function Roadmap(props) {
  const [time, setTime] = useState("");

  const deadlinetime = `${time}`;
  const context = useContext(noteContext);
  const { addNote, tagchange, setTagchange } = context;

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
    console.log("this is the tagchaking ", tagchange);
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
    addNote(
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
    <div className="container my-4">
      <h1>Add Goals and Roadmap.</h1>
      <form style={{ marginTop: "20px" }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Goal
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
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={notes.tag}
                name="tag"
                minLength={5}
                required
                onChange={onChange}
                placeholder="Health, Education,  etc."
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <Link to="/Tables">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                // AddProcess functionality
                // You can define the functionality for AddProcess here
              }}
            >
              AddProcess
            </button>
          </Link>

          <button
            type="submit"
            onClick={handleClick}
            disabled={
              notes.tag.length < 1 ||
              notes.title.length < 1 ||
              notes.description.length < 1
            }
            className="btn btn-success"
            style={{ marginLeft: "20px" }}
          >
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
}

export default Roadmap;
