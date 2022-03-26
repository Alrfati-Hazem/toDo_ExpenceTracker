import React, { createContext, useState, useMemo } from "react";

export const TodoCtx = createContext();
TodoCtx.displayName = "Todo";

export const TodoContextProvider = (props) => {
  let [tasks, setTasks] = useState([]);

  useMemo(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  // Show/Hide Form-[Add Task]
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  // Show/Hide Form-[Edit Task]
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState(0);

  const showFormEditHandler = (id) => {
    setShowFormEdit(!showFormEdit);
    let ele = tasks.filter((ele, index) => {
      return id === index;
    })[0];
    setToDoForm({ title: ele.title, date: ele.date, status: ele.status });
    setIndexEdit(id);
  };

  // Save Form-[Edit Task]

  const saveFormEditHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || date.trim() === "") {
      alert("Please fill in all fields");
    } else {
      setShowFormEdit(!showFormEdit);
      let arr = tasks.map((ele, index) => {
        return indexEdit === index
          ? { title: title, date: date, status: status }
          : ele;
      });
      setTasks(arr);
      localStorage.setItem("tasks", JSON.stringify(arr));
      ToDoClearValues();
    }
  };

  // Dealing With Values Of Inputs
  const [{ title, date, status }, setToDoForm] = useState({
    title: "",
    date: "",
    status: false,
  });
  const ToDoFormValuesHandler = (e) => {
    setToDoForm((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  // Form-Submit [Add-Task]
  const ToDoFormHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || date.trim() === "") {
      alert("Please fill in all fields");
    } else {
      let obj = { title: title, date: date, status: status };
      let arr = [];
      if (localStorage.getItem("tasks")) {
        arr = JSON.parse(localStorage.getItem("tasks"));
        arr.push(obj);
        localStorage.setItem("tasks", JSON.stringify(arr));
      } else {
        arr.push(obj);
        localStorage.setItem("tasks", JSON.stringify(arr));
      }
      setTasks(arr);
      ToDoClearValues();
    }
  };

  // To clear states after added task
  const ToDoClearValues = () => {
    setToDoForm((currentState) => {
      return { ...currentState, title: "", date: "" };
    });
  };

  // ----- To-Do ==> DeleteTask -----

  const DeleteTask = (id) => {
    let arr = JSON.parse(localStorage.getItem("tasks"));
    arr = arr.filter((ele, index) => {
      return id !== index;
    });
    localStorage.setItem("tasks", JSON.stringify(arr));
    setTasks(arr);
  };

  // ----- To-Do ==> StatusTask -----

  const StatusTask = (id) => {
    let arr = tasks;
    arr = arr.map((ele, index) => {
      return id === index ? { ...ele, status: !ele.status } : ele;
    });
    setTasks(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const value = {
    tasks,
    setTasks,
    showForm,
    showFormHandler,
    ToDoFormValuesHandler,
    ToDoFormHandler,
    DeleteTask,
    date,
    title,
    StatusTask,
    showFormEdit,
    showFormEditHandler,
    saveFormEditHandler,
  };

  return <TodoCtx.Provider value={value}>{props.children}</TodoCtx.Provider>;
};
