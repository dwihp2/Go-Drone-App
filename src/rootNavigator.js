import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { _AuthStackScreen, SplashScreen} from './screen/auth';
import _DashboardBottomTab from './screen/dashboard';

//wrap all navigator

const rootNavigator = createSwitchNavigator ({
    SPLASH:SplashScreen,
    AUTH:_AuthStackScreen,
    DASHBOARD:_DashboardBottomTab
},{
    initialRouteName:'AUTH'
})

export default createAppContainer(rootNavigator);
