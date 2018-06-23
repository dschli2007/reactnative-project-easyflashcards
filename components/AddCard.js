import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDeck } from '../store/actions'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  onSubmit() {
    const { question, answer } = this.state
    const { deck } = this.props
    deck.questions.push({ question, answer })
    this.props.updateDeck(deck)
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          value={this.state.question}
          style={styles.input}
          placeholder="Enter the question here..."
          onChangeText={(text) => this.setState({ question: text })}
        />

        <Text style={styles.label}>Answer:</Text>
        <TextInput
          value={this.state.answer}
          style={styles.input}
          placeholder="Enter the answer here..."
          onChangeText={(text) => this.setState({ answer: text })}
        />
        <View style={styles.container}>
          <Button
            style={styles.submitButton}
            disabled={!this.state.question || !this.state.answer}
            title="Submit"
            onPress={() => this.onSubmit()}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps({ selected }) {
  return { deck: selected }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDeck: (deck) => dispatch(updateDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 50
  },
  label: {
    fontSize: 12,
    padding: 10,
    alignSelf: 'stretch',
    textAlign: 'left'
  },
  input: {
    fontSize: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'silver',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'stretch'
  },
  submitButton: {
    margin: 50
  }
})
