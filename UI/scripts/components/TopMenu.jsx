import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {errorMessage, logout} from '../actions/index.jsx';
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';

class TopMenu extends React.Component {

    constructor(props){
        super(props);
        this.state={active: 0};
        this.changeActive=this.changeActive.bind(this);
        this.errorNotification=this.errorNotification.bind(this);
        this.errorClick=this.errorClick.bind(this);
        this.onnClick=this.onnClick.bind(this);
    }
    
    render() {
        let active=[];
        active[2]='';
        active[1]='';
        if(this.state.active===1){
            active[1]="active";
        }else if(this.state.active===2){
            active[2]="active";
        }
        return (
            <div className="page-top-frame">
                <div className="page-top-bar">
                    <header className="page-header">
                        <figure className="page-header__logo">
                            <Link to="/"><img src="content/images/logo.svg" to="/"/></Link>
                        </figure>
                        {this.renderUserInfo()}
                    </header>
                </div>
                <div className="page-breadcrumb">
                    <div className="page-breadcrumb__content">
                        <nav className="main-nav">
                        </nav>
                        <Link className="btn-action btn-action--position-right" to="createsurvey">Create New Survey</Link>
                    </div>
                </div>
                {this.errorNotification()}
            </div>
        );
    }

    renderUserInfo(){
        if(this.props.user.user !== "")
            return (
                <div className="page-header__nav-user">
                    <figure className="page-header__user-pic"><a href="#"><img src="content/images/usr.jpg"/></a></figure>
                    <ul className="page-header__username">
                        <li className="btn-user"  ><strong><Link to="profile" >{this.props.user.user}</Link></strong></li>
                        <li className="btn-user"  /><Link to="logout" onClick={this.onnClick}>Logout</Link>
                    </ul>
                </div>
            )
        else 
            return (
                <div className="page-header__nav-user">
                    <figure className="page-header__user-pic"><a href="#"><img src="content/images/usr.jpg"/></a></figure>
                    <ul className="page-header__username">
                        <li className="btn-user"/><Link to="login">Login</Link>
                        <li className="btn-user" onClick={this.errorClick}/><Link to="register" onClick={this.errorClick}>Sign Up</Link>
                    </ul>
                </div>
            )
                        }
    onnClick(){
        this.props.logout();
        hashHistory.push("/");
    }
    errorClick(){
        this.props.errorMessage("");
    }

    errorNotification(){
        if(this.props.survey.errorMessage&&
            this.props.survey.errorMessage!=="Survey Created!!!"&&
            this.props.survey.errorMessage!=="Register Successful!!!"&&
            this.props.survey.errorMessage!==""){
            return(
                <div className="notification-message" onClick={this.errorClick}>
                    <div className="notification-message__wrap">
                        <i className="fa fa-exclamation-triangle"/>
                        {this.props.survey.errorMessage}
                    </div>
                </div>
            )
        }
    }


    changeActive(e){
        this.setState({
            active: e
        });
    }
}

function mapStateToProps(state) {
    return{
        survey: state.survey,
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({errorMessage, logout}, dispatch)

}

export default connect(mapStateToProps,matchDispatchToProps)(TopMenu);