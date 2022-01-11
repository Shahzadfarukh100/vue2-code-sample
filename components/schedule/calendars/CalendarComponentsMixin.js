import { SCHEDULE_STATUS_CHOICES } from 'Constants/choices'

export const CalendarComponentsMixin = {
  data () {
    return {
      showDate: null,
      currentHoveredItemId: undefined,
      displayPeriodCount: 1,
      startingDayOfWeek: 1,
      windowSize: {
        x: 0,
        y: 0
      },
      eventWidth: '163px'
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      this.eventWidth = this.calculateEventWidth()
    },
    calculateEventWidth () {
      let width = 0
      let dayBox = document.getElementsByClassName('cv-day')[0]
      if (this.displayPeriodUom === 'week') {
        width = dayBox.clientWidth - 20
      }
      if (this.displayPeriodUom === 'month') {
        width = dayBox.clientWidth - 16
      }
      return width + 'px'
    },
    getYear (offset) {
      return this.$moment(this.addDays(this.periodStart, offset)).format('YYYY')
    },
    getMonth (offset) {
      return this.$utils.getMonthsI18n(this.addDays(this.periodStart, offset).getMonth())
    },
    getday (offset) {
      return this.$moment(this.addDays(this.periodStart, offset)).format('DD')
    },
    addDays (d, days) {
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + days,
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    },
    incrementPeriod (d, uom, count) {
      return new Date(
        d.getFullYear() + (uom === 'year' ? count : 0),
        d.getMonth() + (uom === 'month' ? count : 0),
        d.getDate() + (uom === 'week' ? count * 7 : 0)
      )
    },

    today () {
      return this.dateOnly(new Date())
    },

    beginningOfPeriod (d, periodUom, startDow) {
      switch (periodUom) {
        case 'year':
          return new Date(d.getFullYear(), 0)
        case 'month':
          return new Date(d.getFullYear(), d.getMonth())
        case 'week':
          return this.beginningOfWeek(d, startDow)
        default:
          return null
      }
    },

    daysOfWeek (weekStart) {
      return Array(7)
        .fill()
        .map((_, i) => this.addDays(weekStart, i))
    },

    beginningOfWeek (d, startDow) {
      return this.addDays(d, (startDow - d.getDay() - 7) % -7)
    },
    endOfWeek (d, startDow) {
      return this.addDays(this.beginningOfWeek(d, startDow), 7)
    },

    // ********************************************
    // Date transforms that ignore/wipe time of day
    // ********************************************
    beginningOfMonth: (d) => new Date(d.getFullYear(), d.getMonth()),

    instanceOfMonth: (d) => Math.ceil(d.getDate() / 7),

    // ******************************
    // Date formatting
    //

    paddedMonth: (d) => ('0' + String(d.getMonth() + 1)).slice(-2),
    paddedDay: (d) => ('0' + String(d.getDate())).slice(-2),
    paddedHour: (d) => ('0' + String(d.getHours())).slice(-2),
    paddedMinutes: (d) => ('0' + String(d.getMinutes())).slice(-2),

    isoYearMonth (d) {
      return d.getFullYear() + '-' + this.paddedMonth(d)
    },
    isoYearMonthDay (d) {
      return this.isoYearMonth(d) + '-' + this.paddedDay(d)
    },
    isoMonthDay (d) {
      return this.paddedMonth(d) + '-' + this.paddedDay(d)
    },
    formattedTime (d, locale, options) {
      // Assume midnight = "all day" or indeterminate time
      if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) { return '' }
      // If Intl is not supported, send back the 24-hour, zero-padded
      // hours and minutes, expressed as local time.
      if (!this.supportsIntl()) {
        var ms = new Date().getTimezoneOffset() * 60000 // TZ offset in milliseconds
        return new Date(d - ms).toISOString().slice(11, 16)
      }
      return d.toLocaleTimeString(locale, options)
    },

    // Formats a date period in long English style. Examples supported:
    // May 2018
    // May – June 2018
    // December 2018 – January 2019
    // May 6 – 26, 2018
    // May 13 – June 2, 2018
    // December 16, 2018 – January 5, 2019
    formattedPeriod (startDate, endDate, periodUom, monthNames) {
      const singleYear = startDate.getFullYear() === endDate.getFullYear()
      const singleMonth = this.isSameMonth(startDate, endDate)
      const isYear = periodUom === 'year'
      const isMonth = periodUom === 'month'
      const isWeek = !isYear && !isMonth

      let s = []
      s.push(monthNames[startDate.getMonth()])
      if (isWeek) {
        s.push(' ')
        s.push(startDate.getDate())
      }
      if (!singleYear) {
        s.push(isWeek ? ', ' : ' ')
        s.push(startDate.getFullYear())
      }
      if (!singleMonth || !singleYear) {
        s.push(' \u2013 ')
        if (!singleMonth) {
          s.push(monthNames[endDate.getMonth()])
        }
        if (isWeek) s.push(' ')
      } else if (isWeek) {
        s.push(' \u2013 ')
      }
      if (isWeek) {
        s.push(endDate.getDate())
        s.push(', ')
      } else {
        s.push(' ')
      }
      s.push(endDate.getFullYear())
      return s.join('')
    },

    // ******************************
    // Date comparisons
    // ******************************

    // Number of whole days between two dates. If present, time of day is ignored.
    // Treats dates as UTC to avoid DST changes within the perioud leading to incorrect
    // answers (#150).
    dayDiff (d1, d2) {
      const endDate = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
      const startDate = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
      return (endDate - startDate) / 86400000
    },

    isSameDate (d1, d2) {
      // http://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
      return d1 && d2 && this.dayDiff(d1, d2) === 0
    },

    isSameDateTime: (d1, d2) => d1 && d2 && d1.getTime() === d2.getTime(),
    isSameMonth: (d1, d2) =>
      d1 &&
			d2 &&
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth(),

    isPastMonth (d) {
      return this.beginningOfMonth(d) < this.beginningOfMonth(this.today())
    },
    isFutureMonth (d) {
      return this.beginningOfMonth(d) > this.beginningOfMonth(this.today())
    },

    isInFuture (d) {
      return this.dateOnly(d) > this.today()
    },
    isInPast (d) {
      return this.dateOnly(d) < this.today()
    },
    isLastInstanceOfMonth (d) {
      return d.getMonth() !== this.addDays(d, 7).getMonth()
    },
    isLastDayOfMonth (d) {
      return d.getMonth() !== this.addDays(d, 1).getMonth()
    },
    isSelectedDay (d) {
      var day = Object.keys(this.dateClasses).find((day) =>
        this.isSameDate(this.fromIsoStringToLocalDate(day), d)
      )
      return day ? this.dateClasses[day] : undefined
    },
    // Courtesy https://stackoverflow.com/questions/33908299/javascript-parse-a-string-to-date-as-local-time-zone/42626876#42626876
    fromIsoStringToLocalDate (s) {
      let ds = s.split(/\D/).map((s) => Number(s))
      ds[1]-- // adjust month
      return new Date(...ds)
    },

    toLocalDate (d) {
      return typeof d === 'string'
        ? this.fromIsoStringToLocalDate(d)
        : new Date(d)
    },

    dateOnly (d) {
      // Always use a copy, setHours mutates argument
      const d2 = new Date(d)
      d2.setHours(0, 0, 0, 0)
      return d2
    },

    // ******************************
    // Localization
    // ******************************

    languageCode: (l) => l.substring(0, 2),

    supportsIntl: () => typeof Intl !== 'undefined',

    getFormattedMonthNames (locale, format) {
      return Array(12)
        .fill()
        .map((_, i) => this.$utils.getMonthsI18n(i))
    },

    getFormattedWeekdayNames (startingDayOfWeek) {
      return Array(7)
        .fill()
        .map((_, i) =>
          this.$utils.getWeekDaysI18n((i + startingDayOfWeek - 1) % 7))
    },

    getDefaultBrowserLocale () {
      // If not running in the browser, cannot determine a default, return the code for unknown (blank is invalid)
      if (typeof navigator === 'undefined') return 'unk'
      // Return the browser's language setting, implementation is browser-specific
      return (navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language || navigator.browserLanguage
      ).toLowerCase()
    },

    itemComparer (a, b) {
      if (a.startDate < b.startDate) return -1
      if (b.startDate < a.startDate) return 1
      if (a.endDate > b.endDate) return -1
      if (b.endDate > a.endDate) return 1
      return a.id < b.id ? -1 : 1
    },

    // ******************************
    // Calendar Items
    // ******************************
    normalizeItem (item, isHovered) {
      // Classes may be a string, an array, or null. Normalize to an array
      const itemClasses = item.classes
        ? Array.isArray(item.classes)
          ? [...item.classes]
          : [item.classes]
        : []
      // Provides support for pseudo-hover of entire item when one part of it is hovered
      if (isHovered) itemClasses.push('isHovered')
      return {
        originalItem: item,
        startDate: this.toLocalDate(item.startDate),
        // For an item without an end date, the end date is the start date
        endDate: this.toLocalDate(item.endDate || item.startDate),
        classes: itemClasses,
        // Items without a title are untitled
        title: item.title || 'Untitled',
        // An ID is *required*. Auto-generating leads to weird bugs because these are used as keys and passed in items
        id: item.id
      }
    },
    getColumnDOWClass (dayIndex) {
      return 'dow' + ((dayIndex + this.startingDayOfWeek) % 7)
    },
    periodLabel () {
      return this.formattedPeriod(
        this.periodStart,
        this.periodEnd,
        this.displayPeriodUom,
        this.monthNames
      )
    },
    // Period that today's date sits within
    currentPeriodStart () {
      return this.beginningOfPeriod(
        this.today(),
        this.displayPeriodUom,
        this.startingDayOfWeek
      )
    },
    getIncrementedPeriod (count) {
      const newStartDate = this.incrementPeriod(
        this.periodStart,
        this.displayPeriodUom,
        count
      )
      const newEndDate = this.incrementPeriod(
        newStartDate,
        this.displayPeriodUom,
        this.displayPeriodCount
      )
      if (this.disablePast && newEndDate <= this.today()) return null
      if (this.disableFuture && newStartDate > this.today()) return null

      if (newEndDate <= this.selectionStart) return null
      if (newStartDate >= this.selectionEnd) return null
      return newStartDate
    },

    customButtons () {
      if (this.showCreateShiftButton) {
        this.$router.push({ name: 'SCHEDULE_DETAIL:SHIFT_CREATE' })
      }
    },

    async getCalendarEvents () {
      const start = this.periodStart.toJSON().slice(0, 10).replace(/\/|-/g, '-')
      const end = this.periodEnd.toJSON().slice(0, 10).replace(/\/|-/g, '-')
      await this.$store.dispatch('calendar/fetchEvents', { id: this.schedule.id, query: `?start=${start}&end=${end}` })
    },

    setShowDate (d) {
      this.showDate = d
    },

    findAndSortItemsInDateRange (startDate, endDate) {
      // Return a list of items that INCLUDE any day within the date range,
      // inclusive, sorted so items that start earlier are returned first.

      return this.fixedItems
        .filter(
          (item) =>
            item.endDate >= startDate &&
         this.dateOnly(item.startDate) <= endDate,
          this
        )
        .sort(this.itemComparer)
    },

    dayHasItems (day) {
      return this.fixedItems.find(
        (d) => d.endDate >= day && this.dateOnly(d.startDate) <= day
      )
    },

    findAndSortItemsInWeek (weekStart) {
      // Return a list of items that INCLUDE any portion of a given week.
      return this.findAndSortItemsInDateRange(
        weekStart,
        this.addDays(weekStart, 6)
      )
    },
    onClickItem (event) {
      this.$router.push(`${window.location.pathname.replace(/\/$/, '')}/shift-detail/${event.id}`)
    },

    async showMore (item) {
      const items = this.items.filter((obj) => this.isSameDate(obj.startDate, item.startDate))
      const sortedItems = items.map(item => ({
        id: item.id,
        title: item.title,
        duration: this.getFormattedTimeRange(item),
        start: item.startDate
      }))
      await this.$store.dispatch('calendar/setShowMoreItems', sortedItems)
      this.$router.push({ name: 'SCHEDULE_DETAIL:SHOW_MORE_ITEMS', params: { id: this.schedule.id } })
    }

  },
  computed: {

    defaultedShowDate () {
      if (this.showDate) return this.dateOnly(this.showDate)
      return this.today()
    },

    periodStart () {
      const start = this.beginningOfPeriod(
        this.defaultedShowDate,
        this.displayPeriodUom,
        this.startingDayOfWeek
      )
      this.$store.dispatch('calendar/setEventStart', this.$moment(start).format('YYYY-MM-DD'))
      return start
    },
    periodEnd () {
      const end = this.addDays(
        this.incrementPeriod(
          this.periodStart,
          this.displayPeriodUom,
          this.displayPeriodCount
        ),
        -1
      )
      this.$store.dispatch('calendar/setEventEnd', this.$moment(end).format('YYYY-MM-DD'))
      return end
    },

    headerProps () {
      return {
        // Dates for UI navigation
        previousPeriod: this.getIncrementedPeriod(-1),
        nextPeriod: this.getIncrementedPeriod(1),
        currentPeriod: this.today(),
        isBetweenCurrentPeriod: this.today() <= this.selectionEnd && this.today() >= this.selectionStart,
        periodLabel: this.getMonth(0) + ' ' + this.getYear(0)
      }
    },

    scheduleEmployees () {
      return this.$store.state.schedule.scheduleRelatedEmployees
    },
    periodDays () {
      return this.getDaysArray(this.periodStart, this.periodEnd)
    },
    loadingEvents () {
      return this.$store.state.calendar.fetching_events
    },
    schedule () {
      return this.$store.state.calendar.schedule
    },
    showCreateShiftButton () {
      return this.schedule.status !== SCHEDULE_STATUS_CHOICES.value('PRODUCING_SCHEDULE')
    },

    weekdayNames () {
      return this.getFormattedWeekdayNames(this.startingDayOfWeek)
    },

    displayFirstDate () {
      return this.beginningOfWeek(this.periodStart, this.startingDayOfWeek)
    },
    displayLastDate () {
      return this.endOfWeek(this.periodEnd, this.startingDayOfWeek)
    },

    weeksOfPeriod () {
      // Returns an array of object representing the date of the beginning of each week
      // included in the view.
      const numWeeks = Math.floor(
        (this.dayDiff(this.displayFirstDate, this.displayLastDate) + 1) / 7
      )
      return Array(numWeeks)
        .fill()
        .map((_, i) => this.addDays(this.displayFirstDate, i * 7))
    },

    fixedItems () {
      const self = this
      if (!this.items) return []
      return this.items.map((e) =>
        self.normalizeItem(
          e,
          self.currentHoveredItemId && e.id === self.currentHoveredItemId
        )
      )
    },

    selectionStart () {
      return this.$moment(this.$moment.tolocal(this.schedule.start)).toDate()
    },
    selectionEnd () {
      return this.$moment(this.$moment.tolocal(this.schedule.end)).toDate()
    },
    periodStartCalendarWeek () {
      const firstWeekStarts = this.beginningOfWeek(
        this.beginningOfPeriod(this.periodStart, 'year'),
        this.startingDayOfWeek
      )
      const periodWeekStarts = this.beginningOfWeek(
        this.periodStart,
        this.startingDayOfWeek
      )
      return 1 + Math.floor(this.dayDiff(firstWeekStarts, periodWeekStarts) / 7)
    },

    displayMonth () {
      return this.displayPeriodUom === 'month'
    },
    displayPeriodUom () {
      return this.$store.state.calendar.displayView
    }

  }
}
