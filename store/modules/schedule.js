import Vue from 'vue'
const getCreateData = () => {
  return {
    formData: {
      department: '',
      start: '',
      end: '',
      shift_types: [],
      preferences_deadline: null,
      manual_input: false,
      collect_preferences: true,
      comment: '',
      generic_data: {},
      shift_template_view_as_list: true
    },
    shiftTemplates: {},
    shiftTemplatesList: {},
    weekData: { data: [], id: null }
  }
}

const state = {
  createData: getCreateData(),
  scheduleRelatedEmployees: [],
  fetching: false,
  creatingshiftTemplates: false,
  employees_missed: {
    count: 0,
    results: []
  },
  timesheet: [],
  schedules: [],
  next: true,
  page: 1,
  count: 0,
  params: { page: 1 }
}

const getters = {}

const mutations = {
  _SET: (state, { payload, path }) => {
    path = path.split('.')
    const accessor = path.pop()

    for (let p of path) {
      state = state[p]
    }

    state[accessor] = payload
  },
  EMPLOYEE_MISSED_ATTENDANCE: (state, payload) => {
    state.employees_missed = payload
  },
  REMOVE_SHIFT_TYPE: (state, id) => {
    delete state.createData.shiftTemplates[id]
  }
}

const actions = {
  resetCreateData ({ commit }) {
    commit('_SET', { payload: getCreateData(), path: 'createData' })
  },

  removeShiftTypes ({ commit }, ids) {
    for (const id of ids) {
      commit('REMOVE_SHIFT_TYPE', id)
    }
  },

  setWeekData ({ commit }, data) {
    commit('_SET', { payload: data, path: 'createData.weekData' })
  },

  setDayData ({ commit, state }, data) {
    const { shifts, id } = data
    const newData = state.createData.shiftTemplatesList
    newData[id].shifts = shifts
    commit('_SET', { payload: newData, path: 'createData.shiftTemplatesList' })
  },

  setShiftTemplateView ({ commit, state }, data) {
    commit('_SET', { payload: data, path: 'createData.formData.shift_template_view_as_list' })
  },

  async fetchScheduleRelatedEmployees ({ commit }, id) {
    const { data } = await Vue.prototype.$http.get(`/choices/employee/schedule_related_employees/?schedule_id=${id}`)
    commit('_SET', { payload: data.results, path: 'scheduleRelatedEmployees' })
  },

  customizeShifts ({ commit, state }, { data, id }) {
    let shifts = state.createData.shiftTemplates[id]
    if (shifts) {
      shifts = [...shifts.shifts]
      for (const datum of data) {
        const index = shifts.findIndex(s => s.date === datum.date)
        if (index !== -1) {
          shifts.splice(index, 1, datum)
        }
      }
      commit('_SET', { payload: shifts, path: `createData.shiftTemplates.${id}.shifts` })
    }
  },

  async createShifts ({ state, commit }) {
    let loopCount = 0
    commit('_SET', { payload: true, path: 'creatingshiftTemplates' })

    const formData = state.createData.formData
    for (const [id, name] of formData.shift_types) {
      const { data: shiftType } = await Vue.prototype.$http.get(`/shift_type/${id}/`)
      const { templates } = shiftType
      const shifts = []

      const start = Vue.prototype.$moment(formData.start)
      const end = Vue.prototype.$moment(formData.end)

      for (let d = start.clone(); d.isSameOrBefore(end, 'day'); d = d.clone().add(1, 'd')) {
        const date = d.format('YYYY-MM-DD')
        let data
        try {
          data = state.createData.shiftTemplates[id].find(d => d.date === date)
          if (!data) {
            (() => {
              throw new TypeError()
            })()
          }
        } catch (e) {
          const template = templates.find(t => t.weekday === d.isoWeekday())
          data = { ...template }
          data.date = date
        }
        shifts.push(data)
      }
      commit('_SET', { payload: { shifts, name }, path: `createData.shiftTemplates.${id}` })

      loopCount += 1
      if (formData.shift_types.length === loopCount) {
        commit('_SET', { payload: false, path: 'creatingshiftTemplates' })
      }
    }
  },

  async createShiftsList ({ state, commit }) {
    const formData = state.createData.formData
    const shiftTemplates = state.createData.shiftTemplates
    const start = Vue.prototype.$moment(formData.start)
    const end = Vue.prototype.$moment(formData.end)

    let shifts = []

    for (let d = start.clone(); d.isSameOrBefore(end, 'day'); d = d.clone().add(1, 'd')) {
      const date = d.format('YYYY-MM-DD')
      let dateShifts = []
      for (const [id, name] of formData.shift_types) {
        let data = shiftTemplates[id].shifts.find(d => d.date === date)
        dateShifts.push({ ...data, shift_type_id: id, shift_type_name: name })
      }
      shifts.push({ date: date, shifts: dateShifts, weekDay: d.day() })
    }
    commit('_SET', { payload: shifts, path: 'createData.shiftTemplatesList' })
  },

  async convertShiftsListToGrid ({ state, commit }) {
    const shiftList = state.createData.shiftTemplatesList
    const formData = state.createData.formData

    let shiftsGrid = state.createData.shiftTemplates
    for (const [id] of formData.shift_types) {
      shiftsGrid[id].shifts = []
    }

    for (let i = 0; i < shiftList.length; i = i + 1) {
      let shifts = shiftList[i].shifts
      for (const [id] of formData.shift_types) {
        shiftsGrid[id].shifts.push(shifts.find(d => d.shift_type_id === id))
      }
    }
    commit('_SET', { payload: shiftsGrid, path: `createData.shiftTemplates` })
  },

  async createSchedule ({ state }) {
    const data = { ...state.createData.formData }
    data.shift_types = data.shift_types.map(s => s[0])
    data.shifts = Object.entries(state.createData.shiftTemplates).reduce((obj, [id, { shifts }]) => {
      obj[id] = shifts
      return obj
    }, {})
    const rd = await Vue.prototype.$http.post('/schedule/', data)
    return rd
  },
  async fetchEmployeeMissedAttendance ({ commit, state }, payload) {
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      const url = `/shift/${payload.shiftId}/employees_missed_attendance/`
      try {
        const { data } = await Vue.prototype.$http.get(url, {
          params: { page: payload.page }
        })
        commit('EMPLOYEE_MISSED_ATTENDANCE', data)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async getScheduleTimeSheet ({ commit, state }, payload) {
    const { query, scheduleId } = payload
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      const url = `/schedule/${scheduleId}/timesheet/?${query}`
      try {
        const { data } = await Vue.prototype.$http.get(url)
        commit('_SET', { payload: data.results, path: 'timesheet' })
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async listSchedules ({ commit, state }) {
    const params = state.params
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/schedule/?`, { params })
        commit('_SET', { payload: data.results, path: 'schedules' })
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async setParams ({ commit, state, dispatch }, payload) {
    commit('_SET', { payload: { ...state.params, ...payload }, path: 'params' })
  },

  async resetParams ({ commit, state, dispatch }, payload) {
    commit('_SET', { payload: { page: 1 }, path: 'params' })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
