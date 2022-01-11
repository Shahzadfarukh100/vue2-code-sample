<template>
  <view-wrapper class="vh-26 d-flex flex-column absence-create">
    <div class="app-secondary-scroll">
      <app-card class="border-wrap card-padding my-5 mb-3">
        <h1 class="primary--text text-capitalize mb-5 font-2x fw-bold">{{pageTitle}}</h1>

        <v-alert
          :value="true"
          outlined
          class="v-alert v-alert-danger"
          type="error"
          :key="index" v-for="(item, index) in nonFieldError"
        >{{ item }}</v-alert>

        <validation-observer ref="observer">
          <v-row no-gutters-y class="input__field_30">
            <v-col cols="12" sm="6" class="py-0 pr-2 subject-col">
              <v-text-field
                id="subject"
                class="required"
                :label="$t('message.TITLE')"
                name="subject"
                v-model="formData.subject"
                rules="required|max:256"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0 pl-2 submitted_for-col" v-if="absenceForOther">

              <validation-provider name="submitted_for" rules="required" v-slot="{ errors }" mode="eager">
                <v-search
                  id="submit_for"
                  :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter elevation-01__autocomplete__employess' }"
                  class="required elevation-01-auto elevation-01-auto_filter mw-100"
                  outlined
                  solo
                  attach
                  dense
                  :error-messages="errors"
                  url="/choices/employee/absence_submit_for/"
                  :label="$t('message.SUBMITTED_FOR')"
                  item-text="full_name"
                  item-value="id"
                  name="submitted_for"
                  v-model="formData.submitted_for"
                  :maxLength="14"
                  :append-icon="$icons.mdiChevronDown"
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar class="avatar_img" size="27">
                        <img :src="item | avatar" alt="">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="title__name">{{ item.full_name }}fst</v-list-item-title>
                        <v-list-item-title class="sub__title">{{ roleChoices.display(item.role) }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-search>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" class="py-0 pl-2 submitted_to-col" v-if="absenceTo">
              <validation-provider name="submitted_to" rules="required" v-slot="{ errors }" mode="eager">
                <v-search
                  id="submit_to"
                  :menu-props="{ contentClass: 'elevation-01__autocomplete elevation-01__autocomplete_filter elevation-01__autocomplete__employess' }"
                  class="required elevation-01-auto elevation-01-auto_filter mw-100"
                  outlined
                  solo
                  attach
                  dense
                  :error-messages="errors"
                  url="/choices/employee/absence_submit_to/"
                  :label="$t('message.SUBMITTED_TO')"
                  item-text="full_name"
                  item-value="id"
                  name="submitted_to"
                  v-model="formData.submitted_to"
                  :maxLength="14"
                  :append-icon="$icons.mdiChevronDown"
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar class="avatar_img" size="27">
                        <img :src="item | avatar" alt="">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="title__name">{{ item.full_name }}fst</v-list-item-title>
                        <v-list-item-title class="sub__title">{{ roleChoices.display(item.role) }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-search>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" class="py-0 pr-2 absence_duration-col">
              <v-select
                id="absence_duration"
                attach
                outlined
                dense
                :menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
                class="elevation-01-auto required"
                v-model="formData.absence_duration"
                :items="absenceDuration"
                item-text="text"
                item-value="value"
                name="absence_duration"
                :label="$t('message.ABSENCE_DURATION')"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="py-0 pl-2 absence_type-col">
              <validation-provider name="absence_type" rules="required" v-slot="{ errors }" mode="eager">
                <v-search
                  id="absence_type"
                  attach
                  outlined
                  dense
                  :menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
                  class="elevation-01-auto required"
                  :error-messages="errors"
                  :url="absenceTypeChoicesUrl"
                  :label="$t('message.ABSENCE_TYPE')"
                  item-text="name"
                  item-value="id"
                  name="absence_type"
                  v-model="formData.absence_type">
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-search>
              </validation-provider>
            </v-col>
            <template v-if="formData.absence_duration===2">
              <v-col cols="12" sm="6" class="py-0 pr-2 start-col">
                <validation-provider
                  name="start"
                  :rules="{ required: true}"
                  v-slot="{ errors }"
                >
                  <app-datetime-input
                    outlined
                    dense
                    class="required"
                    name="start"
                    id="start"
                    :error-messages="errors"
                    v-model="formData.start"
                    :label="$t('message.START')"
                  ></app-datetime-input>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" class="py-0 pl-2 end-col">
                <validation-provider name="end" :rules="{ required: true, date_after: [formData.start, 'minute', true] }"
                                     v-slot="{ errors }">
                  <app-datetime-input
                    outlined
                    dense
                    class="required"
                    name="end"
                    id="end"
                    :error-messages="errors"
                    v-model="formData.end"
                    :label="$t('message.END')"
                  ></app-datetime-input>
                </validation-provider>
              </v-col>
            </template>

            <template v-else>
              <v-col cols="12" sm="6" class="py-0 pr-2 start-col">
                <validation-provider
                  name="start"
                  :rules="{ required: true}"
                  v-slot="{ errors }">
                  <app-date-input
                    outlined
                    dense
                    custom-classes="required"
                    :error-messages="errors"
                    :label="$t('message.START')"
                    name="start"
                    id="start"
                    v-model="formData.start"
                    ref="start"
                  ></app-date-input>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" class="py-0 pl-2 end-col">
                <validation-provider
                  name="end"
                  :rules="{ required: true, date_after: !!formData.start ? [formData.start, 'day', true] : [] }"
                  v-slot="{ errors }">
                  <app-date-input
                    outlined
                    dense
                    custom-classes="required"
                    :error-messages="errors"
                    :label="$t('message.END')"
                    name="end"
                    id="end"
                    v-model="formData.end"
                  ></app-date-input>
                </validation-provider>
              </v-col>
            </template>
            <v-col cols="12" class="py-0 comment-col">
              <validation-provider name="comment" :rules="{ max:500 }" v-slot="{ errors }">
                <v-textarea
                  outlined
                  auto-grow
                  :error-messages="errors"
                  :label="$t('message.ABSENCE_BODY')"
                  name="comment"
                  id="comment"
                  v-model="formData.comment"
                ></v-textarea>
              </validation-provider>
            </v-col>
          </v-row>
        </validation-observer>
        <v-row v-if="ignoreShiftOverlapMessage">
          <v-col cols="12" class="py-0 ignore_shift_overlap-col">
            <v-checkbox
              :label="ignoreShiftOverlapMessage"
              color="primary msk"
              v-model="formData.ignore_shift_overlap"
            ></v-checkbox>
          </v-col>
        </v-row>
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
        {{$t('message.CREATE')}}
      </v-btn>
    </div>
  </view-wrapper>
</template>
<script>
import { ServerValidationMixin, FormEnterListner } from '@/mixins'
import { ROLE_CHOICES } from 'Constants/choices'
export default {
  props: {
    absenceForOther: {
      type: Boolean,
      default: false
    }
  },
  mixins: [ServerValidationMixin, FormEnterListner],
  data () {
    return {
      ignoreShiftOverlapMessage: '',
      absenceDuration: [
        { text: this.$t('message.DAY'), value: 1 },
        { text: this.$t('message.HOURLY'), value: 2 },
        { text: this.$t('message.QUITTING'), value: 3 }
      ],
      formData: {
        subject: '',
        comment: '',
        submitted_for: '',
        submitted_to: '',
        start: '',
        end: '',
        absence_type: '',
        absence_duration: 1,
        ignore_shift_overlap: false
      }
    }
  },
  watch: {
    'formData.absence_duration': function () {
      Object.assign(
        this.formData,
        {
          start: '',
          end: '',
          absence_type: ''
        }
      )
    }
  },
  computed: {

    roleChoices () {
      return ROLE_CHOICES
    },

    pageTitle () {
      if (this.absenceForOther) {
        return this.$t('message.CREATE_ABSENCE_ON_BEHALF_OF_OTHERS')
      }
      return this.$t('message.CREATE_ABSENCE')
    },

    user () {
      return this.$store.state.userData
    },

    absenceTo () {
      return !(this.absenceForOther)
    },

    absenceTypeChoicesUrl () {
      return '/choices/absence_type/?duration=' + this.formData.absence_duration
    },

    updating () {
      return this.$store.state.absence.updating
    }

  },
  methods: {
    submitHandler () {
      this.saveHandler()
    },

    async saveHandler () {
      const valid = await this.$refs['observer'].validate()
      if (valid) {
        try {
          await this.$store.dispatch('absence/createAbsence', this.formData)
          this.$utils.sucessNotify('message.ABSENCE_HAS_BEEN_SUCCESSFULLY_CREATED')
          this.$store.dispatch('absence/getAbsences')
          this.$router.push({ name: 'ABSENCE_LIST' })
        } catch (err) {
          let res = err.response.data
          if (res.ignore_shift_overlap) {
            this.ignoreShiftOverlapMessage = res.ignore_shift_overlap[0]
            this.nonFieldError = [this.$t('message.EMPLOYEE_SHIFT_EXIST_FOR_THIS_DURATION')]
          }
          this.serverValidation(err, this.$refs['observer'])
        }
      } else {
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mw-100{
    max-width: 100%;
  }
  /deep/ .elevation-01__autocomplete__employess{
    min-width: 100% !important;
  }
</style>
