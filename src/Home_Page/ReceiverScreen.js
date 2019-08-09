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
      constructor(props) {
      super(props);  
      this.state = {
        isFetchingAndroidPermission: IS_ANDROID,
        isAndroidPermissionGranted: false,
        activeExample: -1,

        isLoading: true,
        myPosition:{
          latitude: 0,
          longitude: 0,
          timestamp:0,
        },
        drone:{},
        };		
        
      this.socket = io.connect(ROOT_URL);
    };  
    componentDidMount = () => {
      this.socket.on('connect', ()=>{
        // console.warn('Connected to server');
      });

      navigator.geolocation.getCurrentPosition(
        position=>{
          this.socket.emit('client-ReceiverPosition', {
            data: position,
            id: this.id,
          })

          let tempPosition = {...this.state.myPosition};
          tempPosition.latitude = position.coords.latitude;
          tempPosition.longitude = position.coords.longitude;

          this.setState({
            myPosition: tempPosition,
            isLoading: false,
          });
        },
        error=> console.warn(error),
        {enableHighAccuracy:true, timeout:20000, distanceFilter:10 }
      );
    }

             
  
      render() {
        this.socket.on('dronePosition', positionData=>{
          let tempDrone = {...this.state.drone};
          tempDrone[positionData.id] = {...positionData}

          this.setState({
            drone: tempDrone,
          })
        })

        let dronePositionArr = Object.values(this.state.drone);
        // console.warn('dronePositionArr', dronePositionArr);
      
        setInterval(() => {
          this.socket.emit('toServer-destination',
          {
            // lat2: lat,
            // lng2: lng
            lat2: 1.04707,
            lng2: 103.94603,
          });

          this.socket.on('fromServer-origin', (response)=>{
            if (response.lat1 == null && response.lng1 == null){
              alert('Response Null, Wait For a Minute');
            }
            else {
              latOrigin = response.lat1;
              lngOrigin = response.lng1;
            }
            // console.warn(`Receive Origin: ${[latOrigin, lngOrigin]}`);
          })          
        }, 5000);
        


        const buttonPOST=()=>{                  
          // console.warn([lat, lng]);
          console.warn('dronePositionArr', dronePositionArr);
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
