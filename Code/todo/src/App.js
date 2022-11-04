import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Item from './Item'
import { Button } from '@mui/material';

function App() {
  const [list, setList] = useState([0]);
  const [listCounter, setListCounter] = useState(1);


  let myItemData = list.map((element) => <Item key={element} id={element} removeMe={removeFromlist} ></Item>);

  function addMore() {

    let myList = list.slice();
    myList.push(listCounter);
    setListCounter(listCounter + 1);
    setList(myList);
  }
  function removeFromlist(number) {
    let newList = list.filter((item) => !(item === number))
    setList(newList);
  }

  return (
    <div className="App">
      <p>My List</p>
      <Button variant='outlined' onClick={addMore}>Add More</Button>
      {myItemData}

    </div >
  );
}

export default App;
