<template>
  <view-wrapper class="vh-26 d-flex flex-column update-absence-create">
    <div class="app-secondary-scroll">
      <app-card class="border-wrap card-padding my-5 mb-3">
        <h1 class="primary--text text-capitalize mb-5 font-2x fw-bold">{{$t('message.ABSENCE_STATUS_UPDATE')}}</h1>

        <v-alert
          :value="true"
          outlined
          type="error"
          class="v-alert v-alert-danger"
          v-show="nonFieldError"
        >
          {{ nonFieldError }}
        </v-alert>

        <validation-observer ref="observer">
          <v-form ref="form">
            <v-row no-gutters-y class="input__field_30">
              <v-col cols="12" class="py-0 status-col">
                <v-select
                  attach
                  outlined
                  dense
                  :menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
                  class="elevation-01-auto required"
                  :items="typeChoices"
                  :label="$t('message.ABSENCE_STATUS')"
                  name="status"
                  item-text="text"
                  item-value="value"
                  v-model="formData.status"
                  rules="required"
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-0">
                <validation-provider name="comment" :rules="{required: false}" v-slot="{ errors }">
                  <v-textarea
                    outlined
                    auto-grow
                    :error-messages="errors"
                    :label="$t('message.COMMENT')"
                    name="comment"
                    id="comment"
                    v-model="formData.comment"
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col cols="12" class="py-0" v-if="ignoreShiftOverlapMessage">
                <v-checkbox
                  :label="ignoreShiftOverlapMessage"
                  color="primary"
                  class="mx-2"
                  v-model="formData.ignore_shift_overlap"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </app-card>
    </div>
    <div class="app-secondary-footer-v1">
      <v-btn
        id="update"
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

export default {
  data () {
    return {
      updating: false,
      ignoreShiftOverlapMessage: '',
      typeChoices: [
        { text: this.$t('message.APPROVED'), value: 2 },
        { text: this.$t('message.REJECTED'), value: 3 },
        { text: this.$t('message.UNDER_REVIEW'), value: 4 }
      ],
      formData: {
        comment: '',
        status: 2,
        ignore_shift_overlap: false
      },
      nonFieldError: ''
    }
  },
  methods: {
    async saveHandler () {
      const valid = await this.$refs['observer'].validate()
      if (valid) {
        this.updating = true
        try {
          await this.$http.put(`/absence/${this.$route.params.objectId}/status/`, this.formData)
          this.$utils.sucessNotify('message.ABSENCE_STATUS_HAS_BEEN_SUCCESSFULLY_UPDATED')
          this.$store.dispatch('absence/getAbsence', this.$route.params.objectId)
          this.$router.push({ name: 'ABSENCE_LIST:ABSENCE_VIEW', params: { objectId: this.$route.params.objectId } })
        } catch (e) {
          this.handleFailure(e)
        } finally {
          this.updating = false
        }
      }
    },
    handleFailure (e) {
      if (e.response && e.response.status === 400) {
        let res = e.response.data
        this.$refs['observer'].setErrors(res)
        if (res.ignore_shift_overlap) {
          this.ignoreShiftOverlapMessage = res.ignore_shift_overlap[0]
          this.nonFieldError = this.$t('message.EMPLOYEE_SHIFT_EXIST_FOR_THIS_DURATION')
        }
        this.$refs['observer'].setErrors(e.response.data)
        if (e.response.data['non_field_errors']) {
          this.nonFieldError = this.$t(e.response.data['non_field_errors'][0])
        }
      }
      if (e.response && e.response.status === 403) {
        this.nonFieldError = e.response.data['detail']
      }
    }
  },
  async created () {
    try {
      const { data } = await this.$http.get(`/absence/${this.$route.params.objectId}/`)
      Object.assign(
        this.formData,
        {
          status: data.status
        }
      )
    } catch (e) {
    }
  }
}
</script>
