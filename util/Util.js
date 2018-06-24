import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'EasyFlashCards@NotificationKey'

function createNotification() {
  return {
    title: "Let's study!",
    body: "Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

function tomorrow() {
  let result = new Date()
  result.setDate(result.getDate() + 1)
  result.setHours(18)
  result.setMinutes(0)
  return result
}

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

  static enableLocalNotifications() {
    // console.log('enableLocalNotifications')
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow(),
                repeat: 'day'
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
        }
      })
  }

  static clearLocalNotifications() {
    // console.log('clearLocalNotifications')
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync
    )
  }
}

export default Util
