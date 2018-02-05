import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';  
import Router from './router';

class Main extends Component {
    componentWillMount() {
        firebase.initializeApp({
        apiKey: 'AIzaSyDbtGOdVQXRdesGQGyAWzWVa6KBGnbK-mg',
        authDomain: 'studentregister-9e1ad.firebaseapp.com',
        databaseURL: 'https://studentregister-9e1ad.firebaseio.com',
        projectId: 'studentregister-9e1ad',
        storageBucket: 'studentregister-9e1ad.appspot.com',
        messagingSenderId: '13536567554'
        });
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default Main;