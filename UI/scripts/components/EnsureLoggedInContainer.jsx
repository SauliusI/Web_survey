import React from 'react';
import {hashHistory} from 'react-router';
import {returnUrl, checkUser} from '../actions/index.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class EnsureLoggedInContainer extends React.Component {
    constructor(){
        super();
        this.checkUserStatus=this.checkUserStatus.bind(this);
    }
    componentDidMount(){
        this.checkUserStatus();
    }
    componentDidUpdate() {
        this.checkUserStatus();
    }

    render() {
        if (this.isLoggedIn()) {
            return this.props.children;
        } else {
            return null;
        }
    }

    isLoggedIn(){
        return (this.props.user.user !== "");
    }
    
    checkUserStatus(){
        const { currentURL } = this.props;
        if (!this.isLoggedIn()) {
            this.props.returnUrl(currentURL);
            hashHistory.push("/login");
            
            this.props.checkUser(this.props.user.returnUrl);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        currentURL: ownProps.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({returnUrl, checkUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer);