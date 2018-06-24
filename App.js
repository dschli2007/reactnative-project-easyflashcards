import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import Tabs from './components/Tabs'
import getStore from './store/store'
import { loadDecks, loadLastStudyDate } from './store/actions'
import Util from './util/Util'
const store = getStore()

export default class App extends Component {
  
  componentDidMount() {
    store.dispatch(loadDecks())
    Util.enableLocalNotifications()
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
