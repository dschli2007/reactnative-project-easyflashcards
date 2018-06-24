import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  })

  startQuiz() {
    this.props.navigation.navigate('Quiz')
  }

  addCard() {
    this.props.navigation.navigate('AddCard')
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.deckName}>{deck.title}</Text>
        <Text style={styles.deckCards}>{deck.questions.length} cards</Text>

        <View style={styles.container}>
          <View style={styles.btncontainer}>
            <Button style={styles.buttonAddCard} onPress={() => this.addCard()} title="Add Card" />
          </View>
          <View style={styles.btncontainer}>
            <Button
              color="green"
              style={styles.buttonQuiz}
              onPress={() => this.startQuiz()}
              title="Start Quiz"
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps({ selected, version }) {
  return { deck: selected, version }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 50
  },
  btncontainer: {
    margin: 10,
    alignItems: 'center',
    width: 400
  },
  deckName: {
    fontSize: 24
  },
  deckCards: {
    fontSize: 12,
    color: 'grey'
  },

  buttonAddCard: {},
  buttonQuiz: {}
})
