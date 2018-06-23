import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native'
import { selectDeck } from '../store/actions'
import Util from '../util/Util'

class DeckList extends Component {
  onPress(deck) {
    this.props.selectDeck(deck)
    this.props.navigation.navigate('Deck', { title: deck.title })
  }

  render() {
    const { ready, decks, lastDate } = this.props
    if (!ready) return <Text>Loading...</Text>

    return (
      <ScrollView>
        {(!decks || decks.length === 0) && <Text>You do not have decks yet!</Text>}
        {decks &&
          decks.length > 0 &&
          lastDate !== '' &&
          Util.todayString() !== lastDate && (
            <View style={styles.tileContainer}>
              <Text style={styles.donotstudy}>You haven't studied today yet!</Text>
            </View>
          )}

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
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps({ decks, ready, lastDate }) {
  return { decks, ready, lastDate }
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
  },
  donotstudy: { color: 'red' }
})
