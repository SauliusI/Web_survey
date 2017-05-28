import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {register} from '../actions/index.jsx';

class Register extends React.Component {
    constructor(){
        super();
        this.state={
            UserName:"",
            Email:"",
            Password:"",
            ConfirmPassword:""
        }
        this.onNameChange=this.onNameChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onPasswordChange=this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange=this.onConfirmPasswordChange.bind(this);
        this.onRegisterSubmit=this.onRegisterSubmit.bind(this);

    }
    render() {
        if(this.props.survey.errorMessage==="Register Successful!!!"){
            return (
                <div className="take-survey">
                    <div className="take-survey__content">
                        <div className="take-survey__thanks">
                            Register Successful!!!
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="survey-login">
                    <div className="survey-login__form-wrapper">
                        <h1 className="heading1">Sign Up</h1>
                        <fieldset className="survey-form">
                            <div className="survey-form__group"><label for="sf-input-username">User Name</label>
                                <input id="sf-input-username" type="text" onChange={this.onNameChange}/>
                            </div>
                            <div className="survey-form__group"><label for="sf-input-firstname">Email</label>
                                <input id="sf-input-firstname" type="text" onChange={this.onEmailChange}/>
                            </div>
                            <div className="survey-form__group"><label for="sf-input-pwd">Password</label>
                                <input id="sf-input-pwd" type="password" onChange={this.onPasswordChange}/>
                            </div>
                            <div className="survey-form__group"><label for="sf-input-pwdconfirm">Confirm Password</label>
                                <input id="sf-input-pwdconfirm" type="password" onChange={this.onConfirmPasswordChange}/>
                            </div>

                        </fieldset>
                    </div>
                </div>
                <div className="survey-login">
                    <div className="survey-bottom-nav">
                        <div className="survey-bottom-nav--left">
                            <input type="button" value="Sign Up" className="btn-action btn-action--type-submit" onClick={this.onRegisterSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    onNameChange(e){
        this.setState({
            UserName: e.target.value
        })
    }
    onEmailChange(e){
        this.setState({
            Email: e.target.value
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

    onRegisterSubmit(){
        this.props.register(this.state);
    }



}

const mapStateToProps = state => ({
    survey: state.survey,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
