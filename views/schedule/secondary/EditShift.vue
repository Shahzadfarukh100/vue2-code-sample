<template>
  <view-wrapper class="wrapper-container">
    <app-card class="border-wrap pa-5 my-2 vh-container">
      <v-alert
        :value="true"
        outlined
        type="error"
        :key="index" v-for="(item, index) in nonFieldError"
      >{{ item }}</v-alert>
      <div class="d-flex justify-space-between align-center mb-6 pb-2">
        <h1 class="primary--text text-capitalize mb-0 font-2x fw-bold">{{$t('message.EDIT')}}</h1>
        <v-btn icon v-if="isNotUpdated" @click="goBack()">
          <v-icon color="primary">{{ $icons.mdiClose }}</v-icon>
        </v-btn>
        <v-dialog
          v-else
          max-width="362"
          content-class="elevation-dialog"
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
            <v-col cols="12">
              <appDateTimeInputV1
                v-model="formData.start"
                name="start"
                :dateLabel="$t('message.START_DATE')"
                :timeLabel="$t('message.START_TIME')"
                :dateRules="{ required: true }"
                :timeRules="{ required: true }"
              ></appDateTimeInputV1>
            </v-col>
            <v-col cols="12">
              <appDateTimeInputV1
                v-model="formData.end"
                name="end"
                :dateLabel="$t('message.END_DATE')"
                :timeLabel="$t('message.END_TIME')"
                :dateRules="{ required: true }"
                :timeRules="{ required: true }"
              ></appDateTimeInputV1>
            </v-col>
            <v-col cols="12" sm="6" class="pr-2">
              <v-text-field
                :label="$t('message.EMPLOYEES_NEEDED')"
                height="20"
                name="employees_needed"
                v-model="formData.employees_needed"
                :rules="{required: true, numeric: true, min_value: 1, max_value:10000}"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pl-2">
              <numeric-to-duration-field
                :label="$t('message.BREAK_MINUTES')"
                height="20"
                name="minutes_of_break"
                v-model="formData.minutes_of_break"
                :rules="breakTimeRules"
              >
              </numeric-to-duration-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-switch
                :label="$t('message.PAID_BREAKS')"
                class="mt-0"
                color="primary"
                height="20"
                v-model="formData.paid_break"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="py-0">
              <validation-provider name="comment" :rules="{ max:500 }" v-slot="{ errors }">
              <v-textarea
                outlined
                auto-grow
                :error-messages="errors"
                :label="$t('message.COMMENTS')"
                name="comment"
                v-model="formData.comment"
              >
              </v-textarea>
              </validation-provider>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </app-card>
    <div class="app-secondary-footer-v1">
      <v-btn
        :loading="updating"
        @click="saveHandler"
        :min-width="130"
        :height="38"
        class="mx-0 text-capitalize text-subtitle-2"
        color="primary"
        depressed
      >{{$t('message.SAVE')}}
      </v-btn>
    </div>
  </view-wrapper>
</template>
<script>
import NumericToDurationField from 'Components/Widgets/datetime/NumericToDurationField'
import { ServerValidationMixin, FormEnterListner } from '@/mixins'
import isEqual from 'lodash/isEqual'

export default {
  components: {
    NumericToDurationField
  },
  mixins: [ServerValidationMixin, FormEnterListner],

  data () {
    return {
      loading: true,
      updating: false,
      formData: {},
      data: {}
    }
  },

  async created () {
    const { data } = await this.$http.get(`/shift/${this.$route.params.shiftId}/`)
    this.formData = data
    this.data = { ...data }
  },

  computed: {
    schedule () {
      return this.$store.state.calendar.schedule
    },
    maxBreakTime () {
      return this.$moment(this.formData.end).diff(this.$moment(this.formData.start), 'minutes')
    },
    breakTimeRules () {
      const rules = {
        required: true,
        numeric: true,
        min_value: 0
      }
      if (this.maxBreakTime > 0) return { ...rules, max_value: this.maxBreakTime }
      return rules
    },
    isNotUpdated () {
      return isEqual(this.data, this.formData)
    }
  },

  methods: {
    dialogGoBack (dialog) {
      dialog.value = false
      this.goBack()
    },
    goBack () {
      this.$router.back()
    },

    submitHandler () {
      this.saveHandler()
    },

    async saveHandler () {
      const valid = await this.$refs['observer'].validate()
      if (valid) {
        this.updating = true
        try {
          await this.$http.put(`/shift/${this.$route.params.shiftId}/`, this.formData)
          this.$utils.sucessNotify('message.SHIFT_HAS_BEEN_SUCCESSFULLY_UPDATED')
          await this.$store.dispatch('calendar/fetchEvents')
          this.$router.back()
        } catch (err) {
          this.serverValidation(err, this.$refs['observer'])
        } finally {
          this.updating = false
        }
      } else {
        this.$utils.errorNotify(this.$t('message.VALIDATION_ERROR'))
      }
    }

  }
}
</script>
<style lang="scss" scoped>
/deep/ .v-input--selection-controls {
  margin-top: 0;
}
.border-wrap{
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 6px;
}
.v-dialog__content{
  justify-content: flex-end !important;
}
.vh-container{
    height: calc(100vh - 126px);
    overflow-y: auto;
}
.wrapper-container{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.elevation-dialog{
  /deep/ &.v-dialog{
    margin-right: 86px !important;
  }
  .toolbar-shift{
    /deep/ .v-toolbar__content{ padding: 4px 11px;}
    .delete-icon /deep/ .v-icon__svg{
      height: 14px;
      width: 14px
    }
    h4{
      font-size: 10px;
      line-height: 12px;
      margin-left: 14px !important;
    }
    .close-icon /deep/ .v-icon__svg{
      height: 12px;
      width: 14px;
    }
  }
  &.v-dialog > .v-card{
    > .v-card__text{
      padding: 19px 10px 46px;
      font-size: 14px !important;
      line-height: 17px;
      color: #272727;
      .subtitle-2{
        line-height: 17px;
      }
    }
    > .v-card__actions{
      padding: 0 14px 9px 14px;
      .v-btn.v-size--default {
        font-size: 14px;
        text-transform: capitalize;
        font-weight: 400;
        height: 29px;
        &.active,
        &:hover{
          background: #1b92da;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
