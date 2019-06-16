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
  subscribeKey: "sub-c-16ace6e8-7ee5-11e9-bc4f-82f4a771f4c5",
  publishKey: "pub-c-2ab64a26-b7bb-4cc3-9418-5fdaf3c3adfd",
  ssl: true,
  presenceTimeout:350000
})

pubnub.addListener({
  message: function(request) {
    let msg
    msg= request.message.payload? ` ${request.message.payload} and DATA: ${request.message.data}` : 'Request not valid'
    alert(msg);
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

