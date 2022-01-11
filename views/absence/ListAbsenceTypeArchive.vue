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
          <page-title-bar :page-title="$t('message.ARCHIVED')"></page-title-bar>
          <div class="elevation-input_error_none d-flex justify-space-between py-8">
            <div class="d-flex" v-bind:class="{ loading: loading }">
              <v-text-field
                hide-details
                id="search"
                :label="$t('message.SEARCH')"
                v-model="query"
                :append-icon="$icons.mdiClipboardTextSearchOutline"
              ></v-text-field>
              <v-autocomplete
                :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
                class="ml-3 elevation-01-auto elevation-01-auto_filter"
                outlined
                solo
                dense
                :items="durationChoices"
                :label="$t('message.ABSENCE_DURATION')"
                clearable
                item-text="text"
                item-value="value"
                v-model="duration"
                :append-icon="$icons.mdiChevronDown"
              >
              </v-autocomplete>
            </div>
            <div>
              <dropdown-actions v-permission="'can_export_archived_absence_type_list_view'">
                  <template v-slot:file-manager>
                      <files-download-handler
                      target-url="absence_type/export_archived"
                      file-name="archived_absence_type">
                      </files-download-handler>
                  </template>
              </dropdown-actions>
            </div>
          </div>
        </template>
        <template v-slot:body="{ items }">
          <tbody>
            <tr :key="index" v-for="(item, index) in items">
              <td>{{ item.name }}</td>
              <td>{{ item.entitlement }}</td>
              <td>{{ $t($utils.getAbsencePeriodI18n(item.period)) }}</td>
              <td>{{ item.submit_before_days }}</td>
              <td>{{ $utils.getDuration(item.duration) }}</td>
              <td class="actions">

                <span v-permission="'can_restore_absence_type'">
                  <v-tooltip close-delay="0" open-delay="0" top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="$router.push({ name: 'ABSENCE_TYPE_ARCHIVED:ABSENCE_TYPE_RESTORE', params: { absenceTypeId: item.id } })"
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
import SecondaryRouter from 'Components/SecondaryRouter/SecondaryRouterV1.vue'
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'
export default {
  directives: { Resize },
  components: {
    SecondaryRouter
  },
  mixins: [ServerValidationMixin, tableOptionMixin],
  data () {
    return {
      duration: '',
      page: 1,
      durationChoices: [
        { value: 1, text: this.$t('message.FULL_DAY') },
        { value: 2, text: this.$t('message.HOURLY') },
        { value: 3, text: this.$t('message.QUITTING') }
      ],
      headers: [
        { text: 'message.NAME', value: 'name', sortable: true },
        { text: 'message.ENTITLEMENT', sortable: false },
        { text: 'message.ABSENCE_PERIOD', sortable: false },
        { text: 'message.SUBMIT_BEFORE_DAYS', sortable: false },
        { text: 'message.ABSENCE_DURATION', sortable: false },
        { text: 'message.ACTIONS', sortable: false }
      ],
      sortBy: 'name',
      sortDesc: false
    }
  },

  watch: {
    duration: {
      handler () {
        this.page = 1
        this.updateData()
      }
    }
  },

  computed: {
    user () {
      return this.$store.state.userData
    },
    objects () {
      return this.$store.state.absence.absence_types
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

    async updateData (query) {
      let params = {
        page: this.page,
        query: this.query,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      }
      if (this.duration !== '') params = { ...params, duration: this.duration }

      try {
        await this.$store.dispatch('absence/getAbsenceTypesArchive', params)
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
