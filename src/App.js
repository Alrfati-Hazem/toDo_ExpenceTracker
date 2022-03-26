import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoContextProvider } from './Contexts/TodoContext';
import Expense from './Expense/Expense';
import Header from './Header/Header';
import Todo from './Todo/Todo';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}> 
          <Route path='/to-do-list' element={<TodoContextProvider> <Todo /> </TodoContextProvider>} /> 
          <Route path='/expense-tracker' element={<Expense />} /> 
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
