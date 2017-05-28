import React from 'react';  
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getSurveyList, selectSurvey, getSurveyResults, errorMessage} from '../actions/index.jsx';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';

class Surveys extends React.Component {
    constructor(props){
        super(props);
        this.onSurveyAnswerClick = this.onSurveyAnswerClick.bind(this);
        this.state = this.props;
    }
    render () {
        if(this.props.surveyList == ""){
                this.props.getSurveyList();
                return (
                    <div className="page-content">
                        <h1 className="heading1">Surveys</h1>
                        <table className="page-content__table">
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                )
            }
        return (
            <div className="page-content">
                <h1 className="heading1">Surveys</h1>
                <table className="page-content__table">
                    <tbody>
                        {this.renderSurveyList()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderSurveyList(){
        let surveyList = [];
        for (let i = 0; i < this.props.surveyList.length; i++){
            surveyList.push(
                this.addSurvey(this.props.surveyList[i])
            )
        }
        return surveyList;
    }

    addSurvey(survey){
        const t = survey.date.split(/[- T :]/);
        const newDate = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3]+8, t[4]+59, t[5]+59));
        const currentDate = new Date();
        let status = "Disabled";
        if(survey.isActive){
            status = "Published"
        }
        if(currentDate > newDate){
            status = "Expired"
        }
        let color;
        switch(status){
            case "Published":
                color="btn-status btn-status--green";
                break;
            case "Disabled":
                color="btn-status btn-status--red"
                break;
            case "Expired":
                color="btn-status btn-status--yellow"
                break;
            default:
                color="btn-status btn-status--red"
        }
        return(
            <tr key={survey.id}>
                <td className="content__table--status"><span className={color}>{status}</span>
                </td>
                <td className="content__table--name">{survey.name}</td>
                <td className="content__table--buttons">
                    <Link className="btn-modify" onClick={() => this.onSurveyAnswerClick(survey, status)}><i className="fa fa-play"></i>Proceed</Link>
                    <Link className="btn-modify" onClick={() => this.onViewAnswerClick(survey)}><i className="fa fa-eye"></i>View Results</Link>
                </td>
            </tr>
        )
    }

    onSurveyAnswerClick(survey, status){
        if(status !== "Published"){
            const message = {errorMessage: status}
            this.props.errorMessage(message);
            return;
        }
        this.setState({
            selectedSurvey: survey.id,
            name: survey.name,
            description: survey.description,
            date: survey.date
        }, () => {
            this.props.selectSurvey(this.state);
            hashHistory.push('/answersurvey');
        });
    }

    onViewAnswerClick(id){
        this.setState({
            selectedSurvey: id
        }, () => {
            this.props.selectSurvey(this.state);
            this.props.getSurveyResults(id);
            hashHistory.push('viewanswers');
        });
    }
};

const mapStateToProps = state => ({
  surveyList: state.survey.surveyList,
  selectedSurvey: state.survey.selectedSurvey,
  name: state.survey.name,
  description: state.survey.description,
  date: state.survey.date
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getSurveyList, selectSurvey, getSurveyResults, errorMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);
