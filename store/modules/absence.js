import Vue from 'vue'

const state = {
  fetching: false,
  fetching_secondary: false,
  absences: [],
  general_absences: [],
  absence_types: [],
  shifts: [],
  leave_history: [],
  absence: {
    absence_type: {},
    submitted_by: {},
    submitted_to: {},
    submitted_for: {}
  },
  params: { page: 1 },
  updating: false,
  next: true,
  page: 1,
  count: 0
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
  APPEND_ABSENCES: (state, payload) => {
    state.absences = payload
  },
  APPEND_GENERAL_ABSENCES: (state, payload) => {
    state.general_absences = payload
  },
  APPEND_ABSENCE_TYPES: (state, payload) => {
    state.absence_types = payload
  },
  SET_PAGENUMBER: (state, payload) => {
    state.page = payload
  },
  RESET_ABSENCES: (state, payload) => {
    state.absence_types = []
    state.general_absences = []
    state.absences = []
    state.page = 1
    state.count = 0
  },
  UPDATE_ABSENCES: (state, absence) => {
    state.absences = state.absences.map(x => (x.id === absence.id) ? absence : x)
  }
}

const actions = {
  async getAbsences ({ commit, state }, query) {
    const params = state.params
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/absence/requests/?`, { params })
        commit('APPEND_ABSENCES', data.results)
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        commit('RESET_ABSENCES')
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },
  async getGeneralAbsences ({ commit, state }, params = {}) {
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/general_absence/?`, { params })
        commit('APPEND_GENERAL_ABSENCES', data.results)
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        commit('RESET_ABSENCES')
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async getGeneralAbsencesArchive ({ commit, state }, params = {}) {
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/general_absence/archived/?`, { params })
        commit('APPEND_GENERAL_ABSENCES', data.results)
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        commit('RESET_ABSENCES')
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async getAbsenceTypes ({ commit, state }, params = {}) {
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/absence_type/?`, { params })
        commit('APPEND_ABSENCE_TYPES', data.results)
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        commit('RESET_ABSENCES')
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async getAbsenceTypesArchive ({ commit, state }, params = {}) {
    if (!state.fetching) {
      commit('_SET', { payload: true, path: 'fetching' })
      try {
        const { data } = await Vue.prototype.$http.get(`/absence_type/archived/?`, { params })
        commit('APPEND_ABSENCE_TYPES', data.results)
        commit('_SET', { payload: data.count, path: 'count' })
      } catch (err) {
        commit('RESET_ABSENCES')
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching' })
      }
    }
  },

  async markCompleteToDo ({ commit, state }) {
    try {
      await Vue.prototype.$http.post(`/absence_type/mark_todo_complete/`)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async createGeneralAbsence ({ commit, state }, payload) {
    commit('_SET', { payload: true, path: 'updating' })
    try {
      await Vue.prototype.$http.post('/general_absence/', payload)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      commit('_SET', { payload: false, path: 'updating' })
    }
  },

  async getGeneralAbsence ({ commit, state }, id) {
    if (!state.fetching_secondary) {
      commit('_SET', { payload: true, path: 'fetching_secondary' })
      try {
        const { data } = await Vue.prototype.$http.get(`/general_absence/${id}/`)
        commit('_SET', { payload: data, path: 'absence' })
      } catch (err) {
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching_secondary' })
      }
    }
  },

  async updateGeneralAbsence ({ commit, state }, payload) {
    const { id } = payload
    commit('_SET', { payload: true, path: 'updating' })
    try {
      await Vue.prototype.$http.put(`/general_absence/${id}/`, payload)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      commit('_SET', { payload: false, path: 'updating' })
    }
  },

  async createAbsence ({ commit, state }, payload) {
    commit('_SET', { payload: true, path: 'updating' })
    try {
      await Vue.prototype.$http.post('/absence/', payload)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      commit('_SET', { payload: false, path: 'updating' })
    }
  },

  async createAbsenceType ({ commit, state }, payload) {
    commit('_SET', { payload: true, path: 'updating' })
    try {
      await Vue.prototype.$http.post('/absence_type/', payload)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      commit('_SET', { payload: false, path: 'updating' })
    }
  },

  async updateAbsenceType ({ commit, state }, payload) {
    const { id } = payload
    commit('_SET', { payload: true, path: 'updating' })
    try {
      await Vue.prototype.$http.put(`/absence_type/${id}/`, payload)
    } catch (err) {
      return Promise.reject(err)
    } finally {
      commit('_SET', { payload: false, path: 'updating' })
    }
  },

  async getAbsenceType ({ commit, state }, id) {
    if (!state.fetching_secondary) {
      commit('_SET', { payload: true, path: 'fetching_secondary' })
      try {
        const { data } = await Vue.prototype.$http.get(`/absence_type/${id}/`)
        commit('_SET', { payload: data, path: 'absence' })
      } catch (err) {
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching_secondary' })
      }
    }
  },

  async getAbsence ({ commit, state }, id) {
    if (!state.fetching_secondary) {
      commit('_SET', { payload: true, path: 'fetching_secondary' })
      try {
        const { data } = await Vue.prototype.$http.get(`/absence/${id}/detail_history/`)
        commit('_SET', { payload: data, path: 'absence' })
        commit('UPDATE_ABSENCES', data)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        commit('_SET', { payload: false, path: 'fetching_secondary' })
      }
    }
  },

  async getAbsenceOverlapShifts ({ commit, state }, id) {
    try {
      const { data } = await Vue.prototype.$http.get(`/employee_shift/${id}/shifts_span_leave/`)
      commit('_SET', { payload: data, path: 'shifts' })
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async getEmployeeLeaveHistory ({ commit, state }, id) {
    try {
      const { data } = await Vue.prototype.$http.get(`/absence/user_absences/?employee_id=${id}`)
      commit('_SET', { payload: data.results, path: 'leave_history' })
    } catch (err) {
      return Promise.reject(err)
    }
  },

  updatePage ({ commit }, page) {
    commit('SET_PAGENUMBER', page)
  },

  async setParams ({ commit, state, dispatch }, payload) {
    commit('_SET', { payload: { ...state.params, ...payload }, path: 'params' })
  },

  async resetParams ({ commit }) {
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
