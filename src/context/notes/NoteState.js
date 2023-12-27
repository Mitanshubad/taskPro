import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const host = "http://localhost:5000";

  // fetching all daily tasks
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
    console.log(json);
  };

  // fetch monthly tasks
  const getMonthly = async () => {
    const response = await fetch(`${host}/api/notes/fetchallmonthly`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add daily task
  const addNote = async (title, description, tag, deadline, deadlinetime) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag, deadline, deadlinetime }),
    });

    const note = await response.json();

    console.log("adding the notes ", note);
    setNotes(notes.concat(note));
  };

  // addmonthlytasks
  const addMonthly = async (
    title,
    description,
    tag,
    deadline,
    deadlinetime
  ) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/notes/addMonthlytask/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag, deadline, deadlinetime }),
    });

    const note = await response.json();

    console.log("adding the notes ", note);
    setNotes(notes.concat(note));
  };

  // Delete daily tasks
  const deleteNote = async (id) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // delete monthly notes
  const deleteMonthly = async (id) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/notes/deleteMonthly/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const host = "http://localhost:5000";
    const data = {
      title: title,
      description: description,
      tag: tag,
    };
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const editMonthly = async (id, title, description, tag) => {
    const host = "http://localhost:5000";
    const data = {
      title: title,
      description: description,
      tag: tag,
    };
    const response = await fetch(`${host}/api/notes/updateMonthly/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const [time, setTime] = useState("");
  const [meridian, setMeridian] = useState("AM");

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        time,
        setTime,
        meridian,
        setMeridian,
        addMonthly,
        getMonthly,
        deleteMonthly,
        editMonthly,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
