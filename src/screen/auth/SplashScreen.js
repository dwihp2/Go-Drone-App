import React, {useEffect,Component} from "react";
import {View, ImageBackGround, ActivityIndicator, StatusBar, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
//import { styles } from '../../styles';

// export default class SplashScreen extends Component {   
    
//     _getToken = async () => {
//         try {
//             const USER_DATA = await AsyncStorage.getItem("@USER_DATA");
//             setTimeout(()=> {
//                 props.navigation.navigate(USER_DATA ? "DASHBOARD" : "AUTH");
//             }, 1000);
//         }
//         catch (error) {
//             alert(error)
//         }
//     }    
//     render() {
//         useEffect( ()=> {
//             _getToken();
//         }, []);

//         return (
//             <View style = {styles.container}>
//             <StatusBar hidden />
//             <ImageBackGround
//                 source = {require("../../images/splash_drone.jpg")}
//                 style = {{width:"100%", height:"100%"}}
//             />
//             <ActivityIndicator
//                 size = "large"
//                 animating
//                 style = {{position:"absolute"}}
//             />
//         </View>
//         );
//     }
// }

const SplashScreen = () => {
    useEffect(()=> {
        _getToken();
    }, []);

    _getToken = async () => {
        try {
            const USER_DATA = await AsyncStorage.getItem("@USER_DATA");
            setTimeout(()=> {
                props.navigation.navigate(USER_DATA ? "DASHBOARD" : "AUTH");
            }, 1000);
        }
        catch (error) {
            alert(error)
        }
    };

    return (
        <View style = {styles.container}>
            <StatusBar hidden />
            <ImageBackGround
                source = {require("../../images/splash_drone.jpg")}
                style = {{width:"100%", height:"100%"}}
            />
            <ActivityIndicator
                size = "large"
                animating
                style = {{position:"absolute"}}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
