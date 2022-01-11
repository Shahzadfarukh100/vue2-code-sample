<template>
  <view-wrapper :loading="loading">
    <div>
      <app-card custom-classes="border-wrap app-card-secondary-wrap mt-5 mb-20">
        <div class="d-flex  align-center justify-space-between mb-7">
           <h1 class="primary--text text-capitalize mb-0 font-2x fw-bold">
             {{$moment.tolocal(shift.start, null, 'MMMM')}}
             <span>{{$moment.tolocal(shift.start, null, 'DD')}}-{{$moment.tolocal(shift.start, null, 'YYYY')}}</span>
            </h1>
            <component
              :origin="origin"
              :shift="shift"
              :schedule="schedule"
              :is="shiftDetailMenu"
            >
            </component>
        </div>
        <v-row no-gutters-y>
          <v-col cols="12" class="px-0">
            <v-list subheader class="list__view">
              <v-row no-gutters-y>
                <v-col cols="12" md="4" sm="6">
                  <v-list-item>
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle class="mb-1">{{$t('message.START_TIME')}}</v-list-item-subtitle>
                      <v-list-item-title class="fw-bold primary--text">{{$moment.localtime(shift.start)}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-list-item>
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle class="mb-1">{{$t('message.END_TIME')}}</v-list-item-subtitle>
                      <v-list-item-title class="fw-bold primary--text">{{$moment.localtime(shift.end)}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-list-item>
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle class="mb-1">{{$t('message.EMPLOYEES_NEEDED')}}</v-list-item-subtitle>
                      <v-list-item-title class="fw-bold primary--text">{{shift.employees_needed}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>

                <v-col cols="12" md="8" sm="6" class="mt-2">
                  <v-list-item>
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle class="mb-1">{{$t('message.SHIFT_TYPE')}}</v-list-item-subtitle>
                      <v-list-item-title class="fw-bold primary--text text-capitalize">{{shift.shift_type ? shift.shift_type.name : ''}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" md="4" sm="6" class="comments_link">
                  <router-link v-if="shift.comment" :to="{ name: 'SCHEDULE_DETAIL:SHIFT_COMMENTS'}"><span class="primary--text">{{$t('message.COMMENTS')}}</span></router-link>
                </v-col>
              </v-row>
            </v-list>
          </v-col>
        </v-row>
      </app-card>
      <component :is="shiftDetail"></component>
    </div>

  </view-wrapper>
</template>
<script>
import UnEmployeesAllocated from 'Components/schedule/ShiftDetail/ActionCards/UnPublishedShiftEmployeesAllocated.vue'
import EmployeesAllocated from 'Components/schedule/ShiftDetail/ActionCards/PublishedShiftEmployeesAllocated'
import UnPublishedMenu from 'Components/schedule/ShiftDetail/UnPublishedMenu.vue'
import PublishedMenu from 'Components/schedule/ShiftDetail/PublishedMenu.vue'
import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'

import { ServerValidationMixin } from '@/mixins'

export default {

  data () {
    return {
      origin: this.$route.query.origin || 'calendar'
    }
  },

  mixins: [ServerValidationMixin],

  computed: {
    schedule () {
      if (this.origin === 'profile') {
        return {
          status: 5
        }
      }
      return this.$store.state.calendar.schedule
    },

    canUpdate () {
      return !(
        this.schedule.status === SCHEDULE_STATUS_CHOICES.value('COLLECTING_PREFERENCE') ||
          this.schedule.status === SCHEDULE_STATUS_CHOICES.value('PRODUCING_SCHEDULE')
      )
    },

    shiftDetail () {
      if (this.schedule.status === SCHEDULE_STATUS_CHOICES.value('PUBLISHED')) {
        return EmployeesAllocated
      }
      return UnEmployeesAllocated
    },
    shiftDetailMenu () {
      if (this.schedule.status === SCHEDULE_STATUS_CHOICES.value('PUBLISHED')) {
        return PublishedMenu
      }
      return UnPublishedMenu
    },

    shift () {
      return this.$store.state.shift.shift
    },

    loading () {
      return this.$store.state.shift.fetching
    }

  },

  methods: {
    getShiftEndTime (shift) {
      const start = this.$moment(this.$moment.tolocaltime(shift.start), 'DD/MM/YYYY HH:mm')
      const end = this.$moment(this.$moment.tolocaltime(shift.end), 'DD/MM/YYYY HH:mm')

      if (start.date() === end.date()) {
        return end.format('HH:mm')
      } else {
        return end.format('DD/MM/YYYY HH:mm')
      }
    }
  },

  async created () {
    this.$store.dispatch('shift/setDetailsPagePath', 'SCHEDULE_DETAIL:SHIFT_ASSISTANT_DETAIL')
    try {
      this.$store.dispatch('shift/getShift', this.$route.params.shiftId)
    } catch (err) {
      this.serverValidation(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.comments_link{
  display: grid;
  align-items: end;
  padding-left: 27px;
  font-weight: 700;
}
</style>
