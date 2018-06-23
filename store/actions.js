import Storage from '../util/Storage'
import Util from '../util/Util'

export const LOAD_DECKS = 'LOAD_DECKS'
export const UPDATE_DECK = 'UPDATE_DECK'
export const SELECT_DECK = 'SELECT_DECK'
export const LOAD_LAST_STUDY_DATE = 'LOAD_LAST_STUDY_DATE'
export const UPDATE_LAST_STUDY_DATE = 'UPDATE_LAST_STUDY_DATE'

export const loadDecks = () => (dispatch) => {
  Storage.getData()
    .then((t) => Util.textToObj(t))
    .then((r) => Util.deckArrayFromObj(r))
    .then((items) =>
      dispatch({
        type: LOAD_DECKS,
        decks: items
      })
    )
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

export const loadLastStudyDate = () => (dispatch) => {
  Storage.getLastStudyDate().then((value) =>
    dispatch({
      type: LOAD_LAST_STUDY_DATE,
      value: value === '' ? 'never' : value
    })
  )
}

export const updateLastStudyDate = () => (dispatch) => {
  var value = Util.todayString()
  Storage.updateLastStudyDate(value).then((v) =>
    dispatch({
      type: UPDATE_LAST_STUDY_DATE,
      value: value
    })
  )
}
