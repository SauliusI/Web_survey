import utils from '../utils/index.jsx';
import {hashHistory} from 'react-router';

const { api } = utils;

export const createSurvey = (survey) => {
    return {
        type: 'CREATE_SURVEY',
        data: survey
    };
};

export const applySurvey = (state) => (dispatch) => {
    let body = {
        "name": state.name,
        "description": state.description,
        "date": state.date.format('YYYY-MM-DD HH:mm'),
        "questions": [
            {
                "QuestionName": state.questions[0].question,
                "QuestionDescription": state.questions[0].questionDescription,
                "MinDescription": state.questions[0].minDescription,
                "MaxDescription": state.questions[0].maxDescription,
                "Range": state.questions[0].range,
                "Type" : state.questions[0].type,
                "Options": state.questions[0].answers
            }]
    };
            for (let i = 1; i < state.questions.length; i++) {
                let questions = body.questions;
                body.questions = [
                    ...questions.slice(0, questions.length),
                    {
                        "QuestionName": state.questions[i].question,
                        "QuestionDescription": state.questions[i].questionDescription,
                        "MinDescription": state.questions[i].minDescription,
                        "MaxDescription": state.questions[i].maxDescription,
                        "Range": state.questions[i].range,
                        "Type" : state.questions[i].type,
                        "Options": state.questions[i].answers
                    }
                ];
                }

                api.post('http://localhost:52012/api/Survey/', body)
                    .then((response) => {
                        dispatch({
                            type: 'APPLY_SURVEY'
                        });
                    })
                    .catch( (e) => {
                        dispatch({
                            type: 'ERROR_MESSAGE',
                            data: e.message
                        });
                    });
};

export const addQuestion = (state) => {
    return {
        type: 'ADD_QUESTION',
        data: state
    };
};

export const answerSurvey = (state) => {
    return {
        type: 'ANSWER_SURVEY',
        data: state
    }
};

export const answerSurveyApi = (state) => (dispatch) => {
    let request = [];
    for(let i = 0; i < state.results.length ; i++){
        request.push({
            QuestionId: state.results[i].questionGuid,
            SelectedResult: state.results[i].results.constructor === Array ? 
                JSON.stringify(state.results[i].results) :
                state.results[i].results
        })
    }
    api.post('http://localhost:52012/api/Survey/response', request)
    .then((response) => {
        if(!response.data.hasOwnProperty("errorMessage")) {
            dispatch({
                type: 'ANSWER_SURVEY_API'
            });
        }
        else {
            dispatch({
                type: 'ERROR_MESSAGE',
                data: response.data.errorMessage ? response.data.errorMessage : "Error not defined"
            })
        }
    })
    .catch( (e) => {
        dispatch({
            type: 'ERROR_MESSAGE',
            data: e.message
        });
    });   
};

export const errorMessage = (state) => {
    return {
        type: "ERROR_MESSAGE",
        data: state.errorMessage
    }
}

export const getSurveyList = () => (dispatch) => {
    dispatch({ type: 'GET_SURVEY_LIST'});

    api.get('http://localhost:52012/api/survey')
        .then((response) => {
            if(!response.data.hasOwnProperty("errorMessage")) {
                dispatch({
                    type: 'GET_SURVEY_LIST_SUCCESS',
                    surveyList: response.data
                })
            }
            else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ? response.data.errorMessage : "Error not defined"
                })
            }
            
        })
        .catch ( (e) => {
            dispatch({
                type: 'ERROR_MESSAGE',
                data: e.message
            })
        })
}

export const getQuestions = (selectedSurvey) => (dispatch) => {
    dispatch({ type: 'GET_QUESTIONS'});
    api.get('http://localhost:52012/api/survey/question/'+ selectedSurvey)
        .then((response) => {
            if(!response.data.hasOwnProperty("errorMessage")) {
                response.data.loadedSurveyQuestions = selectedSurvey;
                for(let i=0;i<response.data.length;i++){
                    response.data[i].question = response.data[i].questionName;
                    response.data[i].answers = response.data[i].options;
                    response.data[i].type = response.data[i].type.toLowerCase();
                }
                dispatch({
                    type: 'GET_QUESTIONS_SUCCESS',
                    question: response.data
                })
            }
            else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ? response.data.errorMessage : "Error not defined"
                })
            }

        })
        .catch ( (e) => {
            dispatch({
                type: 'ERROR_MESSAGE',
                data: e.message
            })
        })
}

export const login = (user) => (dispatch) => {
    dispatch({ type: 'LOGIN'});
    const request = {
        UserName: user.user.userName,
        Password: user.user.password
    }
    api.post('http://localhost:52012/api/user/login', request)
        .then((response) => {
            if(!response.data.hasOwnProperty("errorMessage")) {
                dispatch({ 
                    type: 'LOGIN_SUCCESS',
                    data: user.user.userName
                })
                hashHistory.push(user.returnUrl);
                dispatch({
                    type: 'RETURN_URL',
                    data: ''
                })
            }   
            else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ? response.data.errorMessage : "Error not defined"
                })
            }
        })
        .catch((e) => {
            dispatch({
                type: "ERROR_MESSAGE",
                data: e.message
            })
        })
}

export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    api.post('http://localhost:52012/api/user/logout')
        .then((response) => {
            dispatch({
                type: "LOGOUT_SUCCESS"
            });
            dispatch({
                type: 'RETURN_URL',
                data: ''
            })
        })
        .catch((e) => {
            dispatch({
                type: "ERROR_MESSAGE",
                data: e.message
            })
        })
}

export const selectSurvey = (state) => {
    return {
        type: "SELECT_SURVEY",
        data: state
    }
}

export const returnUrl = (state) => {
    return {
        type: "RETURN_URL",
        data: state
    }
}

export const getSurveyResults = (selectedSurvey) => (dispatch) => {
    dispatch({ type: 'GET_SURVEY_RESULTS'});
    api.get('http://localhost:52012/api/survey/result/'+ selectedSurvey.id)
        .then((response) => {
            if(!response.data.hasOwnProperty("errorMessage")) {
                dispatch({
                    type: 'GET_SURVEY_RESULTS_SUCCESS',
                    data: response.data
                });
            }
            else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ? response.data.errorMessage : "Error not defined"
                })
            }

        })
        .catch ( (e) => {
            dispatch({
                type: 'ERROR_MESSAGE',
                data: e.message
            })
        })
}

export const register = (user) => (dispatch) => {
    dispatch({ type: 'REGISTER'});
    const request = {
        UserName: user.UserName,
        Email: user.Email,
        Password: user.Password,
        ConfirmPassword: user.ConfirmPassword
    }
    api.post('http://localhost:52012/api/user/register', request)
        .then((response) => {
            if(response.ok) {
                dispatch({
                    type: 'REGISTER_SUCCESS'
                })
            }else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ?
                        response.data.errorMessage :
                        response.data.ConfirmPassword?
                            response.data.ConfirmPassword:
                            response.data.Email?
                                response.data.Email:
                                "Error not defined"
                })
            }
        })
        .catch((e) => {
            dispatch({
                type: "ERROR_MESSAGE",
                data: e.message
            })
        })
}

export const change = (user) => (dispatch) => {
    dispatch({ type: 'CHANGE_PASSWORD'});
    const request = {
        OldPassword: user.OldPassword,
        Password: user.Password,
        ConfirmPassword: user.ConfirmPassword
    }
    api.post('http://localhost:52012/api/user/changepassword', request)
        .then((response) => {
            if(response.ok) {
                dispatch({
                    type: 'CHANGE_PASSWORD_SUCCESS'
                })
            }else {
                dispatch({
                    type: 'ERROR_MESSAGE',
                    data: response.data.errorMessage ?
                        response.data.errorMessage :
                        response.data.ConfirmPassword?
                            response.data.ConfirmPassword:
                            response.data.Email?
                                response.data.Email:
                                "Error not defined"
                })
            }
        })
        .catch((e) => {
            dispatch({
                type: "ERROR_MESSAGE",
                data: e.message
            })
        })
}

export const checkUser = (returnUrl) => (dispatch) => {
    dispatch({ type: "CHECK_USER"});
    api.get('http://localhost:52012/api/user/me')
        .then((response) => {
            if(response.ok) {
                dispatch({
                    type: 'CHECK_USER_SUCCESS',
                    data: response.data.userName
                })
                hashHistory.push(returnUrl);
                dispatch({
                    type: 'RETURN_URL',
                    data: ''
                })
            }
        })
        .catch((e) => {
            dispatch({
                type: "ERROR_MESSAGE",
                data: e.message
            })
        })
}