import { AsyncStorage } from 'react-native'

class Storage {
  static Key = 'flashCardsStorage@key'

  static getData() {
    return AsyncStorage.getItem(this.Key)
  }

  static async updateDeck(deck) {
    const obj = {}
    obj[deck.title] = deck
    const s = JSON.stringify(obj)
    await AsyncStorage.mergeItem(this.Key, s).done()
  }

  static async setFullData(data){
    await AsyncStorage.setItem(this.Key, JSON.stringify(data)).done()
  }

}

export default Storage
