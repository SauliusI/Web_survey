import React from 'react';


class ViewRating extends React.Component {

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
        for(let i=0;i<this.props.range;i++){
            render.push(
                <tr key={i}>
                    <td className="content__table--cell-headline">
                        <div className="progress-bars">
                            <div className="progress-bars__row">
                                <div className="progress-head">{i+1}.</div>
                                <div className="progress-container">
                                    <div className="progressbar" style={{width: this.props.answers[i].percentage+"%"}}/>
                                </div>
                                <div className="progress-head2">{this.props.answers[i].percentage}%</div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }
        return render;
    }




}

export default ViewRating;

