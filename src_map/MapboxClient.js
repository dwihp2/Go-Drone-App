import MapboxClient from 'mapbox';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg')
const client = new MapboxClient('pk.eyJ1IjoiZHdpaHAyIiwiYSI6ImNqdWRsajF0NDEwZTU0ZHBicTlsY3lyNjQifQ.hVZkan4i6qiTTh0WfVGwsg');
export default client;
