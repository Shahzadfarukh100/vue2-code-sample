<template>
  <view-wrapper class="vh-26 d-flex flex-column shift-swap-details" :loading="loading">
    <div class="app-secondary-scroll">
      <app-card class="border-wrap card-padding my-5 mb-3">
        <h1 class="primary--text text-capitalize mb-5 font-2x fw-bold">{{$t('message.ABSENCE_DETAIL')}}</h1>

        <v-btn
          v-permission="'can_update_status'"
          @click="$router.push({ name: 'ABSENCE_LIST:ABSENCE_STATUS_UPDATE', params: { objectId: absence.id } })"
          :min-width="130"
          :height="38"
          class="mx-0 text-capitalize text-subtitle-2 right btn-abs-position update"
          color="primary"
          depressed
        >
          {{$t('message.UPDATE')}}
        </v-btn>

        <v-alert
          :value="true"
          outlined
          type="error"
          v-show="nonFieldError"
        >
          {{ nonFieldError }}
        </v-alert>
        <v-alert
          :value="true"
          outlined
          type="error"
          v-show="absence.is_created_for_past"
        >
          {{ $t('message.ABSENCE_WARNING_PAST_DATE') }}
        </v-alert>

        <v-row class="flex-view secondary-page-content">
          <v-col cols="12" class="d-flex py-2 title-col">
            <div class="primary--text">{{$t('message.TITLE')}}</div>
            <div class="text-right text-color-primary-black">{{absence.subject}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 absence_period-col">
            <div class="primary--text">{{$t('message.ABSENCE_PERIOD')}}</div>
            <div class="text-right text-color-primary-black" v-if="!absence.absence_type.hourly">{{$moment.tolocaldate(absence.start)}} - {{$moment.tolocaldate(absence.end)}}</div>
            <div class="text-right text-color-primary-black" v-if="absence.absence_type.hourly">{{$moment.tolocaltime(absence.start)}} - {{$moment.tolocaltime(absence.end)}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 duration-col">
            <div class="primary--text">{{$t('message.REQUESTED')}}</div>
            <div class="text-right text-color-primary-black">{{absence.duration}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 absence_type-col">
            <div class="primary--text">{{$t('message.ABSENCE_TYPE')}}</div>
            <div class="text-right text-color-primary-black">{{absence.absence_type.name}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 submitted_by-col" v-if="absence.submitted_by">
            <div class="primary--text">{{$t('message.SUBMITTED_BY')}}</div>
            <div class="text-right text-color-primary-black">{{absence.submitted_by.full_name}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 submitted_to-col" v-if="absence.submitted_to">
            <div class="primary--text">{{$t('message.SUBMITTED_TO')}}</div>
            <div class="text-right text-color-primary-black">{{absence.submitted_to.full_name}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 submitted_for-col" v-if="absence.submitted_for">
            <div class="primary--text">{{$t('message.SUBMITTED_FOR')}}</div>
            <div class="text-right text-color-primary-black">{{absence.submitted_for.full_name}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 status-col">
            <div class="primary--text">{{$t('message.STATUS')}}</div>
            <div class="text-right text-color-primary-black">{{ $t($utils.getAbsenceStatusI18n(absence.status)) }}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 already_taken-col">
            <div class="primary--text">{{$t('message.ALREADY_TAKEN')}}</div>
            <div class="text-right text-color-primary-black">{{absence.already_taken}}</div>
          </v-col>
          <v-col cols="12" class="d-flex py-2 current_allowance-col">
            <div class="primary--text">{{$t('message.CURRENT_ALLOWANCE')}}</div>
            <div class="text-right text-color-primary-black">{{absence.current_allowance}} {{$t('message.DAYS')}}</div>
          </v-col>
        </v-row>
        <v-row class="mt-7" v-if="user.id === absence.submitted_by.id && absence.status !== 2">
          <v-col cols="12">
            <div  class="primary--text" v-if="absence.submitted_to">{{$t(messageChoices(absence.status))}}: {{absence.submitted_to.full_name}}</div>
          </v-col>
        </v-row>
      </app-card>
      <v-row class="mt-5">
        <v-col cols="12">
          <v-tabs grow>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab href="#history" active-class='primary--text'>{{ $t('message.HISTORY') }}</v-tab>
            <v-tab href="#leave_history" active-class='primary--text'>{{ $t('message.LEAVE_HISTORY') }}</v-tab>
            <v-tab href="#shifts" v-if="shiftSpan">{{ $t( shifts.length > 1 ? 'message.ASSIGNED_SHIFTS': 'message.ASSIGNED_SHIFT') }}</v-tab>
            <v-tab-item value="history">
              <div class="container history-tab">
                <v-data-table
                  :headers="historyHeaders"
                  :items="absence.comment"
                  hide-default-footer
                  hide-default-header
                >
                  <template v-slot:header="scope">
                    <thead>
                    <tr>
                      <th :key="index" v-for="(header, index) in scope.props.headers">{{ $t(header.text) }}</th>
                    </tr>
                    </thead>
                  </template>
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr :key="index" v-for="(item, index) in items">
                        <td>{{item.commented_by.full_name}}</td>
                        <td>{{$t($utils.getAbsenceStatusI18n(item.status))}}</td>
                        <td>{{$moment.tolocaltime(item.created)}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </div>
            </v-tab-item>
            <v-tab-item value="leave_history">
              <div class="container leave_history-tab">
                <v-data-table
                  :headers="leaveHistoryHeaders"
                  :items="leave_history"
                  :items-per-page="50"
                  hide-default-footer
                  hide-default-header
                >
                  <template v-slot:header="scope">
                    <thead>
                    <tr>
                      <th :key="index" v-for="(header, index) in scope.props.headers">{{ $t(header.text) }}</th>
                    </tr>
                    </thead>
                  </template>
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr :key="index" v-for="(item, index) in items">
                        <td>{{item.subject}}</td>
                        <td v-if="item.absence_type.hourly">{{$moment.tolocaltime(item.start)}}</td>
                        <td v-else>{{$moment.tolocaldate(item.start)}}</td>
                        <td v-if="item.absence_type.hourly">{{$moment.tolocaltime(item.end)}}</td>
                        <td v-else>{{$moment.tolocaldate(item.end)}}</td>
                        <td>{{item.duration}}</td>
                        <td>{{$t($utils.getAbsenceStatusI18n(item.status))}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </div>
            </v-tab-item>
            <v-tab-item value="shifts">
              <div class="container shifts-tab">
                <v-data-table
                  :headers="headers"
                  :items="shifts"
                  :items-per-page="50"
                  hide-default-footer
                  hide-default-header
                >
                  <template v-slot:header="scope">
                    <thead>
                    <tr>
                      <th :key="index" v-for="(header, index) in scope.props.headers">{{ $t(header.text) }}</th>
                    </tr>
                    </thead>
                  </template>
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr :key="index" v-for="(item, index) in items">
                        <td>{{item.title}}</td>
                        <td>{{$moment.tolocaltime(item.start)}}</td>
                        <td>{{$moment.tolocaltime(item.end)}}</td>
                        <td>{{statusHeading(item)}}</td>
                        <td>
                          <v-btn
                            @click="$router.push({ name: 'ABSENCE_LIST:EMPLOYEE_SHIFT_UPDATE', params: { employeeShiftId: item.id} })"
                            color="primary"
                            class="view-employee-shift"
                            icon
                          >
                            <v-icon color="primary">{{ $icons.mdiEye }}</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </div>
  </view-wrapper>
</template>
<script>
import { ServerValidationMixin } from '@/mixins'
export default {
  components: {
  },
  mixins: [ServerValidationMixin],
  data () {
    return {
      headers: [
        { text: 'message.TITLE', sortable: false },
        { text: 'message.START', sortable: false },
        { text: 'message.END', sortable: false },
        { text: 'message.STATUS', sortable: false },
        { text: 'message.ACTIONS', sortable: false }
      ],
      historyHeaders: [
        { text: 'message.NAME', sortable: false },
        { text: 'message.STATUS', sortable: false },
        { text: 'message.CREATED', sortable: false }
      ],
      leaveHistoryHeaders: [
        { text: 'message.TITLE', sortable: false },
        { text: 'message.START', sortable: false },
        { text: 'message.END', sortable: false },
        { text: 'message.DURATION', sortable: false },
        { text: 'message.STATUS', sortable: false }
      ]
    }
  },
  created () {
    this.getAbsence().then(() => {
      this.getAbsenceOverlapShifts()
      this.getLeaveHistory()
    })
  },
  computed: {
    user () {
      return this.$store.state.userData
    },
    absence () {
      return this.$store.state.absence.absence
    },
    shifts () {
      return this.$store.state.absence.shifts
    },
    leave_history () {
      return this.$store.state.absence.leave_history
    },
    loading () {
      return this.$store.state.absence.fetching_secondary
    },
    shiftSpan () {
      return this.absence.submitted_by.id !== this.user.id && this.shifts.length > 0
    }
  },

  methods: {
    async getAbsence () {
      let absenceId = this.getAbsenceId()
      try {
        await this.$store.dispatch('absence/getAbsence', absenceId)
      } catch (err) {
        this.serverValidation(err)
      }
    },
    async getAbsenceOverlapShifts () {
      let absenceId = this.getAbsenceId()

      try {
        this.$store.dispatch('absence/getAbsenceOverlapShifts', absenceId)
      } catch (err) {
        this.serverValidation(err)
      }
    },
    async getLeaveHistory () {
      let id = this.absence.submitted_for.id
      try {
        this.$store.dispatch('absence/getEmployeeLeaveHistory', id)
      } catch (err) {
        this.serverValidation(err)
      }
    },
    messageChoices (status) {
      const statuses = [
        'message.WAITING_FOR_APPROVAL_OF',
        'message.APPROVED_BY',
        'message.REJECTED_BY',
        'message.UNDER_REVIEW'
      ]
      return statuses[status - 1]
    },
    getAbsenceId () {
      if (this.$route.name === 'ACCOUNT_SETTINGS:ABSENCE_VIEW') {
        return this.$route.params.absenceId
      }
      return this.$route.params.objectId
    },
    statusHeading (item) {
      let heading = ''

      if (item.absent) {
        heading += this.$t('message.ABSENT') + ', '
      }
      if (item.removed) {
        heading += this.$t('message.REMOVE_FROM_SHIFT') + ', '
      }
      heading = heading.trim()
      if (heading !== '') {
        heading = heading.substring(0, heading.length - 1)
      }
      return heading
    }
  }

}
</script>
<style lang="scss" scoped>
  .v-tab{
    text-transform: capitalize;
  }

</style>
