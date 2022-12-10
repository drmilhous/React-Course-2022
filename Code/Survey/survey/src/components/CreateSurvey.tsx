import { useRef, useState } from "react";
import { CreateSurveyProps } from "./interfaces";
import { useMutation } from 'react-query';
import { addSurvey } from "./api";
import uuid from 'react-uuid';

function CreateSurvey({ questionList, questionGUIDtoNAME }: CreateSurveyProps) {
    const [visable, setVisable] = useState(false);
    const nameText = useRef<HTMLInputElement | null>(null);
    const [currentQuestionID, setCurrentQuestionID] = useState("");
    const [questions, setQuestions] = useState<Array<string>>([]);
    // const { mutateAsync: addSurveyAsync } = useMutation(addSurvey);
    const { mutateAsync: addSurveyAsync } = useMutation(addSurvey,
        {
            onMutate: (x) => {
                console.log(x);
            },
            onSuccess: (response) => {
                console.log("success", response);
            },
            onError: (err) => {
                console.log(err);
            }
        });


    function addSurveyClick() {
        if (nameText.current) {
            let item = {
                id: uuid(),
                name: nameText.current.value,
                questions: questions
            }
            addSurveyAsync(item);
        }
    }

    function selectQuestion(event: React.FormEvent<HTMLSelectElement>) {
        setCurrentQuestionID(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }

    if (!visable) {
        return <>
            <button onClick={() => setVisable(true)}>Add Survey</button>
        </>
    }
    return (
        <div>
            <h2>Add New Survey</h2>
            <table>
                <tr>
                    <td>Name</td>
                    <td>
                        <input ref={nameText} type="text" id="name"></input>
                    </td>
                </tr>
                <tr>
                    <td>Questions</td>
                    <td>
                        <select onChange={selectQuestion}>
                            {questionList.map((question) =>
                                <option key={question.id} value={question.id} label={question.name}></option>

                            )}
                        </select>
                        <button onClick={() => { setQuestions([...questions, currentQuestionID]) }}>Add Question</button>
                    </td>
                </tr>
                <tr>
                    <td>Current Question List</td>
                    <td>
                        <tr>
                            <ul>
                                {questions.map((guid) =>
                                    <li>{questionGUIDtoNAME.get(guid)}</li>
                                )}
                            </ul>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <button onClick={addSurveyClick}> Add Survey</button>
                </tr>
            </table>

        </div>

    );
}

export default CreateSurvey;