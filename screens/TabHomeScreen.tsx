import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Drinks from '../components/Drinks';
import NavTop from '../components/NavTop';
import { Text, View } from '../components/Themed';

export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <NavTop></NavTop>
      <View style={styles.viewArea}>
        <Drinks />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  viewArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#313131'
  }
});
