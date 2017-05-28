import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index.jsx';

const enhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const initialState = {
    survey: {
        questions:[{
            question: "",
            questionDescription: "",
            type:"checkbox",
            range: 10,
            minDescription : '',
            maxDescription: '',
            answers:['','']
        }],
        name:'',
        description:'',
        date:'',
        results:[],
        errorMessage: "",
        surveyList:[],
        selectedSurvey: "",
        loadedSurveyQuestions: ""
    },
    user: {
        user: "",
        returnUrl: ""
    }
}

const store = createStore(rootReducer, initialState, enhancers);


export default store;