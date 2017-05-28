import React from 'react';


class ViewText extends React.Component {

    constructor(){
        super();
        this.renderAnswers=this.renderAnswers.bind(this);
    }

    render() {
        return (
            <div className="take-survey">
                <div className="take-survey__head">{this.props.question}</div>
                <div className="take-survey__content">
                    {this.renderAnswers()}
                </div>
            </div>
        );
    }

    renderAnswers(){
        let render=[];
        for (let i = 0; i < this.props.answers.length; i++){
            render.push(
                <div key={i} className="survey-results">
                    <div className="survey-results__user-info">
                        <figure className="survey-results__user-pic"><a href="#"><img src="content/images/usr.jpg"/></a>
                        </figure>
                        <a href="#" className="survey-results__username">{this.props.answers[i].user}</a>
                    </div>

                    <div className="survey-results__user-textarea">
                        {this.props.answers[i].option}
                    </div>
                </div>
            );
        }
        return render;
    }
    



}

export default ViewText;
