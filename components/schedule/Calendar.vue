<template>
  <div>
      <VGridCalendar
        v-if="calendarView==='regular'"
        :items="items"
        >
      </VGridCalendar>
      <VEmployeeCalendar
        v-if="calendarView==='employee_week'"
        :items="items"
        >
      </VEmployeeCalendar>
  </div>
</template>
<script>
import VGridCalendar from './calendars/GridCalendar.vue'
import VEmployeeCalendar from './calendars/EmployeeCalendar.vue'
export default {
  components: {
    VGridCalendar,
    VEmployeeCalendar
  },

  computed: {

    items () {
      let events = this.$store.getters['calendar/events']
      return events.map(event => ({
        className: event.className,
        id: event.id,
        startDate: this.$moment.tolocal(event.start),
        endDate: this.$moment.tolocal(event.end),
        title: event.title,
        employees_needed: event.employees_needed,
        employees_allocated_count: event.employees_allocated.length,
        employees_allocated: event.employees_allocated
      }))
    },

    calendarView () {
      return this.$store.state.calendar.calendarView
    },

    schedule () {
      return this.$store.state.calendar.schedule
    }

  }

}
</script>
