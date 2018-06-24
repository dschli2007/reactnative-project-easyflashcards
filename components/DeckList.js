import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Animated
} from 'react-native'
import { selectDeck } from '../store/actions'
import Util from '../util/Util'

class DeckList extends Component {
  state = {
    opacity: new Animated.Value(1),
    clickedDeck: null
  }

  onPress(deck) {
    const { opacity } = this.state
    this.setState({ clickedDeck: deck })
    Animated.timing(opacity, { toValue: 0, duration: 750 }).start(() => {
      this.props.selectDeck(deck)
      this.props.navigation.navigate('Deck', { title: deck.title })
      this.setState({ opacity: new Animated.Value(1), clickedDeck: null })
    })
  }

  getOpacity(deck) {
    const { opacity, clickedDeck } = this.state
    if (deck === clickedDeck || clickedDeck === null) return {}
    return { opacity }
  }

  render() {
    const { ready, decks } = this.props
    if (!ready) return <Text>Loading...</Text>

    return (
      <ScrollView>
        {(!decks || decks.length === 0) && <Text>You do not have decks yet!</Text>}

        <View style={styles.tileContainer}>
          {decks &&
            decks.map((deck) => (
              <Animated.View style={this.getOpacity(deck)} key={deck.title}>
                <TouchableOpacity style={styles.tile} onPress={() => this.onPress(deck)}>
                  <Text style={styles.deckName}>{deck.title}</Text>
                  <Text style={styles.deckCards}>{deck.questions.length} cards</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps({ decks, ready }) {
  return { decks, ready }
}

function mapDispatchToProps(dispatch) {
  return {
    selectDeck: (deck) => dispatch(selectDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

const styles = StyleSheet.create({
  tileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    height: 70
  },
  deckName: {
    fontSize: 20
  },
  deckCards: {
    fontSize: 10,
    color: 'grey'
  }
})
