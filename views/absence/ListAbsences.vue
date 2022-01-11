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
        hide-default-footer
        :loading="loading"
        fixed-header
        class="pa-2 pt-0"
        :items-per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortingOrder"
        :server-items-length="objects.length"
        must-sort
      >
        <template v-slot:top>
          <page-title-bar :page-title="$t('message.ABSENCE')"></page-title-bar>
          <absence-list-filter />
        </template>
        <template v-slot:body="{ items }">
          <tbody v-bind:class="{ loading: loading }">
            <tr :key="index" v-for="(item, index) in items">
              <td>{{$utils.textTruncate(item.submitted_by.full_name, 20)}}</td>
              <td>{{$utils.textTruncate(item.submitted_for.full_name, 20)}}</td>
              <td>{{item.submitted_to ? item.submitted_to.full_name: '' }}</td>
              <td>{{ $utils.textTruncate(item.subject, 20) }}</td>
              <td>{{ getAbsenceDate(item.absence_type.hourly, item.start) }}</td>
              <td>{{ getAbsenceDate(item.absence_type.hourly, item.end) }}</td>
              <td>{{ item.duration }}</td>
              <td>{{ $t($utils.getAbsenceStatusI18n(item.status))}}</td>
              <td class="actions">

                <v-tooltip close-delay="0" open-delay="0" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="$router.push({ name: 'ABSENCE_LIST:ABSENCE_VIEW', params: { objectId: item.id } })"
                      color="primary"
                      class="view"
                      icon v-on="on"
                    >
                      <v-icon color="primary">{{ $icons.mdiEye }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{$t('message.VIEW')}}</span>
                </v-tooltip>

                <span v-permission="'can_delete_absence'">
                  <v-tooltip close-delay="0" open-delay="0" top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="$router.push({ name: 'ABSENCE_LIST:ABSENCE_DELETE', params: { objectId: item.id } })"
                        color="primary"
                        class="delete"
                        icon v-on="on"
                      >
                        <v-icon color="error">{{ $icons.mdiDeleteOutline }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{$t('message.DELETE')}}</span>
                  </v-tooltip>
                </span>
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
import AbsenceListFilter from 'Components/absence/AbsenceListFilter'
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'

export default {
  directives: { Resize },
  components: {
    SecondaryRouter,
    AbsenceListFilter
  },
  mixins: [ServerValidationMixin, tableOptionMixin],

  data () {
    return {
      page: 1,
      sortBy: 'start'
    }
  },

  watch: {
    searchQuery: {
      handler () {
        this.queryHandler()
      }
    }
  },

  async created () {
    await this.$store.dispatch('absence/resetParams')
  },

  computed: {
    user () {
      return this.$store.state.userData
    },
    headers () {
      let head = [
        { text: 'message.SUBMIT_BY', value: 'submitted_by', sortable: true },
        { text: 'message.SUBMIT_FOR', value: 'submitted_for', sortable: true },
        { text: 'message.SUBMIT_TO', value: 'submitted_to', sortable: true },
        { text: 'message.TITLE', value: 'title', sortable: true },
        { text: 'message.START', value: 'start', sortable: true },
        { text: 'message.END', value: 'end', sortable: true },
        { text: 'message.DURATION', sortable: false },
        { text: 'message.STATUS', sortable: false },
        { text: 'message.ACTIONS', sortable: false }
      ]

      return head
    },
    objects () {
      return this.$store.state.absence.absences
    },
    paginationLength () {
      return this.$utils.getPaginationLength(this.$store.state.absence.count)
    },
    total () {
      return this.$store.state.absence.count
    },

    count () {
      return this.objects.length
    },
    loading () {
      return this.$store.state.absence.fetching
    },
    searchQuery () {
      return this.$store.state.absence.params.query
    }

  },
  methods: {
    getAbsenceDate (absenceTypeHourly, value) {
      if (absenceTypeHourly) {
        return this.$moment.tolocaltime(value)
      } else {
        return this.$moment.tolocaldate(value)
      }
    },

    async updateData () {
      const params = {
        page: this.page,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      }

      try {
        await this.$store.dispatch('absence/setParams', params)
        await this.$store.dispatch(`absence/getAbsences`)
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
  .display-inline{
    display: inline-block;
  }
</style>
