
export interface Field {
    id: number
    table_fk: number
    name: string
    description: string
}
export interface FieldProps {
    table: Item
    fred?:string
}
export interface Item {
    name: string
    description: string
    id?: number
}
export interface ItemProps {
    items: Array<Item>
}

