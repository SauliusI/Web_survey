import React from 'react';

class TextQuestion extends React.Component {
    constructor() {
        super();
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
        this.createTextQuestion = this.createTextQuestion.bind(this);
    }

    render() {
        return (
            <div>
                {this.createTextQuestion()}
            </div>
        );
    }


    createTextQuestion() {
        return (
        <fieldset className="survey-form">
            <div className="survey-form__group"><label htmlFor="sf-input-question1">Input Question</label>
                <input id="sf-input-question1" type="text" defaultValue={this.props.question} onChange={this.handleQuestionChange}/>
            </div>
            <div className="survey-form__group"><label htmlFor="sf-input-description1">Description</label>
                <input id="sf-input-question1" type="text" defaultValue={this.props.questionDescription} onChange={this.handleDescriptionChange}/></div>
            <div className="survey-form__group">
            </div>
        </fieldset> )
    }

    handleQuestionChange(e){
        this.props.onQuestionChange(this.props.id,e.target.value)
    }

    handleDescriptionChange(e){
        this.props.onDescriptionChange(this.props.id,e.target.value)
    }

}

module.exports = TextQuestion;