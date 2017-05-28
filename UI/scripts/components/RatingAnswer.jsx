import React from 'react';

class RatingAnswer extends React.Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         selected: ''
    //     };
    //     this.ShowRangeQuestion=this.ShowRangeQuestion.bind(this);
    //     this.PopulateRangeSelector=this.PopulateRangeSelector.bind(this);
    //     this.getSelection=this.getSelection.bind(this);
    // }
    render() {
        return (
            <div>
                {this.ShowRangeQuestion()}
            </div>
        );
    }
    ShowRangeQuestion()
    {
        return (
            <div className="take-survey">
                <div className="take-survey__head">{this.props.question} - {this.props.questionDescription}</div>
                <div className="take-survey__content">
                    <fieldset className="survey-form">
                        <div className="survey-form__group--wide clearfix">
                            <div className="survey-form--input-first-text">{this.props.minDescription}</div>
                            <div className="survey-form__range-select">
                                {this.PopulateRangeSelector(this.props.range, this.props.question)}
                            </div>
                            <div className="survey-form--input-last-text">{this.props.maxDescription}</div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
    PopulateRangeSelector(range, question)
    {
        const elements = [];
        let i;
        for(i = 1; i <= range; i++)
        {
            elements.push(i);
        }

        return elements.map((number,numberIndex) =>
            <label key={numberIndex}>
                <input checked={this.props.results == numberIndex+1}type="radio" value={number} name={question} onChange={(e) => this.props.onRatingChange(e)}/><span>{number}</span>

            </label>

        );
    }
    // getSelection(e){
    // this.setState({
    //         selected: e.target.value
    //     });
    // }
}




module.exports = RatingAnswer;