import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import modules from './modules'

import appConfig from 'Constants/AppConfig'

Vue.use(Vuex)

const state = {
  // sidebar
  activeMenuGroup: '',

  // settings

  language: appConfig.defaultLocale,

  // user data

  userData: {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    role: '',
    active_department: {},
    is_manager_admin: false,
    is_manager: false,
    is_staff_: false,
    is_employee: false,
    is_manager_admin_or_manager: false
  },

  permissions: [],

  secondaryRouter: false

}

const getters = {
  menu: state => {
    const hasPermission = p => state.permissions.indexOf(p) !== -1
    const groups = []

    // home group

    const homeGroup = {
      group: 'home',
      icon: Vue.prototype.$icons.mdiHome,
      title: 'message.HOME',
      path: { name: 'HOME' }
    }
    groups.push(homeGroup)

    // Communication Group
    // Do not remove comments
    // const communicationGroup = {
    //   group: 'communication',
    //   icon: Vue.prototype.$icons.mdiDomain,
    //   title: 'message.COMMUNICATION',
    //   items: []
    // }
    // communicationGroup.items.push({
    //   title: 'message.CHAT',
    //   path: { name: 'CHAT' }
    // })
    // if (hasPermission('can_list_news_feed')) {
    //   communicationGroup.items.push({
    //     title: 'message.LIST_NEWS_FEED',
    //     path: { name: 'LIST_NEWS_FEED' }
    //   })
    // }
    // communicationGroup.items.push({
    //   title: 'message.HELP_DESK_LIST',
    //   path: { name: 'HELPDESK_LIST' }
    // })
    // if (communicationGroup.items.length) {
    //   groups.push(communicationGroup)
    // }

    // Company Group

    const companyGroup = {
      group: 'company',
      icon: Vue.prototype.$icons.mdiDomain,
      title: 'message.COMPANY',
      items: []
    }
    if (hasPermission('can_retrieve_company')) {
      companyGroup.items.push({
        title: 'message.VIEW_COMPANY',
        path: { name: 'COMPANY_DETAIL' }
      })
    }
    if (hasPermission('can_view_department')) {
      companyGroup.items.push({
        title: 'message.VIEW_DEPARTMENTS',
        path: { name: 'DEPARTMENT_LIST' }
      })
    }
    // Do not remove comments
    // if (hasPermission('can_list_employee_shift')) {
    //   companyGroup.items.push({
    //     title: 'message.REPORTS',
    //     path: { name: 'REPORTS' }
    //   })
    // }
    if (companyGroup.items.length) {
      groups.push(companyGroup)
    }

    // Schedule Group

    const scheduleGroup = {
      group: 'schedule',
      icon: Vue.prototype.$icons.mdiCalendar,
      title: 'message.SCHEDULES',
      path: { name: 'SCHEDULE_LIST' }
    }
    groups.push(scheduleGroup)

    // Shift Market Group

    const shiftMarketGroup = {
      group: 'shift-swap',
      icon: Vue.prototype.$icons.mdiViewList,
      title: 'message.SHIFT_SWAP_MARKET',
      path: { name: 'LIST_SHIFT_SWAP_MARKET' }
    }
    groups.push(shiftMarketGroup)

    // Absence Group

    const absencesGroup = {
      group: 'absences',
      icon: Vue.prototype.$icons.mdiAccountOff,
      title: 'message.ABSENCES',
      items: []
    }
    if (hasPermission('can_view_absence')) {
      absencesGroup.items.push({
        title: 'message.VIEW_ABSENCES',
        path: { name: 'ABSENCE_LIST' }
      })
    }
    if (hasPermission('can_list_general_absence')) {
      absencesGroup.items.push({
        title: 'message.VIEW_GENERAL_ABSENCES',
        path: { name: 'GENERAL_ABSENCE_LIST' }
      })
    }
    if (state.userData.role !== 'employee' && hasPermission('can_view_absence_type')) {
      absencesGroup.items.push({
        title: 'message.ABSENCE_TYPE',
        path: { name: 'ABSENCE_TYPE' }
      })
    }
    if (absencesGroup.items.length) {
      groups.push(absencesGroup)
    }

    // Employees Group

    const employeesGroup = {
      group: 'employees',
      icon: Vue.prototype.$icons.mdiAccount,
      title: 'message.EMPLOYEES',
      items: []
    }

    if (hasPermission('can_list_employee')) {
      employeesGroup.items.push({
        title: 'message.VIEW_EMPLOYEES',
        path: { name: 'EMPLOYEE_LIST' }
      })
    }
    if (hasPermission('can_invite_employee')) {
      employeesGroup.items.push({
        title: 'message.INVITE_EMPLOYEE',
        path: { name: 'INVITE_EMPLOYEES' }
      })
    }
    if (hasPermission('can_view_designation')) {
      employeesGroup.items.push({
        title: 'message.JOB_TITLE',
        path: { name: 'DESIGNATION_LIST' }
      })
    }
    if (employeesGroup.items.length) {
      groups.push(employeesGroup)
    }

    // Shift Type Group

    const shiftTypeGroup = {
      group: 'shift_type',
      icon: Vue.prototype.$icons.mdiViewList,
      title: 'message.SHIFT_TYPES',
      path: { name: 'SHIFT_TYPE_LIST' }
    }
    if (hasPermission('can_view_shift_type')) {
      groups.push(shiftTypeGroup)
    }

    // Logs Group

    const logsGroup = {
      group: 'logs',
      icon: Vue.prototype.$icons.mdiViewList,
      title: 'message.LOGS',
      items: []
    }
    if (hasPermission('can_list_department_switch_logs')) {
      logsGroup.items.push({
        title: 'message.DEPARTMENT_SWITCH_LOGS',
        path: { name: 'DEPARTMENT_SWITCH_LOGS' }
      })
    }
    // if (hasPermission('can_list_employee_shift_swap_logs')) {
    //   logsGroup.items.push({
    //     title: 'message.SHIFT_SWAP_LOGS',
    //     path: { name: 'SHIFT_SWAP_LOGS' }
    //   })
    // }
    if (hasPermission('can_list_employee_resignation_logs')) {
      logsGroup.items.push({
        title: 'message.EMPLOYEE_RESIGNATION_LOGS',
        path: { name: 'EMPLOYEE_RESIGNATION_LOGS' }
      })
    }
    if (hasPermission('can_list_employee_rehire_logs')) {
      logsGroup.items.push({
        title: 'message.EMPLOYEE_REHIRE_LOGS',
        path: { name: 'EMPLOYEE_REHIRE_LOGS' }
      })
    }
    // Do not remove comments
    // logsGroup.items.push({
    //   title: 'message.LOGIN_ACTIVITY',
    //   path: { name: 'LOGIN_ACTIVITY' }
    // })
    // logsGroup.items.push({
    //   title: 'message.LOGIN_FAILED_LOGS',
    //   path: { name: 'LOGIN_FAILED_LOGS' }
    // })
    // logsGroup.items.push({
    //   title: 'message.PASSWORD_RESET_LOGS',
    //   path: { name: 'PASSWORD_RESET_LOGS' }
    // })
    if (logsGroup.items.length) groups.push(logsGroup)

    return groups
  }
}

const mutations = {
  SET_ACTIVE_MENU_GROUP: (state, group) => {
    state.activeMenuGroup = group
  },
  CHANGE_LANGUAGE: (state, language) => {
    state.language = language
  },
  SET_USER_DATA: (state, payload) => {
    state.userData = _sanitizeUserData(payload)
  },
  SET_USER_ACTIVE_DEPARTMENT: (state, payload) => {
    state.userData.active_department = payload
  },

  SET_SECONDARY_ROUTER: (state, value) => {
    state.secondaryRouter = value
  }
}

const actions = {
  setSecondaryRouter ({ commit }, value) {
    commit('SET_SECONDARY_ROUTER', value)
  }
}

function _sanitizeUserData (payload) {
  return { ...payload,
    is_manager_admin: payload.role === 'manager_admin',
    is_manager: payload.role === 'manager',
    is_staff_: payload.role === 'staff',
    is_employee: payload.role === 'employee',
    is_manager_admin_or_manager: payload.role === 'manager_admin' || payload.role === 'manager'
  }
}

const storeFactory = initialData => {
  if (initialData.hasOwnProperty('userData')) {
    state.userData = _sanitizeUserData(initialData.userData)
  }
  if (initialData.hasOwnProperty('permissions')) {
    state.permissions = initialData.permissions
  }
  if (initialData.hasOwnProperty('locale')) {
    state.language = initialData.locale
  }
  state.dateFormat = initialData.dateFormat
  return new Store({
    modules,
    state,
    getters,
    mutations,
    actions
  })
}

export default storeFactory
