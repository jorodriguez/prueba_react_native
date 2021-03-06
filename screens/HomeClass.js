
import * as WebBrowser from 'expo-web-browser';
import moment from "moment";
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  FlatList,
  View,
  Span,
  RefreshControl,
  AsyncStorage,
  Component, Alert
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Left, Icon, Thumbnail, Right, Button, Body } from "native-base";

import Loader from './Loader';
//https://oblador.github.io/react-native-vector-icons/
//https://www.bootdey.com/react-native-snippet/9/Login-form-ui-example
export default class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.lista = [];
    this.state = {
      loading: false,
      refreshing: false,
      selected: (new Map()),
      token: "",
      usuarioSesion: null
    }    
  }

  _recogerUsuarioSesion = async () => {
    const user = await AsyncStorage.getItem('usuario');
    const token = await AsyncStorage.getItem('userToken');
    this.setState({ token: token });
    this.setState({ usuarioSesion: JSON.parse(user) });
  };

  componentDidMount() {
    this._recogerUsuarioSesion()
      .then(() => {
        this.getActividades();
      }).catch((e) => {
        Alert.alert("Error", "Al cargar las actividades");
      });
  }

  getActividades = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/actividades/'+this.state.usuarioSesion.id,
      {
        headers: {
          'Content-Type': "application/json", 'x-access-token': 'Token ' + this.state.token
        },
      })
      .then(res => res.json())
      .then(res => {
        this.lista = res;
        this.setState({ loading: false, refreshing: false });
      })
      .catch((e) => {
        Alert.alert("Error", "Al cargar las actividades");
      });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getActividades();
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <ItemActividad
      id={item.id}
      selected={!!this.state.selected.get(item.id)}
      item={item}
    />
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
          }
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            {/*<DevelopmentModeNotice />*/}
            <Text>Actividades de hoy</Text>
          </View>
          <Content padder >
            <FlatList
              data={this.lista}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </Content>
        </ScrollView>

      </View>
    );
  }
}


class ItemActividad extends React.Component {
  constructor() {
    super();

  }

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  componentDidMount() {

  }

  render() {
    return (
      <Card >
        <CardItem>
          <Left>
            <Icon name={this.props.item.icono}
              type="FontAwesome"
              style={{ fontSize: 30, color: '#BC6CE9' }} />
            <Body>
              <Text>{this.props.item.actividad}</Text>
              <Text note style={{ fontSize: 10 }}>{this.props.item.nombre_alumno}</Text>
            </Body>
            <Right>
              <Text note style={{ fontSize: 10 }}>{moment(this.props.item.fecha).format("DD MMM")}
                {moment(this.props.item.hora).format("HH:mm a")}
                {/*<Text style={{ color: textColor }}>{moment(this.props.item.fecha).fromNow()format("DD MMM")} */}
              </Text>
              {/*moment(this.props.item.hora).format("hh:mm")*/}
            </Right>
          </Left>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>
              {this.props.item.nota}
            </Text>
          </Body>
        </CardItem>
        {
        /*<CardItem footer bordered>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
        */}
      </Card>
    );
  }


  estiloActividad = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // if you want to fill rows left to right    
      padding: 14,
      minHeight: 70,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#DAE0FF'
    },
    containerActividad: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    headerActividad: {
      flex: 1,
      alignContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      backgroundColor: 'red'
    },
    card: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#CFD4EC",
      padding: 5,
      backgroundColor: '#fff',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0
    },
    itemImage: {
      width: '14%',
      alignItems: 'flex-start',
      alignContent: "center",
      paddingBottom: 1,
    },

  });

}


HomeClass.navigationOptions = {
  header: null,
  title: 'Joel',
};


function DevelopmentModeNotice() {
  if (__DEV__) {
    return (
      <Text style={styles.getStartedText}>
        En desarrollo.
      </Text>
    );
  } else {
    return (
      <Text style={styles.getStartedText}>
        en producción
      </Text>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCF0FF',
    paddingTop: 2,

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 7,
    lineHeight: 10,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#9EE6FC"
  },
  alumnoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',

  },
  welcomeImage: {
    width: 90,
    height: 70,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  logoNoticeImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
