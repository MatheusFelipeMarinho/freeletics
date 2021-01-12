import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView,  { Marker, Polyline }  from 'react-native-maps'


export default function App() {
  const [location, setLocation] = useState([0, 0]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      setLocation([latitude, longitude]);     

      const coordsPoli = [latitude, longitude]

      console.log(coordsPoli)
    
    })();
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
       style={styles.map}
       showsUserLocation={true}
       loadingEnabled={true}
       initialRegion={{
        latitude: location[0],
        longitude: location[1],
        latitudeDelta: 0.014,
        longitudeDelta: 0.014,
       }}
       >
          <Marker       
            style={styles.mapMarker}
            coordinate={{
              latitude: location[0],
              longitude: location[1],
            }}
            >   
            <View style={{backgroundColor: "red", padding: 10}}/>
              
          </Marker>
          <Polyline
		coordinates={this.coordsPoli}	strokeColor="#fb2587"	strokeWidth={10}
	/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map:{
    flex: 1
  },
  container: {
    flex: 1,   
  },
  mapMarker: {
    width: 90,
    height: 80, 
  },
 
});
