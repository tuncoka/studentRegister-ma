import React, { Component } from 'react';
import { TextInput, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Button, Card, CardSection, Spinner } from '../common';

class LoginForm extends Component {
    state = { email: '', password: '', loading: false };
    clickLogin() {
        this.setState({ loading: true });
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
    loginSuccess() {
        console.log('success');
        this.setState({ loading: false });
    }
    loginFail() {
        console.log('fail');
        this.setState({ loading: false });
        Alert.alert(
            'ERROR',
            'E-mail or password is invalid!',
            [
               { text: 'OK', onPress: () => null } 
            ]
        );
    }
    renderButton() {
        if(!this.props.loading) {
            return <Button onPress={this.clickLogin.bind(this)}> LOGIN </Button>;
        }
        return <Spinner size="small" />;
    }
    render() {
        console.log('response email: '+this.props.email);
        console.log('response passwd: '+this.props.password);
        const { inputStyle, viewStyle } = styles;
        return (
            <View style={viewStyle}>
                <Card>
                    <CardSection>
                        <TextInput
                            placeholder="E-Mail"
                            style={inputStyle}
                            value={this.props.email}
                            onChangeText={email => this.props.emailChanged(email)}
                        />
                    </CardSection>
                    <CardSection>
                        <TextInput
                            secureTextEntry
                            placeholder="Password"
                            style={inputStyle}
                            value={this.props.password}
                            onChangeText={password => this.props.passwordChanged(password)}
                        />
                    </CardSection>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    viewStyle: {
        flex: 1,
        backgroundColor: '#fff'
    }
}

const mapStateToProps = ({ authenticationResponse }) => {
    const { email, password, loading} = authenticationResponse;
    return {
        email, //test@test.com
        password, //123455
        loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);