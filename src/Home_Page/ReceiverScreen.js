import React, { Component } from 'react';
import { View, Text, Stylesheet, Button,Platform } from 'react-native';
import { styles } from '../styles';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {IS_ANDROID} from '../../src_map/utils';
import PubNub from 'pubnub';

const ROOT_URL = 'https://arcane-forest-23110.herokuapp.com/';
const io = require('socket.io-client/dist/socket.io');
let socket;
let dataIN;

Mapbox.setAccessToken("pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg");

let lat = undefined;
let lng = undefined;
let latOrigin = undefined;
let lngOrigin = undefined;

// const pubnub = new PubNub({
//     subscribeKey: "sub-c-16ace6e8-7ee5-11e9-bc4f-82f4a771f4c5",
//     publishKey: "pub-c-2ab64a26-b7bb-4cc3-9418-5fdaf3c3adfd",
//     ssl: true,
//     presenceTimeout:350000
//   })

// pubnub.subscribe({ 
//   channels: ['Combine_Coordinate']
// });
  

  // pubnub.addListener({
  //   message: function(payload) {
  //     let msg
  //     // msg = payload.message.profile
  //     // msg= payload.message.distance? ` ${payload.message.payload} and DATA: ${payload.message.data}` : 'Request not valid'
  //     alert(msg);
  //   }
  // })
  
  

export default class ReceiverScreen extends Component {
    state = {
      currentLatitude:'undefined',
      currentLongitude:'undefined',
    }
      constructor(props) {
      super(props);
  
      this.state = {
        isFetchingAndroidPermission: IS_ANDROID,
        isAndroidPermissionGranted: false,
        activeExample: -1,
        };		
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
    }   
        
  
      render() {
        socket = io.connect(ROOT_URL);
        
        
        setInterval(() => {
          socket.emit('toServer-destination',
          {
            lat2: lat,
            lng2: lng
          });

          socket.on('fromServer-origin', (response)=>{
            if (response.lat1 == null && response.lng1 == null){
              alert('Response Null, Wait For a Minute');
            }
            else {
              latOrigin = response.lat1;
              lngOrigin = response.lng1;
            }
            // console.warn(`Receive Origin: ${[latOrigin, lngOrigin]}`);
          })          
        }, 7000);
        


        const buttonPOST=()=>{                  
          console.warn([lat, lng]);
        }

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
          <Button
          onPress = {buttonPOST}
          title = "Get Routes"
          color = "yellow"
          />
        </View>
      );
    }
  }