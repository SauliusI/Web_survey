import React from 'react';

class TextAnswer extends React.Component {
    constructor() {
        super();
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.showTextQuestion = this.showTextQuestion.bind(this);
    }

    render() {
        return (
            <div>
                {this.showTextQuestion()}
            </div>
        );
    }


    showTextQuestion() {
    return <div className="take-survey">
        <div className="take-survey__head"> {this.props.question} - {this.props.questionDescription} </div>
        <div className="take-survey__content">
            <fieldset className="survey-form">
                <div className="survey-form__group">
                    <textarea placeholder={this.props.results} value={this.state.value} onChange={this.handleChange}/>
                </div>
            </fieldset>
        </div>
    </div>

    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onTextChange(event);
    }
}

module.exports = TextAnswer;




