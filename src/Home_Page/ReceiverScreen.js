import React from 'react';
import { View, Text, Stylesheet, Button } from 'react-native';
import { styles } from '../styles';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken("pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg");

const ReceiverScreen = (props) => (
    <View style = {{flex:1}}>
        <View style = {{alignItems:"center",justifyContent:"center",marginVertical:10}}>
			<Text style = {styles.headerText}>Tujuan</Text>
		</View>
        <Mapbox.MapView
            styleURL = {Mapbox.StyleURL.Street}
            zoomLevel = {16}
            centerCoordinate = {[104.04866, 1.11862]}
            style = {styles.viewMap}>
        </Mapbox.MapView>
    </View>
)
export default ReceiverScreen;