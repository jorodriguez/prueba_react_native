import React from 'react';

import { Platform,Image,StyleSheet } from 'react-native';

import { Container, Header, Content, Tab, Tabs, TabHeading,Thumbnail, Icon, Text, Left,Body, Button, Title, Right } from 'native-base';
import HomeClass from '../screens/HomeClass';
import LinksScreen from '../screens/LinksScreen';
import Estados from '../screens/Estados';
import SettingsScreen from '../screens/SettingsScreen';

export default class Principal extends React.Component {
  render() {
   
    return (
      <Container>        
        <Header>
          <Left>
            {/*
            <Button transparent>
              <Icon name='menu' />
            </Button>*/}                        
            <Thumbnail source={require('../assets/images/padre_avatar.png')} />
          </Left>          
          <Body>
            <Title>Header</Title>
          </Body>
          <Right >
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


