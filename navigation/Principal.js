import React from 'react';

import { Platform, Image, StyleSheet, AsyncStorage, Alert } from 'react-native';

import { Container,ActionSheet, Header, Content, Tab, Tabs, TabHeading, Thumbnail, Icon, Text, Left, Body, Button, Title, Right } from 'native-base';
import HomeClass from '../screens/HomeClass';
import Estados from '../screens/Estados';
import SettingsScreen from '../screens/SettingsScreen';

var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      usuarioSesion: null,
      token: ""
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
    //Alert.alert("usari",this.state.usuarioSesion);
  }

  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button transparent
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: "Testing ActionSheet"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )
              }
            >
              <Icon name='menu' />
            </Button>
                {/*<Thumbnail source={require('../assets/images/padre_avatar.png')} />*/}
          </Left>
          <Body>
            <Title style={styles.titulo}>{this.state.usuarioSesion != null ? this.state.usuarioSesion.nombre : "-"}</Title>
          </Body>
          <Right >
            <Button onPress={this.salir}><Text>Salir</Text></Button>
            <Image square source={require('../assets/images/magic.png')} />
          </Right>
        </Header>
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
  }, titulo: {
    fontSize: 12,
  }
});
