export default (state={}, action) =>{
    switch (action.type){
        case "CREATE_SURVEY":
            return {...state,
                date: action.data.date,
                name: action.data.name,
                description: action.data.description,
                errorMessage: ""
            }
            ;
        case "ADD_QUESTION":
            return {
                ...state,
                questions: action.data.questions,
                number: action.data.number,
                errorMessage: ""
            };
        case "APPLY_SURVEY":
            return {
                ...state,
                questions:[{
                    question: "",
                    questionDescription: "",
                    type:"checkbox",
                    range: 10,
                    minDescription : '',
                    maxDescription: '',
                    questionNumber: '',
                    answers:['','']
                }],
                name:'',
                description:'',
                date:'',
                results:[],
                errorMessage: "Survey Created!!!",
                surveyList: ""

            };
        case "ANSWER_SURVEY":
            let indexToChange;
            if(state.questions.length >= action.data.currentQuestion)
                indexToChange = action.data.currentQuestion-1;
            else 
                indexToChange = 0;
            return {
                ...state,
                results:[
                    ...state.results.slice(0, indexToChange),
                    {
                        results: action.data.results,
                        questionGuid: action.data.questionGuid
                    },
                    ...state.results.slice(indexToChange+1)
                ],
                defaultResults: [
                    ...state.defaultResults.slice(0, indexToChange),
                    action.data.results,
                    ...state.defaultResults.slice(indexToChange+1)
                ],
                errorMessage: "",

            }
        case "ANSWER_SURVEY_API":
            return {
                ...state,
                questions:[{
                    question: "",
                    questionDescription: "",
                    type:"checkbox",
                    range: 10,
                    minDescription : '',
                    maxDescription: '',
                    questionNumber: '',
                    answers:['','']
                }],
                name:'',
                description:'',
                date:'',
                results:[],
                errorMessage: "",
                selectedSurvey: "",
                surveyList:""
            }
        case "ERROR_MESSAGE":
            return {
                ...state,
                errorMessage:action.data
            }
        case "GET_SURVEY_LIST":
            return state;
        case "GET_QUESTIONS":
            return state;
        case "GET_SURVEY_LIST_SUCCESS":
            return {
                ...state,
                surveyList: action.surveyList,
                surveyResults: ""
            }
        case "GET_QUESTIONS_SUCCESS":
            let results=[];
            for(let i=0; i<action.question.length; i++){
                switch(action.question[i].type.toLowerCase()){
                    case "checkbox":
                        let subresults = [];
                        for(let i2=0; i2<action.question[i].options.length; i2++){
                            subresults.push(false);
                        }
                        results.push(subresults);
                        break;
                    case "radio":
                        results.push("");
                        break;
                    case "text":
                        results.push("Answer");
                        break;
                    case "range":
                        results.push("");
                        break;
                }
            }
            return {
                ...state,
                questions: action.question,
                defaultResults: results,
                loadedSurveyQuestions: action.question.loadedSurveyQuestions
            }
        case "SELECT_SURVEY":
            return {
                ...state,
                selectedSurvey: action.data.selectedSurvey,
                name: action.data.name,
                description: action.data.description,
                date: action.data.date,
                surveyResults: ""
            }
        case "GET_SURVEY_RESULTS":
            return {
                ...state,
                surveyResults: ""
            }
        case "GET_SURVEY_RESULTS_SUCCESS":
            return {
                ...state,
                surveyResults: action.data.results
            }
        case "CHANGE_PASSWORD":
            return state;
        case "CHANGE_PASSWORD_SUCCESS":
            return {
                ...state,
                errorMessage:"Register Successful!!!"
            }
        case "REGISTER":
            return state;
        case "REGISTER_SUCCESS":
            return {
                ...state,
                errorMessage:"Register Successful!!!"
            }
        default:
            return state;
    }
}
