import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';
import Spacer from '../components/Spacer';

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    changeName,
    startRecording,
    stopRecording
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          value={name}
          placeholder="Enter track name"
          onChangeText={changeName}
        />
      </Spacer>
      <View style={styles.space}>
        { recording
          ? <Button title="Stop" onPress={stopRecording}/>
          : <Button title="Start Recording" onPress={startRecording}/>
        }
      </View>
      <Spacer>
        { !recording && locations.length
          ? <Button title="Save Recording" onPress={saveTrack}/>
          : null
        }
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  space: {
    marginHorizontal: 15
  }
});

export default TrackForm;