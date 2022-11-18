import React, { Component } from "react";
import useStore from "./MyStore";

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
export default Controls;
