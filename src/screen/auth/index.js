import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {createStackNavigator} from "react-navigation";

const _AuthStackScreen = createStackNavigator({
    LOGIN:{
        screen: LoginScreen,
        navigationOptions:{ header:null}
    },
    REGISTER:{
        screen:RegisterScreen,
        navigationOptions:{ title:"REGISTER"}
    }
},{
    initialRouteName:'LOGIN'
})

export {
    SplashScreen,
    _AuthStackScreen
}