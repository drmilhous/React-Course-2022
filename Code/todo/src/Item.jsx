import { Button, TextField } from "@mui/material";
import React, { Component, useRef, useState } from "react";

function Item(props) {
  const myInputRef = useRef("Text");
  const [text, setText] = useState("");

  //   function myTextChanged(event) {
  //     console.log(event.target.value);
  //     setText(event.target.value);
  //   }

  return (
    <>
      <p>Enter An item</p>
      <TextField
        id="outlined-basic"
        ref={myInputRef}
        // onChange={myTextChanged}
        label={props.name}
        variant="outlined"
      />
      <Button
        variant="outlined"
        onClick={() => {
          console.log("My current Value is", myInputRef.current);
        }}
      >
        Lock
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          props.removeMe(props.id);
        }}
      >
        Remove
      </Button>
    </>
  );
}
export default Item;
