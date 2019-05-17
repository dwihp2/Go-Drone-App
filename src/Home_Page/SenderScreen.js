import React, { Component } from 'react';
import { View, Text, Stylesheet, Button, Platform } from 'react-native';
import { styles } from '../styles';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {IS_ANDROID} from '../../src_map/utils';
import SetUserTrackingModes from '../../src_map/components/SetUserTrackingModes';
import PubNub from 'pubnub';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken("pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg");

let lat = null;
let lng = null;

// const pubnub = new PubNub({
//   subscribeKey: "sub-c-f92fd6d6-5bab-11e9-ba87-ca4df85413ac",
//   publishKey: "pub-c-5b2e8708-19f5-4aa4-b9a3-585047b421d7",
//   ssl: true
// })

// pubnub.addListener({
//   message: function(request) {
//     let msg
//     msg = request.message.payload? ` Latitude ${request.message.latitude} and Longitude: ${request.message.longitude}` : 'Request not valid'
//       lat = request.message.latitude
//       lng = request.message.longitude
//       // console.log(message);
//       alert(msg);
//       // handle message
//   }
// })

// pubnub.subscribe({ 
//   channels: ['Coordinate'], 
// });

export default class SenderScreen extends Component {
  state = {
    currentLatitude:'unknown',
    currentLongitude:'unknown',
  }
	constructor(props) {
    super(props);

    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
      activeExample: -1,
		};		
    // this.renderItem = this.renderItem.bind(this);
    // this.onCloseExample = this.onCloseExample.bind(this);
  }

  // async componentWillMount() {
  //   if (IS_ANDROID) {
  //     const isGranted = await Mapbox.requestAndroidLocationPermissions();
  //     this.setState({
  //       isAndroidPermissionGranted: isGranted,
  //       isFetchingAndroidPermission: false,
  //     });
  //   }
  // }

  componentDidMount = () => {
    var that = this;
    if (Platform.OS == 'android')
    {
      this.calllocation(that);
    }
    else 
    {
      async function requestAndroidLocationPermissions() {
        try {
          const granted = await PermissionAndroid.request (
            PermissionAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to access your location'
            }
          )
          if (granted == PermissionAndroid.RESULT.GRANTED){
            that.calllocation(that);
          }
          else {
            alert("Permission Denied");
          }
        }
        catch (err) {
          alert ("err",err);
          console.warn(err);
        }
      }
      requestLocationPermission();
      }
    }
    calllocation(that){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
        },
        (error) => alert(error.message),
        {
          enableHighAccuracy:true, timeout:20000, maximumAge:1000
        }
      );
      that.watchID = navigator.geolocation.watchPosition((position) => {
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({ currentLongitude:currentLongitude });
        // that.setState({lng = currentLongitude})
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({ currentLatitude:currentLatitude });
        // that.setState(({lat = currentLatitude}))
        //Setting state Latitude to re re-render the Longitude Text
      });
  }
  componentWillUnmount = ()=> {
    navigator.geolocation.clearWatch(this.watchID);
  }

	render() {
		return (
      <View style={{ flex: 1 }}>
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
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={20}
          //centerCoordinate={[104.04866, 1.11862]}
          style={styles.viewMap}
        />
      </View>
    );
	}
}





