import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Maze from './Maze'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Maze></Maze>
  )
}

export default App
