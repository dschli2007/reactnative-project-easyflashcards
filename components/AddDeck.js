import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDeck } from '../store/actions'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  onSubmit() {
    const title = this.state.text
    const deck = {
      title: title,
      questions: []
    }

    this.props.updateDeck(deck)
    this.setState({ text: '' })
    this.props.navigation.navigate('decks')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          value={this.state.text}
          style={styles.input}
          placeholder="Enter the title here..."
          onChangeText={(text) => this.setState({ text })}
        />
        <Button
          style={styles.submitButton}
          disabled={!this.state.text}
          title="Submit"
          onPress={() => this.onSubmit()}
        />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDeck: (deck) => dispatch(updateDeck(deck))
  }
}
export default connect(() => ({}), mapDispatchToProps)(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 100
  },
  label: {
    fontSize: 40,
    padding: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  input: {
    fontSize: 20,
    padding: 20,
    alignSelf: 'stretch'
  },
  submitButton: {
    margin: 50
  }
})
