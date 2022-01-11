<template>
	<div
		aria-label="Calendar"
		v-resize="onResize"
		:class="[
			'cv-wrapper',
			'period-' + displayPeriodUom,
			{
				past: isPastMonth(periodStart),
				future: isFutureMonth(periodStart)
			},
		]"
	>
		<app-section-loader v-if="loadingEvents"></app-section-loader>
		<CalendarViewHeader :headerProps="headerProps" @input="setShowDate"></CalendarViewHeader>
		<div class="cv-header-days">
			<div class="cv-header-day dow1">
				{{$t('message.EMPLOYEE')}}
			</div>
			<template v-for="(label, index) in weekdayNames">
					<div
						:key="getColumnDOWClass(index)"
						:class="getColumnDOWClass(index)"
						class="cv-header-day">

						<div class="week-day">{{ label }}</div>
						<div class="month-day">{{getMonth(index)}}<span class="day-number">{{getday(index + startingDayOfWeek)}}</span></div>
					</div>
			</template>
		</div>

		<div class="cv-weeks"  :style="`height:${bodyHeight};`">
			<div
				v-for="(weekStart, weekIndex) in weeksOfPeriod"
				:key="`${weekIndex}-week`"
				:class="[
					'cv-week',
					'week' + (weekIndex + 1),
					'ws' + isoYearMonthDay(weekStart),
				]">
				<div class="cv-weekdays">

					<div draggable="true" aria-label="27" class="cv-day">
						<div class="cv-day-number">&nbsp;</div>
					</div>

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
					</div>

					<template v-for="(employee, index) in scheduleEmployees">
						<div class="outer-span" :key="`${index}`" :style="`top:${getItemTop(index)}`">
		            <div class="cv-item cv-employee offset0 span employee-span" :style="`height: 100px;`" :key="employee.id">
                  <v-avatar
                    :style="{ cursor: 'pointer' }"
                    class="mr-2"
                    size="33"
                    @click="profileClickHandler(employee)"
                  >
                    <img
                      :src="employee | avatar"
                      alt="avatar"
                      class="img-responsive"
                      height="33"
                      style="border-radius: 50px"
                      width="33"/>
                  </v-avatar>
		              <div class="emp-name">
                    <span class="name" :style="{ cursor: 'pointer' }" @click="profileClickHandler(employee)">{{ $utils.textTruncate(employee.full_name, 15) }}</span>
                    <span class="time">{{roleChoices.display(employee.role)}}</span>
		              </div>
		            </div>
								<EmployeeCalendarItem :items="getWeekItems(weekStart, employee)"></EmployeeCalendarItem>
						</div>
		      </template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Resize } from 'vuetify/es5/directives'
import { CalendarComponentsMixin } from './CalendarComponentsMixin.js'
import CalendarViewHeader from './CalendarViewHeader.vue'
import EmployeeCalendarItem from './parts/EmployeeCalendarItem.vue'
import { ROLE_CHOICES } from 'Constants/choices'

export default {
  name: 'VEmployeeCalendar',
  mixins: [CalendarComponentsMixin],
  directives: { Resize },
  components: { CalendarViewHeader, EmployeeCalendarItem },

  props: {
    items: { type: Array, default: () => [] }
  },

  created () {
    this.showDate = this.$moment(this.$moment.tolocal(this.schedule.start)).toDate()
  },

  computed: {
    bodyHeight () {
      const h = this.windowSize.y - 440 + 135
      let lh = this.scheduleEmployees.length * 100
      lh = lh > 100 ? lh : 100
      if (h > lh) return lh + 'px'
      return h + 'px'
    },
    roleChoices () {
      return ROLE_CHOICES
    }
  },

  watch: {
    periodEnd: {
      immediate: true,
      handler () {
        this.getCalendarEvents()
      }
    }
  },

  methods: {
    profileClickHandler (employee) {
      this.$router.push({
        name: 'EMPLOYEE_PROFILE',
        params: { objectId: employee.id }
      })
    },
    async getCalendarEvents () {
      await this.$store.dispatch('calendar/fetchEvents')
    },

    getWeekItems (weekStart, employee) {
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
          this.dayDiff(this.addDays(weekStart, startOffset), ep.endDate) + 1
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
        if (ep.originalItem.employees_allocated.includes(employee.id)) {
          const offset = startOffset + 1
          offsetDay[offset] = offsetDay[offset] + 1
          ep.offset = offset
          ep.classes.push(`offset${offset}`)
          ep.classes.push(`span`)
          ep.classes.push(`day-item-${offsetDay[offset]}`)
          ep.offsetDay = parseInt(offsetDay[offset])

          results.push(ep)
        }
      }
      return results
    },

    getItemTop (index) {
      // Compute the top position of the item based on its assigned row within the given week.
      // const r = e.itemRow
      const itemTop = '0px'
      const h = '90px'
      const b = '10px'
      return `calc(${itemTop} + ${index}*${h} + ${index}*${b})`
    }

  }
}
</script>
