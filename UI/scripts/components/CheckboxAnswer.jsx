import React from 'react';

export default class CheckboxAnswer extends React.Component {
    render() {
        return (
            <div>
                {this.renderCheckboxQuestion()}
            </div>
        );
    }

    renderCheckboxQuestion()
    {
        return (
            <div className="take-survey">
                <div className="take-survey__head">{this.props.questionName} - {this.props.questionDescription}</div>
                <div className="take-survey__content">
                    <div className="take-survey-list">
                        {this.addAnswerList()}
                    </div>
                </div>
            </div>
        );
    }

    addAnswer(answer, check, counter){
        return(
            <label key={""+this.props.id+counter}>
                <div className="checkbox-wrapper">
                    <label>
                        <input checked={check} type="checkbox" onChange={(e) => this.props.onCheckboxChange(e, counter)}/>
                        <span className="checkbox-text">{answer}</span>
                    </label>
                </div>
            </label>
        );
    }

    addAnswerList(){
        let answer = [];
        for(let i = 0; i < this.props.tasks.length; i++){
            answer.push(
                this.addAnswer(this.props.tasks[i], this.props.results[i], i)
            )
        }
        return answer;
    }
}

module.exports = CheckboxAnswer;