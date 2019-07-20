
import * as WebBrowser from 'expo-web-browser';
import moment from "moment";
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  FlatList,
  View,
  Animated,
  Button,
  Component
} from 'react-native';


import Loader from './Loader';

export default class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.lista = [];
    this.state = {
      loaging: false,
      selected: (new Map(): Map<string, boolean>)
    }
  }

  componentDidMount() {
    this.getActividades();
  }

  getActividades = () => {
    this.setState({ loading: true });
    fetch('https://api-ambiente-desarrollo.herokuapp.com/actividades/63')
      .then(res => res.json())
      .then(res => {
        this.lista = res;
        this.setState({ loading: false });
        console.log(JSON.stringify(res));
      });
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {

    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (

    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
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
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              onPress={this.getActividades}
              source={
                __DEV__
                  ? require('../assets/images/magic.jpeg')
                  : require('../assets/images/magic.jpeg')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <DevelopmentModeNotice />
            <Text style={styles.getStartedText}>
              Actividades del hoy
              </Text>
          </View>

          <View style={styles.container}>
            <FlatList
              data={this.lista}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>

        </ScrollView>

      </View>
    );
  }

}

class MyListItem extends React.Component {
  constructor() {
    super();

  }

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  componentDidMount() {

  }

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={this.estiloActividad.container}>
          <View style={this.estiloActividad.itemImage}>
            <Image
              onPress={this.getActividades}
              source={require('../assets/images/alumno_generic_50_50.png')}
              style={styles.alumnoImage}
            />
          </View>
          <View style={this.estiloActividad.containerActividad}>
            <View style={this.estiloActividad.headerActividad}>
                 <View style={{alignContent:'flex-end'}} ><Text style={{ color: textColor }}>{this.props.item.actividad}</Text></View>
                 
                  <View><Text style={{ color: textColor }}>{moment(this.props.item.fecha).format("DD MMM") }</Text></View>
            </View>
            <View>                
               <Text>{this.props.item.nota} </Text>
               <Text>{this.props.item.nota} </Text>
               <Text>{this.props.item.nota} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  estiloActividad = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // if you want to fill rows left to right    
      padding:14,
      minHeight:70,
      backgroundColor:'#fff',
      borderRadius :10,
      borderWidth : 1,
      borderColor : '#DAE0FF'
    },
    containerActividad: {      
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    headerActividad: {      
      flex: 1,
      alignContent:'space-between',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems:'center',
      backgroundColor:'red'
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
      alignContent:"center",
      paddingBottom:1,
    }
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
