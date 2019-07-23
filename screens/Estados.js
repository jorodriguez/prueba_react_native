
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
  FlatList,Modal
} from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Card, CardItem, Body, Right, Left } from "native-base";

import Loader from './Loader';

export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    this.lista = [];
    this.balance = {};

    this.state = {
      loading: false,
      refreshing: false,
      selected: (new Map())
    }
  }

  componentDidMount() {
    this.getCargos();
    this.getBalance();
  }

  getCargos = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/cargos_alumno/63')
      .then(res => res.json())
      .then(res => {
        this.lista = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      });
  };
  getBalance = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/balance_alumno/63')
      .then(res => res.json())
      .then(res => {
        this.balance = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      });
  };
 

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getCargos();
    this.getBalance();
  }

  _keyExtractor = (item, index) => item.id_cargo_balance_alumno.toString();

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

  };

  _renderItem = ({ item }) => (
    <ItemCargo
      id={item.id_cargo_balance_alumno}
      selected={!!this.state.selected.get(item.id)}
      item={item}
    />
  );

 
  render() {
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading} />
                  
        <Balance item={this.balance}></Balance>
        
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Content style={styles.container}>
            <Card>
              <FlatList
                data={this.lista}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
            </Card>
          </Content>
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
      <CardItem button onPress={() => {<PupupCargo visible={true} item={this.props.item} />} } footer bordered>
        <Body>
          <Text style={this.props.item.pagado ? styles.textoPagado:styles.textoNormal}>{this.props.item.nombre_cargo}</Text>
          <Text note style={{fontSize:10}} >{this.props.item.nota}</Text>                             
        </Body>        
        <Right>
          <Text  style={this.props.item.pagado ? styles.textoNormal:styles.textoAdeudaRojo} >$ {this.props.item.cargo}</Text>                     
          {/*<Text>Pagado $ {this.props.item.total_pagado}</Text>          */}
        </Right>
      </CardItem>
    );
  }
}


class Balance extends React.Component {
  constructor(props) {
    super(props);            
  }
  _onClose= () => {
      
  };
  componentDidMount() {

  }
 render (){
  return (
    
    <View style={styles.bordeRojo}>
       <CardItem header bordered button onPress={() => {<PupupCargo visible={true} item={this.props.item} />} } footer bordered>
        <Body>
          <Text>{this.props.item.nombre_alumno} {this.props.item.apellidos_alumno}</Text>                        
        </Body>        
        <Right>
        <Text style={this.props.item.cargo == 0 ? styles.textoNormal:styles.textoAdeudaRojo}>Adeuda</Text>          
          <Text style={this.props.item.pagado ? styles.textoNormal:styles.textoAdeudaRojo}>$ {this.props.item.total_adeudo}</Text>                           
        </Right>
      </CardItem>        
    </View>
  )
 }
}


class PupupCargo extends React.Component {
  constructor(props) {
    super(props);    
    //this.visible = this.props.visible;
    this.state = {isVisible : this.props.visible};
  }
  _onClose= () => {
      this.visible =false;
  };
  componentDidMount() {

  }
 render (){
  return (
    <Modal
      transparent={false}
      animationType={'fade'}
      visible={this.state.isVisible}
      onRequestClose={() => {console.log('close modal')}}>
      
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
    flex:1,
    backgroundColor: '#BCF0FF',
  },
  textoPagado:{
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    color : 'gray'
  },
  textoAdeudaRojo:{        
     color : 'red',
  },
  bordeRojo:{        
    borderColor:'#FF5B5B',
    borderWidth:1
 }
});
