import React from 'react';
import { render } from 'react-dom';
import {Router, Route, DefaultRoute, hashHistory, IndexRoute} from 'react-router';
import {Provider} from "react-redux";
import store, {history} from './store/index.jsx';

import RatingCreate from './components/RatingCreate.jsx';
import RatingAnswer from './components/RatingAnswer.jsx';
import CheckboxQuestion from './components/CheckboxQuestion.jsx';
import RadioQuestion from './components/RadioQuestion.jsx';
import RadioAnswer from './components/RadioAnswer.jsx';
import CheckboxAnswer from './components/CheckboxAnswer.jsx';
import TextAnswer from './components/TextAnswer.jsx';
import TextQuestion from './components/TextQuestion.jsx';
import TopMenu from './components/TopMenu.jsx';
import CreateSurvey from './components/CreateSurvey.jsx';
import AddQuestions from './components/AddQuestions.jsx';
import AnswerSurvey from './components/AnswerSurvey.jsx';
import App from './App.jsx';
import ViewAnswers from './components/viewAnswer/ViewAnswer.jsx';
import Surveys from './components/Surveys.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Logout from './components/Logout.jsx';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer.jsx';
import Profile from './components/Profile.jsx';
render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route component={EnsureLoggedInContainer}>
                    <IndexRoute component={Surveys} />
                    <Route path="createsurvey" component={CreateSurvey} />
                    <Route path="addquestions" component={AddQuestions} />
                    <Route path="answersurvey" component={AnswerSurvey} />
                    <Route path="viewanswers" component={ViewAnswers} />
                    <Route path="profile" component={Profile} />
                    <Route path="logout" component={Logout} />
                </Route>
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));





