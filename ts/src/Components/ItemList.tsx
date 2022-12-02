import { Item, ItemProps } from "../interfaces";
import axios from 'axios';
import { useEffect, useState } from "react";
// import '../index.css';
import '../main.scss';

const TableList: React.FC<ItemProps> = ({ items }) => {
    const [tableName, setTableName] = useState<string>("");
    const [tableDescription, setTableDescription] = useState<string>("");
    const [itemsList, setItemList] = useState<Array<Item>>(items);
    function handle() {

    }
    function TableName(e: React.FormEvent<HTMLInputElement>) {
        const newValue = e.currentTarget.value;
        setTableName(newValue);
    }

    function TableDesc(e: React.FormEvent<HTMLInputElement>) {
        const newValue = e.currentTarget.value;
        setTableDescription(newValue);
    }

    useEffect(() => { loadAll() }, []);

    function loadAll() {
        getItems();
        // setItemList(temp);
    }
    async function getItems() {
        try {
            const { data, status } = await axios.get<Array<Item>>(
                'http://localhost:3000/tables ',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );
            setItemList(data);
            console.log('response status is: ', status);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }
    async function addTable() {
        try {
            const { data, status } = await axios.post<Item>(
                'http://localhost:3000/tables',
                {
                    "name": tableName,
                    "description": tableDescription
                }
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
            setItemList([...itemsList, data]);
            setTableDescription("");
            setTableName("");
            // console.log(JSON.stringify(data, null, 4));
            console.log('response status is: ', status);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }



    let itemsData = itemsList.map((x: Item) =>
        <tr key={x.id}><td> {x.name}</td><td> {x.description}</td ></tr>)
    return (<>
        <table className={"table-latitude"}>
            <thead><tr><th>Table Name</th><th>Description</th></tr></thead>
            <tbody>
                {itemsData}
            </tbody>
        </table>
        <table className={"table-latitude"}>
            <thead><tr><th>Table Name</th><th>Table Description</th></tr></thead>
            <tbody>
                <tr>

                    <td><input onChange={TableName} value={tableName} /></td>

                    <td><input onChange={TableDesc} value={tableDescription} /></td>
                    <td><button onClick={addTable}>Add Table</button></td>
                </tr>
            </tbody>
        </table>
        <button onClick={loadAll}>Load Items</button>

    </>);
}

// function ItemList(props: ItemProps) {
//     let items = props.items.map((x: Item) => <><div>Table: {x.table}</div><div>Field: {x.field}</div></>)
//     return (<>{items}</>);
// }



//https://bobbyhadz.com/blog/typescript-http-request-axios

//json-server --watch db.json
export default TableList;