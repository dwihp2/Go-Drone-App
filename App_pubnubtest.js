import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PubNub from 'pubnub';

export default class App extends Component {
  render() {
    return (
      <View style = {{flex:1}}></View>
    )
  }
}

const pubnub = new PubNub({
  subscribeKey: "sub-c-f92fd6d6-5bab-11e9-ba87-ca4df85413ac",
  publishKey: "pub-c-5b2e8708-19f5-4aa4-b9a3-585047b421d7",
  ssl: true,
  presenceTimeout:350000
})

pubnub.addListener({
  message: function(request) {
    let msg
    msg= request.message.payload? ` ${request.message.payload} and DATA: ${request.message.data}` : 'Request not valid'
    //alert(typeof message);
    // if (typeof message != null) 
    // {
    // //   console.log(message.payload);
    alert(msg);
    // }
      // handle message
  }
})

pubnub.subscribe({ 
  channels: ['Hello_world'] 
});

pubnub.publish({
  // message: {
  //     "color" : "blue"
  // },
  channel: 'Hello_world'
});

