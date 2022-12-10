import { useQuery } from 'react-query';
import { fetchQuestions, fetchSurvey } from './api';
import CreateSurvey from './CreateSurvey';
import { CreateSurveyProps } from './interfaces';
function Survey() {

    const { isLoading, isError, data } = useQuery("surveys", fetchSurvey);
    const { data: questionList } = useQuery("questions", fetchQuestions);



    if (isLoading) {
        return <>...loading</>
    }
    else if (isError) {
        return <>...error</>
    }
    let questionGUIDToName = new Map<string, string>();
    questionList?.map((question) => {
        questionGUIDToName.set(question.id, question.text);
    })
    // let createData: CreateSurveyProps = null;
    // if (questionList) {
    //     let createData: CreateSurveyProps = { questionList: questionList }

    // }
    let createData: CreateSurveyProps = {
        questionList: questionList === undefined ? [] : questionList,
        questionGUIDtoNAME: questionGUIDToName
    }
    return (<>
        <h1>Survey</h1>
        <table>
            {data?.map((item) =>
                <tr>
                    <td><b>Name</b> {item.name}</td>
                    <td>
                        <ul>
                            {item.questions.map((question) =>
                                <li key={question}>{questionGUIDToName.get(question)}</li>

                            )}
                        </ul>
                    </td>
                </tr>
            )}
        </table>
        <CreateSurvey {...createData} />
    </>);
}

export default Survey;