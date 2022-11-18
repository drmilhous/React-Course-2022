import React, { useContext } from "react";
import MyContext from "./MyContext";

function B(props) {
  const { name, setName } = useContext(MyContext);
  return (
    <>
      <p>{name}</p>
      <button onClick={() => setName("Ned")}>Presto!</button>
    </>
  );
}

export default B;
