import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/HomeScreen'
import Browser from '../screens/Form'
import measureAngle from '../screens/measureAngle'

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerTintColor: 'blue'
    })
  },

  Browser: {
    screen: Browser,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerTintColor: 'green'
    })
  }  
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer