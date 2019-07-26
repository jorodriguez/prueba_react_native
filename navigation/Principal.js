import React from 'react';

import { Platform, Image, StyleSheet, AsyncStorage, Alert } from 'react-native';

import { Container, ActionSheet, Header, Content, Tab, Tabs, TabHeading, Thumbnail, Icon, Text, Left, Body, Button, Title, Right } from 'native-base';
import HomeClass from '../screens/HomeClass';
import Estados from '../screens/Estados';
import CuentaFamiliar from '../screens/CuentaFamiliar';
import SettingsScreen from '../screens/SettingsScreen';

import PopupCerrarSesion from './PopupCerrarSesion';

export default class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      usuarioSesion: null,
      token: "",
      verPopupCerrarSesion: false,
    }
    this._bootstrapAsync();
  }

  componentDidMount() {

  }

  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
    //Alert.alert("usari",this.state.usuarioSesion);
  };

  salir = () => {
    AsyncStorage.removeItem('logeado');
    AsyncStorage.removeItem('usuario');
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('AuthLoading', {});
  }

  togglePopupCerrarSesion = () => {
    this.setState({ verPopupCerrarSesion: !this.state.verPopupCerrarSesion });
  }

  render() {
    return (
      <Container >
        <PopupCerrarSesion visible={this.state.verPopupCerrarSesion}
          salir={this.salir}
          nombreUsuarioSesion={this.state.usuarioSesion != null ? this.state.usuarioSesion.nombre : "-"}
        ></PopupCerrarSesion>
        <Tabs tabBarPosition="top">
          <Tab
            heading={<TabHeading ><Icon type="FontAwesome" name="smile-o" /><Text>Inicio</Text></TabHeading>}>
            <HomeClass token={this.state.token} />
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="list" /><Text>Balance</Text></TabHeading>}>
            <Estados token={this.state.token} />
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="md-cog" /><Text>Cuenta</Text></TabHeading>}>
            <CuentaFamiliar />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Principal.navigationOptions = {
  header: null,
  title: 'Principal',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 0
  }, titulo: {
    fontSize: 12,
  }
});
