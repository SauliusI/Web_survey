import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Notification extends React.Component {
    render() {
        return (
            <div className="page-top-frame">
                <div className="page-top-bar">
                    <header className="page-header">
                        <figure className="page-header__logo">
                            <Link to="/"><img src="content/images/logo.svg" to="/"/></Link>
                        </figure>
                        <div className="page-header__nav-user">
                            <figure className="page-header__user-pic"><a href="#"><img src="content/images/usr.jpg"/></a></figure>
                            <ul className="page-header__username">
                                <li><strong><a href="#">User Name</a></strong></li>
                                <li className="btn-user"/><a href="#">Logout</a>
                            </ul>
                        </div>
                    </header>
                </div>      
                <Link to="/">
                    <div className="notification-message">
                        <div className="notification-message__wrap">
                            <i className="fa fa-exclamation-triangle"></i>
                            {this.props.errorMessage}
                        </div>
                    </div>
                </Link>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        errorMessage: state.survey.errorMessage
    };
}

export default connect(mapStateToProps)(Notification);