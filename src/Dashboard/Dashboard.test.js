import React, { Component } from 'react';
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import Dashboard from './Dashboard';

it('renders without crashing', () => {
  const input = document.createElement('input');
  ReactDOM.render(<Dashboard />, input);
});
