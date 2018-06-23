import { LOAD_DECKS, SELECT_DECK, UPDATE_DECK } from './actions'

const initialState = {
  decks: [],
  selected: { title: '' },
  ready: false,
  version: 0
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
  }
  return state
}

export default decks
