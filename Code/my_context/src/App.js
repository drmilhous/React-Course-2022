import logo from './logo.svg';
import './App.css';
import MyContext from './MyContext';
import { useState } from 'react';
import A from './A';

function App() {
  const [name, setName] = useState("Fred")
  return (
    <MyContext.Provider value={{ name, setName }}>
      <A></A>
    </MyContext.Provider>
  );
}

export default App;
