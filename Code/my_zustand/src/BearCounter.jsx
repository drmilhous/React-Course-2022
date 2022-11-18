import React, { Component } from "react";
import useStore from "./MyStore";

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}
export default BearCounter;
