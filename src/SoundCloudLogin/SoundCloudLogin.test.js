import React, { Component } from 'react';
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import SoundCloudLogin from './SoundCloudLogin';

it('renders without crashing', () => {
  const input = document.createElement('input');
  ReactDOM.render(<SoundCloudLogin />, input);
});

it('gives error if no password', () => {
    const login = mount(<SoundCloudLogin />);
    login.find('input.username').simulate('change',{username:'testuser'});
    login.find('button').simulate('click');
    console.log(login.props());
    expect(login.props().error).to.equal(true);
});

it('gives error if no username', () => {
  const input = document.createElement('input');
  ReactDOM.render(<SoundCloudLogin />, input);
});
