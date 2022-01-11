import { localeProvider } from '@/lang'

export class Choices {
  constructor (data) {
    this._data = data
    this._toValue = {}
    this._toDisplay = {}
    for (const datum of data) {
      if (datum.length !== 3) {
        throw new Error(`Element must be of length 3 not ${datum.length}`)
      }
      let [value, accessor, display] = datum
      this._toValue[accessor] = value
      this._toDisplay[value] = display
    }
  }

  value = accessor => this._toValue[accessor]
  values = () => this._data.map(([v]) => v)
  display = value => localeProvider.i18n.tc(this._toDisplay[value])
  asChoices = (filter = null) => {
    filter = filter || (() => true)
    return this._data.filter(filter).map(([v, a, d]) => ({ text: localeProvider.i18n.tc(d), value: v }))
  }
}

export const SCHEDULE_STATUS_CHOICES = new Choices([
  [1, 'ENTERING_DETAILS', 'message.ENTERING_DETAILS'],
  [2, 'COLLECTING_PREFERENCE', 'message.COLLECTING_PREFERENCE'],
  [3, 'PRODUCING_SCHEDULE', 'message.PRODUCING_SCHEDULE'],
  [4, 'REVIEWING_SCHEDULE', 'message.REVIEWING_SCHEDULE'],
  [5, 'PUBLISHED', 'message.PUBLISHED']
])

export const PREFERENCE_CHOICES = new Choices([
  [1, 'DISPREFER_STRONGLY', 'message.DISPREFER_STRONGLY'],
  [2, 'DISPREFER', 'message.DISPREFER'],
  [3, 'INDIFFERENT', 'message.INDIFFERENT'],
  [4, 'PREFER', 'message.PREFER'],
  [5, 'PREFER_STRONGLY', 'message.PREFER_STRONGLY']
])

export const SHIFT_SWAP_TYPE_CHOICES = new Choices([
  [1, 'GIVE_AWAY_UNKNOWN', 'message.GIVE_AWAY_UNKNOWN'],
  [2, 'GIVE_AWAY_KNOWN', 'message.GIVE_AWAY_KNOWN'],
  [3, 'SWAP_KNOWN', 'message.SWAP_KNOWN'],
  [4, 'SWAP_UNKNOWN', 'message.SWAP_UNKNOWN'],
  [5, 'UNDERSTAFFED', 'message.UNDERSTAFFED']
])

export const SHIFT_SWAP_STATUS_CHOICES = new Choices([
  [1, 'NOT_EVALUATED', 'message.NOT_EVALUATED'],
  [2, 'APPROVED', 'message.APPROVED'],
  [3, 'REJECTED', 'message.REJECTED'],
  [4, 'EXPIRED', 'message.EXPIRED'],
  [5, 'AUTOMATICALLY_CLOSED', 'message.AUTOMATICALLY_CLOSED']
])

export const ROLE_CHOICES = new Choices([
  ['staff', 'STAFF', 'message.STAFF'],
  ['employee', 'EMPLOYEE', 'message.EMPLOYEE'],
  ['manager', 'MANAGER', 'message.MANAGER'],
  ['manager_admin', 'MANAGER_ADMIN', 'message.MANAGER_ADMIN']
])

export const GENERIC_FIELD_ENTITY_CHOICES = new Choices([
  ['account.employee', 'EMPLOYEE', 'message.EMPLOYEE'],
  ['schedule.schedule', 'SCHEDULE', 'message.SCHEDULE'],
  ['shift_type.shifttype', 'SHIFT_TYPE', 'message.SHIFT_TYPE']
])

export const GENERIC_FIELD_VISIBILITY_CHOICES = new Choices([
  ['all', 'ALL', 'message.ALL'],
  ['employee', 'EMPLOYEE', 'message.EMPLOYEE'],
  ['staff', 'STAFF', 'message.STAFF'],
  ['manager', 'MANAGER', 'message.MANAGER'],
  ['manager_admin', 'MANAGER_ADMIN', 'message.MANAGER_ADMIN']
])

export const GENERIC_FIELD_TYPE_CHOICES = new Choices([
  [1, 'BOOLEAN', 'message.BOOLEAN'],
  [2, 'TEXT', 'message.TEXT'],
  [3, 'INTEGER', 'message.INTEGER'],
  [4, 'SELECT', 'message.SELECT']
])

export const LANGUAGE_CHOICES = new Choices([
  ['en', 'ENGLISH', 'message.ENGLISH'],
  ['nb', 'NORWEGIAN', 'message.NORWEGIAN'],
  ['da', 'DANISH', 'message.DANISH']
])

export const TODO_TYPE_CHOICES = new Choices([
  [1, 'TWO_FACTOR', 'message.TWO_FACTOR'],
  [2, 'SYNC_CALENDAR', 'message.SYNC_CALENDAR'],
  [3, 'UPDATE_LANGUAGE', 'message.UPDATE_LANGUAGE'],
  [4, 'SET_PREFERENCES', 'message.SET_PREFERENCES'],
  [5, 'ACCEPT_TERMS', 'message.ACCEPT_TERMS'],
  [6, 'CHECK_COMPANY_SETTINGS', 'message.CHECK_COMPANY_SETTINGS'],
  [7, 'CHECK_DEPARTMENT_SETTINGS', 'message.CHECK_DEPARTMENT_SETTINGS'],
  [8, 'CHECK_ABSENCE_TYPES', 'message.CHECK_ABSENCE_TYPES']
])

export const TICKET_TEAM_CHOICES = new Choices([
  [1, 'GENERAL', 'message.GENERAL'],
  [2, 'MARKETING_TEAM', 'message.MARKETING_TEAM'],
  [3, 'DEVELOPMENT_TEAM', 'message.DEVELOPMENT_TEAM']
])

export const TICKET_STATUS_CHOICES = new Choices([
  [1, 'OPEN', 'message.OPEN'],
  [2, 'ASSIGNED', 'message.ASSIGNED'],
  [3, 'ON_HOLD', 'message.ON_HOLD'],
  [4, 'SOLVED', 'message.SOLVED'],
  [5, 'CLOSED', 'message.CLOSED']
])

export const DAY_CHOICES = new Choices([
  [0, 'MONDAY', 'message.MONDAY'],
  [1, 'TUESDAY', 'message.TUESDAY'],
  [2, 'WEDNESDAY', 'message.WEDNESDAY'],
  [3, 'THURSDAY', 'message.THURSDAY'],
  [4, 'FRIDAY', 'message.FRIDAY'],
  [5, 'SATURDAY', 'message.SATURDAY'],
  [6, 'SUNDAY', 'message.SUNDAY']
])

export const CONSENT_ACK_CHOICES = new Choices([
  [1, 'PENDING', 'message.PENDING'],
  [2, 'ACCEPTED', 'message.ACCEPTED'],
  [3, 'REJECTED', 'message.REJECTED']
])

export const WORKER_TYPE_CHOICES = new Choices([
  [1, 'REGULAR_WORKER', 'message.REGULAR_WORKER'],
  [2, 'EXTRA_WORKER', 'message.EXTRA_WORKER'],
  [3, 'APPRENTICE', 'message.APPRENTICE'],
  [4, 'HOLIDAY_SUBSTITUTE', 'message.HOLIDAY_SUBSTITUTE']
])

export const SALARY_TYPE_CHOICES = new Choices([
  [1, 'VARIABLE', 'message.VARIABLE'],
  [2, 'FIXED', 'message.FIXED']
])

export const COUNTRY_CHOICES = new Choices([
  ['NO', 'Norway', 'Norway'],
  ['DK', 'Denmark', 'Denmark']
])

export const TIMEZONE_CHOICES = new Choices([
  ['Europe/Oslo', 'Europe/Oslo', 'message.Europe_OSLO'],
  ['Europe/Stockholm', 'Europe/Stockholm', 'message.Europe_STOCKHOLM'],
  ['Europe/Copenhagen', 'Europe/Copenhagen', 'message.Europe_COPENHAGEN'],
  ['Asia/Karachi', 'Asia/Karachi', 'message.ASIA_KARACHI']
])

export const MY_REQUESTS_CHOICES = new Choices([
  ['my_requests', 'message.MY_REQUESTS', 'message.MY_REQUESTS']
])

export const PAST_REQUESTS_CHOICES = new Choices([
  ['past_requests', 'message.PAST_REQUESTS', 'message.PAST_REQUESTS'],
  ['today_requests', 'message.TODAY_REQUESTS', 'message.TODAY_REQUESTS'],
  ['future_requests', 'message.FUTURE_REQUESTS', 'message.FUTURE_REQUESTS']
])

export const ABSENCE_DURATION_CHOICES = new Choices([
  [1, 'message.DAY', 'message.DAY'],
  [2, 'message.HOURLY', 'message.HOURLY'],
  [3, 'message.QUITTING', 'message.QUITTING']
])
