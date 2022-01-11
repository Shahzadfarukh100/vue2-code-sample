<template>
  <view-wrapper class="vh-26 d-flex flex-column absence-type-update"  :loading="loading">
    <div class="app-secondary-scroll">
      <app-card class="border-wrap card-padding my-5 mb-3">
        <h1 class="primary--text text-capitalize mb-5 font-2x fw-bold">{{$t('message.UPDATE_ABSENCE_TYPE')}}</h1>

        <v-alert
          :value="true"
          outlined
          class="v-alert v-alert-danger"
          type="error"
          v-show="nonFieldError"
        >
          {{ nonFieldError }}
        </v-alert>

        <validation-observer ref="observer">
          <v-form>
            <v-row no-gutters-y class="input__field_30">
              <v-col cols="12" class="py-0 name-col">
                <v-text-field
                  class="required"
                  :label="$t('message.ABSENCE_TYPE_NAME')"
                  name="name"
                  id="name"
                  v-model="formData.name"
                  rules="required|safe_chars"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0 pr-2 entitlement-col">
                <v-text-field
                  class="required"
                  :label="$t('message.ABSENCE_TYPE_ENTITLEMENT')"
                  name="entitlement"
                  id="entitlement"
                  v-model="formData.entitlement"
                  rules="required|numeric"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0 pl-2 submit_before_days-col">
                <v-text-field
                  class="required"
                  :label="$t('message.SUBMIT_BEFORE_DAYS')"
                  name="submit_before_days"
                  id="submit_before_days"
                  v-model="formData.submit_before_days"
                  rules="required|numeric"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="py-0 pr-2 duration-col">
                <v-select
                  attach
                  outlined
                  dense
                  :menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
                  class="elevation-01-auto required"
                  v-model="formData.duration"
                  :items="durationChoices"
                  item-text="text"
                  item-value="value"
                  name="duration"
                  id="duration"
                  :label="$t('message.ABSENCE_DURATION')"
                  rules="required|numeric"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" class="py-0 pl-2 absence_period-col">
                <v-select
                  attach
                  outlined
                  dense
                  :menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
                  class="elevation-01-auto"
                  :items="typeChoices"
                  :label="$t('message.ABSENCE_PERIOD')"
                  name="absence_period"
                  id="absence_period"
                  v-model="formData.period"
                  rules="required|numeric"
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-0 description-col">
                <validation-provider name="description" :rules="{ required: true, max:500 }" v-slot="{ errors }">
                  <v-textarea
                    outlined
                    auto-grow
                    :error-messages="errors"
                    :label="$t('message.ABSENCE_TYPE_DESCRIPTION')"
                    name="description"
                    id="description"
                    v-model="formData.description"
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6" class="py-0 paid-col">
                <v-checkbox
                  class="my-0 ml-2"
                  :label="$t('message.ABSENCE_PAID')"
                  color="primary"
                  name="paid"
                  id="paid"
                  v-model="formData.paid"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </app-card>
    </div>
    <div class="app-secondary-footer-v1">
      <v-btn
        :loading="updating"
        @click="saveHandler"
        :min-width="130"
        :height="38"
        class="create mx-0 text-capitalize text-subtitle-2"
        color="primary"
        depressed
      >
        {{$t('message.UPDATE')}}
      </v-btn>
    </div>
  </view-wrapper>
</template>
<script>
import { ServerValidationMixin } from '@/mixins'

export default {
  mixins: [ServerValidationMixin],
  data () {
    return {
      typeChoices: [
        { text: this.$t('message.WEEK'), value: 1 },
        { text: this.$t('message.MONTH'), value: 2 },
        { text: this.$t('message.YEAR'), value: 3 }
      ],
      durationChoices: [
        { text: this.$t('message.DAY'), value: 1 },
        { text: this.$t('message.HOURLY'), value: 2 },
        { text: this.$t('message.QUITTING'), value: 3 }
      ]
    }
  },

  async created () {
    try {
      this.$store.dispatch('absence/getAbsenceType', this.$route.params.absenceTypeId)
    } catch (err) {
      this.serverValidation(err)
    }
  },
  computed: {

    formData () {
      return this.$store.state.absence.absence
    },

    loading () {
      return this.$store.state.absence.fetching_secondary
    },

    updating () {
      return this.$store.state.absence.updating
    }

  },

  methods: {
    async saveHandler () {
      const valid = await this.$refs['observer'].validate()
      if (valid) {
        try {
          await this.$store.dispatch('absence/updateAbsenceType', this.formData)
          this.$utils.sucessNotify('message.ABSENCE_TYPE_HAS_BEEN_SUCCESSFULLY_UPDATED')
          this.$store.dispatch('absence/getAbsenceTypes')
          this.$router.push({ name: 'ABSENCE_TYPE' })
        } catch (err) {
          this.serverValidation(err, this.$refs['observer'])
        }
      } else {
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
      }
    }

  }
}
</script>
