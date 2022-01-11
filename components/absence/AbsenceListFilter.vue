<template>
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
        v-model="absenceDuration"
        :append-icon="$icons.mdiChevronDown"
      >
      </v-autocomplete>
      <v-search
        :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter' }"
        class="ml-3 elevation-01-auto elevation-01-auto_filter"
        outlined
        solo
        dense
        clearable
        url="/choices/employee/absence_submit_for/"
        :label="$t('message.ABSENCE_FOR_EMPLOYEE')"
        item-text="full_name"
        item-value="id"
        v-model="submitted_for"
        :maxLength="14"
        :append-icon="$icons.mdiChevronDown"
        v-if="!user.is_employee"
      >
        <template v-slot:item="{ item }">
          <v-list-item-avatar class="avatar_img" size="27">
            <img :src="item | avatar" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title__name">{{ item.full_name }}</v-list-item-title>
            <v-list-item-title class="sub__title">{{ roleChoices.display(item.role) }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-search>
    </div>
    <div>
        <v-btn
          v-permission="'can_create_absence'"
          @click="$router.push({ name: 'ABSENCE_LIST:ABSENCE_CREATE' })"
          depressed
          color="primary"
          class="mr-2 font-weight-regular text-capitalize"
        >
        <v-icon class="mr-1">{{ $icons.mdiPlus }}</v-icon>
        {{$t('message.ADD_NEW_ABSENCE')}}
        </v-btn>
        <dropdown-actions>
            <template v-slot:file-manager>
                <v-list-item
                  v-if="user.role !== 'employee'"
                  v-permission="'can_create_absence'"
                  :to="{ name: 'ABSENCE_LIST:ABSENCE_CREATE_FOR_OTHER'}">
                  <v-icon class="mr-3" color="primary">{{$icons.mdiLabel}}</v-icon>
                  <span class="primary--text">{{$t('message.ABSENCE_ON_BEHALF_OF_OTHERS')}}</span>
                </v-list-item>
                <files-download-handler
                v-permission="'can_export_absence_list_view'"
                target-url="absence/export"
                file-name="absence">
                </files-download-handler>
            </template>
        </dropdown-actions>
    </div>
  </div>
</template>
<script>
import { CONSENT_ACK_CHOICES, ABSENCE_DURATION_CHOICES, ROLE_CHOICES } from 'Constants/choices'
export default {
  computed: {
    user () {
      return this.$store.state.userData
    },
    statusChoices () {
      return CONSENT_ACK_CHOICES.asChoices()
    },
    roleChoices () {
      return ROLE_CHOICES
    },
    durationChoices () {
      return ABSENCE_DURATION_CHOICES.asChoices()
    },
    loading () {
      return this.$store.state.absence.fetching
    },
    query: {
      get () {
        return this.$store.state.absence.params.query
      },
      async set (value) {
        await this.$store.dispatch('absence/setParams', { query: value, page: 1 })
      }
    },
    absenceDuration: {
      get () {
        return this.$store.state.absence.params.absence_duration
      },
      async set (value) {
        await this.$store.dispatch('absence/setParams', { absence_duration: value, page: 1 })
        await this.$store.dispatch('absence/getAbsences')
      }
    },
    status: {
      get () {
        return this.$store.state.absence.params.status
      },
      async set (value) {
        await this.$store.dispatch('absence/setParams', { status: value, page: 1 })
        await this.$store.dispatch('absence/getAbsences')
      }
    },
    submitted_for: {
      get () {
        return this.$store.state.absence.params.submitted_for
      },
      async set (value) {
        await this.$store.dispatch('absence/setParams', { submitted_for: value, page: 1 })
        await this.$store.dispatch('absence/getAbsences')
      }
    }
  }
}
</script>
<style lang="scss">
.elevation-input_error_none{
  .v-input--dense > .v-input__control > .v-input__slot{
    margin-bottom: 0;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details{
    display: none;
  }
}
</style>
