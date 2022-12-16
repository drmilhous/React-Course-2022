import { BoxProps } from "./interface";
import './Maze.scss'

function Box({ data, visit, }: BoxProps) {
    let c = data.cords;
    let classN = "maze-button-a";
    if (data.start) {
        classN = "maze-button-start";
    }
    else if (data.end) {

        if (data.step != -1) {
            classN = "maze-button-end";
        } else {
            classN = "maze-button-end-wait";
        }

    }
    else if (data.step != -1) {
        classN = "maze-button-b";
    }
    else {
        //Not clicked yet
        classN = "maze-b-z";
    }
    let text = "Height: " + data.height;
    if (data.step != -1) {
        text += " Steps: " + data.step;
    }
    // text = "";
    return (<div className="maze-col">
        {/* <button onClick={() => { visit(data) }} key={data.getKey()} style={base} >{data.value} ({c.x},{c.y}) S:{data.step}</button> */}

        <button className={classN} onClick={() => { visit(data) }} key={data.getKey()} >{text}</button>
    </div>);
}

export default Box;