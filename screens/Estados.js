
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
  FlatList, Modal
} from 'react-native';
import { Container, Header, Content, Button, Icon, Accordion, List, ListItem, Text, Card, CardItem, Body, Right, Thumbnail, Left } from "native-base";

import Loader from './Loader';

export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    this.listaCargos = [];
    this.listaCargosPagados = [];

    this.balance = {};

    this.state = {
      loading: false,
      refreshing: false,
      selected: (new Map()),
      token: "",
      usuarioSesion: null
    }
  }

  componentDidMount() {

  }

  _recogerUsuarioSesion = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
    Alert.alert("usua", user);
  };

  _onRefresh = () => {

  }
  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

  };


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

          <ListaBalances></ListaBalances>
         
        </ScrollView>
      </View>
    );
  }
}


class ItemCargo extends React.Component {
  constructor() {
    super();
  }

  _onPress = () => {
    //this.props.onPressItem(this.props.id);
  };

  componentDidMount() {

  }

  render() {
    return (
      <CardItem button onPress={() => { <PupupCargo visible={true} item={this.props.item} /> }} footer bordered>
        <Body>
          <Text style={this.props.item.pagado ? styles.textoPagado : styles.textoNormal}>{this.props.item.nombre_cargo}</Text>
          <Text note style={{ fontSize: 10 }} >{this.props.item.nota}</Text>
        </Body>
        <Right>
          <Text style={this.props.item.pagado ? styles.textoNormal : styles.textoAdeudaRojo} >$ {this.props.item.cargo}</Text>
          {/*<Text>Pagado $ {this.props.item.total_pagado}</Text>          */}
        </Right>
      </CardItem>
    );
  }
}


class ListaBalances extends React.Component {
  constructor(props) {
    super(props);
    this.listaBalances = [];
    this.state = {
      loading: false,
      refreshing: false,
      selected: (new Map()),
      token: "",
      usuarioSesion: null
    }
  }

  componentDidMount() {
    this._recogerUsuarioSesion()
      .then(() => {
        this.getBalance();
      }).catch((e) => {
        Alert.alert("Error", "Al cargar actualizar " + e);
      });
  }

  _recogerUsuarioSesion = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
  };

  _keyExtractorBalance = (item, index) => item.id.toString();


  _onPressItem = ({ id }) => {
    Alert.alert("seleccion", "ooo " + id);
  };

  _renderItemBalance = ({ item }) => (
    <Balance
      id={item.id}
      item={item}
      onPressItem={this._onPressItem}
    ></Balance>
  );

  getBalance = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/balance_familiar_alumno/' + this.state.usuarioSesion.id, {
      headers: {
        'Content-Type': "application/json",
        'x-access-token': 'Token ' + this.state.token
      },
    })
      .then(res => res.json())
      .then(res => {
        this.listaBalances = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
        //Alert.alert("Error", "lista ok "+JSON.stringify(res));
      });
  };

  _keyExtractorCargo = (item, index) => index.toString();

  _renderItemCargo = ({ item }) => (
    <ItemCargo
      id={item.id_cargo_balance_alumno}
      item={item}
    />
  );

  renderItem = ({ item }) => {
    const text = `${item}`;
    return (
      <TouchableOpacity onPress={() => alert("pressed!")}>
        <Card>
          <CardItem 
              style={{ backgroundColor: "#78CAA7" }}
              button onPress={() => { <PupupCargo visible={true} item={this.props.item} /> }} footer bordered>
            <Body>
              <Text >{item.nombre_alumno}</Text>
            </Body>
            <Right>
              <Text style={item.pagado ? styles.textoNormal : styles.textoAdeudaRojo} >$ {item.total_adeudo}</Text>
            </Right>
          </CardItem>          
          <View>
            <FlatList
              data={item.array_cargos}
              renderItem={this._renderItemCargo}
              keyExtractor={this._keyExtractorCargo}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };


  render() {
    return (
      <View>
        <Content style={styles.container}>
          <Card>
            <FlatList
              data={this.listaBalances}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractorBalance}
            />
          </Card>
        </Content>
        <Content>
          <Card>
          </Card>
        </Content>
      </View>
    );
  }
}



class Balance extends React.Component {
  constructor(props) {
    super(props);

  }
  _onPress = () => {
    this.props.onPressItem(this.props.id);

  };

  componentDidMount() {

  }
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Card style={styles.bordeRojo}>
          <CardItem header bordered button onPress={this.props.handlerClick} footer bordered>
            <Left>
              <Thumbnail source={require('../assets/images/alumno_generic_50_50.png')} />
              <Text>{this.props.item.nombre_alumno} {this.props.item.apellidos_alumno}</Text>
            </Left>
            <Body>
            </Body>
            <Right>
              <Text style={this.props.item.cargo == 0 ? styles.textoNormal : styles.textoAdeudaRojo}>Adeuda</Text>
              <Text style={this.props.item.pagado ? styles.textoNormal : styles.textoAdeudaRojo}>$ {this.props.item.total_adeudo}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}


class PupupCargo extends React.Component {
  constructor(props) {
    super(props);
    //this.visible = this.props.visible;
    this.state = { isVisible: this.props.visible };
  }
  _onClose = () => {
    this.visible = false;
  };
  componentDidMount() {

  }
  render() {
    return (
      <Modal
        transparent={false}
        animationType={'fade'}
        visible={this.state.isVisible}
        onRequestClose={() => { console.log('close modal') }}>

        <Card>
          <CardItem>
            <Text >{this.props.item.nombre_cargo}</Text>
          </CardItem>
          <CardItem footer>
            <Button light onPress={this._onClose()}><Text> Cerrar </Text></Button>
          </CardItem>
        </Card>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCF0FF',
  },
  textoPagado: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray'
  },
  textoAdeudaRojo: {
    color: 'red',
    fontSize:12
  },
  bordeRojo: {
    borderColor: '#FF5B5B',
    borderWidth: 1
  }
});
