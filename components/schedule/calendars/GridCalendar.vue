<template>
	<div
		aria-label="Calendar"
		v-resize="onResize"
		:class="[
			'cv-wrapper',
			'y' + periodStart.getFullYear(),
			'm' + paddedMonth(periodStart),
			'period-' + displayPeriodUom,
			'periodCount-' + displayPeriodCount,
			{
				past: isPastMonth(periodStart),
				future: isFutureMonth(periodStart),
				noIntl: !supportsIntl,
			},
		]"
	>
    <app-section-loader v-if="loadingEvents"></app-section-loader>
		<CalendarViewHeader :headerProps="headerProps" @input="setShowDate"></CalendarViewHeader>
		<div class="cv-header-days">
			<template v-for="(label, index) in weekdayNames">
				<div
					:key="getColumnDOWClass(index)"
					:class="getColumnDOWClass(index)"
					class="cv-header-day"
				>
					<div class="week-day">{{ label }}</div>
					<div class="month-day" v-if="!displayMonth">{{getMonth(index)}}<span class="day-number">{{getday(index + startingDayOfWeek)}}</span></div>
				</div>
			</template>
		</div>
		<div class="cv-weeks" :style="`height:${gridHeight};`" >
			<div
				v-for="(weekStart, weekIndex) in weeksOfPeriod"
				:key="`${weekIndex}-week`"
				:class="[
					'cv-week',
					'week' + (weekIndex + 1),
					'ws' + isoYearMonthDay(weekStart),
				]"
			>

				<div class="cv-weekdays">
					<div
						v-for="(day, dayIndex) in daysOfWeek(weekStart)"
						:key="getColumnDOWClass(dayIndex)"

						:class="[
							'cv-day',
							getColumnDOWClass(dayIndex),
							'd' + isoYearMonthDay(day),
							'd' + isoMonthDay(day),
							'd' + paddedDay(day),
							'instance' + instanceOfMonth(day),
							{
								today: isSameDate(day, today()),
								outsideOfMonth: !isSameMonth(day, defaultedShowDate),
								past: isInPast(day),
								future: isInFuture(day),
								last: isLastDayOfMonth(day),
								lastInstance: isLastInstanceOfMonth(day),
								hasItems: dayHasItems(day),
								selectionStart: isSameDate(day, selectionStart),
								selectionEnd: isSameDate(day, selectionEnd),
							}
						]"
						:aria-label="day.getDate()"
					>
						<div class="cv-day-number" v-if="displayMonth">{{ day.getDate() }}</div>
					</div>
					<GridCalendarItem :items="getWeekItems(weekStart)"></GridCalendarItem>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Resize } from 'vuetify/es5/directives'
import { CalendarComponentsMixin } from './CalendarComponentsMixin.js'
import CalendarViewHeader from './CalendarViewHeader.vue'
import GridCalendarItem from './parts/GridCalendarItem.vue'

export default {
  name: 'GridCalendar',
  mixins: [CalendarComponentsMixin],
  directives: { Resize },
  components: { CalendarViewHeader, GridCalendarItem },

  props: {
    items: { type: Array, default: () => [] }
  },

  watch: {
    periodEnd: {
      immediate: true,
      handler () {
        this.getCalendarEvents()
      }
    }
  },
  created () {
    this.showDate = this.$moment(this.$moment.tolocal(this.schedule.start)).toDate()
  },

  computed: {
    gridHeight () {
      let height = (this.windowSize.y - 444 + 140)
      return height + 'px'
    }
  },

  methods: {

    customButtons () {
      if (this.showCreateShiftButton) {
        this.$router.push({ name: 'SCHEDULE_DETAIL:SHIFT_CREATE' })
      }
    },

    getWeekItems (weekStart) {
      // Return a list of items that CONTAIN the week starting on a day.
      // Sorted so the items that start earlier are always shown first.
      let offsetDay = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
      const items = this.findAndSortItemsInWeek(weekStart)
      const results = []
      const itemRows = [[], [], [], [], [], [], []]
      for (let i = 0; i < items.length; i++) {
        const ep = Object.assign({}, items[i], {
          classes: [...items[i].classes],
          itemRow: 0
        })
        ep.classes.push(items[i].originalItem.className)
        const continued = ep.startDate < weekStart
        const startOffset = continued
          ? 0
          : this.dayDiff(weekStart, ep.startDate)
        const span = Math.min(
          7 - startOffset,
          this.dayDiff(this.addDays(weekStart, startOffset), ep.endDate) + 0
        )
        if (continued) ep.classes.push('continued')
        if (this.dayDiff(weekStart, ep.endDate) > 6) { ep.classes.push('toBeContinued') }
        if (this.isInPast(ep.endDate)) ep.classes.push('past')
        if (ep.originalItem.url) ep.classes.push('hasUrl')
        for (let d = 0; d < 7; d++) {
          if (d === startOffset) {
            let s = 0
            while (itemRows[d][s]) s++
            ep.itemRow = s
            itemRows[d][s] = true
          } else if (d < startOffset + span) {
            itemRows[d][ep.itemRow] = true
          }
        }
        const offset = startOffset + 1
        offsetDay[offset] = offsetDay[offset] + 1
        ep.classes.push(`day-item-${offsetDay[offset]}`)
        ep.offsetDay = parseInt(offsetDay[offset])

        ep.classes.push(`offset${startOffset}`)
        ep.classes.push(`span${span}`)
        results.push(ep)
      }
      return results
    },

    async getCalendarEvents () {
      await this.$store.dispatch('calendar/fetchEvents')
    }

  }
}
</script>

<style lang="scss">
.cv-item {
  cursor: pointer;
}
</style>
