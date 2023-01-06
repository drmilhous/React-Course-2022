import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import { Interaction } from 'scheduler/tracing'
import App from './App'
import Key from './components/Key'
import Space from './components/Space'
import './index.css'

function onRenderCallback(
  id: string, // the "id" prop of the Profiler tree that has just committed
  phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: number, // time spent rendering the committed update
  baseDuration: number, // estimated time to render the entire subtree without memoization
  startTime: number, // when React began rendering this update
  commitTime: number, // when React committed this update
  interactions: Set<Interaction> // the Set of interactions belonging to this update
) {
  console.log(id);
  console.log(actualDuration);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <Profiler id="Navigation" onRender={onRenderCallback}>
      {/* <App /> */}
      <Space></Space>
    </Profiler>
    {/* <Key></Key> */}
  </React.StrictMode>,
)
