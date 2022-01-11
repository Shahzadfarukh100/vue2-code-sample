<template>
  <v-row dense>
    <v-col cols="4" v-for="(week, index) in weeks" :key="index">
      <app-card class="week-card">
        <div class="primary white--text px-3 py-2 week-card-heading">
          <h5 class="mb-0 subtitle-2">{{$t('message.WEEK')}} {{index + 1}}</h5>
        </div>
        <div class="week-card-content pa-3">
          <span class="caption">{{$t('message.STARTING')}} {{$moment.tolocaldate(week[0]['date'])}}</span>
          <div class="pt-2">
            <v-btn
              @click="selectHandler(week)"
              color="primary"
              depressed
              small
            >
              {{$t('message.CUSTOMIZE')}}
            </v-btn>
            <v-switch
              hide-details
              :value="isOff(week)"
              :label="$t('message.WEEK_OFF')"
              @change="weekOffHandler($event, week)"
            ></v-switch>
          </div>
        </div>
      </app-card>
    </v-col>
  </v-row>
</template>
<script>
import groupBy from 'lodash/groupBy'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    shifts: {
      type: Array,
      required: true
    }
  },

  computed: {
    weeks () {
      return Object.values(groupBy(this.shifts, i => this.$moment(i.date, 'YYYY-MM-DD').isoWeek()))
    }
  },

  methods: {
    selectHandler (week) {
      this.$emit('select', cloneDeep(week))
    },
    isOff (week) {
      return week.every(d => d.holiday)
    },
    weekOffHandler (value, week) {
      week = cloneDeep(week)
      week = week.map(d => ({ ...d, holiday: value }))
      this.$emit('week-off', week)
    }
  }
}
</script>
<style scoped>
  .week-card {
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .week-card-heading {
    border-radius: 2px 2px 0 0;
  }
</style>
