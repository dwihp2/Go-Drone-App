import React, {Component} from 'react';
import {ScrollView} from "react-native";

import LogoLogin from "../../components/LogoLogin";
import FormLogin from "../../container/FormLogin";

import { View, Text, Button } from "react-native";
import {styles} from '../../styles';
import navigationServices from '../../helper/navigationServices';

const LoginScreen = () => (
    <ScrollView style = {{margin:15}} showsVerticalScrollIndicator={false}>
        <LogoLogin/>
        <FormLogin/>
    </ScrollView>   
);

export default LoginScreen;



// export default class LoginScreen extends Component {
//     _openDashboard = () => {
//         navigationServices.navigate('DASHBOARD');
//     }

//   render() {
//     return (
//         <View style = {styles.container}>
//             <Text>LoginScreen</Text>
//             <Button 
//             title="LOGIN"
//             onPress = {()=> this._openDashboard() }/>
//         </View>
//     )}
// }



