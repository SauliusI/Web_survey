import React from 'react';


class ViewCheckbox extends React.Component {

    constructor(){
        super();
        this.renderAnswers=this.renderAnswers.bind(this);
    }

    render() {
        return (
            <div className="take-survey">
                <div className="take-survey__head">{this.props.question}</div>
                <div className="take-survey__content">
                    <table className="page-content__table">
                        {this.renderAnswers()}
                    </table>
                </div>
            </div>
        );
    }

    renderAnswers(){
        let render=[];
        let max=0;
        for(let i=0;i<this.props.answers.length;i++){
            if(this.props.answers[i].percentage>=max){
                max=this.props.answers[i].percentage;
            }
        }
        for(let i=0;i<this.props.answers.length;i++){
            if(this.props.answers[i].percentage===max && this.props.answers[i].percentage!=0){
                render.push(
                    <tr key={i}>
                        <td className="content__table--cell-headline">
                            <div className="checkbox-wrapper">
                                <label>
                                    <input type="checkbox" name="checkboxes" value="check-1" disabled checked={true}/>
                                        <span className="checkbox-text">{this.props.answers[i].option}</span>
                                </label>
                            </div>
                        </td>
                        <td className="content__table--result-numbers  content__table--border-right content__table--border-left">
                            {this.props.answers[i].percentage.toFixed(0)}%
                        </td>
                    </tr>);
            }else{
                render.push(
                    <tr key={i}>
                        <td className="content__table--cell-headline">
                            <div className="checkbox-wrapper">
                                <label>
                                    <input type="checkbox" name="checkboxes" value="check-1" disabled checked={false}/>
                                    <span className="checkbox-text">{this.props.answers[i].option}</span>
                                </label>
                            </div>
                        </td>
                        <td className="content__table--result-numbers  content__table--border-right content__table--border-left">
                            {this.props.answers[i].percentage.toFixed(0)}%
                        </td>
                    </tr>);
            }
        }
        return render;
    }




}

export default ViewCheckbox;