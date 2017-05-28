import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions/index.jsx';

export class Logout extends React.Component {
    constructor(){
        super();
    }

    render() {
        //if(this.props==="Success"){
            return (
                <div className="take-survey">
                    <div className="take-survey__content">
                        <div className="take-survey__thanks">
                            Logout successful!
                        </div>
                    </div>
                </div>
            )
        //}
        
    }
}
