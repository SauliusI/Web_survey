import React from 'react';

class CheckboxQuestion extends React.Component {
    constructor() {
        super();
        this.onAddRadioQuestion = this.onAddRadioQuestion.bind(this);
        this.onRemoveRadioQuestion = this.onRemoveRadioQuestion.bind(this);
        this.onCheckboxInputChange = this.onCheckboxInputChange.bind(this);
        this.onDescriptionInputChange = this.onDescriptionInputChange.bind(this);
        this.onQuestionInputChange = this.onQuestionInputChange.bind(this);
        this.onAnswerTextChange = this.onAnswerTextChange.bind(this);
    }

    render() {
        return (
            <div>
                {this.renderRadioQuestion()}
            </div>
        );
    }


    renderRadioQuestion() {
        return (

            <div className="tabs__box" id="tab1">
                <fieldset className="survey-form">
                    {this.createRadioQuestion()}
                </fieldset>
            </div>
        );
    }

    createRadioQuestion() {
        const answerCount = this.props.answers.length;
        let answer = [];
        for (let i = 0; i < answerCount-1; i++) {
            answer.push(
                <label key={i}>
                    <div className="survey-form__group" >
                        <label htmlFor="sf-input-tab1-question3">{i+1}. Answer</label>
                        <input id="sf-input-tab1-question3" type="text" defaultValue={this.props.answers[i]}
                               onChange={(e) => this.onAnswerTextChange(e, i)}/>
                        <div className="survey-form__modify">
                        </div>
                    </div>
                </label>
            )
        }
        answer.push(
            <label key={answerCount-1}>
                <div className="survey-form__group">
                    <label htmlFor="sf-input-tab1-question3">{answerCount}. Answer</label>
                    <input id="sf-input-tab1-question3" type="text" defaultValue={this.props.answers[answerCount-1]}
                           onChange={(e) => this.onAnswerTextChange(e, answerCount-1)}/>
                    <div className="survey-form__modify">
                        <a className="btn-modify" onClick={this.onRemoveRadioQuestion}><i
                            className="fa fa-close"/></a>
                        <a className="btn-modify" onClick={this.onAddRadioQuestion}><i className="fa fa-plus"/></a>
                    </div>
                </div>
            </label>
        );
        return answer;
    }

    onAnswerTextChange(e, i) {
        this.props.onAnswerChange(this.props.id,i,e.target.value);
    }

    onQuestionInputChange(e) {
        this.setState({
            question: e.target.value
        });
        this.props.onChange({...this.state,question: e.target.value});
    }

    onDescriptionInputChange(e) {
        this.setState({
            questionDescription: e.target.value
        });
        this.props.onChange({...this.state,questionDescription: e.target.value});
    }

    onCheckboxInputChange(e) {
        this.setState({
            mandatory: e.target.value
        });
        this.props.onChange({...this.state,mandatory: e.target.value});
    }

    onAddRadioQuestion() {
        this.props.onAddAnswerChange(this.props.id);
    }
    onRemoveRadioQuestion() {
        this.props.onRemoveAnswerChange(this.props.id);
    }
}

module.exports = CheckboxQuestion;