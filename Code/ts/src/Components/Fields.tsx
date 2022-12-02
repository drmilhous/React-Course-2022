
import { useState } from "react";
import { Field, FieldProps, Item } from "../interfaces";
import '../main.scss';
function FieldList({ table }: FieldProps) {
    const [setTable, getTable] = useState<Item | null>(table);
    const [fields, getFields] = useState<Array<Field> | null>(null);

    let items = null;
    if (fields) {
        items = fields.map((x: Field) => <><div> {x.name}</div><div>Field: {x.description}</div></>)
    }
    return (
        <div>
            <table className={"table-latitude"}>
                <thead><tr><th>Field Name</th><th>Description</th></tr></thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>);
}

export default FieldList;