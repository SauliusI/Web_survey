import React from 'react';

export default class RadioAnswer extends React.Component {
    render() {
        return (
            <div>
                {this.renderRadioQuestion()}
            </div>
        );
    }

    addQuestions() {
        let answer = [];
        for (let i = 0; i < this.props.answers.length; i++) {
            answer.push(
                this.addQuestion(this.props.answers[i], this.props.results == i, i)
            )
        }
        return answer;
    }


    addQuestion(answer, check, counter) {
        return (
            <label key={""+this.props.id+counter}>
                <div className="radio-wrapper">
                    <label>
                        <input checked={check} value={counter} type="radio" name={this.props.question} onChange={(e) => this.props.onRadioChange(e)}/>
                        <span className="radio-text">{answer}</span>
                    </label>
                </div>
            </label>
        );
    }

    renderRadioQuestion() {
        return (
            <div className="take-survey">
                <div className="take-survey__head">{this.props.question} - {this.props.questionDescription}</div>
                <div className="take-survey__content">
                    <div className="take-survey-list">
                        {this.addQuestions()}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = RadioAnswer;