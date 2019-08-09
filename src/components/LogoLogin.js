import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';

const LogoLogin = () => (
    <View style = {{alignItems:'center', justifyContent:'center'}}>
        <View style = {{margin: 50}}>
            <Image
                source = {require('../images/godrone.png')}
                style = {{width:260, height:65}}
            />
        </View>
        {/* <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
            {'GO DRONE APPLICATION'}
        </Text> */}
    </View>
);

export default LogoLogin;