<template>
  <confirmation
   :error-message="nonFieldError"
   :updating="updating"
   @confirmed="deleteHandler">
  </confirmation>
</template>

<script>
import Confirmation from 'Components/Widgets/Confirmation.vue'
import { ServerValidationMixin } from '@/mixins'

export default {
  data () {
    return {
      updating: false
    }
  },
  components: {
    Confirmation
  },
  mixins: [ServerValidationMixin],
  methods: {
    async deleteHandler () {
      this.updating = true
      try {
        await this.$http.delete(`/schedule/${this.$route.params.id}/`)
        this.$utils.sucessNotify('message.SCHEDULE_HAS_BEEN_SUCCESSFULLY_DELETED')
        await this.$store.dispatch(`schedule/listSchedules`)
        this.$router.push({ name: 'SCHEDULE_LIST' })
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.updating = false
      }
    }
  }
}
</script>
