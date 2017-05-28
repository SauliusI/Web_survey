import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {change} from '../actions/index.jsx';

class Register extends React.Component {
    constructor(){
        super();
        this.state={
            OldPassword:"",
            Password:"",
            ConfirmPassword:""
        }

        this.onOldPasswordChange=this.onOldPasswordChange.bind(this);

        this.onPasswordChange=this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange=this.onConfirmPasswordChange.bind(this);
        this.onPasswordChangeSubmit=this.onPasswordChangeSubmit.bind(this);


    }
    render() {
        if(this.props.survey.errorMessage==="Register Successful!!!"){
            return (
                <div className="take-survey">
                    <div className="take-survey__content">
                        <div className="take-survey__thanks">
                            User Password Changed!
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="survey-content">
                <h1 className="main-headline">Change Password</h1>
                <div className="survey-login__form-wrapper edit-profile">
                    <div className="edit-profile__left-col">
                        <fieldset className="survey-form">
                            <div className="survey-form__group">
                                <figure className="edit-profile__user-pic"><a href="#"><img src="content/images/usr.jpg"/></a></figure>
                            </div>
                        </fieldset>
                    </div>
                    <div className="edit-profile__right-col">
                        <fieldset className="survey-form">

                            <div className="survey-form__group"><label for="sf-input-firstname">Password</label>
                                <input id="sf-input-oldpwd" type="password" onChange={this.onOldPasswordChange}/>
                            </div>
                            <div className="survey-form__group"><label for="sf-input-lastname">New Password</label>
                                <input id="sf-input-pwd" type="password" onChange={this.onPasswordChange}/>
                            </div>
                            <div className="survey-form__group"><label for="sf-input-email">Repeat New Password</label>
                                <input id="sf-input-pwdconfirm" type="password" onChange={this.onConfirmPasswordChange}/>
                            </div>
                            <div className="survey-form__group">
                                <input type="button" value="Change Password" className="btn-action btn-action--type-submit" onClick={this.onPasswordChangeSubmit}/>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }
    onOldPasswordChange(e){
        this.setState({
            OldPassword: e.target.value
        })
    }

    onPasswordChange(e){
        this.setState({
            Password: e.target.value
        })
    }
    onConfirmPasswordChange(e){
        this.setState({
            ConfirmPassword: e.target.value
        })
    }
    onPasswordChangeSubmit(){
        this.props.change(this.state);
    }




}

const mapStateToProps = state => ({
    survey: state.survey,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({change}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
