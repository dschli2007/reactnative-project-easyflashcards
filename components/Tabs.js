import { StyleSheet, Text, View, Platform } from 'react-native'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import DeckList from './DeckList'
import AddDeck from './AddDeck'
import Deck from './Deck'
import Quiz from './Quiz'
import AddCard from './AddCard'

const tabRoutes = {
  decks: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks'
    }
  },

  addDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'New Deck'
    }
  }
}

const Home =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(tabRoutes)
    : createMaterialTopTabNavigator(tabRoutes)

const stackRoutes = {
  Home: Home,
  Deck: Deck,
  Quiz: { screen: Quiz, navigationOptions: { title: 'Quiz' } },
  AddCard: { screen: AddCard, navigationOptions: { title: 'Add Card' } }
}

const Tabs = createStackNavigator(stackRoutes)

export default Tabs
