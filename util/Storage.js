import { AsyncStorage } from 'react-native'

class Storage {
  static Key = 'myFlashCardsStorage@Key'
  static DateKey = 'myFlashCardsStorage@DateKey'

  static getData() {
    return AsyncStorage.getItem(this.Key)
  }

  static async updateDeck(deck) {
    const obj = {}
    obj[deck.title] = deck
    const s = JSON.stringify(obj)
    await AsyncStorage.mergeItem(this.Key, s).done()
  }

  static getLastStudyDate() {
    return AsyncStorage.getItem(this.DateKey)
  }

  static async updateLastStudyDate(value) {
    await AsyncStorage.mergeItem(this.DateKey, value).done()
  }
}

export default Storage
