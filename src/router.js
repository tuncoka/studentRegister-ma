import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import StudentList from './components/studentList';
import StudentCreate from './components/studentCreate';
import StudentUpdate from './components/studentUpdate';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ marginTop: 65 }}>
            <Scene key="authentication">
                <Scene 
                    key="loginScreen" 
                    component={LoginForm} 
                    title="Login Page" 
                />
            </Scene>
            <Scene key="main">
                <Scene 
                    onRight={() => Actions.studentCreate()}
                    rightTitle="Add"
                    key="studentList" 
                    component={StudentList} 
                    title="Student List" 
                />
                <Scene 
                    key="studentCreate" 
                    component={StudentCreate} 
                    title="Student Create" 
                />
                <Scene 
                    key="studentUpdate" 
                    component={StudentUpdate} 
                    title="Student Update" 
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;