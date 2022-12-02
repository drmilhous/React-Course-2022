import React, { useReducer, KeyboardEvent } from 'react';

import './App.css';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}
interface State {
  x: number
  y: number
}
interface Action {
  dir: Direction
  value: number
}

const reducer = (state: State, action: Action) => {
  let x = state.x;
  let y = state.y;
  switch (action.dir) {
    case Direction.Left:
      x -= action.value;
      break;
    case Direction.Right:
      x += action.value;
      break;
    case Direction.Up:
      y -= action.value;
      break;
    case Direction.Down:
      y += action.value;
      break;
    default:
      return state;
  }
  return { x: x, y: y }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { x: 100, y: 100 });
  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    // console.log(e.key);
    if (e.key === "a") {
      let x: Action = { dir: Direction.Left, value: 10 }
      dispatch(x);
    }
    else if (e.key === "d") {
      dispatch({ dir: Direction.Right, value: 10 })
    }
  };
  return (
    <>
      <svg>
        <circle cx={state.x} cy={state.y} r={20} fill="green" stroke="black" />
      </svg>
      <button onClick={() => dispatch({ dir: Direction.Up, value: 10 })}>Move Up</button>
      <button onClick={() => dispatch({ dir: Direction.Down, value: 10 })}>Move Down</button>

      <div onKeyPress={handleKeyboardEvent}><input value="aa"></input></div>
    </>
  );
}

export default App;
