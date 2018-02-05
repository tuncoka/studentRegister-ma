import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Spinner } from '../common';
import { studentChange, studentUpdate, studentDelete } from '../actions';

class StudentUpdate extends Component {
    state = { firstname: '', surname: '', number: '', section: '' };
    componentWillMount() {
        const { firstname, surname, number, section } = this.props.availableStudent;
        this.setState({ firstname, surname, number, section }); 
    }
    clickUpdate() {
        const { firstname, surname, number, section } = this.state;
        this.props.studentUpdate({ firstname, surname, number, section, uid: this.props.availableStudent.uid });
    }
    clickDelete() {
        this.props.studentDelete({ uid: this.props.availableStudent.uid });
    }
    renderUpdateButton() {
        if(!this.props.loadingUpdate) {
            return <Button onPress={this.clickUpdate.bind(this)}> Update </Button>;
        }
        return <Spinner size="small" />;
    }
    renderDeleteButton() {
        if(!this.props.loadingDelete) {
            return <Button onPress={this.clickDelete.bind(this)}> Delete </Button>;
        }
        return <Spinner size="small" />;
    }
    render() {
        const { inputStyle, pickerStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput 
                        placeholder="Name"
                        style={inputStyle}
                        value={this.state.firstname}
                        onChangeText={firstname => this.setState({ firstname })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput 
                        placeholder="Surname"
                        style={inputStyle}
                        value={this.state.surname}
                        onChangeText={surname => this.setState({ surname })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput 
                        placeholder="Number"
                        style={inputStyle}
                        value={this.state.number}
                        onChangeText={number => this.setState({ number })}
                    />
                </CardSection>
                <CardSection>
                    <Text> Section </Text>
                    <Picker
                        style={pickerStyle}
                        selectedValue={this.state.section}
                        onValueChange={section => this.setState({ section })}
                    >
                        <Picker.Item label="Section A" value="asec" />
                        <Picker.Item label="Section B" value="bsec" />
                        <Picker.Item label="Section C" value="csec" />
                        <Picker.Item label="Section D" value="dsec" />
                    </Picker>   
                </CardSection>
                <CardSection>
                    {this.renderUpdateButton()}
                </CardSection>
                <CardSection>
                    {this.renderDeleteButton()}
                </CardSection>
            </Card>
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
    pickerStyle: {
        flex: 1
    }
}

mapToStateProps = ({ studentUpdateResponse }) => {
    const { loadingUpdate, loadingDelete } = studentUpdateResponse;
    return { loadingUpdate, loadingDelete };
}

export default connect(mapToStateProps, { studentChange, studentUpdate, studentDelete })(StudentUpdate);