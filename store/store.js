import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import decks from './reducer'

function getStore() {
  return createStore(
    decks,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  )
}

export default getStore
