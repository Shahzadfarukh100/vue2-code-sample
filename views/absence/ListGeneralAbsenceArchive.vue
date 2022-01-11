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
            <page-title-bar :page-title="$t('message.GENERAL_ABSENCE_ARCHIVE_LIST')"></page-title-bar>
            <div class="elevation-input_error_none d-flex justify-space-between py-8">
              <div class="d-flex" v-bind:class="{ loading: loading }">
                <v-text-field
                  hide-details
                  id="search"
                  :label="$t('message.SEARCH')"
                  v-model="query"
                  :append-icon="$icons.mdiClipboardTextSearchOutline"
                ></v-text-field>
              </div>
              <div>
                <dropdown-actions v-permission="'can_export_archived_general_absence_list_view'">
                    <template v-slot:file-manager>
                        <files-download-handler
                        target-url="general_absence/export_archived"
                        file-name="archived_general_absence">
                        </files-download-handler>
                    </template>
                </dropdown-actions>
              </div>
            </div>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr :key="index" v-for="(item, index) in items">
                <td>{{ item.subject }}</td>
                <td>{{ $moment.tolocaldate(item.start) }}</td>
                <td>{{ $moment.tolocaldate(item.end) }}</td>
                <td>{{ $t($utils.getAbsenceStatusI18n(item.status))}}</td>
                <td class="actions">

                  <span v-permission="'can_restore_archived_general_absence'" v-if="item.can_restore">
                    <v-tooltip close-delay="0" open-delay="0" top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="$router.push({ name: 'GENERAL_ABSENCE_ARCHIVED:ABSENCE_RESTORE', params: { generalAbsenceId: item.id } })"
                          color="primary"
                          class="restore"
                          icon v-on="on"
                        >
                          <v-icon color="primary">{{ $icons.mdiDeleteRestore }}</v-icon>
                        </v-btn>
                      </template>
                      <span>{{$t('message.RESTORE')}}</span>
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
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'
import SecondaryRouter from 'Components/SecondaryRouter/SecondaryRouterV1.vue'
export default {
  directives: { Resize },
  components: { SecondaryRouter },
  mixins: [ServerValidationMixin, tableOptionMixin],
  data () {
    return {
      page: 1,
      headers: [
        { text: 'message.TITLE', value: 'title', sortable: true },
        { text: 'message.START', value: 'start', sortable: true },
        { text: 'message.END', value: 'end', sortable: true },
        { text: 'message.STATUS', sortable: false },
        { text: 'message.ACTIONS', sortable: false }
      ],
      sortBy: 'start'
    }
  },

  computed: {
    user () {
      return this.$store.state.userData
    },
    objects () {
      return this.$store.state.absence.general_absences
    },
    total () {
      return this.$store.state.absence.count
    },

    count () {
      return this.objects.length
    },
    paginationLength () {
      return this.$utils.getPaginationLength(this.$store.state.absence.count)
    },
    loading () {
      return this.$store.state.absence.fetching
    }
  },

  methods: {
    async updateData () {
      let params = {
        page: this.page,
        query: this.query,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      }

      try {
        await this.$store.dispatch('absence/getGeneralAbsencesArchive', params)
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.queryLoading = false
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
</style>
