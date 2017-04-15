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
    login.ref('username').simulate('change',{target: {name:'username',value:'testuser'}});
    login.find('button').simulate('click');
    expect(login.find('#errorList').children()).to.have.length(1);
});

 it('gives error if no username', () => {
    const login = mount(<SoundCloudLogin />);
    login.find('input[name="password"]').simulate('change',{target:{name:'password',value:'testpass'}});
    login.find('button').simulate('click');
    expect(login.find('#errorList').children()).to.have.length(1);
});

it('gives errorList if nothing entered', () => {
    const login = mount(<SoundCloudLogin />);
    login.find('button').simulate('click');
    expect(login.find('#errorList').children()).to.have.length(2);
});
