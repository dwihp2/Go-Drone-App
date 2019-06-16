import React, { Component } from 'react';
import { View, Text, Stylesheet, Button, Platform, Alert } from 'react-native';
import { styles } from '../styles';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {IS_ANDROID} from '../../src_map/utils';
import PubNub from 'pubnub';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

const ROOT_URL = 'https://arcane-forest-23110.herokuapp.com/';
const io = require('socket.io-client/dist/socket.io');

let socket;
let routes = [[null,null],[null,null]];
 
Mapbox.setAccessToken("pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg");

let lat = undefined;
let lng = undefined;
let latDestination = undefined;
let lngDestination = undefined;

// pubnub.addListener({
//   message: function(payload) {
//     let msg
//     msg = payload.message.directions
//     // msg= payload.message.distance? ` ${payload.message.payload} and DATA: ${payload.message.data}` : 'Request not valid'
//     alert(msg);
//   }
// })
const testCoords = [
  [103.94618, 1.044992], 
  [103.946089, 1.044942],
  [103.94603, 1.04507]
]
const line = makeLineString(testCoords);

export default class SenderScreen extends Component {
  state = {
    currentLatitude:'',
    currentLongitude:'',
  }
	constructor(props) {
    super(props);

    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
      activeExample: -1,
		};		
  }
  componentWillUnmount = () =>{
    socket.on('disconnect', ()=>{
      console.warn('Disconnected from server');
    })
  }
  componentDidMount = () => {    
    socket.on('connect', ()=>{
      console.warn('Connected to server');
    });    
    
    getLocation=()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(updatePosition);
      }
      return null;
    };
    updatePosition=(position)=>  {
      if (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      }
    }
    setInterval(() => {
      updatePosition(getLocation());
    }, 10000);

    getLocation();
  }

   renderRouteLine=()=>{
    const lineString = makeLineString(routes);
    return (
      <MapboxGL.Animated.ShapeSource
        id = "routesLineSource"
        shape = {lineString}>
        <MapboxGL.Animated.LineLayer
          id = "routesLineFill"
          style = {{lineColor:'#540067', lineWidth: 3}}
        />
      </MapboxGL.Animated.ShapeSource>
    )
  }

 	render() {
    socket = io.connect(ROOT_URL);

    
    setInterval(() => {
      socket.emit('toServer-origin',
        {
          lat1: lat,
          lng1: lng
        });

      socket.on('fromServer-destination', (response)=>{
        if (response.lat2 == null && response.lat2 == null){
          alert('Response Null, Wait For a Minute');
        }
        else{
          latDestination = response.lat2;
          lngDestination = response.lng2;
        }
        // console.warn(`Receive Destination: ${[latDestination, lngDestination]}`);
      });      
    }, 7000);
      


    const buttonPOST=()=>{
      let promRoutes = new Promise (resolve=>{
        fetch('https://arcane-forest-23110.herokuapp.com/getDirection',
        {
          method: "GET",        
        }).then((response)=> response.text())
        .then((responseJson)=>{
          // console.warn(JSON.stringify(responseJson));
          routes = responseJson;
        }).catch(error=>{
          alert(`ERROR: ${error}`);
        })
        resolve(routes);
        console.warn(routes);
      })
    }
    
		return (
      <View style={{flex:1}}>
      
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10 }}>
          <Text style={styles.headerText}>Tujuan</Text>
        </View>
        <Mapbox.MapView
          textureMode = {true}
          showUserLocation = {true}
          userTrackingMode = {Mapbox.UserTrackingModes.Follow}
          onUserLocationUpdate = {[lng, lat]}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={20}
          centerCoordinate={[104.04866, 1.11862]}
          style={styles.viewMap}>
          {this.renderRouteLine()}
        </Mapbox.MapView>
        <Button
          onPress = {buttonPOST}
          title = "Get Routes"
          color = "blue"
        />
      </View>
    );
	}
}





