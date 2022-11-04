import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import JokeItem from './JokeItem';

function App() {
  const [need, setNeed] = useState(false);
  const [jokeList, setJokeList] = useState([]);
  useEffect(
    () => {
      if (need) {
        console.log("Calling api");
        let url = "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";
        fetch(url)
          .then((nonJsonDat) => nonJsonDat.json())
          .then((jsonData) => {
            let l = jokeList.slice();
            l.push(jsonData);
            setJokeList(l);
            setNeed(false);
          })
      };
    }, [need, jokeList]);
  function remove(id) {
    let temp = jokeList.filter((joke) => !(joke.id === id));
    setJokeList(temp);
  }
  let jokes = jokeList.map((joke) => <JokeItem id={joke.id} remove={remove} joke={joke}></JokeItem>)
  return (
    <>
      <Button variant="outlined" onClick={() => setNeed(true)}>Load Joke</Button>
      {jokes}
    </>
  );
}

export default App;
