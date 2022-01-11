<template>
  <view-wrapper :loading="loading">
    <template v-slot="{ done }">
      <div class="py-10 px-8 pb-0 pt-0 view__schedule" v-if="done">
        <task-progress ref="progress" @success="taskSuccessHandler"></task-progress>
        <secondary-router></secondary-router>
        <v-container class="px-0 pb-0" fluid grid-list-md>
          <app-card custom-classes="">
            <div class="schedule__list">
              <div class="v__item__title">{{$t('message.DEPARTMENT')}}:&nbsp;{{$utils.textTruncate(schedule.department.name, 22)}}</div>
              <div class="v__item__title mx-3">
                {{$t('message.PERIOD')}}:&nbsp;{{$moment.tolocaldate(schedule.start)}} -
                {{$moment.tolocaldate(schedule.end)}}
              </div>
              <div class="v__item__title ml-10">{{$t('message.STATUS')}}:&nbsp;{{statusChoices.display(schedule.status)}}</div>
              <router-link class="sched-comments-link" v-if="schedule.comment" :to="{ name: 'SCHEDULE_DETAIL:SCHEDULE_COMMENTS'}"><span class="primary--text">{{$t('message.COMMENTS')}}</span></router-link>
            </div>
          </app-card>

          <app-card>
            <event-filter>
              <template v-slot:action-btn>

                <v-btn
                  v-if="schedule.status === 1 && schedule.collect_preferences"
                  v-permission="'can_collect_preferences_schedule'"
                  @click="collectPreferencesHandler"
                  :height="38"
                  class="mx-0 text-capitalize text-subtitle-2"
                  color="primary"
                  depressed
                >
                {{$t('message.COLLECT_PREFERENCES')}}
                </v-btn>

                <v-btn
                  v-if="schedule.status === 1 && !schedule.collect_preferences"
                  v-permission="'can_request_schedule'"
                  @click="requestScheduleHandler"
                  :height="38"
                  class="mx-0 text-capitalize text-subtitle-2"
                  color="primary"
                  depressed
                >
                {{$t('message.REQUEST_SCHEDULE')}}
                </v-btn>

                <v-btn
                  v-if="schedule.status === 2"
                  v-permission="'can_stop_collecting_preferences'"
                  :to="{ name: 'SCHEDULE_DETAIL:STOP_COLLECTING_PREFERENCES', params: { id: schedule.id } }"
                  :height="38"
                  class="mx-0 text-capitalize text-subtitle-2"
                  color="primary"
                  depressed
                >
                {{$t('message.STOP_COLLECTING_PREFERENCES')}}
                </v-btn>

                <v-btn
                  v-if="schedule.status === 4"
                  v-permission="'can_publish_schedule'"
                  :loading="publishLoader"
                  @click="publishHandler"
                  :height="38"
                  class="mx-0 text-capitalize text-subtitle-2"
                  color="primary"
                  depressed
                >
                {{$t('message.PUBLISH_SCHEDULE')}}
                </v-btn>

                <v-btn
                  v-if="showFeedbackButton"
                  :to="{name: 'SCHEDULE_DETAIL:SCHEDULE_FEEDBACK'}"
                  :height="38"
                  class="mx-0 text-capitalize text-subtitle-2"
                  color="primary"
                  depressed
                >
                {{$t('message.GIVE_FEEDBACK')}}
                </v-btn>

              </template>
            </event-filter>
            <app-calendar></app-calendar>
          </app-card>
        </v-container>
      </div>
    </template>
  </view-wrapper>
</template>
<script>
import AppCalendar from 'Components/schedule/Calendar.vue'
import SecondaryRouter from 'Components/SecondaryRouter/SecondaryRouterV1.vue'
import EventFilter from 'Components/schedule/EventFilter'
import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'
import TaskProgress from 'Components/Widgets/TaskProgress'
import { ServerValidationMixin } from '@/mixins'

export default {
  data () {
    return {
      collectPreferencesLoader: false,
      requestScheduleLoader: false,
      publishLoader: false
    }
  },

  components: {
    TaskProgress,
    EventFilter,
    AppCalendar,
    SecondaryRouter
  },

  mixins: [ServerValidationMixin],

  computed: {
    statusChoices () {
      return SCHEDULE_STATUS_CHOICES
    },

    schedule () {
      return this.$store.state.calendar.schedule
    },
    user () {
      return this.$store.state.userData
    },

    loading () {
      return this.$store.state.calendar.fetching
    },
    showFeedbackButton () {
      return this.$store.state.calendar.showFeedbackButton
    }
  },
  methods: {
    taskSuccessHandler () {
      this.$store.dispatch('calendar/fetchSchedule', this.$route.params.id)
    },

    async collectPreferencesHandler () {
      try {
        this.collectPreferencesLoader = true
        const { data: { task_id: taskId } } = await this.$http.post(`/schedule/${this.schedule.id}/collect_preferences/`)
        this.$refs.progress.observe(taskId)
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.collectPreferencesLoader = false
      }
    },
    async requestScheduleHandler () {
      try {
        this.requestScheduleLoader = true
        await this.$http.post(`/schedule/${this.schedule.id}/request_schedule/`)
        await this.$store.dispatch('calendar/fetchSchedule', this.$route.params.id)
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.requestScheduleLoader = false
      }
    },
    async publishHandler () {
      try {
        this.publishLoader = true
        const { data: { task_id: taskId } } = await this.$http.post(`/schedule/${this.schedule.id}/publish/`)
        this.$refs.progress.observe(taskId)
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.publishLoader = false
      }
    },
    async displayFeedbackButton () {
      if (this.schedule.status === SCHEDULE_STATUS_CHOICES.value('PUBLISHED')) {
        await this.$store.dispatch('calendar/feedbackGiven', this.$route.params.id)
      }
    }
  },

  async created () {
    await this.$store.dispatch('calendar/fetchSchedule', this.$route.params.id)
    await this.displayFeedbackButton()
  }
}
</script>
<style lang="scss">
.view__schedule{
  .v-breadcrumbs{
    margin: 2px 0 5px;
    h4.text-capitalize{
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 29px;
    }
  }
  .schedule__list{
    display: flex;
    .v__item__title{
      font-weight: bold;
      font-size: 13px;
      line-height: 15px;
      height: 42px;
      display: inline-flex;
      align-items: center;
      width: 201px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .sched-comments-link{
    display: flex;
    align-items: center;
    font-weight: 700
  }
}
</style>
