import { AsyncStorage } from 'react-native'

class Storage {
  static Key = 'FlashCardsStorage@Key'
  static DateKey = 'FlashCardsStorage@DateKey'

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
    await AsyncStorage.setItem(this.DateKey, value).done()
  }
}

export default Storage
