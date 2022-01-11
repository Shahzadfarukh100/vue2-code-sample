<template>
  <view-wrapper class="wrapper-container">
    <app-card class="border-wrap pa-5 my-2 vh-container">
      <v-alert
        :value="true"
        outlined
        type="error"
        :key="index" v-for="(item, index) in nonFieldError"
      >
        {{ item }}
      </v-alert>
      <div class="d-flex justify-space-between align-center mb-6 pb-2">
        <h1 class="primary--text text-capitalize mb-0 font-2x fw-bold">{{$t('message.CREATE_SHIFT')}}</h1>
        <v-btn icon v-if="isNotUpdated" @click="goBack()">
          <v-icon color="primary">{{ $icons.mdiClose }}</v-icon>
        </v-btn>
        <v-dialog
          v-else
          max-width="362"
          content-class="elevation-dialog create-shift-discard"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
            >
            <v-icon color="primary">{{ $icons.mdiClose }}</v-icon>
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
                    {{ $t('message.ARE_YOU_SURE_YOU_WANT_TO_CANCEL?') }}
                  </div>
                  </div>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  width="50%"
                  outlined
                  color="primary"
                  @click="dialogGoBack(dialog)"
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
      <validation-observer ref="observer">
        <v-form class="input__field_30">
          <v-row no-gutters-y>
            <v-col cols="12" sm="6">
              <div id="departmentMenu" style="position: relative">
                <validation-provider name="shift_type" rules="required" v-slot="{ errors }" mode="eager">
                  <v-autocomplete
                    outlined
                    dense
                    attach="#departmentMenu"
                    v-model="formData.shift_type"
                    :label="$t('message.SHIFT_TYPE')"
                    :error-messages="errors"
                    :append-icon="$icons.mdiChevronDown"
                    :menu-props="{ contentClass: 'elevation-01__autocomplete' }"
                    class="elevation-01-auto"
                    :items="shiftTypeChoices"
                    name="shift_type"
                  >
                  </v-autocomplete>
                </validation-provider>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="required"
                :label="$t('message.EMPLOYEES_NEEDED')"
                height="20"
                name="employees_needed"
                v-model="formData.employees_needed"
                :rules="{required: true, numeric: true, min_value: 1, max_value:10000}"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <appDateTimeInputV1
                v-model="formData.start"
                name="start"
                :dateLabel="$t('message.START_DATE')"
                :timeLabel="$t('message.START_TIME')"
                :dateRules="{ required: true }"
                :timeRules="{ required: true }"
              ></appDateTimeInputV1>
            </v-col>
            <v-col cols="12" sm="12">
              <appDateTimeInputV1
                v-model="formData.end"
                name="end"
                :dateLabel="$t('message.END_DATE')"
                :timeLabel="$t('message.END_TIME')"
                :dateRules="{ required: true }"
                :timeRules="{ required: true }"
              ></appDateTimeInputV1>
            </v-col>
            <v-col cols="12" sm="6">
              <numeric-to-duration-field
                class="required"
                :label="$t('message.BREAK_MINUTES')"
                height="20"
                name="minutes_of_break"
                v-model="formData.minutes_of_break"
                :rules="{required:true, numeric:true, min_value:0, max_value:maxBreakTime}"
              ></numeric-to-duration-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-switch
                :label="$t('message.PAID_BREAKS')"
                class="mt-0 paid-breaks"
                color="primary"
                height="20"
                v-model="formData.paid_break"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
      <div class="app-secondary-footer">
        <v-btn
          :loading="creating"
          @click="createHandler"
          :min-width="130"
          :height="38"
          class="mx-0 text-capitalize text-subtitle-2"
          color="primary"
          depressed
        >{{$t('message.CREATE')}}
        </v-btn>
      </div>
    </app-card>
  </view-wrapper>
</template>
<script>
import NumericToDurationField from 'Components/Widgets/datetime/NumericToDurationField'
import { ServerValidationMixin, FormEnterListner } from '@/mixins'
import isEqual from 'lodash/isEqual'

function initialData () {
  return {
    shift_type: '',
    employees_needed: 1,
    start: '',
    end: '',
    minutes_of_break: 0,
    paid_break: true
  }
}

export default {
  components: {
    NumericToDurationField
  },
  mixins: [ServerValidationMixin, FormEnterListner],

  data () {
    return {
      creating: false,
      formData: initialData(),
      data: initialData(),
      shiftTypeChoices: []
    }
  },

  computed: {

    schedule () {
      return this.$store.state.calendar.schedule
    },

    shiftTypeChoicesUrl () {
      return `/choices/shift_type/?department=${this.schedule.department.id}`
    },
    maxBreakTime () {
      return this.$moment(this.formData.end).diff(this.$moment(this.formData.start), 'minutes')
    },
    isNotUpdated () {
      return isEqual(this.data, this.formData)
    }

  },

  created () {
    this.getShiftTypeChoices()
  },

  methods: {
    async getShiftTypeChoices () {
      const { data } = await this.$http.get(this.shiftTypeChoicesUrl)
      this.shiftTypeChoices = data.results
    },

    submitHandler () {
      this.createHandler()
    },
    dialogGoBack (dialog) {
      dialog.value = false
      this.goBack()
    },
    goBack () {
      this.$router.back()
    },

    async createHandler () {
      const valid = await this.$refs['observer'].validate()

      if (valid) {
        const formData = { schedule: this.$route.params.id, ...this.formData }
        try {
          this.creating = true
          const { data } = await this.$http.post('/shift/', formData)
          this.$utils.sucessNotify('message.SHIFT_HAS_BEEN_SUCCESSFULLY_CREATED')
          await this.$store.dispatch('calendar/fetchEvents')
          this.$router.push({ name: 'SCHEDULE_DETAIL:SHIFT_DETAIL_VIEW', params: { shiftId: data.id } })
        } catch (err) {
          this.serverValidation(err, this.$refs['observer'])
        } finally {
          this.creating = false
        }
      } else {
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
      }
    }
  }

}
</script>
<style lang="scss">
.app-secondary-footer{
  max-width: 534px;
}
#shift_type{
padding:0;
}
.paid-breaks{
  .v-input--selection-controls{
    margin-top: 0;
  }
}
.create-shift-discard{
  .v-card{
    position: absolute;
    max-width: 350px;
    right: 85px;
    top: 35%;
  }
}

</style>
