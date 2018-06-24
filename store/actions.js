import Storage from '../util/Storage'
import Util from '../util/Util'
import { defaultDecks } from './defaultDecks'

export const LOAD_DECKS = 'LOAD_DECKS'
export const UPDATE_DECK = 'UPDATE_DECK'
export const SELECT_DECK = 'SELECT_DECK'

export const loadDecks = () => (dispatch) => {
  Storage.getData()
    .then((t) => Util.textToObj(t))
    .then((r) => Util.deckArrayFromObj(r))
    .then((items) => {
      if (items.length === 0) {
        items = Util.deckArrayFromObj(defaultDecks)
        Storage.setFullData(defaultDecks)
      }
      dispatch({
        type: LOAD_DECKS,
        decks: items
      })
    })
}

export const selectDeck = (deck) => {
  return {
    type: SELECT_DECK,
    deck: deck
  }
}

export const updateDeck = (deck) => (dispatch) =>
  Storage.updateDeck(deck).then((d) =>
    dispatch({
      type: UPDATE_DECK,
      deck: deck
    })
  )
