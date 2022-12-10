import { addQuestion, fetchQuestions } from "./api";
import { useQuery, useMutation } from 'react-query';
import Answer from "./Answer";
import { useState, useRef } from "react";
import { AnswerItem, QuestionItem } from "./interfaces";
import uuid from "react-uuid";
function Questions() {
    const { data: questions } = useQuery("questions", fetchQuestions);
    const [name, setName] = useState<string>("");
    const [answers, setAnswers] = useState<Array<AnswerItem>>([]);
    const [questionText, setQuestionText] = useState<string>("");
    const answerValue = useRef<HTMLInputElement | null>(null);
    const answerText = useRef<HTMLInputElement | null>(null);
    const { mutateAsync: addQuestionAsync } = useMutation(addQuestion);

    function setTheQuestionText(e: React.FormEvent<HTMLInputElement>) {
        setQuestionText(e.currentTarget.value);
    }

    function addAnswer() {
        if (answerText.current && answerValue.current) {
            let ans: AnswerItem = {
                name: answerText.current.value,
                value: answerValue.current.value,
            }
            setAnswers([...answers, ans]);
            answerText.current.value = "";
            answerValue.current.value = "";

        }
    }
    function AddIt() {
        let item: QuestionItem = {
            id: uuid(),
            name: name,
            text: questionText,
            answers: answers
        }
        addQuestionAsync(item);
    }
    return (
        <div>
            <h1>Questions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Text</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>

                    {questions?.map((question) =>
                        <tr>
                            <td>{question.name}</td>
                            <td>{question.text}</td>
                            <td>
                                {question.answers.map((ans) => <Answer {...ans} />)}
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            <h2>Add Question</h2>
            <table>
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input onChange={(e: React.FormEvent<HTMLInputElement>) => { setName(e.currentTarget.value); }} id="name" /></td>
                    </tr>
                    <tr>
                        <td>Question Text:</td>
                        <td><input onChange={setTheQuestionText} id="questionText" /></td>
                    </tr>
                    <tr>
                        <td>Anwser Text <input ref={answerText} id="answerText"></input></td>
                        <td>Anwser Value <input ref={answerValue} id="answerValue"></input></td>
                        <td><button onClick={addAnswer}>Add Answer</button></td>
                    </tr>

                    {answers.map((ans) => <tr><td><Answer {...ans} /></td></tr>)}

                </tbody>
            </table>
            <button onClick={AddIt}>Add The new Question</button>

        </div>
    );
}

export default Questions;