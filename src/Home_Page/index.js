import {createStackNavigator,createMaterialTopTabNavigator} from "react-navigation";
import SenderScreen from '../Home_Page/SenderScreen';
import ReceiverScreen from '../Home_Page/ReceiverScreen';

const _DashboardTopTab = createMaterialTopTabNavigator({
    SENDER: SenderScreen,
    RECEIVER: ReceiverScreen
}, {
    initialRouteName: "SENDER",
    tabBarOptions: {
        scrollEnabled:false,
        labelStyle: {
            fontSize:15,
        },
        style: {
            backgroundColor: "#226770",
        },
        indicatorStyle: {
            backgroundColor: "#fff",
        }
    },    
});

_DashboardTopTab.navigationOptions = {
    header:null
};

export default TopbarStack = createStackNavigator({
    HOME: {screen:_DashboardTopTab}
});
