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
          <page-title-bar :page-title="$t('message.ABSENCE_TYPE')"></page-title-bar>
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
              <v-btn
                v-permission="'can_create_absence_type'"
                @click="$router.push({ name: 'ABSENCE_TYPE:ABSENCE_TYPE_CREATE' })"
                depressed
                color="primary"
                class="mr-2 font-weight-regular text-capitalize"
              >
              <v-icon class="mr-1">{{ $icons.mdiPlus }}</v-icon>
              {{$t('message.ADD_NEW_ABSENCE_TYPE')}}
              </v-btn>
              <dropdown-actions v-if="!user.is_employee">
                <template v-slot:file-manager>
                  <div v-permission="'can_list_archived_absence_type'">
                    <v-list-item
                      :to="{ name: 'ABSENCE_TYPE_ARCHIVED' }">
                      <v-icon class="mr-3" color="primary">{{$icons.mdiLabel}}</v-icon>
                      <span class="primary--text">{{$t('message.ARCHIVED')}}</span>
                    </v-list-item>
                  </div>
                  <files-download-handler
                    v-permission="'can_export_absence_type_list_view'"
                    target-url="absence_type/export"
                    file-name="absence_type">
                  </files-download-handler>
                </template>
              </dropdown-actions>
            </div>
          </div>
        </template>
        <template v-slot:body="{ items }">
          <tbody v-bind:class="{ loading: loading }">
            <tr :key="index" v-for="(item, index) in items">
              <td>{{ item.name }}</td>
              <td>{{ item.entitlement }}</td>
              <td>{{ $t($utils.getAbsencePeriodI18n(item.period)) }}</td>
              <td>{{ item.submit_before_days }}</td>
              <td>{{ $utils.getDuration(item.duration) }}</td>
              <td class="actions">
                <span v-permission="'can_update_absence_type'">
                  <v-tooltip close-delay="0" open-delay="0" top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        @click="$router.push({ name: 'ABSENCE_TYPE:ABSENCE_TYPE_UPDATE', params: { absenceTypeId: item.id } })"
                        color="primary"
                        v-on="on"
                        class="update"
                      >
                        {{ $icons.mdiPencil }}
                      </v-icon>
                    </template>
                    <span>{{$t('message.EDIT')}}</span>
                  </v-tooltip>
                </span>

                <span v-permission="'can_delete_absence_type'">
                  <v-tooltip close-delay="0" open-delay="0" top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="$router.push({ name: 'ABSENCE_TYPE:ABSENCE_TYPE_DELETE', params: { absenceTypeId: item.id } })"
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
import { ServerValidationMixin, tableOptionMixin } from '@/mixins'

export default {
  directives: { Resize },
  components: {
    SecondaryRouter
  },
  mixins: [ServerValidationMixin, tableOptionMixin],

  data () {
    return {
      page: 1,
      durationChoices: [
        { value: 1, text: this.$t('message.FULL_DAY') },
        { value: 2, text: this.$t('message.HOURLY') },
        { value: 3, text: this.$t('message.QUITTING') }
      ],
      duration: '',
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
      return this.queryLoading || this.$store.state.absence.fetching
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
        await this.$store.dispatch('absence/getAbsenceTypes', params)
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
