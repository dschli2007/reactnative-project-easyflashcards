import { AsyncStorage } from 'react-native'

class Storage {
  static Key = 'FlashCardsStorage@Key'

  static getData() {
    return AsyncStorage.getItem(this.Key)
  }

  static async updateDeck(deck) {
    const obj = {}
    obj[deck.title] = deck
    const s = JSON.stringify(obj)
    await AsyncStorage.mergeItem(this.Key, s).done()
  }

}

export default Storage
