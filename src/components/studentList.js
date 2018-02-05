import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { studentListData } from '../actions';
import ListItem from './listItem';

class StudentList extends Component {
    componentWillMount() {
        this.props.studentListData();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    createDataSource({ studentArray }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(studentArray);
    }
    renderRow(student) {
        return <ListItem student={student} />;
    }
    render() {
        console.log(this.props.studentArray);
        return (
            <View>
                <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                />
            </View>    
        );
    }
}

const mapStateToProps = ({ studentDataResponse }) => {
    const studentArray = _.map(studentDataResponse, (val, uid) => {
        return { ...val, uid };
    });
    return { studentArray };
};

export default connect(mapStateToProps, { studentListData })(StudentList);
