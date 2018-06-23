import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native'
import { selectDeck } from '../store/actions'

class DeckList extends Component {
  onPress(deck) {
    this.props.selectDeck(deck)
    this.props.navigation.navigate('Deck', { title: deck.title })
  }

  render() {
    const { ready, decks } = this.props
    if (!ready) return <Text>Loading...</Text>

    return (
      <ScrollView>
        <View style={styles.tileContainer}>
          {decks &&
            decks.map((deck) => (
              <TouchableOpacity
                style={styles.tile}
                key={deck.title}
                onPress={() => this.onPress(deck)}>
                <Text style={styles.deckName}>{deck.title}</Text>
                <Text style={styles.deckCards}>{deck.questions.length} cards</Text>
              </TouchableOpacity>
            ))}

            {(!decks || decks.length===0) && (
              <Text>You do not have decks yet!</Text>
            )}
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
