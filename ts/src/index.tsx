import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TableList from './Components/ItemList';

import { FieldProps, Item } from "./interfaces";
import FieldList from './Components/Fields';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let items: Item = { name: "f22", description: "User Data" }
let fieldProp: FieldProps = { table: items };

root.render(
  <React.StrictMode>
    <TableList items={[items]}></TableList>
    <FieldList table={items}></FieldList>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
