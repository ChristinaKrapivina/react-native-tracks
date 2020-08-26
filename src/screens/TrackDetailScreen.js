import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';


import { Context as TrackContext } from '../context/TrackContext';
import Spacer from '../components/Spacer';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  const track = state.find(t => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Spacer>
        <Text h2 style={styles.title}>{track.name}</Text>
      </Spacer>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
      </MapView>
    </SafeAreaView>
  );
};

TrackDetailScreen.navigationOptions = {
  title: 'Track Detail'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  map: {
    height: 300,
  }
});

export default TrackDetailScreen;