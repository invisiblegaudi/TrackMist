import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SoundCloudLogin from './SoundCloudLogin';

it('renders without crashing', () => {
  const input = document.createElement('input');
  ReactDOM.render(<SoundCloudLogin />, input);
});

