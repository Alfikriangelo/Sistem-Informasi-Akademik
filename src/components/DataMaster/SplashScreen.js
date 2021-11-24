import React, {Component} from 'react';
import {StackActions} from '@react-navigation/native';
import {View, Image, Text} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Master'));
    }, 1000);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <Image
          style={{width: '100%', height: '50%', marginTop: 100}}
          source={require('../../assets/siak.jpg')}
        />
        <Text
          style={{
            color: '#5665D2',
            fontSize: 30,
            fontFamily: 'SourceSansPro-Bold',
            textAlign: 'center',
          }}>
          Sistem Informasi Akademik
        </Text>
      </View>
    );
  }
}
