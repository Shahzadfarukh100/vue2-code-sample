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
        await this.$http.delete(`/absence/${this.$route.params.objectId}/`)
        this.$utils.sucessNotify('message.ABSENCE_REQUEST_HAS_BEEN_SUCCESSFULLY_DELETED')
        this.$store.dispatch('absence/getAbsences')
        this.$router.push({ name: 'ABSENCE_LIST' })
      } catch (err) {
        this.serverValidation(err)
      } finally {
        this.updating = false
      }
    }
  }
}
</script>
