import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createSurvey} from '../actions/index.jsx';
import {Link} from 'react-router';
import { SingleDatePicker } from 'react-dates';


class CreateSurvey extends React.Component {

    constructor(props){
        super(props);
        this.state=this.props.survey;
        this.onNameInputChange=this.onNameInputChange.bind(this);
        this.onCreateSurvey=this.onCreateSurvey.bind(this);
        this.onDescriptionInputChange=this.onDescriptionInputChange.bind(this);
    }

    render() {

        return (
            <div>
                <h1 className="main-headline">New survey</h1>
                <div className="survey-content__intro">
                    <fieldset className="survey-form">
                        <div className="survey-form__group"><label>Name</label>
                            <input id="sf-input-name" type="text" defaultValue={this.props.survey.name} onChange={this.onNameInputChange}/>
                        </div>
                        <div className="survey-form__group"><label>Survey description</label>
                            <input id="sf-input-description" type="text" defaultValue={this.props.survey.description} onChange={this.onDescriptionInputChange}/>
                        </div>
                        <div className="survey-form__group clearfix"><label>Due Date</label>
                            <SingleDatePicker
                                numberOfMonths={1}
                                date={this.state.date}
                                focused={this.state.focused}
                                onDateChange={(date) => { this.setState({ date }); }}
                                onFocusChange={({ focused }) => { this.setState({ focused }); }}
                            />
                        </div>
                    </fieldset>
                </div>
                <Link to="addquestions">
                    <input type="button" value="Add Questions" className="btn-action btn-action--type-submit" onClick={this.onCreateSurvey}/>
                </Link>


            </div>
        );
    }
    // onNameInputChange(e) {
    //     this.props.nameChange(e.target.value);
    // }
    onNameInputChange(e){
        this.setState({
            name: e.target.value
        });
    }
    onDescriptionInputChange(e){
        this.setState({
            description: e.target.value
        });
    }
    onCreateSurvey(){
        this.props.createSurvey(this.state);

    }

}

function mapStateToProps(state) {
    return{
        survey: state.survey
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({createSurvey: createSurvey}, dispatch)

}

export default connect(mapStateToProps,matchDispatchToProps)(CreateSurvey);