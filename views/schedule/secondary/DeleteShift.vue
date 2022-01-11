<template>
  <view-wrapper class="d-flex flex-column vh-26">
    <app-card custom-classes="border-wrap app-card-secondary-wrap mt-5 mb-50">
      <div class="d-flex  align-center justify-space-between mb-7">
          <h1 class="primary--text text-capitalize mb-0 font-2x fw-bold">
            {{$moment.tolocal(shift.start, null, 'MMMM')}}
            <span class="sub-heading_dat">{{$moment.tolocal(shift.start, null, 'DD')}}-{{$moment.tolocal(shift.start, null, 'YYYY')}}</span>
          </h1>
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
            </v-row>
          </v-list>
        </v-col>
      </v-row>
    </app-card>
    <div class="d-flex flex-column flex-grow-1">
      <app-card custom-classes="border-wrap app-card-secondary-wrap border-warning_1">
        <h1 class="warning--text text-capitalize mb-0 font-2x fw-bold">
          {{$t('message.DELETE_SHIFT_CONSEQUENCES')}}
        </h1>
        <v-card-text class="warning-ul">
          <ul>
            <li v-if="isSchedulePublished"><span>{{$t('message.AFTER_PUBLISHED_SCHEDULE_SHIFT_DELETE_MESSAGE')}}</span></li>
            <li v-else><span>{{$t('message.BEFORE_PUBLISHED_SCHEDULE_SHIFT_DELETE_MESSAGE')}}</span></li>
          </ul>
        </v-card-text>
      </app-card>
    </div>

    <div class="app-secondary-footer-v1">
      <v-dialog
        max-width="362"
        content-class="elevation-dialog"
      >
        <template v-slot:activator="{ on }">

          <v-btn
            :min-width="130"
            :height="38"
            class="mx-0 text-capitalize"
            color="error"
            depressed
            v-on="on"
          >
            {{$t('message.DELETE')}}
          </v-btn>

        </template>
        <template v-slot:default="dialog">
          <v-card color="grey lighten-4">
            <v-toolbar
              flat
              height="35"
              class="toolbar-shift primary--text"
            >
            <v-icon class="delete-icon">{{$icons.mdiDelete}}</v-icon>
            <h4 class="mb-0">{{ $t('message.DISCARD') }}</h4>
              <v-spacer></v-spacer>
              <v-icon class="close-icon" :style="{cursor: 'pointer'}" @click="dialog.value = false">{{$icons.mdiClose}}</v-icon>
            </v-toolbar>
            <v-card-text>
              <div>
                <div class="subtitle-2 font-weight-regular text-left">
                  {{ $t('message.ARE_YOU_SURE_YOU_WANT_TO_DELETE?') }}
                </div>
                </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                width="50%"
                outlined
                color="primary"
                :loading="updating"
                @click="deleteHandler(dialog)"
              >{{ $t('message.YES') }}</v-btn>
              <v-btn
                width="50%"
                outlined
                color="primary"
                class="active"
                @click="dialog.value = false"
              >{{ $t('message.NO') }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </view-wrapper>
</template>

<script>
import { ServerValidationMixin } from '@/mixins'
import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'

export default {
  mixins: [ServerValidationMixin],

  data () {
    return {
      nonFieldError: '',
      warning: this.$t('message.SHIFT_DELETE_WARNING_MESSAGE'),
      updating: false
    }
  },
  computed: {
    shift () {
      return this.$store.state.shift.shift
    },
    schedule () {
      return this.$store.state.calendar.schedule
    },
    isSchedulePublished () {
      return this.schedule.status === SCHEDULE_STATUS_CHOICES.value('PUBLISHED')
    }
  },
  methods: {
    async deleteHandler () {
      try {
        this.updating = true
        await this.$http.delete(`/shift/${this.$route.params['shiftId']}/`)
        this.$utils.sucessNotify('message.SHIFT_HAS_BEEN_SUCCESSFULLY_DELETED')
        await this.$store.dispatch('calendar/fetchEvents')
        this.$router.push({ name: 'SCHEDULE_DETAIL', params: { id: this.$route.params.id } })
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.updating = false
      }
    }
  }
}
</script>
<style lang="scss">
.vh-26{
  height: calc(100% - 26px);
}
.border-warning_1{
  border-color: #F2C94C !important;
}
.warning-ul{
  padding-left: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 17px;
  > ul{
    list-style-type: disc;
    >li{
      line-height: 17px;
      color: #F2C94C;
      margin-bottom: 10px;
      font-size: 20px;
      &:last-child{
        margin-bottom: 0;
      }
      >span{ font-size: 14px; }
    }
  }
}
</style>
