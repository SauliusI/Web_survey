import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addQuestion,applySurvey,errorMessage} from '../actions/index.jsx';
import {Link} from 'react-router';
import moment from 'moment';
import QuestionTab from './QuestionTab.jsx';

class AddQuestions extends React.Component {

    constructor(props){
        super(props);
        this.state=this.props.survey;
        this.state.active=[0];
        this.start=this.start.bind(this);
        this.onAddQuestion=this.onAddQuestion.bind(this);
        this.handleFieldChange=this.handleFieldChange.bind(this);
        this.onRemoveQuestion=this.onRemoveQuestion.bind(this);
        this.onApplySurvey=this.onApplySurvey.bind(this);
        this.changeActive=this.changeActive.bind(this);
        this.handleQuestionChange=this.handleQuestionChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.handleMinChange=this.handleMinChange.bind(this);
        this.handleMaxChange=this.handleMaxChange.bind(this);
        this.handleRangeChange=this.handleRangeChange.bind(this);
        this.handleTypeChange=this.handleTypeChange.bind(this);
        this.handleAnswerChange=this.handleAnswerChange.bind(this);
        this.handleRemoveAnswerChange=this.handleRemoveAnswerChange.bind(this);
        this.handleAddAnswerChange=this.handleAddAnswerChange.bind(this);
        this.checkActive=this.checkActive.bind(this);
        this.createdSurvey=this.createdSurvey.bind(this);
    }

    render() {
        if(this.props.survey.errorMessage==="Survey Created!!!"){
            return (
                this.createdSurvey()
            );
        }
        return (
            this.start()
        );
    }

    createdSurvey(){
        return(
            <div className="take-survey">
                <div className="take-survey__content">
                    <div className="take-survey__thanks">
                        Survey Created!!!
                    </div>
                </div>
            </div>
        )
    }

    start(){
        return(
            <div>
                <h1 className="main-headline">{this.state.name}</h1>
                <div className="survey-content__intro">
                    <p>{this.state.description}</p>
                    <Link to="createsurvey">
                        <a href="#" className="btn-action btn-action--bgr-blue btn-action--position-right">Edit</a>
                    </Link>
                    <div className="survey-content__intro-icons">
                        <i className="fa fa-calendar fa-border fa-pull-left"/>
                        <span>Due date:<br/>
                            {moment(this.state.date).format('l')}</span>
                    </div>
                </div>
                <div className="survey-wrap">
                    {this.createQuestion()}
                </div>
                <input type="button" value="Add Question" className="btn-action btn-action--type-submit" onClick={this.onAddQuestion}/>

                <input type="button" value="Create Survey" className="btn-action btn-action--type-submit" onClick={this.onApplySurvey}/>

            </div>
        );
    };

    changeActive(e){
        let a;
        if(this.checkActive(e)){
            let i;
            for(i=0;i<this.state.active.length;i++){
                if(this.state.active[i]===e){
                    a = [...this.state.active.slice(0, i),...this.state.active.slice(i+1, this.state.active.length)];
                    break;
                }
            }
        }else {
            a=this.state.active;
            a.push(e);
        }
        this.setState({ 
            active: a
        });
        this.props.errorMessage(this.state);
    }

    checkActive(e){
        let i;
        for(i=0;i<this.state.active.length;i++){
            if(this.state.active[i]===e){
                return true;
            }
        }
        return false;
    }

    createQuestion(){
        let questions = [];
        let style=[];
        for(let i=0;i<this.state.questions.length;i++){
            let props = {
                id: i,
                type: this.state.questions[i].type,
                answers: this.state.questions[i].answers,
                onQuestionChange: this.handleQuestionChange,
                onDescriptionChange: this.handleDescriptionChange,
                onMinChange: this.handleMinChange,
                onMaxChange: this.handleMaxChange,
                onRangeChange: this.handleRangeChange,
                onTypeChange: this.handleTypeChange,
                onAnswerChange: this.handleAnswerChange,
                onRemoveAnswerChange: this.handleRemoveAnswerChange,
                onAddAnswerChange: this.handleAddAnswerChange
            };
            if(this.checkActive(i)){
                style[i]="survey-wrap__head survey-wrap__head--movable link active";
            }else{
                style[i]="survey-wrap__head survey-wrap__head--movable";
            }
            questions.push(
                <div key={i} className="survey-wrap">
                    <div className={style[i]} onClick={() => this.changeActive(i)}>
                        <span className="survey-wrap__head--movable--icon"/>
                        Question {i+1} {this.state.questions[i].question}
                    </div>
                    { this.checkActive(i) ?
                            <div className="survey-wrap__content clearfix">
                                <QuestionTab {...props} question={this.state.questions[i]}/>
                                <input type="button"
                                       value="Remove"
                                       className="btn-action btn-action--bgr-gray btn-action--position-right btn-action--margin-top js-open-modal"
                                       onClick={()=>this.onRemoveQuestion(i)}/>
                            </div> : null }
                </div>
            )

        }
        return questions;
    }

    onAddQuestion() {
        const question = this.state.questions;
        this.setState({ 
            active: [this.state.questions.length],
            questions: [...question.slice(0, question.length),{
                question: "",
                questionDescription: "",
                type:"checkbox",
                range: 10,
                minDescription : '',
                maxDescription: '',
                answers:['','']
            }],
        });
        this.props.addQuestion(this.state);
        this.props.errorMessage(this.state);
        this.createQuestion();
    }

    onRemoveQuestion(e) {
        const question = this.state.questions;
        let newquestions = [...question.slice(0, e),...question.slice(e+1, question.length)];
        if (this.state.questions.length > 1){
            this.setState({ 
                questions: newquestions,
            });
        }
        this.props.addQuestion({...this.state,questions: newquestions});
        this.props.errorMessage(this.state);
        this. createQuestion();
    }

    onApplySurvey(){
        this.props.applySurvey(this.state);
    }


    handleRemoveAnswerChange(id) {
        let q2=this.state.questions;
        if(q2[id].answers.length>2){
            const q = this.state.questions[id].answers;
            q2[id].answers=[...q.slice(0,  q.length-1)];
            this.setState({ 
                questions: q2
            });
        }
    }

    handleAddAnswerChange(id) {
        const q = this.state.questions;
        q[id].answers.push('');
        this.setState({ 
            questions: q
        });
    }

    handleAnswerChange(id,nr,value) {
        let q = this.state.questions;
        q[id].answers[nr]=value;
        this.setState({ 
            questions: q
        });
    }

    handleTypeChange(id,value) {
        let q = this.state.questions;
        q[id].type=value;
        this.setState({ 
            questions: q
        });
    }

    handleQuestionChange(id,value) {
        let q = this.state.questions;
        q[id].question=value;
        this.setState({ 
            questions: q
        });
    }

    handleDescriptionChange(id,value) {
        let q = this.state.questions;
        q[id].questionDescription=value;
        this.setState({ 
            questions: q
        });
    }

    handleMinChange(id,value) {
        let q = this.state.questions;
        q[id].minDescription=value;
        this.setState({ 
            questions: q
        });
    }

    handleMaxChange(id,value) {
        let q = this.state.questions;
        q[id].maxDescription=value;
        this.setState({ 
            questions: q
        });
    }

    handleRangeChange(id,value) {
        let q = this.state.questions;
        q[id].range=value;
        this.setState({ 
            questions: q
        });
    }

    handleFieldChange(id,value) {
        let q = this.state.questions;
        q[id]=value;
        this.setState({ 
            questions: q
        });
    }


}

function mapStateToProps(state) {
    return{
        survey: state.survey,
    };
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({applySurvey: applySurvey,addQuestion: addQuestion,errorMessage: errorMessage}, dispatch)

}

export default connect(mapStateToProps,matchDispatchToProps)(AddQuestions);