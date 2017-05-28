import React from 'react';

import RatingCreate from '../components/RatingCreate.jsx';
import CheckboxQuestion from '../components/CheckboxQuestion.jsx';
import RadioQuestion from '../components/RadioQuestion.jsx';
import TextQuestion from '../components/TextQuestion.jsx';

class QuestionTab extends React.Component {

    constructor(props){
        super(props);
        this.state=this.props.question;
        this.handleFieldChange=this.handleFieldChange.bind(this);
        this.click=this.click.bind(this);
        this.selected=this.selected.bind(this);
    }

    render() {
        let style=[];
        style[0]="tab1 active";
        style[1]="tab2";
        style[2]="tab3";
        style[3]="tab4";
            switch (this.props.type) {
                case "checkbox":
                    style[0]="tab1 active";
                    style[1]="tab2";
                    style[2]="tab3";
                    style[3]="tab4";
                    break;
                case "radio":
                    style[0]="tab1";
                    style[1]="tab2 active";
                    style[2]="tab3";
                    style[3]="tab4";
                    break;
                case "text":
                    style[0]="tab1";
                    style[1]="tab2";
                    style[2]="tab3 active";
                    style[3]="tab4";
                    break;
                case "rating":
                    style[0]="tab1";
                    style[1]="tab2";
                    style[2]="tab3";
                    style[3]="tab4 active";
                    break;
                default:
                    style[0]="tab1 active";
                    style[1]="tab2";
                    style[2]="tab3";
                    style[3]="tab4";
                    break;
            }

        return (

                <div>
                    <TextQuestion onQuestionChange={this.props.onQuestionChange}
                                  onDescriptionChange={this.props.onDescriptionChange}
                                  question={this.props.question.question}
                                  questionDescription={this.props.question.questionDescription}
                                  id={this.props.id}/>
                    <h4 className="heading4">Answers</h4>

                    <div className="tabs">
                        <ul className="tabs__nav">
                            <li><a onClick={()=>this.click("checkbox")} className={style[0]}/></li>
                            <li><a onClick={()=>this.click("radio")} className={style[1]}/></li>
                            <li><a onClick={()=>this.click("text")} className={style[2]}/></li>
                            <li><a onClick={()=>this.click("rating")} className={style[3]}/></li>
                        </ul>
                        <div className="tabs__box" id="tab1">
                            <fieldset className="survey-form">
                                {this.selected()}
                            </fieldset>
                        </div>
                    </div>
                </div>
        );
    }

    click(e) {
        this.props.onTypeChange(this.props.id, e);
    }

    handleFieldChange(value) {
        this.setState(value);
        this.props.onChange(this.props.id, this.state);
    }



    selected() {
        switch (this.props.type) {
            case "checkbox":
                return <CheckboxQuestion
                    id={this.props.id}
                    answers={this.props.answers}
                    onAnswerChange={this.props.onAnswerChange}
                    onRemoveAnswerChange={this.props.onRemoveAnswerChange}
                    onAddAnswerChange={this.props.onAddAnswerChange}/>;
            case "radio":
                return <RadioQuestion
                    id={this.props.id}
                    answers={this.props.answers}
                    onAnswerChange={this.props.onAnswerChange}
                    onRemoveAnswerChange={this.props.onRemoveAnswerChange}
                    onAddAnswerChange={this.props.onAddAnswerChange}/>;
            case "text":
                return <div/>;
            case "rating":
                return <RatingCreate
                    id={this.props.id}
                    onMinChange={this.props.onMinChange}
                    onMaxChange={this.props.onMaxChange}
                    onRangeChange={this.props.onRangeChange}
                    minDescription={this.props.question.minDescription}
                    maxDescription={this.props.question.maxDescription}
                    range={this.props.question.range}/>;
            default:
                return <CheckboxQuestion
                    id={this.props.id}
                    answers={this.props.answers}
                    onAnswerChange={this.props.onAnswerChange}
                    onRemoveAnswerChange={this.props.onRemoveAnswerChange}
                    onAddAnswerChange={this.props.onAddAnswerChange}/>;
        }
    }
}

module.exports = QuestionTab;