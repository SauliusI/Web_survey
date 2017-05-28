import {combineReducers} from 'redux';
import survey from './survey.jsx';
import user from './user.jsx';

const allReducers = combineReducers({
    survey,
    user
});



export default allReducers;

