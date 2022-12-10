export interface SurveyItem {
    id: string
    name: string
    questions: Array<string>
}
export interface AnswerItem {
    name: string
    value: string
}
export interface QuestionItem {
    id: string
    name: string
    text: string
    answers: Array<AnswerItem>
}
export interface CreateSurveyProps {
    questionList: Array<QuestionItem>
    questionGUIDtoNAME: Map<string, string>
}
