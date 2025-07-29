import React from 'react';
import { AppRegistry } from 'react-native';
import App from '../src/App';

// Register the app
AppRegistry.registerComponent('tirebel', () => App);

// Run the app
AppRegistry.runApplication('tirebel', {
  rootTag: document.getElementById('root')
});