import { AnswerItem } from "./interfaces";

function Answer({ name, value }: AnswerItem) {
    return (<>  {name} ({value})</>);
}

export default Answer;