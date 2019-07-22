import React from 'react';

import { Platform } from 'react-native';

import { Container, Header, Content, Tab, Tabs, TabHeading, Icon, Text, Left, Body, Button, Title, Right } from 'native-base';
import HomeClass from '../screens/HomeClass';
import LinksScreen from '../screens/LinksScreen';
import Estados from '../screens/Estados';
import SettingsScreen from '../screens/SettingsScreen';

export default class Principal extends React.Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Magic</Title>
          </Body>
          <Right />
        </Header>        
          <Tabs>
            <Tab heading={<TabHeading><Icon name="home" /><Text>Home</Text></TabHeading>}>
              <HomeClass />
            </Tab>
            <Tab heading={<TabHeading><Icon name="md-eye" /><Text>Estados</Text></TabHeading>}>
              <Estados />
            </Tab>
            <Tab heading={<TabHeading><Icon name="md-cog" /><Text>Cuenta</Text></TabHeading>}>
              <SettingsScreen />
            </Tab>
          </Tabs>        
      </Container>
    );
  }
}