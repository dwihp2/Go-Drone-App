import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMap:{
        height:250,
        marginTop: 5,
        // marginHorizontal: 5,
    },
    headerText:{
        fontSize:20,
        fontWeight:"400",
    },
    annotationContainer:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15
    },
      annotationFill:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:'orange',
        transform: [{scale: 0.6 }],
    },
    buttonCnt: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    },
      button: {
        borderRadius: 3,
        backgroundColor: 'blue',
    },
})

