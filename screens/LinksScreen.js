import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
//import  ExpoLinksView from '../mis_componentes/ExpoConfigView';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>     
      <Text >Hola</Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Estados',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#D9F9E9',
  },
});
