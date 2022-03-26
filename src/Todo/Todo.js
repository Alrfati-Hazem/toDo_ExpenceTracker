import React, { useContext } from "react";
import { TodoCtx } from "../Contexts/TodoContext";
import "./Todo.css";

export default function Todo() {
  let {
    tasks,
    showForm,
    showFormHandler,
    ToDoFormValuesHandler,
    ToDoFormHandler,
    DeleteTask,
    title,
    date,
    StatusTask,
    showFormEdit,
    showFormEditHandler,
    saveFormEditHandler,
  } = useContext(TodoCtx);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="todo-header-text">
          <h3>To-Do-List</h3>
        </div>
        <div className="buttons">
          {/* <button>Show Completed Tasks</button> */}
          {showFormEdit ? (
            ""
          ) : (
            <button
              className={showForm ? "red-background" : ""}
              onClick={showFormHandler}
            >
              {" "}
              {showForm ? "Close" : "Add Task"}{" "}
            </button>
          )}
        </div>
      </div>
      {showForm ? (
        <form className="todo-form">
          <div className="todo-form-box">
            <label>Title</label>
            <input
              value={title}
              name="title"
              type="text"
              onInput={ToDoFormValuesHandler}
            />
          </div>
          <div className="todo-form-box">
            <label>Time &amp; Date</label>
            <input
              value={date}
              name="date"
              type="text"
              onInput={ToDoFormValuesHandler}
            />
          </div>
          <div className="todo-form-box">
            <button onClick={ToDoFormHandler}>Save Task</button>
          </div>
        </form>
      ) : (
        ""
      )}
      {showFormEdit ? (
        <form className="todo-form">
          <div className="todo-form-box">
            <label>Title</label>
            <input
              value={title}
              name="title"
              type="text"
              onInput={ToDoFormValuesHandler}
            />
          </div>
          <div className="todo-form-box">
            <label>Time &amp; Date</label>
            <input
              value={date}
              name="date"
              type="text"
              onInput={ToDoFormValuesHandler}
            />
          </div>
          <div className="todo-form-box">
            <button onClick={saveFormEditHandler}>Update Task</button>
          </div>
        </form>
      ) : (
        ""
      )}
      {tasks.length === 0 ? (
        <p className="todo-tasks-status"> No Tasks To Show </p>
      ) : (
        <ul className="to-do-list-tasks">
          {tasks.map((task, index) => {
            return (
              <li
                className={`to-do-task ${task.status ? "green" : "orange"}`}
                key={index}
                onDoubleClick={() => StatusTask(index)}
              >
                <div className="task-text">
                  <span
                    style={{
                      textDecoration: `${
                        task.status ? "line-through" : "none"
                      }`,
                    }}
                  >
                    {task.title}
                  </span>
                  <span
                    style={{
                      textDecoration: `${
                        task.status ? "line-through" : "none"
                      }`,
                    }}
                  >
                    {task.date}
                  </span>
                </div>
                <div className="icons">
                  <span onClick={() => showFormEditHandler(index)}>
                    <i className="fas fa-edit"></i>
                  </span>
                  <span onClick={() => DeleteTask(index)}>
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
