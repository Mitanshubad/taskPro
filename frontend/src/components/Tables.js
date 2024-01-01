import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notificationSound from "../notificationsound.mp3";
import { Link } from "react-router-dom";

function Tables() {
  const audioRef = useRef(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Anom",
      task: "Task1",
      taskDescription: "Description1",
      startDate: "2023-01-01",
      endDate: "2023-01-15",
      gender: "Male",
    },
    {
      id: 2,
      name: "Megha",
      task: "Task2",
      taskDescription: "Description2",
      startDate: "2023-02-01",
      endDate: "2023-02-15",
      gender: "Female",
    },
    {
      id: 3,
      name: "Subham",
      task: "Task3",
      taskDescription: "Description3",
      startDate: "2023-03-01",
      endDate: "2023-03-15",
      gender: "Male",
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableCell, setEditableCell] = useState(null);

  const handleCheckboxChange = (name) => {
    if (selectedRows.includes(name)) {
      setSelectedRows(selectedRows.filter((row) => row !== name));
    } else {
      setSelectedRows([...selectedRows, name]);
    }
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: data.length + 1,
      name: "",
      task: "",
      taskDescription: "",
      startDate: "",
      endDate: "",
      gender: "",
    };
    setData([...data, newTask]);
  };

  const handleUpdate = () => {
    const sortedData = [...data].sort((a, b) => a.id - b.id);
    setData(sortedData);
    console.log("Update button clicked!");

    // Check if all checkboxes are selected
    const allTasksCompleted = data.every((row) =>
      selectedRows.includes(row.name)
    );
    if (allTasksCompleted) {
      // Show the notification popup
      audioRef.current.play();
      toast.success("You have completed all the tasks. Goal is reached! 🎉", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  };

  const handleEditClick = (rowIndex, columnName) => {
    setEditableCell({ rowIndex, columnName });
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const handleInputBlur = () => {
    setEditableCell(null);
  };

  const handleDelete = (name) => {
    const newData = data.filter((row) => row.name !== name);
    setData(newData);
  };

  return (
    <div className="container">
      <div className="heading-container">
        <h3>Process:</h3>
        <p>Add Process Given by the mentor.</p>
      </div>
      <audio ref={audioRef} src={notificationSound} />
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped table-hover  table-condensed"
          style={{
            border: "2px solid green",
            marginTop: "30px",
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name of mentor</th>
              <th>Task</th>
              <th>Task Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Complete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, rowIndex) => (
              <tr key={rowIndex}>
                <td onClick={() => handleEditClick(rowIndex, "id")}>
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "id" ? (
                    <input
                      type="text"
                      value={val.id}
                      onChange={(e) => handleInputChange(e, rowIndex, "id")}
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.id
                  )}
                </td>
                <td onClick={() => handleEditClick(rowIndex, "name")}>
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "name" ? (
                    <input
                      type="text"
                      value={val.name}
                      onChange={(e) => handleInputChange(e, rowIndex, "name")}
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.name
                  )}
                </td>
                <td onClick={() => handleEditClick(rowIndex, "task")}>
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "task" ? (
                    <input
                      type="text"
                      value={val.task}
                      onChange={(e) => handleInputChange(e, rowIndex, "task")}
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.task
                  )}
                </td>
                <td
                  onClick={() => handleEditClick(rowIndex, "taskDescription")}
                >
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "taskDescription" ? (
                    <input
                      type="text"
                      value={val.taskDescription}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "taskDescription")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.taskDescription
                  )}
                </td>
                <td onClick={() => handleEditClick(rowIndex, "startDate")}>
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "startDate" ? (
                    <input
                      type="text"
                      value={val.startDate}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "startDate")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.startDate
                  )}
                </td>
                <td onClick={() => handleEditClick(rowIndex, "endDate")}>
                  {editableCell &&
                  editableCell.rowIndex === rowIndex &&
                  editableCell.columnName === "endDate" ? (
                    <input
                      type="text"
                      value={val.endDate}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, "endDate")
                      }
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    val.endDate
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(val.name)}
                    checked={selectedRows.includes(val.name)}
                  />
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(val.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button className="btn btn-primary  " onClick={handleAddNewTask}>
          Add New Task
        </button>
        <button className="btn btn-success  mx-2" onClick={handleUpdate}>
          Update
        </button>
        <Link to="/roadmap">
          <button
            className="btn bg-dark  mx-1"
            onClick={handleUpdate}
            style={{ color: "white" }}
          >
            Back
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Tables;
