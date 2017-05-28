import React from 'react';

class RatingCreate extends React.Component {
    constructor(){
        super();
        this.CreateRangeQuestion=this.CreateRangeQuestion.bind(this);
        this.onRangeInputChange=this.onRangeInputChange.bind(this);
        this.onMinInputChange=this.onMinInputChange.bind(this);
        this.onMaxInputChange=this.onMaxInputChange.bind(this);
    }
    render() {
        return (
            <div>
                {this.CreateRangeQuestion()}
            </div>
        );
    }

    CreateRangeQuestion()
    {
        return(
            <div className="tabs__box" id="tab4">
                <fieldset className="survey-form">
                    <div className="survey-form__group clearfix">
                        <div className="survey-form--input-first">
                            <label htmlFor="sf-input-tab4-min">Min:</label>
                            <input id="sf-input-tab4-min" type="text" placeholder="Text"  defaultValue={this.props.minDescription} onChange={this.onMinInputChange}/>
                        </div>
                        <div className="survey-form--select-value">
                            <label htmlFor="sf-input-tab4-range">Range:</label>
                            <select id="sf-input-tab4-range" defaultValue={this.props.range} onChange={this.onRangeInputChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                        <div className="survey-form--input-last">
                            <label htmlFor="sf-input-tab4-max">Max:</label>
                            <input id="sf-input-tab4-max" type="text" placeholder="Text" defaultValue={this.props.maxDescription} onChange={this.onMaxInputChange}/>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }

    onRangeInputChange(e) {
        this.props.onRangeChange(this.props.id,e.target.value);
    }

    onMinInputChange(e) {
        this.props.onMinChange(this.props.id,e.target.value);
    }

    onMaxInputChange(e) {
        this.props.onMaxChange(this.props.id,e.target.value);
    }


}




module.exports = RatingCreate;
