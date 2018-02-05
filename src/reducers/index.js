import { combineReducers} from 'redux';
import authenticationReducers from './authenticationReducers';
import studentListReducers from './studentCreateReducers';
import studentDataReducers from './studentDataReducers';
import studentUpdateReducers from './studentUpdateReducers';

export default combineReducers ({
    authenticationResponse: authenticationReducers,
    studentListResponse: studentListReducers,
    studentDataResponse: studentDataReducers,
    studentUpdateResponse: studentUpdateReducers
});