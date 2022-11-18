import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {

    const url = "https://aaaapi.adviceslip.com/advice";
    fetch(url)
      .then((response) => response.json())
      .then((myJson) => setData(myJson)).catch()


  }, []);


  console.log("Rendering");
  return (
    <div className="App">
      The count {count} <button onClick={() => setCount(count + 1)}></button>
    </div>
  );
}

export default App;
