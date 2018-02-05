import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Spinner } from '../common';
import { studentChange, studentCreate } from '../actions';

class StudentCreate extends Component {
    clickSave(){
        const { firstname, surname, number, section } = this.props;
        this.props.studentCreate({ firstname, surname, number, section });
    }
    renderButton() {
        if(!this.props.loading) {
            return <Button onPress={this.clickSave.bind(this)}> Save </Button>;
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
                        value={this.props.firstname}
                        onChangeText={firstname => this.props.studentChange({ props: 'firstname', value: firstname})}
                    />
                </CardSection>
                <CardSection>
                    <TextInput 
                        placeholder="Surname"
                        style={inputStyle}
                        value={this.props.surname}
                        onChangeText={surname => this.props.studentChange({ props: 'surname', value: surname})}
                    />
                </CardSection>
                <CardSection>
                    <TextInput 
                        placeholder="Number"
                        style={inputStyle}
                        value={this.props.number}
                        onChangeText={number => this.props.studentChange({ props: 'number', value: number})}
                    />
                </CardSection>
                <CardSection>
                    <Text> Section </Text>
                    <Picker
                        style={pickerStyle}
                        selectedValue={this.props.section}
                        onValueChange={section => this.props.studentChange({ props: 'section', value: section})}
                    >
                        <Picker.Item label="Section A" value="asec" />
                        <Picker.Item label="Section B" value="bsec" />
                        <Picker.Item label="Section C" value="csec" />
                        <Picker.Item label="Section D" value="dsec" />
                    </Picker>   
                </CardSection>
                <CardSection>
                    {this.renderButton()}
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

mapToStateProps = ({ studentListResponse }) => {
    const { firstname, surname, number, section, loading } = studentListResponse;
    return {
        firstname,
        surname,
        number,
        section,
        loading
    };
}

export default connect(mapToStateProps, { studentChange, studentCreate })(StudentCreate);
