import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

class ListItem extends Component {
    studentClick() {
        Actions.studentUpdate({ availableStudent: this.props.student });
    }
    render(){
        const { firstname, surname } = this.props.student;
        return (
            <TouchableWithoutFeedback onPress={this.studentClick.bind(this)}>
                <View>
                    <CardSection>
                        <Text> 
                            {firstname} {surname}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ListItem;