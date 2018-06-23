import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDeck } from '../store/actions'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      correct: 0,
      incorrect: 0,
      showQuestion: true
    }
  }

  showAnswer() {
    this.setState({ showQuestion: false })
  }

  onSubmit(isCorrect) {
    const sumCorrect = isCorrect ? 1 : 0
    const sumIncorrect = isCorrect ? 0 : 1
    this.setState((prev) => ({
      correct: prev.correct + sumCorrect,
      incorrect: prev.incorrect + sumIncorrect,
      index: prev.index + 1,
      showQuestion: true
    }))
  }

  whatToSay(correct, totalQuestions) {
    if (correct === totalQuestions) return "You're perfect!"
    if (correct === 0) return "I don't know what to  say! You got nothing!"
    if (correct >= totalQuestions / 2) return "You're getting good!"
    if (correct < totalQuestions / 2) return 'You have a lot to improve!'
    return 'Nothing to say! Actually, This  messsage will never show up!'
  }
  render() {
    const { deck } = this.props
    const { index, correct, incorrect, showQuestion } = this.state
    const totalQuestions = deck.questions.length
    return (
      <View style={styles.container}>
        {index < totalQuestions && (
          <View style={styles.box}>
            <Text>
              Question {index + 1} of {totalQuestions}
            </Text>
            <Text style={{ color: 'green' }}>Corrects: {correct}</Text>
            <Text style={{ color: 'red' }}>Incorrects: {incorrect}</Text>
          </View>
        )}

        {index >= totalQuestions && (
          <View style={styles.center}>
            <View style={styles.box}>
              <Text>Well Done!</Text>
              <Text>
                You got {correct} out of {totalQuestions} questions!
              </Text>
              <Text>{this.whatToSay(correct, totalQuestions)}</Text>
            </View>
          </View>
        )}

        {showQuestion &&
          totalQuestions > index && (
            <View>
              <View style={styles.box}>
                <Text style={styles.label}>Question:</Text>
                <Text style={styles.text}>{deck.questions[index].question}</Text>
              </View>
              <View style={styles.btncontainer}>
                <Button title="Show Answer" onPress={() => this.showAnswer()} />
              </View>
            </View>
          )}

        {!showQuestion &&
          totalQuestions > index && (
            <View>
              <View style={styles.box}>
                <Text style={styles.label}>Answer:</Text>
                <Text style={styles.text}>{deck.questions[index].answer}</Text>
              </View>
              <View style={styles.btncontainer}>
                <Button color="green" title="Correct" onPress={() => this.onSubmit(true)} />
              </View>
              <View style={styles.btncontainer}>
                <Button color="red" title="Incorrect" onPress={() => this.onSubmit(false)} />
              </View>
            </View>
          )}
      </View>
    )
  }
}

function mapStateToProps({ selected }) {
  return { deck: selected }
}

function mapDispatchToProps(dispatch) {
  return {
    //updateDeck: (deck) => dispatch(updateDeck(deck))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 10
  },
  center: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10
  },
  box: {
    borderWidth: 2,
    borderColor: 'silver',
    borderRadius: 20,
    padding: 10,
    margin: 10
  },
  button: {},
  btncontainer: {
    margin: 10,
    alignItems: 'center'
  },
  label: {
    fontSize: 10,
    color: 'grey'
  },
  text: {
    fontSize: 16
  }
})
