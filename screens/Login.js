import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';

//import StorageHelper from '../Helpers/StorageHelper';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.usuario = {
            auth: false,
            token: ''
        };
        this.state = {
            loading: false,
            email: 'joel.rod.roj@hotmail.com',
            password: '123',
        }
    }

    onClickListener = (viewId) => { 
       

        if (this.state.email == '') {
            Alert.alert("Correo Requerido", "Escribe el Correo.");
        } else {

            if (this.state.password == '') {
                Alert.alert("Clave Requerida", "Escribe tu clave de acceso.");

            } else {     
                this.setState({ loading: true });           
                var that = this;
                               
                fetch('https://api-ambiente-desarrollo.herokuapp.com/auth_cliente/login',
                    {
                        method: 'POST',                        
                        headers: {                            
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            "correo": this.state.email,
                            "password": this.state.password
                        }),
                    }
                )
                    .then(function(res){ return res.json(); })
                    .then((data) =>{
                        this.usuario = data;                        
                        
                        //Alert.alert("Usuario", "dentro "+JSON.stringify(data));
                        that.setState({ loading: false });
                        if (this.usuario.auth) {

                            delete this.usuario.usuario.mensaje;
                            delete this.usuario.usuario.password;

                            AsyncStorage.setItem('logeado', JSON.stringify(this.usuario.auth));
                            AsyncStorage.setItem('userToken',this.usuario.token);
                            AsyncStorage.setItem('usuario', JSON.stringify(this.usuario.usuario));
                            
                            that.props.navigation.navigate('Principal', { usuario: this.usuario });
                        } else {
                            Alert.alert("Usuario no encotrado", this.usuario.mensaje);
                        }
                    }).catch((error) => {
                        Alert.alert("Exception","error "+error);
                        console.error(error);
                    });
                    
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {/* <Image style={styles.bgImageTop} source={{ uri: '../assets/images/magic.jpeg' }}/>        */}
                <Image style={styles.bgImage} source={{ uri: "https://magicintelligence.com/wp-content/uploads/revslider/kiddie/little-boy.png" }} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Correo"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                    <Image style={styles.inputIcon} source={{ uri: 'https://magicintelligence.com/wp-content/uploads/revslider/kiddie/little-girl.png' }} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Clave"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                    <Image style={styles.inputIcon} source={{ uri: 'https://magicintelligence.com/wp-content/uploads/revslider/kiddie/kids.png' }} />
                </View>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.onClickListener('restore_password')}>
                    <Text style={styles.btnText}>¿Olvidaste tu clave?</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8FE3A4',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    bgImageTop: {
        flex: 1,
        resizeMode,

    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
}); 