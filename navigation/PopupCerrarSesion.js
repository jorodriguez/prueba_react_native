import React, { Component } from "react";
import { Text, View, StyleSheet, Image, AsyncStorage } from "react-native";
import { Icon, Button, Header, Left, Right, Card, ListItem, Content, Footer, Body, Title, Container, Thumbnail } from 'native-base';
import Modal from "react-native-modal";

export default class ModalTester extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };

    }

    componentDidMount() {

    }

    state = {
        isModalVisible: false
    };
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };


    render() {
        /*
              const deviceWidth = Dimensions.get("window").width;
              const deviceHeight = Platform.OS === "ios"
                ? Dimensions.get("window").height
                : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
      */
        return (

            <Header>
                <Left>
                    <Button transparent onPress={this.toggleModal}  >
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.titulo}>{this.props.nombreUsuarioSesion}</Title>
                </Body>
                <Right>
                    <Image square source={require('../assets/images/magic.png')} />
                </Right>
                <Modal isVisible={this.state.isModalVisible} propagateSwipe>
                    <Card style={{backgroundColor:"#fff",alignContent:"center"}}>
                        <ListItem style={{backgroundColor:"#fff",alignContent:"center"}}>                                                       
                           <Body>
                                <Thumbnail source={require('../assets/images/padre_avatar.png')} />
                                <Text >{this.props.nombreUsuarioSesion}</Text>                         
                            </Body>                            
                        </ListItem>                    

                        <ListItem icon onPress={this.props.salir} 
                                    style={{backgroundColor:"#fff"}}>
                            <Left>
                                <Button danger style={{ backgroundColor: "#007AFF" }}
                                    onPress={this.props.salir}>
                                    <Icon active type="FontAwesome" name="sign-out" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Cerrar Sesón</Text>
                            </Body>
                        </ListItem>
                        <Footer>
                            <Button block info onPress={this.toggleModal}>
                                <Text>Cerrar</Text>
                            </Button>
                        </Footer>
                    </Card>
                </Modal>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 0
    }, titulo: {
        fontSize: 12,
    }
});
