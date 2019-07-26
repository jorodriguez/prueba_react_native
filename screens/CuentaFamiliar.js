
import * as WebBrowser from 'expo-web-browser';
import moment from "moment";
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Component,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  FlatList
} from 'react-native';
import { Container, Header,Form, Item, Label, Input, Content, Button, Icon, Accordion, List, ListItem, Text, Card, CardItem, Body, Right, Thumbnail, Left } from "native-base";

import Modal from "react-native-modal";

import Loader from './Loader';

export default class CuentaFamiliar extends React.Component {
  constructor(props) {
    super(props);
    this.listaBalances = [];
    this.state = {
      loading: false,
      refreshing: false,
      token: "",
      usuarioSesion: null,
      nombre: "",
      telefono: "",
      fecha_nacimiento: null,
      correo: "",
      celular: "",
      religion: ""
    }
  }

  componentDidMount() {
    this._recogerUsuarioSesion()
      .then(() => {

      }).catch((e) => {
        Alert.alert("Error", "Al cargar la cuenta del familiar " + e);
      });
  }


  _recogerUsuarioSesion = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });

  }



  render() {
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading} />

        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View>
            <Content style={styles.container}>
              <Item style={{alignItems : 'center'}}>
                <Label>Mis Datos</Label>
              </Item>
                
              <Form>
              <Item stackedLabel>
                <Label>Nombre</Label>
                <Input
                  placeholder="Nombre"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.nombre : ''}
                  onChangeText={(nombre) => this.setState({ nombre })} />
              </Item>
              <Item stackedLabel>
                <Label>Teléfono</Label>
                <Input
                  placeholder="Teléfono"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.telefono : ''}
                  onChangeText={(telefono) => this.setState({ telefono })} />

              </Item>
              <Item stackedLabel>
                <Label>Fecha Nacimiento</Label>
                <Input
                  placeholder="F. Nacimiento"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.fecha_nacimiento : ''}
                  onChangeText={(fecha_nacimiento) => this.setState({ fecha_nacimiento })} />
              </Item>
              <Item stackedLabel>
                <Label>Correo</Label>
                <Input
                  placeholder="Correo"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.correo : ''}
                  onChangeText={(correo) => this.setState({ correo })} />

              </Item>
              <Item stackedLabel>
                <Label>Celular</Label>
                <Input
                  placeholder="Celular"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.celular : ''}
                  onChangeText={(celular) => this.setState({ celular })} />
              </Item>
              <Item stackedLabel>
                <Label>Religión</Label>
                <Input
                  placeholder="Religión"
                  underlineColorAndroid='transparent'
                  value={this.state.usuarioSesion != null ? this.state.usuarioSesion.religion : ''}
                  onChangeText={(religion) => this.setState({ religion })} />

              </Item>
              <Button block info><Text>Modificar datos</Text></Button>              
              </Form>
            </Content>
          </View>

        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDED',
  },
  textoPagado: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray'
  },
  textoAdeudaRojo: {
    color: 'red',
    fontSize: 12
  },
  bordeRojo: {
    borderColor: '#FF5B5B',
    borderWidth: 1
  }
});
