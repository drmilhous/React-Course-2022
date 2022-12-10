import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocalLocalStrage } from './CustomHook';

function App() {
  const [counter, setCounter, reset] = useLocalLocalStrage<number>("fred", 1);
  return (
    <>
      <div>The count is {counter} </div>
      <button onClick={() => { setCounter(counter + 1) }}>Press Me</button>
      <button onClick={() => { reset(-1) }}>Reset</button>
    </>
  );
}

export default App;
