<template>
  <div class="elevation-input_error_none d-flex justify-space-between mb-0">
    <div class="d-flex">

      <v-autocomplete
        :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
        class="elevation-01-auto elevation-01-auto_filter"
        multiple
        chips
        outlined
        solo
        dense
        :items="shiftTypeChoices"
        :label="$t('message.FILTER_BY_SHIFT_TYPE')"
        item-text="text"
        item-value="value"
        v-model="visibleShiftTypes"
        :append-icon="$icons.mdiChevronDown"
      >
      <template v-slot:selection="{ attrs, selected, item }">
        <v-chip
          close
          small
          v-bind="attrs"
          :input-value="selected"
          @click:close="shiftTypeDeselectHandler(item.value)"
        >
          {{$utils.textTruncate(item.text, 15)}}
        </v-chip>
      </template>
      </v-autocomplete>

      <v-search
        :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
        class="ml-3 elevation-01-auto elevation-01-auto_filter"
        outlined
        solo
        dense
        clearable
        :url="employeesUrl"
        :label="label"
        item-text="full_name"
        item-value="id"
        v-model="highlighted"
        :append-icon="$icons.mdiChevronDown"

      >
        <template v-slot:item="{ item }">
          <v-list-item-avatar class="avatar_img" size="27">
            <img :src="item | avatar" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title__name">{{ item.full_name }}</v-list-item-title>
            <v-list-item-title class="sub__title">{{ roleChoices.display(item.role) }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-search>
    </div>
    <div>
      <v-btn
        :to="{ name: 'SCHEDULE_DETAIL:SHIFT_CREATE' }"
        color="primary"
        depressed
        class="mr-2 font-weight-regular text-capitalize"
      >
        <v-icon class="mr-1">{{ $icons.mdiPlus }}</v-icon>
        {{ $t('message.CREATE_SHIFT') }}
      </v-btn>
      <slot name="action-btn"></slot>
    </div>
  </div>
</template>
<script>
import { ServerValidationMixin } from '@/mixins'
import { ROLE_CHOICES } from 'Constants/choices'

export default {
  mixins: [ServerValidationMixin],
  data () {
    return {
      collectPreferencesLoader: false
    }
  },

  created () {
    this.$store.dispatch('calendar/setVisibleShiftTypes', [])
    if (this.schedule.id) {
      this.$store.dispatch('schedule/fetchScheduleRelatedEmployees', this.schedule.id)
    }
  },

  computed: {
    roleChoices () {
      return ROLE_CHOICES
    },

    employeesUrl () {
      return `/choices/employee/schedule_related_employees/?schedule_id=${this.schedule.id}`
    },

    schedule () {
      return this.$store.state.calendar.schedule
    },

    shiftTypeChoices () {
      return this.$store.state.calendar.schedule.shift_types
    },

    employeeChoices () {
      return this.$store.state.schedule.scheduleRelatedEmployees
    },

    highlighted: {
      set (value) {
        this.$store.dispatch('calendar/highlightEvents', value)
      },
      get () {
        return this.$store.state.calendar.highlighted
      }
    },

    visibleShiftTypes: {
      set (value) {
        this.$store.dispatch('calendar/setVisibleShiftTypes', value)
      },
      get () {
        return this.$store.state.calendar.visibleShiftTypes
      }
    },

    label () {
      if (this.employeeChoices) {
        const highlighted = this.employeeChoices.find(e => e.id === this.highlighted)
        if (highlighted) {
          return this.$t('message.HIGHLIGHTING_SHIFTS_FOR', { name: highlighted.text })
        }
      }
      return this.$t('message.FILTER_BY_EMPLOYEE')
    }
  },

  methods: {
    shiftTypeDeselectHandler (id) {
      this.visibleShiftTypes = this.visibleShiftTypes.filter(s => s !== id)
    }
  }
}
</script>
