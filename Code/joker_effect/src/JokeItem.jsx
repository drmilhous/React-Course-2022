import { Button } from "@mui/material";
import { useState } from "react";

function JokeItem(props) {
  const [show, setShow] = useState(false);
  console.log(props.joke);
  let punchline = <></>;
  if (show) {
    punchline = <p>{props.joke.delivery}</p>;
  }
  return (
    <>
      <p>{props.joke.setup}</p>
      {punchline}
      <Button variant="outlined" onClick={() => props.remove(props.id)}>
        Remove
      </Button>
      <Button variant="outlined" onClick={() => setShow(true)}>
        Show
      </Button>
    </>
  );
}
export default JokeItem;
