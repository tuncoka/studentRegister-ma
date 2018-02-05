import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { STUDENT_CHANGE, 
    CREATE_REQUEST, 
    CREATE_REQUEST_SUCCESS, 
    STUDENT_LIST_DATA_SUCCESS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    DELETE_REQUEST, 
    DELETE_REQUEST_SUCCESS } from './types';

export const studentChange = ({ props, value}) => {
    return (dispatch) => {
        dispatch({
            type: STUDENT_CHANGE,
            payload: { props, value }
        });
    };
};

export const studentCreate = ({ firstname, surname, number, section }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: CREATE_REQUEST
        });
        firebase.database().ref(`/users/${currentUser.uid}/students`)
        .push({ firstname, surname, number, section })
        .then(() => {
            dispatch({
                type: CREATE_REQUEST_SUCCESS
            });
            Actions.pop();
        });
    };
};

export const studentListData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/students`)
        .on('value', snapshot => {
            dispatch({
                type: STUDENT_LIST_DATA_SUCCESS,
                payload: snapshot.val()
            });
        });
    };
};

export const studentUpdate = ({ firstname, surname, number, section, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: UPDATE_REQUEST
        });
        firebase.database().ref(`/users/${currentUser.uid}/students/${uid}`)
        .set({ firstname, surname, number, section })
        .then(() => {
            dispatch({
                type: UPDATE_REQUEST_SUCCESS
            });
            Actions.pop();
        });
    };
};

export const studentDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: DELETE_REQUEST
        });
        firebase.database().ref(`/users/${currentUser.uid}/students/${uid}`)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_REQUEST_SUCCESS
            });
            Actions.pop();
        });
    };
};