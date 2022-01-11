<template>
  <div class="elevation-input_error_none d-flex justify-space-between py-8">
    <div class="d-flex" v-bind:class="{ loading: loading }">
      <v-autocomplete
        :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
        class="ml-3 elevation-01-auto elevation-01-auto_filter"
        outlined
        solo
        dense
        :items="statusChoices"
        :label="$t('message.STATUS')"
        clearable
        item-text="text"
        item-value="value"
        v-model="status"
        :append-icon="$icons.mdiChevronDown"
      >
      </v-autocomplete>
      <v-autocomplete
        clearable
        outlined
        solo
        dense
        :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
        class="ml-3 elevation-01-auto elevation-01-auto_filter"
        :items="departmentChoices"
        v-model="departments"
        :label="$t('message.DEPARTMENT')"
        name="department"
        :append-icon="$icons.mdiChevronDown"
      >
      </v-autocomplete>
    </div>
    <div>
        <v-btn
          v-permission="'can_create_schedule'"
          @click="$router.push({ name: 'SCHEDULE_CREATE' })"
          depressed
          color="primary"
          class="mr-2 font-weight-regular text-capitalize"
        >
        <v-icon class="mr-1">{{ $icons.mdiPlus }}</v-icon>
        {{$t('message.NEW_SCHEDULE')}}
        </v-btn>
        <dropdown-actions v-permission="'can_export_schedule_list_view'">
            <template v-slot:file-manager>
                <files-download-handler
                target-url="schedule/export"
                file-name="schedule_list">
                </files-download-handler>
            </template>
        </dropdown-actions>
    </div>
  </div>
</template>
<script>
import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'
export default {

  data () {
    return {
      departmentChoices: []
    }
  },

  async created () {
    const { data } = await this.$http.get(`/choices/department/`)
    this.departmentChoices = data.results
  },

  computed: {
    statusChoices () {
      return SCHEDULE_STATUS_CHOICES.asChoices()
    },
    loading () {
      return this.$store.state.schedule.fetching
    },
    status: {
      get () {
        return this.$store.state.schedule.params.status
      },
      async set (value) {
        await this.$store.dispatch('schedule/setParams', { status: value, page: 1 })
        await this.$store.dispatch('schedule/listSchedules')
      }
    },
    departments: {
      get () {
        return this.$store.state.schedule.params.department
      },
      async set (value) {
        await this.$store.dispatch('schedule/setParams', { department: value, page: 1 })
        await this.$store.dispatch('schedule/listSchedules')
      }
    }
  }
}
</script>
<style lang="scss">

@import "./src/assets/scss/_app.variables.scss";
.elevation-input_error_none{
  .v-input--dense > .v-input__control > .v-input__slot{
    margin-bottom: 0;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details{
    display: none;
  }
}
</style>
