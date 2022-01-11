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
          <page-title-bar :page-title="$t('message.GENERAL_ABSENCE')"></page-title-bar>
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
                clearable
                outlined
                solo
                dense
                :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
                class="ml-3 elevation-01-auto elevation-01-auto_filter"
                :items="statusChoices"
                item-text="text"
                item-value="value"
                v-model="status"
                :label="$t('message.STATUS')"
                name="department"
                :append-icon="$icons.mdiChevronDown"
                v-if="!user.is_employee"
              >
              </v-autocomplete>
            </div>
            <div>
                <v-btn
                  v-permission="'can_create_general_absence'"
                  @click="$router.push({ name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_CREATE' })"
                  depressed
                  color="primary"
                  class="mr-2 font-weight-regular text-capitalize"
                >
                <v-icon class="mr-1">{{ $icons.mdiPlus }}</v-icon>
                {{$t('message.ADD_NEW_GENERAL_ABSENCE')}}
                </v-btn>
                <dropdown-actions>
                    <template v-slot:file-manager>
                      <v-list-item
                        v-permission="'can_list_archived_general_absence'"
                        :to="{ name: 'GENERAL_ABSENCE_ARCHIVED' }">
                        <v-icon class="mr-3" color="primary">{{$icons.mdiLabel}}</v-icon>
                        <span class="primary--text">{{$t('message.ARCHIVED')}}</span>
                      </v-list-item>
                      <files-download-handler
                        v-permission="'can_export_general_absence_list_view'"
                        target-url="general_absence/export"
                        file-name="general_absence">
                      </files-download-handler>
                    </template>
                </dropdown-actions>
            </div>
          </div>
        </template>
        <template v-slot:body="{ items }">
          <tbody v-bind:class="{ loading: loading }">
            <tr :key="index" v-for="(item, index) in items">
              <td>{{ $utils.textTruncate(item.subject, 25) }}</td>
              <td>{{ $moment.tolocaldate(item.start) }}</td>
              <td>{{ $moment.tolocaldate(item.end) }}</td>
              <td>{{ $t($utils.getAbsenceStatusI18n(item.status))}}</td>
              <td class="actions">
                <v-tooltip close-delay="0" open-delay="0" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="$router.push({ name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_VIEW', params: { generalAbsenceId: item.id } })"
                      icon
                      v-on="on"
                      class="view"
                      v-permission="'can_retrieve_general_absence'"
                    >
                      <v-icon color="primary"> {{$icons.mdiEye }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{$t('message.VIEW')}}</span>
                </v-tooltip>
                <dropdown-actions v-if="!user.is_employee">
                  <template v-slot:file-manager>
                    <v-list-item
                      v-if="item.can_update"
                      v-permission="'can_update_general_absence'"
                      :to="{ name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_UPDATE', params: { generalAbsenceId: item.id } }">
                      <v-icon class="mr-3" color="primary">{{$icons.mdiPencil}}</v-icon>
                      <span class="primary--text">{{$t('message.EDIT')}}</span>
                    </v-list-item>
                    <v-list-item
                      v-if="item.can_delete"
                      v-permission="'can_delete_general_absence'"
                      :to="{ name: 'GENERAL_ABSENCE_LIST:ABSENCE_DELETE', params: { generalAbsenceId: item.id } }">
                      <v-icon class="mr-3" color="error">{{$icons.mdiDeleteOutline}}</v-icon>
                      <span class="error--text">{{$t('message.DELETE')}}</span>
                    </v-list-item>
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
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'

export default {
  directives: { Resize },
  components: {
    SecondaryRouter
  },
  mixins: [ServerValidationMixin, tableOptionMixin],

  data () {
    return {
      status: '',
      page: 1,
      headers: [
        { text: 'message.TITLE', value: 'title', sortable: true },
        { text: 'message.START', value: 'start', sortable: true },
        { text: 'message.END', value: 'end', sortable: true },
        { text: 'message.STATUS', sortable: false },
        { text: 'message.ACTIONS', sortable: false }
      ],
      statusChoices: [
        { text: this.$t('message.PENDING'), value: 1 },
        { text: this.$t('message.APPROVED'), value: 2 }
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
      return this.$store.state.absence.fetching || this.queryLoading
    }

  },

  watch: {
    status: {
      handler (value) {
        this.updateData()
      }
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
      if (this.status !== '') params = { ...params, status: this.status }
      try {
        await this.$store.dispatch('absence/getGeneralAbsences', params)
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
  .display-inline{
    display: inline-block;
  }
</style>
