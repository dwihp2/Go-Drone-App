import React, {Component} from 'react';
import RootNavigator from './src/rootNavigator';
import navigationServices from './src/helper/navigationServices';

export default class App extends Component {
  render() {
    return (
      <RootNavigator
        ref = {navRef => navigationServices.setTopLevelNavigator(navRef)}
      />
    );
  }
}