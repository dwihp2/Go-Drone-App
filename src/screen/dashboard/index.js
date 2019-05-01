import React from 'react';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import TopbarStack from '../../Home_Page/index';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const bottomTabNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: {fontSize:15}
    },
    defNavOpts: ({navigation}) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const {routeName} = navigation.state;
            let iconName;
            switch (routeName) {
                case "HOME":
                    iconName = "md-home";
                    break;
                case "PROFILE":
                    iconName = "md-person";
                    break;
                default:
                    break;
            }
            return <Ionicons name = {iconName} size={25} color={tintColor}/>;
        }
    })
}

const _DashboardBottomTab = createBottomTabNavigator ({
    HOME:TopbarStack,
        // screen: HomeScreen
        
    
    PROFILE:{
        screen:ProfileScreen
    }
},{
    tabBarOptions:bottomTabNavigatorConfig.tabBarOptions,
    defaultNavigationOptions:bottomTabNavigatorConfig.defNavOpts
})
 export default _DashboardBottomTab;
