import React from 'react';  
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../actions/index.jsx';

class Login extends React.Component {
    constructor(){
        super();
        this.state={
            userName:"",
            password:""
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    render() {
        return(
            <div className="page-frame__inner">
                <div className="survey-login">
                    <div className="survey-login__form-wrapper">
                        <h1 className="heading1">Survey Login</h1>
                        <fieldset className="survey-form">
                            <div className="survey-form__group"><label htmlFor="sf-input-firstname">User Name</label>
                                <input id="sf-input-firstname" type="text" onChange={this.onNameChange} />
                            </div>
                            <div className="survey-form__group"><label htmlFor="sf-input-pwd">Password</label>
                                <input id="sf-input-pwd" type="password" onChange={this.onPasswordChange} />
                            </div>
                            <div className="survey-form__group">
                                <a href="forgot-password.html">Forgot password?</a>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="survey-login">
                    <div className="survey-bottom-nav">
                        <div className="survey-bottom-nav--left">
                            <input type="button" value="Sign In" className="btn-action btn-action--type-submit"  onClick={this.onLoginSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onNameChange(e){
        this.setState({
            userName: e.target.value
        })
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    onLoginSubmit(){
        this.props.login({user: this.state, returnUrl: this.props.user.returnUrl});
    }
}

const mapStateToProps = state => ({
    survey: state.survey,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);