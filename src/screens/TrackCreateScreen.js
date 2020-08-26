import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons'; 

import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import Spacer from '../components/Spacer';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback(
    (location) => addLocation(location, recording),
    [recording]
  );
  const [err] = useLocation( isFocused || recording, callback );
 
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Spacer>
        <Text h2 style={styles.title}>Create Your Track</Text>
      </Spacer>
      <Map />
      {err ? <Text style={styles.error}>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Create Track',
  tabBarIcon: <AntDesign name="pluscircleo" size={24} color="black" />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginVertical: 20,
    textAlign: 'center'
  },
  error: {
    marginVertical: 20,
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default withNavigationFocus(TrackCreateScreen);