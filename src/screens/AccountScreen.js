import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Spacer>
        <Text h3 style={styles.title}>My Account</Text>
      </Spacer>
      <Spacer>
        <Button
          title="Sign Me Out"
          onPress={signout}
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  title: {
    marginBottom: 20,
    textAlign: 'center'
  },
});

export default AccountScreen;