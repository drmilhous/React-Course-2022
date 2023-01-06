import React, { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Box from "./Box";
import { BoxData, Cords } from "./interface";
import './Maze.scss'

function Maze() {
    // const [boxes, setBoxes] = useState<Array<Array<string>>>([]);
    const [boxMap, setBoxMap] = useState<Map<string, BoxData>>();
    const [rowMap, setRowMap] = useState<Map<number, number>>(new Map<number, number>);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [updatedRows, setUpdatedRows] = useState<Array<number>>([]);
    const [rowCache, setRowCache] = useState<Map<number, JSX.Element>>(new Map<number, JSX.Element>());
    const [mazeData, setMazeData] = useState<string>("Sabqponm\nabcryxxl\naccszExk\nacctuvwj\nabdefghi");
    const [changeKey, setChangeKey] = useState(1);
    useEffect(() => {
        // let data = ;
        // let b: Array<string> = ["a", "b", "c", "d", "e"];
        // setBoxes([["a", "b", "c", "d", "e"], ["a", "b", "c", "d"]]);
        loadBox();
    }, []);

    function loadBox() {
        let dataArray = mazeData.split("\n");
        // let result: Array<Array<string>> = [];
        let localBoxMap: Map<string, BoxData> = new Map<string, BoxData>();
        let yvalue = 0;
        let localRowMap = new Map<number, number>();
        dataArray.forEach((line) => {
            // let elementArray: Array<string> = [];
            console.log(line);
            setX(line.length);
            for (let xvalue = 0; xvalue < line.length; xvalue++) {
                let z = "" + line.charAt(xvalue);
                // elementArray.push(z);
                // let b = <Box name={z} x={xvalue} y={yvalue} visit={visitor} />
                let b = new BoxData(xvalue, yvalue, z)

                localBoxMap.set(b.getKey(), b);

            }
            localRowMap.set(yvalue, 0);
            yvalue += 1;
            // result.push(elementArray);
        });
        setY(dataArray.length);
        setRowMap(localRowMap);
        // setBoxes(result);
        setBoxMap(localBoxMap);
    }

    function updateMazeData(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMazeData(event.currentTarget.value)
    }

    function getBox(c: Cords) {
        let result = null;
        if (boxMap) {
            result = boxMap.get(c.getKey());
        }
        return result
    }

    function getNieghbors(c: Cords) {
        let x = c.x;
        let y = c.y;
        let cordList = [];
        cordList.push(new Cords(x - 1, y));
        cordList.push(new Cords(x, y - 1));
        cordList.push(new Cords(x + 1, y));
        cordList.push(new Cords(x, y + 1));
        let boxResult: Array<BoxData> = [];
        cordList.map((x) => {
            let b = getBox(x);
            if (b) {
                boxResult.push(b)
            }
        });
        return boxResult;

    }

    function visitor(data: BoxData): void {
        let n = getNieghbors(data.cords);
        n.map((neighbor) => {
            neighbor.setStep(data);
            let row = neighbor.cords.y;
            if (rowCache.get(row)) {
                rowCache.delete(row);
            }
        });
        setChangeKey(changeKey + 1);

    }
    function getRow(row: number) {
        let boxlist: Array<JSX.Element> = [];
        if (x) {
            for (let col = 0; col < x; col++) {
                let c = new Cords(col, row);
                let b = getBox(c);
                if (b) {
                    boxlist.push(
                        <Box key={b.getUpdateKey()} data={b} visit={visitor} />
                    );
                }
            }
        }
        console.log("Row created");
        return (<div key={row} className="maze-row">{boxlist}</div>);
    }

    let aaa = useCallback((rowNumber: number) => { getRow(rowNumber) }, [updatedRows]);


    function getBoxDivs() {
        let rows: Array<JSX.Element> = []
        if (y) {
            for (let row = 0; row < y; row++) {
                let rowindex = rowMap.get(row);
                console.log("Row running");
                let d = null;
                if (rowCache.get(row)) {
                    d = rowCache.get(row)
                }
                else {
                    d = getRow(row);
                    rowCache.set(row, d);
                    console.log(`Row being rendered ${row}`);
                }
                if (d)
                    rows.push(d);
            }
        }
        return <div key={changeKey} style={{ width: "500px" }}>{rows}</div>
    }

    return (<>
        <div>
            <div className="maze-row">
                <textarea onChange={updateMazeData} value={mazeData} rows={10} cols={40}></textarea>
                <button onClick={loadBox}>Load</button>
            </div>
            {getBoxDivs()}
            {/* </div> */}

        </div>
    </>);
}

export default Maze;