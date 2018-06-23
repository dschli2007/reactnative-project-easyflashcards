import {
  LOAD_DECKS,
  SELECT_DECK,
  UPDATE_DECK,
  LOAD_LAST_STUDY_DATE,
  UPDATE_LAST_STUDY_DATE
} from './actions'

const initialState = {
  decks: [],
  selected: { title: '' },
  ready: false,
  version: 0,
  lastDate: ''
}

function decks(state = initialState, action) {
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        decks: action.decks,
        ready: true,
        version: state.version + 1
      }

    case SELECT_DECK:
      return {
        ...state,
        selected: action.deck,
        version: state.version + 1
      }

    case UPDATE_DECK:
      let isNew = true
      const newList = state.decks.map((d) => {
        if (d.title === action.deck.title) {
          isNew = false
          return action.deck
        }
        return d
      })
      if (isNew) newList.push(action.deck)

      return {
        ...state,
        decks: newList,
        selected: state.selected.title === action.deck.title ? action.deck : state.selected,
        version: state.version + 1
      }

    case LOAD_LAST_STUDY_DATE:
      return {
        ...state,
        lastDate: action.value,
        version: state.version + 1
      }

    case UPDATE_LAST_STUDY_DATE:
      return {
        ...state,
        lastDate: action.value,
        version: state.version + 1
      }
  }
  return state
}

export default decks
