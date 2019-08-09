import React, { Component } from 'react';
import { View, Text, Stylesheet, Button, Platform, Alert } from 'react-native';
import { styles } from '../styles';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {IS_ANDROID} from '../../src_map/utils';
import PubNub from 'pubnub';
import {lineString as makeLineString} from '@turf/helpers';
import { TextInput } from 'react-native-gesture-handler';

import MapboxClient from '../../src_map/MapboxClient';
import RouteSimulator from '../../src_map/utils/RouteSimulator'
import Polyline from '../../src_map/utils/RouteSimulator'
import sheet from '../../src_map/styles/sheet'
import Page from '../../src_map/components/common/Page'
import PulseCircleLayer from '../../src_map/components/common/PulseCircleLayer'
 


const ROOT_URL = 'https://arcane-forest-23110.herokuapp.com/';
const io = require('socket.io-client/dist/socket.io');

let socket;
let arrayCoords = [];
let reverseCoords = [];
 
let lat = undefined;
let lng = undefined;
let latDestination = undefined;
let lngDestination = undefined;
let currentPosition = {};
let routeSimulator;
// let coordLength;
let LATITUDE = 1.11862;
let LONGITUDE = 104.04866

const layerStyles = Mapbox.StyleSheet.create({
  origin: {
    circleRadius: 5,
    circleColor: 'black',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'black',
  },
  route: {
    lineColor: 'green',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  }
})

const testCoords = [
  [103.94618, 1.044992], 
  [103.946089, 1.044942],
  [103.94603, 1.04507]
]

const TEST = [103.94618, 1.044992]
const TESTDestination = [103.94603, 1.08507]

export default class SenderScreen extends Component {

	constructor(props) {
    super(props);

    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
      routeBack: null,
      
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
      activeExample: -1,

      myPosition:{
        latitude:0,
        longitude:0,
        timestamp:0,
      },
      berat:'berat',
      jarak: 'null',
      SOS: 'null'
    };		

    this.socket = io.connect(ROOT_URL);
    
    this.onStart = this.onStart.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onDisplayRoute = this.onDisplayRoute.bind(this);
  }

  componentWillUnmount = () =>{
    this.socket.on('disconnect', ()=>{
      console.warn('Disconnected from server');
    })
  }
  componentDidMount = () => {    
    this.socket.on('connect', ()=>{
      // console.warn('Connected to server');
    });        

    navigator.geolocation.getCurrentPosition(
      position=>{
        this.socket.emit('client-SenderPosition',{
          data: position,
          id: this.id,
        })

        let tempPosition = {...this.state.myPosition};
        tempPosition.latitude = position.coords.latitude;
        tempPosition.longitude = position.coords.longitude;
        currentPosition = {
          longitude: tempPosition.longitude, 
          latitude: tempPosition.latitude
        };

        this.setState({
          myPosition: tempPosition,
          isLoading:false,
        });               
      },
      error=> console.warn(error.message),
      {enableHighAccuracy:true, timeout:20000, distanceFilter:10}
    )

    this.socket.on('start-simulator',(response)=>{
      console.warn(JSON.stringify(response));
      console.log(JSON.stringify(response));
    })
  }

  onStart(){
    routeSimulator = new RouteSimulator(this.state.route);
    routeSimulator.addListener(currentPoint=>this.setState({currentPoint}));
    routeSimulator.start();
    this.setState({routeSimulator});
    this.socket.emit('start-simulator',{
      data: 'start'
    })    
        
  }

  onBack() {
  this.getDirections().then(()=>{
      routeSimulator = new RouteSimulator(this.state.routeBack)
      routeSimulator.addListener(currentPoint=>this.setState({currentPoint}));
      routeSimulator.start()
      // this.setState({routeSimulator});
    })
  }

  renderBackButton(){
    // console.warn('back start')
    setTimeout(() => {
      // const totalDistance = this.state.routeSimulator._polyline._totalDistance;
      // const currentDistance = this.state.routeSimulator._currentDistance;
      
      if(currentDistance>=totalDistance){
        // console.warn('BACK');
          <Button
                raised
                title="Return"
                onPress={this.onBack}
                style={styles.button}
                // disabled={!this.state.route}
          />
      }      
    }, 10000)
    
  }
  
  
  onDisplayRoute(){
    this.getDirections();
    
    this.setState({
      berat:'3',
      jarak:'750m'
    })
    alert("Lokasi Penerima telah Didapat")
    
    // console.warn('routeSimulator',JSON.stringify(this.state.routeSimulator._polyline._totalDistance));
    // console.warn(this.state.route.coordinates)
  }

  async getDirections() {
    await fetch('https://arcane-forest-23110.herokuapp.com/getDirection',
        {
          method: "GET",        
        }).then((response)=> response.json())
        .then((responseJson)=>{
          // console.warn(JSON.stringify(responseJson));
          // routes = responseJson;
          let tempReverse = responseJson;
          reverseCoords = tempReverse.slice().reverse();   

          this.setState({
            route: makeLineString(responseJson),
            routeBack: makeLineString(reverseCoords),
          })

        }).catch(error=>{
          alert(`ERROR: ${error}`);
        })          
    await this.renderOrigin()
  }
  
  renderRoute() {
    if (!this.state.route){
      return null;
    }

    return (
      <Mapbox.ShapeSource id="routeSource" shape={this.state.route}>
        <Mapbox.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"        
        />
      </Mapbox.ShapeSource>
    );
  }

  renderCurrentPoint(){
    if(!this.state.currentPoint){
      return null;
    }

    return (
      <PulseCircleLayer
        shape={this.state.currentPoint}
        aboveLayerID='destinationInnerCircle'
      />
    );
  }

  renderTrackingLine(){
  }
  renderProgressLine() {
    if(!this.state.currentPoint){
      return null;
    }
    
    const {nearestIndex} = this.state.currentPoint.properties;
    const coordLength = this.state.route.geometry.coordinates.length;
    const coords = this.state.route.geometry.coordinates.filter(
      (c, i)=> i <= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);

    if(coords.length < 2) {
      return null;
    }
    const lineString = makeLineString(coords);
    // console.warn(this.state.currentPoint.geometry.coordinates);

    return(
      <Mapbox.Animated.ShapeSource id='progressSource' shape={lineString}>
        <Mapbox.Animated.LineLayer
          id='progressFill'
          style={layerStyles.progress}
          aboveLayerID='routeFill'
        />
      </Mapbox.Animated.ShapeSource>
    )
  }
  renderProgressLineBack() {
    if(!this.state.currentPoint || this.state.route){
      return null;
    }    
    const {nearestIndex} = this.state.currentPoint.properties;
    const coordLength = this.state.routeBack.geometry.coordinates.length;
    const coords = this.state.routeBack.geometry.coordinates.filter(
      (c, i)=> i >= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);
    console.warn(JSON.stringify(nearestIndex));

    if(coords.length < 2) {
      return null;
    }
    const lineString = makeLineString(coords);
    console.warn(this.state.currentPoint.geometry.coordinates);

    return(
      <Mapbox.Animated.ShapeSource id='progressSource' shape={lineString}>
        <Mapbox.Animated.LineLayer
          id='progressFill'
          style={layerStyles.progress}
          aboveLayerID='routeFill'
        />
      </Mapbox.Animated.ShapeSource>
    )
  }

  renderOrigin(){
    let backgroundColor = 'black';

    if(this.state.currentPoint){
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, {circleColor:backgroundColor}];

    return(
      <Mapbox.ShapeSource
        id='origin'
        // shape={Mapbox.geoUtils.makePoint(DroneLocation)}
        shape={Mapbox.geoUtils.makePoint(TEST)}
      >
        <Mapbox.Animated.CircleLayer id='originInnerCircle' style={style}/>
      </Mapbox.ShapeSource>
    )
  }

  renderActions(){
    if(this.state.routeSimulator){
      return null;
    }        
    // return(
    //   // <View style={styles.buttonCnt}>
    //   //   {/* <Button
    //   //     raised
    //   //     title="Start"
    //   //     onPress={this.onStart}
    //   //     style={styles.button}
    //   //     disabled={!this.state.route}
    //   //   />              */}
    //   // </View>
    // )
  }

 	render() {
    // socket = io.connect(ROOT_URL);

    
    setInterval(() => {
      this.socket.emit('toServer-origin',
        {
          lat1: this.state.myPosition.latitude,
          lng1: this.state.myPosition.longitude
        });

    this.socket.on('fromServer-destination', (response)=>{
        if (response.lat2 == null && response.lat2 == null){
          alert('Response Null, Wait For a Minute');
        }
        else{
          latDestination = response.lat2;
          lngDestination = response.lng2;
        }
        // console.warn(`Receive Destination: ${[latDestination, lngDestination]}`);
      });      
    }, 5000);
      


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
        {/* <View style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10 }}>
          <Text style={styles.headerText}>Tujuan</Text>
        </View> */}
        <Mapbox.MapView
          textureMode = {true}
          showUserLocation = {true}
          userTrackingMode = {Mapbox.UserTrackingModes.Follow}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={18}
          ref={c => (this._map = c)}
          centerCoordinate={[104.04866, 1.11862]}
          style={styles.viewMap}
        >

          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {/* {this.renderProgressLineBack()}
          {this.renderProgressLine()} */}

          <Mapbox.ShapeSource
            id="destination"
            shape={Mapbox.geoUtils.makePoint(TESTDestination)}
          >
            <Mapbox.CircleLayer
              id='destinationInnerCircle'
              style={layerStyles.destination}
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
        {/* <Button
          raised
          title="Get Route"
          onPress={this.onDisplayRoute}
          style={styles.button}
          // disabled={!this.state.route}
        />  */}
        {this.renderActions()}
        
        <View style= {{ 
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: 'transparent',
            top: 5,
          }}>
            <Button
              style = {styles.button}
              onPress={this.onDisplayRoute}
              title = "Get Route"            
            />
            <Button
              raised
              title="Start"
              onPress={this.onStart}
              style={styles.button}
              disabled={!this.state.route}
            />
          </View> 
          <View style = {{
            flexDirection:"row",
            justifyContent:'flex-start',
            top: 10,
            }}>
            <Text style={{top:12}}>Berat(Kg)         :</Text>
            <TextInput style = {styles.inputText}
              underlineColorAndroid = 'transparent'
              placeholder = 'Berat'
              keyboardType='number-pad'  
              editable = {false}
              value = {this.state.berat}            
              // onChangeText = {this.handleBerat}
            />

            <View style = {{
            flexDirection:"row",
            justifyContent:'flex-end',
            left: 40,
            }}> 
            <Text style={{top:12}}>SOS/Ulasan:</Text>            
            </View>      
          </View>  
          
          <View style = {{
            flexDirection:"row",
            justifyContent:'flex-start',
            top: 8,            
            }}>
            <Text style={{top:12}}>Jarak Tempuh:</Text>
            <TextInput style = {styles.inputText}
              underlineColorAndroid = 'transparent'
              placeholder = 'Jarak'
              keyboardType='number-pad'
              editable = {false}   
              value = {this.state.jarak}           
              // onChangeText = {this.handleBerat}
            />

            <View style = {{
              flexDirection:"row",
              justifyContent:'flex-end',
              left: 35,
              }}>
              <TextInput style = {{
                margin:5,
                height:35,
                // width:30
                width: 150,
                borderWidth:1,
              }}
                underlineColorAndroid = 'transparent'
                placeholder = 'SOS/Ulasan'
                keyboardType='default'              
                // onChangeText = {this.handleBerat}
              />
            </View>

          </View> 

          <View style = {{
            flexDirection:"row",
            justifyContent:'flex-start',
            // top: 5,
            }}>
            <Text style={{top:12}}>Harga/Tarif:</Text>
            <Text style={{top:12}}>1000/100m</Text>
          </View>                        
        </View>
    );
	}
}





