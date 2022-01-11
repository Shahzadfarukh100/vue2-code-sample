import { mapState } from 'vuex'
import { debounce } from '@/services/utils'
import AppConfig from 'Constants/AppConfig'

export const departmentChoicesMixin = {

  created () {
    this.$store.dispatch('department/getActiveDepartments')
  },

  computed: {
    ...mapState(['userData']),
    showDepartmentField () {
      return ['manager', 'manager_admin'].indexOf(this.userData.role) !== -1 && this.departmentChoices.length > 1
    },
    departmentChoices () {
      return this.$store.state.department.departments
    }
  }
}

export const employeeHiddenFieldsMixin = {

  data () {
    return {
      removing: false
    }
  },

  async created () {
    this.$store.dispatch('genericfields/fetchHiddenFields')
  },

  methods: {

    async toggleRemovingHandler () {
      if (this.removing) {
        this.removing = false
      } else {
        await this.$store.dispatch('genericfields/setHiddenFieldEntity', this.entity)
        this.removing = true
      }
    }
  },

  computed: {
    entity () {
      return this.entityChoices.value('EMPLOYEE')
    },
    visible () {
      return (...args) => {
        return this.removing || this.$store.getters['genericfields/visible'](...args)
      }
    }
  }

}

export const setClassMixin = {
  data () {
    return {
      el: document.getElementById('v-container')
    }
  },
  mounted () {
    if (this.el) {
      this.el.classList.add('v-wrap-secondary')
    }
  },
  beforeDestroy () {
    if (this.el) {
      this.el.classList.remove('v-wrap-secondary')
    }
  }
}

export const ServerValidationMixin = {
  data () {
    return {
      nonFieldError: null
    }
  },
  methods: {
    serverValidation (err, fmObs) {
      if (err && err.response && err.response.status === 400) {
        if (fmObs) {
          fmObs.setErrors(err.response.data)
        }
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
        if (err.response.data && err.response.data.non_field_errors) {
          this.nonFieldError = err.response.data.non_field_errors
        }
      }
      if (err && err.response && err.response.status === 403) {
        this.$utils.errorNotify(err.response.data.detail)
      }

      if (err.response && err.response.status === 404) {
        this.$utils.errorNotify(this.$t('message.PAGE_NOT_FOUND_ERROR'))
      }

      if (err.response && err.response.status >= 500) {
        this.$utils.errorNotify(this.$t('message.SERVER_ERROR'))
      }

      if (err.message === 'Network Error') {
        this.$utils.errorNotify(this.$t('message.NETWORK_ERROR'))
      }
    }
  }
}

export const imageValidationMixin = {
  data () {
    return {
      imageErrors: []
    }
  },
  computed: {
    isImageValid () {
      return !this.imageErrors.length
    }
  },
  methods: {
    async photoHandler (e) {
      const valid = await this.$refs['obs'].validate()
      this.imageErrors = []
      if (e.target.files[0] && e.target.files[0].size > 2097152) {
        this.imageErrors.push(this.$t('message.MAXIMUM_ALLOWED_SIZE_IS_2MB'))
        this.formData.avatar = ''
        return
      }
      if (valid) {
        this.formData.avatar = await e.target.files[0].toBase64()
      }
    }
  }
}

export const breakDuration = {
  methods: {
    breakTime (startTime, endTime) {
      let start = this.convertTime(startTime)
      let end = this.convertTime(endTime)
      if (start && end) {
        if (start < end) {
          return end.diff(start, 'minutes')
        } else {
          end = end.add(1, 'days')
          return end.diff(start, 'minutes')
        }
      }
      return 1470
    },
    convertTime (value) {
      const time = value.split(':')
      const hour = time[0]
      const minute = time[1]
      if (!!hour && !!minute & hour.length === 2 && minute.length === 2) {
        return this.$moment('1900-01-01').set({ hour: hour, minute: minute })
      }
      return null
    }
  }
}

export const tableOptionMixin = {
  data () {
    return {
      query: '',
      queryLoading: false,
      sortBy: null,
      sortDesc: true,

      perPage: AppConfig.itemsPerPage,

      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    tableHeight () {
      /* eslint-disable */
      const nav_h = 50, padding_h = 40, title_bar = 41, filters_h = 104, table_padding_h = 10, footer_h = 81;
      const h = this.windowSize.y - nav_h - padding_h - title_bar - filters_h - table_padding_h - footer_h;
      return h
      /* eslint-enable */
    },

    tableHeaders () {
      return this.headers.map(item => {
        item.text = this.$t(item.text)
        return item
      })
    },
    sortingOrder: {
      get () {
        return !this.sortDesc
      },
      set (v) {
        this.sortDesc = !v
      }
    }
  },
  watch: {
    page: {
      immediate: true,
      handler () {
        this.updateData()
      }
    },
    query (value) {
      if (value === '' || value.length >= 3) {
        this.queryHandler(value)
      }
    },
    sortBy: {
      handler () {
        this.page = 1
        this.updateData()
      }
    },
    sortDesc: {
      handler () {
        this.page = 1
        this.updateData()
      }
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    queryHandler: debounce(function () {
      this.page = 1
      this.queryLoading = true
      this.updateData()
    }, 1000)
  }
}

export const FormEnterListner = {
  mounted () {
    document.addEventListener('keyup', this.handleEnter)
  },
  destroyed () {
    document.removeEventListener('keyup', this.handleEnter)
  },

  methods: {
    handleEnter (e) {
      if (e.keyCode === 13) this.submitHandler()
    }
  }
}
