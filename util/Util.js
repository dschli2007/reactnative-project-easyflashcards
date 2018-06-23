class Util {
  static textToObj(text) {
    if (typeof text === 'undefined') return {}
    if (text === null) return {}
    if (typeof text === 'object') return text
    return JSON.parse(text)
  }

  static deckArrayFromObj(obj) {
    if (typeof obj === 'undefined') return []
    if (obj === null) return []

    const result = []
    for (p in obj) {
      if (obj.hasOwnProperty(p)) result.push(obj[p])
    }
    return result
  }

  static todayString() {
    const d = new Date()
    return `${d.getYear()}-${d.getMonth()}-${d.getDate()}`
  }
}

export default Util
