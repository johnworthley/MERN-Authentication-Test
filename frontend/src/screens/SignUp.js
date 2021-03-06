import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

export default class SignUp extends Component {
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

  signUp = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/register', {
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
      alert('Error signing up, please try again');
    });
  }

  render() {
    console.log(JSON.stringify(this.state))
    return (
      <View>
        <Text>Register Below!</Text>
        <Input
            placeholder="Email"
            type='email'
            name='email'
            onChangeText={this.onInputChange}
            value={this.state.email}
          />
        <Input
            placeholder="Password"
            type='password'
            name='password'
            onChangeText={this.onInputChange}
            value={this.state.password}
            secureTextEntry
          />
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          />
      </View>
    );
  }
}
