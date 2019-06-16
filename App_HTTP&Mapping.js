import React, { Component } from "react";
import { View, Text } from "react-native";
/* 
akses this.state.lng/lat[] untuk dipakai pada lokasi marker
*/

class HttpExample extends Component {
  state = {
    data: "",
    lat: [],
    lng: []
  };

  componentDidMount = () => {
    fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/-73.989%2C40.733%3B-74%2C40.733.json?access_token=pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg&geometries=geojson",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        let coordinates = responseJson.routes[0].geometry.coordinates;
        let lat = [];
        let lng = [];

        coordinates.map(item => {
          lat.push(item[0]);
          lng.push(item[1]);
        });
        this.setState({
          data: JSON.stringify(coordinates),
          lat: lat,
          lng: lng
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <View>
        <Text>coordinates :</Text>
        <Text>{this.state.data}</Text>
        <Text>latitude :</Text>
        <Text>{this.state.lat}</Text>
        <Text>longitude :</Text>
        <Text>{this.state.lng}</Text>
        <Text />
        <Text> {(location = [0, 1])}</Text>
      </View>
    );
  }
}
export default HttpExample;
