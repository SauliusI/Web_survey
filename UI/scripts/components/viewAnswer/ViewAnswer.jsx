import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Radio from './ViewRadio.jsx';
import CheckBox from './ViewCheckbox.jsx';
import Text from './ViewText.jsx';
import Rating from './ViewRating.jsx';
import {bindActionCreators} from 'redux';
import {errorMessage,getSurveyResults} from '../../actions/index.jsx';

class ViewAnswer extends React.Component {

    constructor(props){
        super(props);
        this.renderAnswers=this.renderAnswers.bind(this);
        this.create=this.create.bind(this);
        this.state={
            result:[{
                question:"",
                type:"",
                range:10,
                answer:[{
                    option: "",
                    percentage: 0
                }]
            }]
        };

    }

    create(){
        const answer={
            option: "",
            percentage: 0
        }
        let result=[{
            question:"",
            type:"",
            range:10,
            answer:[answer]
        }];
        for(let i=0;i<this.props.survey.surveyResults.length;i++){
            for(let a=0;a<this.props.survey.surveyResults.length;a++){
                if(this.props.survey.surveyResults[a].questionNumber===i){
                    result[i]={
                        question:this.props.survey.surveyResults[a].question,
                        type:this.props.survey.surveyResults[a].type,
                        range:this.props.survey.surveyResults[a].range,
                        answer:[answer]
                    };
                    if(this.props.survey.surveyResults[a].type==="Rating"){
                        for(let e=0;e<=result[i].range;e++){
                            for(let x=0;x<this.props.survey.surveyResults[a].answerResults.length;x++){
                                if(e+1===parseInt(this.props.survey.surveyResults[a].answerResults[x].answer)){
                                    result[i].answer[e]={
                                        option: parseInt(this.props.survey.surveyResults[a].answerResults[x].answer),
                                        percentage: this.props.survey.surveyResults[a].answerResults[x].percentage.toFixed(0)
                                    };

                                    break;
                                }
                            }
                            if(result[i].answer[e]==undefined){
                                result[i].answer[e]={
                                    option: "",
                                    percentage: 0
                                };
                            }

                        }
                    }else if(this.props.survey.surveyResults[a].type==="Text"){
                        for (let e = 0; e < this.props.survey.surveyResults[a].answerResults.length; e++){
                                    result[i].answer[e]={
                                        option: this.props.survey.surveyResults[a].answerResults[e].answer,
                                        percentage: this.props.survey.surveyResults[a].answerResults[e].percentage.toFixed(0),
                                        user: this.props.survey.surveyResults[a].answerResults[e].user
                                }
                        }

                    }else{for(let e = 0;e<this.props.survey.surveyResults[a].answerOptions.length;e++){
                        result[i].answer[e]={
                            option: this.props.survey.surveyResults[a].answerOptions[e].answerOption,
                            percentage: 0
                        };
                        for(let x=0;x<this.props.survey.surveyResults[a].answerResults.length;x++){
                            if(this.props.survey.surveyResults[a].answerOptions[e].answerNumber===parseInt(this.props.survey.surveyResults[a].answerResults[x].answer)||
                                (this.props.survey.surveyResults[a].answerOptions[e].answerNumber===0&&""===this.props.survey.surveyResults[a].answerResults[x].answer)){
                                result[i].answer[e]={
                                    option: this.props.survey.surveyResults[a].answerOptions[e].answerOption,
                                    percentage: this.props.survey.surveyResults[a].answerResults[x].percentage
                                };
                                break;
                            }
                        }

                        // if(result[i].answer[e]==undefined){
                        //     result[i].answer[e]={
                        //         option: this.props.survey.surveyResults[a].answerOptions[e].answerOption,
                        //         percentage: typeof this.props.survey.surveyResults[a].percentage== 'undefined'?
                        //             0 : this.props.survey.surveyResults[a].answerResults[e].percentage
                        //     };
                        // }else if(result[i].answer[e].option===""&&result[i].answer[e].percentage===0){
                        //     result[i].answer[e]={
                        //         option: this.props.survey.surveyResults[a].answerOptions[e].answerOption,
                        //         percentage: typeof this.props.survey.surveyResults[a].percentage== 'undefined'?
                        //             0 : this.props.survey.surveyResults[a].answerResults[e].percentage
                        //     };
                        // }

                    }}

                }
            }

        }
        this.setState({
            result: result
        });
        // this.state.result=result;
    }

    render() {
        if(this.props.survey.selectedSurvey.name=== "" && this.props.survey.selectedSurvey.date === "" || this.props.survey.surveyResults===""){
            return <div/>;
        }
        if(!(this.state.result[0].type==="Radio"||this.state.result[0].type==="CheckBox"||this.state.result[0].type==="Text"||this.state.result[0].type==="Rating")){
            this.create();
        }
        return (
            <div className="survey-content">
                <h1 className="main-headline">Survey Results</h1>
                <h1 className="main-headline">{this.props.survey.selectedSurvey.name}</h1>
                <div className="survey-content__intro">
                    <p>{this.props.survey.selectedSurvey.description}</p>
                    <div className="survey-content__intro-icons">
                        <span>Due date:<br/>{moment(this.props.survey.selectedSurvey.date).format('l')}</span>
                    </div>
                </div>
                {this.renderAnswers()}
            </div>
        );
    }

    renderAnswers() {
        let render = [];
        for (let i = 0; i < this.state.result.length; i++) {
            switch (this.state.result[i].type) {
                case "Radio":
                    render.push(<Radio key={i} question={this.state.result[i].question} answers={this.state.result[i].answer}/>);
                    break;
                case "CheckBox":
                    render.push(<CheckBox key={i} question={this.state.result[i].question} answers={this.state.result[i].answer}/>);
                    break;
                case "Text":
                    render.push(<Text key={i} question={this.state.result[i].question} answers={this.state.result[i].answer}/>);
                    break;
                case "Rating":
                    render.push(<Rating key={i} question={this.state.result[i].question} range={this.state.result[i].range} answers={this.state.result[i].answer}/>);
                    break;

            }
        }
        return render;
    }

}

function mapStateToProps(state) {
    return{
        survey: state.survey,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({errorMessage: errorMessage,getSurveyResults:getSurveyResults}, dispatch)

}

export default connect(mapStateToProps,matchDispatchToProps)(ViewAnswer);
