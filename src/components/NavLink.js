import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import Spacer from '../components/Spacer';

const NavLink = ({ navigation, routeName, text }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName)}
    >
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default withNavigation(NavLink);