import React, { useMemo, useState } from "react";
import "./Expense.css";

export default function Expense() {
  const [balance, setBalance] = useState(0);
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [showInvoice, setShowInvoice] = useState(0);
  const [incomeCollection, setIncomeCollection] = useState([]);
  const [filterIncomeCollection, setFilterIncomeCollection] = useState([]);
  const [expenseCollection, setExpenseCollection] = useState([]);
  const [filterExpenseCollection, setFilterExpenseCollection] = useState([]);

  const [{ income, expense, incomeCat, expenseCat }, setInputTracker] =
    useState({ income: 0, expense: 0, incomeCat: "", expenseCat: "" });
  const [{ filterIncomeCat, filterExpenseCat }, setFilterInputTracker] =
    useState({ filterIncomeCat: "", filterExpenseCat: "" });

  useMemo(() => {
    if (localStorage.getItem("balance"))
      setBalance(+JSON.parse(localStorage.getItem("balance")));

    if (localStorage.getItem("incomeBalance"))
      setIncomeBalance(+JSON.parse(localStorage.getItem("incomeBalance")));

    if (localStorage.getItem("expenseBalance"))
      setExpenseBalance(+JSON.parse(localStorage.getItem("expenseBalance")));

    if (localStorage.getItem("incomeCollection")) {
      setIncomeCollection(JSON.parse(localStorage.getItem("incomeCollection")));
      setFilterIncomeCollection(
        JSON.parse(localStorage.getItem("incomeCollection"))
      );
    }

    if (localStorage.getItem("expenseCollection")) {
      setExpenseCollection(
        JSON.parse(localStorage.getItem("expenseCollection"))
      );
      setFilterExpenseCollection(
        JSON.parse(localStorage.getItem("expenseCollection"))
      );
    }
  }, []);

  // To save the values of form
  const TrackerFormValuesHandler = (e) => {
    setInputTracker((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  // To submit form
  const TrackerFormSubmitHandler = (e) => {
    e.preventDefault();
    let isEmpty = true;
    if (income > 0 && incomeCat !== "") {
      isEmpty = false;
      let obj = { income: +income, incomeCat: incomeCat };
      let arr = [];
      if (localStorage.getItem("incomeCollection")) {
        arr = JSON.parse(localStorage.getItem("incomeCollection"));
        arr.push(obj);
        localStorage.setItem("incomeCollection", JSON.stringify(arr));
        setIncomeCollection(arr);
        setFilterIncomeCollection(arr);
        setFilterInputTracker({ filterIncomeCat: "", filterExpenseCat: "" });
      } else {
        arr.push(obj);
        localStorage.setItem("incomeCollection", JSON.stringify(arr));
        setIncomeCollection(arr);
        setFilterIncomeCollection(arr);
      }
      if (localStorage.getItem("incomeBalance")) {
        let inBalance =
          +JSON.parse(localStorage.getItem("incomeBalance")) + +income;
        setIncomeBalance(inBalance);
        localStorage.setItem("incomeBalance", JSON.stringify(inBalance));
      } else {
        localStorage.setItem("incomeBalance", JSON.stringify(+income));
        setIncomeBalance(+income);
      }
    }

    if (expense > 0 && expenseCat !== "") {
      isEmpty = false;
      let obj = { expense: +expense, expenseCat: expenseCat };
      let arr = [];
      if (localStorage.getItem("expenseCollection")) {
        arr = JSON.parse(localStorage.getItem("expenseCollection"));
        arr.push(obj);
        localStorage.setItem("expenseCollection", JSON.stringify(arr));
        setExpenseCollection(arr);
        setFilterExpenseCollection(arr);
        setFilterInputTracker({ filterIncomeCat: "", filterExpenseCat: "" });
      } else {
        arr.push(obj);
        localStorage.setItem("expenseCollection", JSON.stringify(arr));
        setExpenseCollection(arr);
        setFilterExpenseCollection(arr);
      }
      if (localStorage.getItem("expenseBalance")) {
        let exBalance =
          +JSON.parse(localStorage.getItem("expenseBalance")) + +expense;
        setExpenseBalance(exBalance);
        localStorage.setItem("expenseBalance", JSON.stringify(exBalance));
      } else {
        localStorage.setItem("expenseBalance", JSON.stringify(+expense));
        setExpenseBalance(+expense);
      }
    }

    if (isEmpty) {
      alert("Please fill in the inputs");
    } else {
      let balance =
        +JSON.parse(localStorage.getItem("incomeBalance")) -
        +JSON.parse(localStorage.getItem("expenseBalance"));
      setBalance(balance);
      localStorage.setItem("balance", balance);
      TrackerFormClearValues();
    }
  };

  // To clear the values of form
  const TrackerFormClearValues = () => {
    setInputTracker({ income: 0, expense: 0, incomeCat: "", expenseCat: "" });
  };

  const TrackerClearAllData = (e) => {
    e.preventDefault();
    localStorage.clear();
    setBalance(0);
    setIncomeBalance(0);
    setExpenseBalance(0);
    setIncomeCollection([]);
    setExpenseCollection([]);
    setFilterIncomeCollection([]);
    setFilterExpenseCollection([]);
    TrackerFormClearValues();
  };

  const TrackerShowInvoice = (e) => {
    e.preventDefault();
    setShowInvoice(!showInvoice);
  };

  const TrackerFilterIncomeInvoice = (e) => {
    setFilterInputTracker((currentState) => {
      return {
        ...currentState,
        [e.target.name]: e.target.value,
      };
    });
    let arr = [];
    if (e.target.value !== "All") {
      arr = incomeCollection.filter((ele) => {
        return ele.incomeCat === e.target.value;
      });
      if (arr.length > 0) setFilterIncomeCollection(arr);
    } else {
      setFilterIncomeCollection(incomeCollection);
    }
  };

  const TrackerFilterExpenseInvoice = (e) => {
    console.log(e.target.name, e.target.value);
    setFilterInputTracker((currentState) => {
      return {
        ...currentState,
        [e.target.name]: e.target.value,
      };
    });
    let arr = [];
    if (e.target.value !== "All") {
      arr = expenseCollection.filter((ele) => {
        return ele.expenseCat === e.target.value;
      });
      if (arr.length > 0) setFilterExpenseCollection(arr);
    } else {
      setFilterExpenseCollection(expenseCollection);
    }
  };

  return (
    <div className="expense-container">
      <div
        className={`expense-balance ${
          balance > 0 ? "greenColor" : "redColor"
        } `}
      >
        Balance = {balance}
      </div>
      <form className="expense-form">
        <div className="expense-form-box">
          <input
            value={income ? income : ""}
            onInput={TrackerFormValuesHandler}
            name="income"
            type="number"
            placeholder="Enter the income"
            min="0"
          />
          <select
            value={incomeCat}
            onChange={TrackerFormValuesHandler}
            name="incomeCat"
          >
            <option disabled selected value="">
              Choose
            </option>
            <option value="Salary">Salary</option>
            <option value="Passive">Passive</option>
          </select>
        </div>
        <div className="expense-form-box">
          <input
            value={expense ? expense : ""}
            onInput={TrackerFormValuesHandler}
            name="expense"
            type="number"
            placeholder="Enter the expense"
            min="0"
          />
          <select
            value={expenseCat}
            onChange={TrackerFormValuesHandler}
            name="expenseCat"
          >
            <option disabled selected value="">
              Choose
            </option>
            <option value="House">House</option>
            <option value="Fuel">Fuel</option>
            <option value="Groceries">Groceries</option>
            <option value="Taxes">Taxes</option>
          </select>
        </div>
        <div className="expense-form-box">
          <button onClick={TrackerFormSubmitHandler}>Save</button>
          <button onClick={TrackerShowInvoice}>Show Invoice</button>
          <button onClick={TrackerClearAllData}>Clear</button>
        </div>
      </form>

      {showInvoice && filterIncomeCollection.length > 0 ? (
        <>
          <hr />
          <table>
            <thead>
              <th>Income - Type</th>
              <th>Value</th>
              <th>
                <select
                  value={filterIncomeCat}
                  onChange={TrackerFilterIncomeInvoice}
                  name="filterIncomeCat"
                >
                  <option value="All">All</option>
                  <option value="Salary">Salary</option>
                  <option value="Passive">Passive</option>
                </select>
              </th>
            </thead>

            <tbody>
              {filterIncomeCollection.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.incomeCat}</td>
                    <td>{ele.income}</td>
                    <td></td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "end",
                    backgroundColor: "#333",
                    color: "white",
                  }}
                >
                  Total = {incomeBalance}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}

      {showInvoice && filterExpenseCollection.length > 0 ? (
        <>
          {console.log(filterExpenseCollection)}
          <hr />
          <table>
            <thead>
              <th>Expense - Type</th>
              <th>Value</th>
              <th>
                <select
                  value={filterExpenseCat}
                  onChange={TrackerFilterExpenseInvoice}
                  name="filterExpenseCat"
                >
                  <option value="All">All</option>
                  <option value="House">House</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Taxes">Taxes</option>
                </select>
              </th>
            </thead>

            <tbody>
              {filterExpenseCollection.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.expenseCat}</td>
                    <td>{ele.expense}</td>
                    <td></td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "end",
                    backgroundColor: "#333",
                    color: "white",
                  }}
                >
                  Total = {expenseBalance}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
