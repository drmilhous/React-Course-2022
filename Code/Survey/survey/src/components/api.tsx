
import axios from "axios";
import { QuestionItem, SurveyItem } from "./interfaces";


export const fetchSurvey = async () => {
    const response = await axios.get<SurveyItem[]>("http://localhost:5011/survey");
    return response.data;
}

export const fetchQuestions = async () => {
    const response = await axios.get<QuestionItem[]>("http://localhost:5011/questions");
    return response.data;
}
export const addSurvey = async ({ id, name, questions }: SurveyItem) => {
    const response = await axios.post<SurveyItem, SurveyItem>("http://localhost:5011/survey",
        {
            id: id,
            name: name,
            questions: questions
        }
    );
    return response;
}

export const addQuestion = async ({ id, name, answers }: QuestionItem) => {
    const response = await axios.post<QuestionItem, QuestionItem>("http://localhost:5011/questions",
        {
            id: id,
            name: name,
            answers: answers
        }
    );
    return response;
}


