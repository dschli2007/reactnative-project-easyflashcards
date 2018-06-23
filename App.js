import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import Tabs from './components/Tabs'

import getStore from './store/store'
import { loadDecks, loadLastStudyDate } from './store/actions'

const store = getStore()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    store.dispatch(loadDecks())
    store.dispatch(loadLastStudyDate())
  }

  render() {
    return (
      <Provider store={store}>
        <Tabs style={styles.container} />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})
