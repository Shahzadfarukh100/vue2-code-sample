<template>
	<div class="cv-header">
		<div class="periodLabel">
			<div class="lable-1"><slot name="label">{{ headerProps.periodLabel }}</slot></div>
			<button
				class="currentPeriod"
				aria-label="Current Period"
				@click.prevent="onInput(headerProps.currentPeriod)"
				:disabled="!headerProps.isBetweenCurrentPeriod"
			>
				{{$t('message.TODAY')}}
			</button>
		</div>
		<div class="cv-header-nav">
			<button
				:disabled="!headerProps.previousPeriod"
				class="previousPeriod"
				aria-label="Previous Period"
				@click.prevent="onInput(headerProps.previousPeriod)"
				v-html="previousPeriodLabel"
			/>
			<button
				:disabled="!headerProps.nextPeriod"
				class="nextPeriod"
				aria-label="Next Period"
				@click.prevent="onInput(headerProps.nextPeriod)"
			>
				{{ nextPeriodLabel }}
			</button>
		</div>
    <div>
	<div class="elevation-input_error_none pr-1">
		<v-select
			id="schedule_view"
			attach
			outlined
			dense
			class="elevation-01-auto v-select__elevation"
			:menu-props="{ contentClass: 'elevation-01__autocomplete', bottom: true, offsetY: true}"
			v-model="scheduleView"
			:items="scheduleViews"
			item-text="text"
			item-value="value"
			name="schedule_view"
			:label="$t('message.SCHEDULE_VIEW')"
			@change="updateScheduleViews"
			:append-icon="$icons.mdiChevronDown"
		></v-select>
	</div>
    </div>
	</div>
</template>
<script>
export default {

  name: 'CalendarViewHeader',

  data () {
    return {
      previousPeriodLabel: '<',
      nextPeriodLabel: '>',
      scheduleViews: [
	      { text: this.$t('message.REGULAR_WEEK'), value: 1 },
        { text: this.$t('message.REGULAR_MONTH'), value: 2 },
	      { text: this.$t('message.EMPLOYEE_WEEK'), value: 6 }
	    ]
    }
  },
  props: {
    headerProps: {
      type: Object,
      required: true
    }

  },
  computed: {
    scheduleView: {
      set (value) {
        this.$store.dispatch('calendar/setScheduleView', value)
      },
      get () {
        return this.$store.state.calendar.scheduleView
      }
    }
  },
  methods: {
    onInput (d) {
      this.$emit('input', d)
    },

    updateScheduleViews () {
      if (this.scheduleView === 1) {
        this.$store.dispatch('calendar/setDisplayView', 'week')
	      this.$store.dispatch('calendar/setCalendarView', 'regular')
      } else if (this.scheduleView === 2) {
        this.$store.dispatch('calendar/setDisplayView', 'month')
	      this.$store.dispatch('calendar/setCalendarView', 'regular')
      } else if (this.scheduleView === 6) {
			 this.$store.dispatch('calendar/setDisplayView', 'week')
			 this.$store.dispatch('calendar/setCalendarView', 'employee_week')
		 }
    },
    updateDisplay (view) {
      this.$store.dispatch('calendar/setDisplayView', view)
      this.$store.dispatch('calendar/setCalendarView', view)
    }
  }
}
</script>
<style lang="scss" >
@import "./src/assets/scss/_app.variables.scss";
.v-list-item.v-list-item--link.theme--light {
  color: $gray-dark;
  &:hover{
    background: $primary !important;
    color: white !important;
  }
}

</style>
