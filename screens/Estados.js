
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
  Alert,
  AsyncStorage,
  FlatList,Modal
} from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Card, CardItem, Body, Right, Thumbnail, Left } from "native-base";

import Loader from './Loader';

export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    this.listaCargos = [];
    this.listaCargosPagados = [];
    this.listaBalances = [];
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
    this._recogerUsuarioSesion()
    .then(() => {
        this.getCargos();
        this.getBalance();
    }).catch((e) => {
      Alert.alert("Error", "Al cargar actualizar "+e);
    });    
  }

  _recogerUsuarioSesion = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
  };


 getCargos = () => {
    this.setState({ loading: true })
    fetch('https://api-ambiente-desarrollo.herokuapp.com/cargos_familiar/'+this.usuarioSesion.id,{
      headers:{
        'Content-Type': "application/json",
        'x-access-token': 'Token ' + this.state.token
      },
    })        
      .then(res => res.json())
      .then(res => {
        this.listaCargos = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      });
  };

  getCargosPagados = () => {
    this.setState({ loading: true })
    fetch('https://api-ambiente-desarrollo.herokuapp.com/cargos_pagados_familiar/'+this.usuarioSesion.id,{
      headers:{
        'Content-Type': "application/json",
        'x-access-token': 'Token ' + this.state.token
      },
    })        
      .then(res => res.json())
      .then(res => {
        this.listaCargosPagados = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      });
  };

  getBalance = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/balance_familiar_alumno/'+this.usuarioSesion.id,{
      headers:{
        'Content-Type': "application/json",
        'x-access-token': 'Token ' + this.state.token
      },
    }
    )
      .then(res => res.json())
      .then(res => {
        this.listaBalances = res;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      });
  };
 

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getCargos();
    this.getBalance();
  }

  _keyExtractorCargo = (item, index) => item.id_cargo_balance_alumno.toString();  
  _keyExtractorBalance = (item, index) => item.id.toString();

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

  };

  _renderItemCargo = ({ item }) => (
    <ItemCargo
      id={item.id_cargo_balance_alumno}
      selected={!!this.state.selected.get(item.id)}
      item={item}
    />
  );

  _renderItemBalance = ({ item }) => (
    <Balance item={item}></Balance>    
  );
 
  
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
          <Content style={styles.container}>
            <Card>
              <FlatList
                data={this.listaBalances}
                renderItem={this._renderItemBalance}
                keyExtractor={this._keyExtractorBalance}
              />
            </Card>
          </Content>
          <Text>Cargos</Text>
            
          
          <Content style={styles.container}>
            <Card>
              <FlatList
                data={this.listaCargos}
                renderItem={this._renderItemCargo}
                keyExtractor={this._keyExtractorCargo}
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
    <Card style={styles.bordeRojo}>
       <CardItem header bordered button onPress={() => {<PupupCargo visible={true} item={this.props.item} />} } footer bordered>
       <Left>
            <Thumbnail source={require('../assets/images/alumno_generic_50_50.png')} />
            <Text>{this.props.item.nombre_alumno} {this.props.item.apellidos_alumno}</Text>                        
       </Left>
        <Body>
          
        </Body>        
        <Right>
        <Text style={this.props.item.cargo == 0 ? styles.textoNormal:styles.textoAdeudaRojo}>Adeuda</Text>          
          <Text style={this.props.item.pagado ? styles.textoNormal:styles.textoAdeudaRojo}>$ {this.props.item.total_adeudo}</Text>                           
        </Right>
      </CardItem>        
    </Card>
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
