<template>
  <div class="pa-8">
    <secondary-router></secondary-router>
    <task-progress ref="progress" @success="taskSuccessHandler"></task-progress>
    <page-title-bar :page-title="$t('message.CREATE_SCHEDULE')"></page-title-bar>
    <v-alert
      :value="true"
      outlined
      type="error"
      v-show="nonFieldError"
    >
      {{ nonFieldError }}
    </v-alert>
    <v-container class="px-0" fluid grid-list-md>
      <app-card>
        <validation-observer ref="observer">
          <v-row>
            <v-col cols="12" md="6">
              <v-row no-gutters-y dense>
                <v-col cols="12" md="6">
                  <div id="departmentMenu" style="position: relative">
                    <validation-provider name="department" rules="required" v-slot="{ errors }">
                      <v-search
                        outlined
                        dense
                        attach="#departmentMenu"
                        class="required"
                        v-model="formData.department"
                        url="/choices/department/"
                        :label="$t('message.DEPARTMENT')"
                        name="department"
                        :error-messages="errors"
                        :append-icon="$icons.mdiPlus"
                        :menu-props="{ contentClass: 'department-choices'}"
                        @click:append="$router.push({ name: 'SCHEDULE_CREATE:DEPARTMENT_CREATE'})"
                      >
                        <template v-slot:prepend-item>
                          <v-list-item @click="$router.push({ name: 'SCHEDULE_CREATE:DEPARTMENT_CREATE'})">
                            <v-list-item-content>
                              <v-list-item-title>{{$t('message.CREATE_DEPARTMENT')}}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-search>
                    </validation-provider>
                  </div>
                </v-col>
                <v-col cols="12" md="6" v-if="this.formData.collect_preferences">
                  <validation-provider
                    name="preferences_deadline"
                    :rules="{ required: true, date_after: minDate }"
                    v-slot="{ errors }">
                    <app-datetime-input
                      outlined
                      dense
                      class="required"
                      :error-messages="errors"
                      :label="$t('message.DEADLINE_FOR_SUBMITTING_PREFERENCES')"
                      name="preferences_deadline"
                      v-model="formData.preferences_deadline"
                    ></app-datetime-input>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <validation-observer ref="oc" slim tag="v-row" class="row--dense no-gutters--y">
                    <validation-provider
                      name="start"
                      :rules="{ required: true, date_after: [minDate, 'day'] }"
                      v-slot="{ errors }"
                      ref="start"
                      slim
                    >
                      <v-col cols="12" md="6">
                        <app-date-input
                          outlined
                          dense
                          custom-classes="required"
                          :error-messages="errors"
                          :label="$t('message.START_DATE')"
                          name="start"
                          v-model="formData.start"
                        ></app-date-input>
                      </v-col>
                    </validation-provider>
                    <validation-provider
                      name="end"
                      :rules="{ required: true, date_after: [formData.start, 'day'], date_before: [maxDate, 'day'] }"
                      v-slot="{ errors }"
                      ref="end"
                      slim
                    >
                      <v-col cols="12" md="6">
                        <app-date-input
                          outlined
                          dense
                          custom-classes="required"
                          :error-messages="errors"
                          :label="$t('message.END_DATE')"
                          name="end"
                          v-model="formData.end"
                        ></app-date-input>
                      </v-col>
                    </validation-provider>
                  </validation-observer>
                </v-col>
                <v-col cols="12" md="6">
                  <v-switch
                    class="pl-3"
                    :label="$t('message.CREATE_THROUGH_MANUAL_INPUT')"
                    color="primary"
                    v-model="formData.manual_input"
                  >
                    <template slot="prepend">
                      <app-dialog>
                        <template v-slot:title>{{$t('message.CREATE_THROUGH_MANUAL_INPUT')}}</template>
                        <template v-slot:body>
                          <div v-html="$t('message.HTML__CREATE_THROUGH_MANUAL_INPUT_HELP')"></div>
                        </template>
                        <template v-slot:activator="{ handler }">
                          <v-btn @click="handler" class="mx-0 my-0" color="primary" icon small>
                            <v-icon small> {{ $icons.mdiHelpCircleOutline }}</v-icon>
                          </v-btn>
                        </template>
                      </app-dialog>
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="12" md="6">
                  <v-switch
                    :disabled="formData.manual_input"
                    :label="$t('message.COLLECT_PREFERENCES_IN_THIS_SCHEDULE')"
                    class="mt-0 pl-3"
                    color="primary"
                    v-model="formData.collect_preferences"
                  >
                    <template slot="prepend">
                      <app-dialog>
                        <template v-slot:title>{{$t('message.COLLECT_PREFERENCES_IN_THIS_SCHEDULE')}}</template>
                        <template v-slot:body>
                          <div v-html="$t('message.HTML__COLLECT_PREFERENCES_IN_THIS_SCHEDULE_HELP')"></div>
                        </template>
                        <template v-slot:activator="{ handler }">
                          <v-btn @click="handler" class="mx-0 my-0" color="primary" icon small>
                            <v-icon small> {{ $icons.mdiHelpCircleOutline }}</v-icon>
                          </v-btn>
                        </template>
                      </app-dialog>
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="12">
                  <validation-provider name="comment" :rules="{ max:500 }" v-slot="{ errors }">
                    <v-textarea
                      outlined
                      dense
                      :error-messages="errors"
                      :label="$t('message.COMMENTS')"
                      name="comment"
                      v-model="formData.comment"
                    >
                    </v-textarea>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row dense no-gutters-y>
                <v-col cols="12">
                  <validation-provider name="shift_types" rules="required" v-slot="{ errors }" slim>
                    <v-search
                      :url="shiftTypeChoicesUrl"
                      :deselectLoading="deselectLoading"
                      widget="multiselect"
                      :label="$t('message.SHIFT_TYPES_IN_THIS_SCHEDULE')"
                      name="shift_types"
                      class="required schedule-shift-type"
                      v-model="formData.shift_types"
                      :error-messages="errors"
                      :item-value="(i => [i['value'], i['text']])"
                    ></v-search>
                  </validation-provider>
                </v-col>
                <v-col cols="12" v-if="formData.shift_types.length && momentEnd.isValid() && momentStart.isValid()">
                  <div>
                    <v-btn
                      color="primary"
                      depressed
                      :disabled="deselectLoading"
                      :loading="deselectLoading"
                      :to="{ name: 'SCHEDULE_CREATE:CUSTOMIZE' }"
                    >
                      {{$t('message.CUSTOMIZE')}}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </validation-observer>
      </app-card>
      <generic-field-form
        ref="generic-fields"
        :entity="entityChoices.value('SCHEDULE')"
        v-model="formData.generic_data"
      ></generic-field-form>
    </v-container>
    <div class="app-card-footer">
      <v-btn
        min-width="100"
        :loading="creating"
        @click="submitHandler"
        class="mx-0"
        color="primary"
        depressed
      >
        {{$t('message.CREATE')}}
      </v-btn>
    </div>
  </div>
</template>
<script>
import difference from 'lodash/difference'
import AppDialog from '@/components/Widgets/Dialog.vue'
import AppDatetimeInput from '@/components/Widgets/datetime/AppDatetimeInput'
import GenericFieldForm from 'Components/genericfield/GenericFieldForm.vue'
import { GENERIC_FIELD_ENTITY_CHOICES } from 'Constants/choices'
import SecondaryRouter from 'Components/SecondaryRouter/SecondaryRouter'
import TaskProgress from 'Components/Widgets/TaskProgress'

export default {
  components: {
    TaskProgress,
    SecondaryRouter,
    AppDatetimeInput,
    AppDialog,
    GenericFieldForm
  },

  data () {
    return {
      nonFieldError: '',
      creating: false,
      shiftTemplates: {},
      id: null
    }
  },

  watch: {
    'formData.manual_input': function (value) {
      if (value) {
        this.formData.collect_preferences = false
        this.setInitialPreferencesDeadline()
      }
    },

    'formData.shift_types': async function (value, old) {
      old = old.map(i => i[0])
      value = value.map(i => i[0])
      const removed = difference(old, value)
      await this.$store.dispatch('schedule/removeShiftTypes', removed)
      this.createShiftsHandler()
    },

    'formData.start': function () {
      this.createShiftsHandler()
    },

    'formData.end': function () {
      this.createShiftsHandler()
    }
  },

  async created () {
    this.$store.dispatch('schedule/resetCreateData')
    this.setInitialPreferencesDeadline()
    const initialStart = this.$moment().date(1).add(1, 'M')
    const startDateWeekday = initialStart.weekday()
    const startDate = initialStart.add(8 - startDateWeekday, 'd').set({ hour: 0, minute: 0 })
    this.formData.start = this.$moment.toglobaldate(startDate)
    this.formData.end = this.$moment.toglobaldate(this.$moment(startDate).add(13, 'w').set({
      hour: 23,
      minute: 59
    }))
  },

  computed: {
    formData () {
      return this.$store.state.schedule.createData.formData
    },

    deselectLoading () {
      return !!this.formData.shift_types.length && this.$store.state.schedule.creatingshiftTemplates
    },
    minDate () {
      if (this.formData.manual_input) {
        return this.$moment().subtract(1000, 'd').set({ hour: 0, minute: 0 }).format(this.$moment.globalformat)
      }
      return this.$moment().add(1, 'd').set({ hour: 0, minute: 0 }).format(this.$moment.globalformat)
    },

    momentStart () {
      return this.$moment(this.formData.start)
    },

    maxDate () {
      return this.momentStart.add(370, 'd').set({ hour: 0, minute: 0 }).format(this.$moment.globalformat)
    },

    momentEnd () {
      return this.$moment(this.formData.end)
    },

    entityChoices () {
      return GENERIC_FIELD_ENTITY_CHOICES
    },

    shiftTypeChoicesUrl () {
      let url = ''
      if (this.formData.department) {
        url = `/choices/shift_type/?department=${this.formData.department}`
      }
      return url
    }

  },

  methods: {
    taskSuccessHandler () {
      this.$router.push({ name: 'SCHEDULE_DETAIL', params: { id: this.id } })
    },
    async createShiftsHandler () {
      const valid = await this.$refs['oc'].validate()
      if (valid && this.momentStart.isValid() && this.momentEnd.isValid()) {
        await this.$store.dispatch('schedule/createShifts')
        await this.$store.dispatch('schedule/createShiftsList')
      }
    },

    async submitHandler () {
      let valid = await wait([this.$refs['observer'].validate(), this.$refs['generic-fields'].validate()])
      valid = valid.every(v => v)
      if (valid) {
        try {
          this.creating = true
          const { data } = await this.$store.dispatch('schedule/createSchedule')
          this.id = data.id
          this.$refs['progress'].observe(data.task_id)
        } catch (e) {
          this.handleFailure(e)
        } finally {
          this.creating = false
        }
      } else {
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
      }
    },
    handleFailure (e) {
      if (e.response && e.response.status === 400) {
        let res = e.response.data
        this.$refs['observer'].setErrors(res)
        if (res['non_field_errors']) {
          this.nonFieldError = this.$t(res['non_field_errors'][0])
        }
      }
    },

    setInitialPreferencesDeadline () {
      this.formData.preferences_deadline = this.$moment.toglobaldate(this.$moment().add(5, 'd').set({
        hour: 23,
        minute: 59
      }))
    }
  }
}
</script>
<style lang="scss">
  .we-heading {
    font-size: 17px;
    margin-left: 15px;
  }
  .department-choices{
    margin-left: 0px;
    min-width: 100% !important;
    left: 0 !important;
  }
</style>
