import React from 'react';



import TopMenu from './components/TopMenu.jsx';


export default class App extends React.Component {


    render () {

        return (
            <div className="page-frame">
                <TopMenu/>
                <div className="page-frame__inner">
                    <div className="survey-content">
                        {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
};

module.exports = App;
