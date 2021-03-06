import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

export default class SignIn extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  }

  onInputChange = (key, value) => {
    let user = {...this.state.user};
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [key]: value
      }
    }))
  }

  signIn = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state.user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    console.log(JSON.stringify(this.state))
    return (
      <View>
        <Text>Login Below!</Text>
        <Input
            placeholder="Email"
            type='email'
            name='email'
            onChangeText={this.onInputChange}
            value={this.state.user.email}
          />
        <Input
            placeholder="Password"
            type='password'
            name='password'
            onChangeText={this.onInputChange}
            value={this.state.user.password}
            secureTextEntry
          />
        <Button
          title='Sign In'
          onPress={this.signIn.bind(this)}
          />
      </View>
    );
  }
}
