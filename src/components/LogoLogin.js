import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';

const LogoLogin = () => (
    <View style = {{alignItems:'center', justifyContent:'center'}}>
        <Image
            source = {require("../images/drone.png")}
            style = {{width:200, height:200}}
        />
        <Text style = {{fontSize:25, fontWeight:"bold", textAlign:"center"}}>
            {'GO DRONE APPLICATION'}
        </Text>
    </View>
);

export default LogoLogin;