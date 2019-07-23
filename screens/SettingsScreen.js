import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
//import { ExpoConfigView } from '@expo/samples';
//import ExpoConfigView from '../mis_componentes/ExpoConfigView';
//import TabBarIcon from '../components/TabBarIcon';

export default function SettingsScreen() {

  return  (
    <ScrollView style={styles.container}>
      <Text style={{padding: 10, fontSize: 42}}>
              texto
      </Text>
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Mi Cuenta Magic',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#B7C1E9',
  },
});