import React from 'react';
import {Route, Link, Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import RadioAnswer from './RadioAnswer.jsx';
import CheckboxAnswer from './CheckboxAnswer.jsx';
import RatingAnswer from './RatingAnswer.jsx';
import TextAnswer from './TextAnswer.jsx';
import {answerSurvey, answerSurveyApi, errorMessage,  returnUrl} from '../actions/index.jsx';
import 'whatwg-fetch';
import {getQuestions} from '../actions/index.jsx';
import {hashHistory} from 'react-router';

class AnswerSurvey extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentQuestion: 0,
            results: [],
            errorMessage:"",
            questionGuid:"",
            finised: false,
            loadedSurvey: ""
        }
        this.onNextQuestion=this.onNextQuestion.bind(this);
        this.onPreviousQuestion=this.onPreviousQuestion.bind(this);
        this.handleCheckboxChange=this.handleCheckboxChange.bind(this);
        this.handleRadioChange=this.handleRadioChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleRatingChange=this.handleRatingChange.bind(this);
        this.checkIfCorrectSurvey=this.checkIfCorrectSurvey.bind(this);
    }

    componentDidMount(){
        this.checkIfCorrectSurvey();
    }

    componentDidUpdate() {
        this.checkIfCorrectSurvey();
    }

    checkIfCorrectSurvey(){
        if(this.state.loadedSurvey !== this.props.survey.selectedSurvey){
            if(this.props.survey.selectedSurvey !== "")
                this.props.getQuestions(this.props.survey.selectedSurvey);
            this.setState({
                loadedSurvey: this.props.survey.selectedSurvey
            })
        }
    }
    render() {
        if(this.state.finised){
            return(
                <div className="take-survey">
                    <div className="take-survey__content">
                        <div className="take-survey__thanks">
                            Thank you!
                        </div>
                    </div>
                </div>)
        }
        if(this.props.user.user === ""){
            this.props.returnUrl('/answersurvey');
            hashHistory.push("/login");
            return (
                <div />
            )
        }
        if(this.state.loadedSurvey !== this.props.survey.loadedSurveyQuestions){
            return (
                <div />
            )
        }
        return (
            <div className="survey-content">
                <h1 className="main-headline">{this.props.survey.name}</h1>
                {this.renderBody()}
                {this.renderBottom()}
                
            </div>
        );
    }
    renderBody(){
        if(this.state.currentQuestion==0) 
            return this.renderDescription();
        else if(this.state.currentQuestion <= this.props.survey.questions.length)
            return this.renderQuestion();
    }
    renderDescription(){
        return(
            <div className="survey-content__intro">
                <p>{this.props.survey.description}</p>
                <div className="survey-content__intro-icons">
                    <i className="fa fa-calendar fa-border fa-pull-left"></i>
                    <span>Due date:<br />
                        {moment(this.props.survey.date).format('l')}</span>
                </div>
            </div>
        )
    }
    renderQuestion(){
        const currentQuestion = this.props.survey.questions[this.state.currentQuestion-1];
        switch(currentQuestion.type.toLowerCase()){
            case "radio":
                return (
                    <div>
                        <RadioAnswer 
                            question={currentQuestion.question} 
                            questionDescription={currentQuestion.questionDescription} 
                            answers={currentQuestion.answers} 
                            id={this.state.currentQuestion}
                            onRadioChange={this.handleRadioChange}
                            results={this.state.results}
                        />
                    </div>
                )
            case "checkbox":
                return(
                    <div>
                        <CheckboxAnswer
                            questionName={currentQuestion.question}
                            questionDescription={currentQuestion.questionDescription}
                            tasks={currentQuestion.answers}
                            id={this.state.currentQuestion}
                            onCheckboxChange={this.handleCheckboxChange}
                            results={this.state.results}
                        />
                    </div>
                )
            case "text":
                return(
                    <div>
                        <TextAnswer
                            question={currentQuestion.question}
                            questionDescription={currentQuestion.questionDescription}
                            id={this.state.currentQuestion}
                            onTextChange={this.handleTextChange}
                            results={this.state.results}
                        />
                    </div>
                )
            case "rating":
                return(
                    <div>
                        <RatingAnswer
                            question={currentQuestion.question}
                            questionDescription={currentQuestion.questionDescription}
                            minDescription={currentQuestion.minDescription}
                            maxDescription={currentQuestion.maxDescription}
                            range={currentQuestion.range}
                            id={this.state.currentQuestion}
                            onRatingChange={this.handleRatingChange}
                            results={this.state.results}
                        />
                    </div>
                )
        }
    }
    renderBottom(){
        if(this.state.currentQuestion <= this.props.survey.questions.length)
            return(
                <div className="survey-bottom-nav">
                    <div className="survey-bottom-nav--left">
                        <input type="button" value="Previous" className="btn-action btn-action--type-submit"  onClick={this.onPreviousQuestion}/>
                    </div>
                    <div className="survey-bottom-nav--left">
                        <input type="button" value="Next" className="btn-action btn-action--type-submit"  onClick={this.onNextQuestion}/>
                    </div>
                    <div className="survey-bottom-nav--right">
                        <div className="survey-bottom-nav__paging">{this.state.currentQuestion} - {this.props.survey.questions.length}</div>
                    </div>
                </div>
            )
        else
            return(
            <div className="take-survey">
                <div className="take-survey__content">
                    <div className="take-survey__thanks">
                        Thank you!
                    </div>
                </div>
            </div>
        )
    }
    onNextQuestion(){
        if(this.state.currentQuestion != 0){
            this.props.answerSurvey(this.state);  
        }      
        
        let nextQuestionGuid = this.state.currentQuestion < this.props.survey.questions.length ? 
            this.props.survey.questions[this.state.currentQuestion].id :
            "";
        this.setState({
            questionGuid: nextQuestionGuid,
            results: this.props.survey.defaultResults[this.state.currentQuestion],
            currentQuestion: this.state.currentQuestion+1           
            
        }, function () {
            if(this.state.currentQuestion > this.props.survey.questions.length){
                this.props.answerSurveyApi(this.props.survey);
                this.setState({
                    finised: true
                })
            }
        })
            
    }
    onPreviousQuestion(){
        this.props.answerSurvey(this.state);
        let nextQuestionGuid = this.state.currentQuestion <= this.props.survey.questions.length ? 
            this.props.survey.questions[this.state.currentQuestion-2].id :
            "";
        if(this.state.currentQuestion > 0){
            this.setState({
                questionGuid: nextQuestionGuid,
                results: this.props.survey.defaultResults[this.state.currentQuestion-2],
                currentQuestion: this.state.currentQuestion-1                
            });
        }
    }
    handleCheckboxChange(e, counter){
        let results = this.state.results;
        results[counter] = e.target.checked;
        this.setState({
            results
        })
    }
    handleRadioChange(e){
        this.setState({
            results: e.target.value
        })
    }
    handleTextChange(e, counter){
        this.setState({
            results: e.target.value
        })
    }
    handleRatingChange(e, counter){
        this.setState({
            results: e.target.value
        })
    }
}

function mapStateToProps(state) {
    return{
        survey: state.survey,
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({answerSurvey, answerSurveyApi, errorMessage, getQuestions, returnUrl}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(AnswerSurvey);