import React, {Component} from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { styles } from './src/styles';
import RootNavigator from './src/rootNavigator';
import navigationServices from './src/helper/navigationServices';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken("pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg");
//Mapbox.setAccessToken(config.get('accessToken'));


export default class App extends Component {
  render() {
    return (
      <RootNavigator
        ref = {navRef => navigationServices.setTopLevelNavigator(navRef)}
      />
    );
  }
}