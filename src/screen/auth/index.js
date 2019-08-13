import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import {createStackNavigator} from "react-navigation";

const _AuthStackScreen = createStackNavigator({
    LOGIN:{
        screen: LoginScreen,
        navigationOptions:{ header:null}
    },
    REGISTER:{
        screen:RegisterScreen,
        navigationOptions:{ 
            title:"REGISTER",
        }
    },
    RESETPASSWORD:{
        screen:ForgotPasswordScreen,
        navigationOptions:{ 
            title:"RESET PASSWORD"
        }
    }
},{
    initialRouteName:'LOGIN'
})

export {
    SplashScreen,
    _AuthStackScreen
}