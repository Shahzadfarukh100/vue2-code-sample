<template>
  <div class="py-10 px-8 vh">
    <secondary-router></secondary-router>
    <v-container class="pa-0 elevation-01" fluid grid-list-md>
      <app-card>
        <v-data-table
          v-resize="onResize"
          :headers="tableHeaders"
          :height="tableHeight"
          :items="objects"
          :loading="loading"
          fixed-header
          hide-default-footer
          class="pa-2 pt-0"
          :items-per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortingOrder"
          :server-items-length="objects.length"
          must-sort
        >
          <template v-slot:top>
            <page-title-bar :page-title="$t('message.VIEW_SCHEDULES')"></page-title-bar>
            <active-department
              route="SCHEDULE_LIST:SWITCH_DEPARTMENT"
              :value="user.active_department.name || ''"
              v-if="user.active_department && user.active_department.id"
              v-permission="'can_retrieve_company'"
            ></active-department>
            <schedule-list-filter />
          </template>
          <template v-slot:body="{ items }">
            <tbody v-bind:class="{ loading: loading }">
            <tr :key="index" v-for="(item, index) in items">
              <td>{{ statusChoices.display(item.status) }}</td>
              <td>{{ $moment.tolocaldate(item.start) }}</td>
              <td>{{ $moment.tolocaldate(item.end) }}</td>
              <td>{{ $utils.textTruncate(item.department.name, 25) }}</td>
              <td class="actions">
                <v-tooltip close-delay="0" open-delay="0" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :to="{ name: 'SCHEDULE_DETAIL', params: { id: item.id } }"
                      icon
                      v-on="on"
                    >
                    <v-icon color="primary">{{ $icons.mdiEye }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{$t('message.VIEW')}}</span>
                </v-tooltip>
                <dropdown-actions v-if="!user.is_employee">
                    <template v-slot:file-manager>
                      <template v-if="item.status === statusChoices.value('PUBLISHED')">
                        <v-list-item
                          v-permission="'can_view_timesheet'"
                          :to="{ name: 'TIMESHEET', params: { id: item.id } }">
                          <img class="mr-3 icon-confi" src="/static/img/icons/time-sheet.png" alt="">
                          <span class="primary--text">{{$t('message.TIMESHEET')}}</span>
                        </v-list-item>
                        <v-list-item
                          v-permission="'can_view_schedule_feedback'"
                          :to="{ name: 'SCHEDULE_LIST:SCHEDULE_FEEDBACK', params: { scheduleId: item.id } }">
                          <img class="mr-3 icon-confi" src="/static/img/icons/feedback.png" alt="">
                          <span class="primary--text">{{$t('message.FEEDBACK')}}</span>
                        </v-list-item>
                        <v-list-item
                          v-permission="'can_view_timesheet'"
                          :to="{ name: 'VIEW_OVERTIME', params: { id: item.id } }">
                          <img class="mr-3 icon-confi" src="/static/img/icons/overtime.png" alt="">
                          <span class="primary--text">{{$t('message.VIEW_OVERTIME')}}</span>
                        </v-list-item>
                      </template>
                      <template v-if="item.status === statusChoices.value('COLLECTING_PREFERENCE')">
                        <v-list-item
                          v-permission="'can_stop_collecting_preferences'"
                          :to="{ name: 'SCHEDULE_LIST:STOP_COLLECTING_PREFERENCES', params: { id: item.id } }">
                          <v-icon class="mr-3" color="primary">{{$icons.mdiPriorityHigh}}</v-icon>
                          <span class="primary--text">{{$t('message.STOP_COLLECTING_PREFERENCES')}}</span>
                        </v-list-item>
                      </template>
                      <template>
                        <v-list-item
                          v-permission="'can_list_schedule_history'"
                          :to="{ name: 'SCHEDULE_LIST:SCHEDULE_HISTORY', params: { scheduleId: item.id } }">
                          <v-icon class="mr-3" color="primary">{{$icons.mdiHistory}}</v-icon>
                          <span class="primary--text">{{$t('message.HISTORY')}}</span>
                        </v-list-item>
                      </template>
                      <template v-if="item.status !== statusChoices.value('PUBLISHED')">
                        <v-list-item
                          v-permission="'can_delete_schedule'"
                          :to="{ name: 'SCHEDULE_LIST:SCHEDULE_DELETE', params: { id: item.id } }">
                          <v-icon class="mr-3" color="error">{{$icons.mdiDelete}}</v-icon>
                          <span class="primary--text">{{$t('message.DELETE')}}</span>
                        </v-list-item>
                      </template>
                    </template>
                </dropdown-actions>
              </td>
            </tr>
            </tbody>
          </template>
        </v-data-table>
        <div class="d-flex justify-space-between align-center px-2 pt-4 pb-8" v-bind:class="{ loading: loading }">
          <div class="pagination-text">{{$t('message.SHOWING_{count}_OUT_OF_{total}', {count:count, total:total})}}</div>
          <v-pagination
            :class="user.language"
            :length="paginationLength"
            v-model="page"
            :total-visible="16"
          ></v-pagination>
        </div>
      </app-card>
    </v-container>
  </div>
</template>
<script>
import { Resize } from 'vuetify/es5/directives'
import SecondaryRouter from 'Components/SecondaryRouter/SecondaryRouterV1.vue'
import ScheduleListFilter from 'Components/schedule/ScheduleListFilter'
import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'

export default {
  directives: { Resize },
  components: { SecondaryRouter, ScheduleListFilter },
  mixins: [ServerValidationMixin, tableOptionMixin],

  data () {
    return {
      dialog: false,
      page: 1,
      selectedForDeletion: '',
      deleting: false,

      headers: [
        { text: 'message.STATUS', value: 'status', sortable: true },
        { text: 'message.START_DATE', value: 'start', sortable: true },
        { text: 'message.END_DATE', value: 'end', sortable: true },
        { text: 'message.DEPARTMENT', value: 'department', sortable: true },
        { text: 'message.ACTIONS', sortable: false }
      ],
      sortBy: 'start'
    }
  },
  computed: {

    user () {
      return this.$store.state.userData
    },

    statusChoices () {
      return SCHEDULE_STATUS_CHOICES
    },

    objects () {
      return this.$store.state.schedule.schedules
    },

    total () {
      return this.$store.state.schedule.count
    },

    count () {
      return this.objects.length
    },

    paginationLength () {
      return this.$utils.getPaginationLength(this.$store.state.schedule.count)
    },

    loading () {
      return this.$store.state.schedule.fetching
    }

  },

  async created () {
    await this.$store.dispatch('schedule/resetParams')
  },

  methods: {
    async updateData () {
      const params = {
        page: this.page,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      }

      try {
        await this.$store.dispatch('schedule/setParams', params)
        await this.$store.dispatch(`schedule/listSchedules`)
      } catch (err) {
        this.serverValidation(err)
      }
    }

  }
}
</script>
<style scoped>
  .actions >>> .v-btn {
    margin-left: 0;
    margin-right: 0;
  }
    .icon-confi{
    width: 20px;
    height: 100%;
  }
</style>
