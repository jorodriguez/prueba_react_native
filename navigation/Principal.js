import React from 'react';

import { Platform, Image, StyleSheet, AsyncStorage, Alert } from 'react-native';

import { Container, Header, Content, Tab, Tabs, TabHeading, Thumbnail, Icon, Text, Left, Body, Button, Title, Right } from 'native-base';
import HomeClass from '../screens/HomeClass';
import Estados from '../screens/Estados';
import SettingsScreen from '../screens/SettingsScreen';

export default class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
       usuarioSesion : null
    }
    this._bootstrapAsync();
  }

  componentDidMount() {

  }
   
  _bootstrapAsync = async () => {
    
      const usuario = await AsyncStorage.getItem('usuario');
      this.setState({usuarioSesion :usuario});
  };

  salir = () => { 
    AsyncStorage.removeItem('logeado');
    AsyncStorage.removeItem('usuario');
    this.props.navigation.navigate('AuthLoading', {});
  }

  render() {

    return (
      <Container >
        <Text>{JSON.stringify(this.usuarioSesionStore)}</Text>
        <Header>
          <Left>
            {/*
            <Button transparent>
              <Icon name='menu' />
            </Button>*/}
            <Thumbnail source={require('../assets/images/padre_avatar.png')} />
          </Left>
          <Body>
            <Title>{JSON.stringify(this.state.usuarioSesion)}</Title>
          </Body>
          <Right >
            <Button onPress={this.salir}><Text>Salir</Text></Button>
            <Image square source={require('../assets/images/magic.png')} />
          </Right>
        </Header>
        <Tabs tabBarPosition="top">
          <Tab
            heading={<TabHeading ><Icon type="FontAwesome" name="smile-o" /><Text>Inicio</Text></TabHeading>}>
            <HomeClass />
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="list" /><Text>Balance</Text></TabHeading>}>
            <Estados />
          </Tab>
          <Tab
            heading={<TabHeading><Icon name="md-cog" /><Text>Cuenta</Text></TabHeading>}>
            <SettingsScreen />
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
  },
});
