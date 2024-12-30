import { off } from 'process';

export const date = {
  locale: 'en-GB',
  timezone: 'Europe/London',

  setLocale(locale: string) {
    this.locale = locale;
    return this;
  },

  setTimezone(timezone: string) {
    this.timezone = timezone;
    return this;
  },

  toHhmm(date: Date): string {
    return date.toLocaleTimeString(this.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: this.timezone,
    });
  },

  setHhmm(date: Date, hhmm: string) {
    // Parse target hours and minutes
    const [targetHh, targetMm] = hhmm.split(':').map(Number);
    // Get current hours and minutes in target timezone
    const currentTime = new Intl.DateTimeFormat('en-US', {
      timeZone: this.timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).format(date);
    const [currentHh, currentMm] = currentTime.split(':').map(Number);
    // Calculate offset in milliseconds
    const offsetMs =
      (targetHh - currentHh) * 60 * 60 * 1000 +
      (targetMm - currentMm) * 60 * 1000;
    // Apply offset to original date
    return new Date(date.getTime() + offsetMs);
  },

  to12h(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: this.timezone,
    };
    return date.toLocaleTimeString(this.locale, options);
  },

  prepareStartEnd(startAt: Date, endAt: Date) {
    const now = new Date();
    return {
      year: now.toLocaleDateString(this.locale, {
        year: 'numeric',
        timeZone: this.timezone,
      }),
      month: now.toLocaleDateString(this.locale, {
        month: 'long',
        timeZone: this.timezone,
      }),
      start: {
        seconds: startAt.getTime() / 1000,
        year: startAt.toLocaleDateString(this.locale, {
          year: 'numeric',
          timeZone: this.timezone,
        }),
        month: startAt.toLocaleDateString(this.locale, {
          month: 'long',
          timeZone: this.timezone,
        }),
        day: startAt.toLocaleDateString(this.locale, {
          day: 'numeric',
          timeZone: this.timezone,
        }),
        weekDay: startAt.toLocaleDateString(this.locale, {
          weekday: 'long',
          timeZone: this.timezone,
        }),
        h12: this.to12h(startAt),
      },
      end: {
        seconds: endAt.getTime() / 1000,
        year: endAt.toLocaleDateString(this.locale, {
          year: 'numeric',
          timeZone: this.timezone,
        }),
        month: endAt.toLocaleDateString(this.locale, {
          month: 'long',
          timeZone: this.timezone,
        }),
        day: endAt.toLocaleDateString(this.locale, {
          day: 'numeric',
          timeZone: this.timezone,
        }),
        weekDay: endAt.toLocaleDateString(this.locale, {
          weekday: 'long',
          timeZone: this.timezone,
        }),
        h12: this.to12h(endAt),
      },
    };
  },

  toStartEndObj(startAt: Date, endAt: Date) {
    const p = this.prepareStartEnd(startAt, endAt);

    let startYear = ` ${p.start.year}`;
    let endYear = ` ${p.end.year} `;
    if (p.start.year === p.end.year && p.start.year === p.year) {
      startYear = '';
      endYear = '';
    } else if (p.start.year === p.end.year) {
      endYear = '';
    }

    const startDayMonth = `${p.start.weekDay} ${p.start.day} ${p.start.month}`;
    let endDayMonth = `${p.start.weekDay} ${p.end.day} ${p.end.month}`;
    if (
      startDayMonth === endDayMonth ||
      p.end.seconds - p.start.seconds < 60 * 60 * 20
    ) {
      endDayMonth = ``;
    }

    if (!endYear && !endDayMonth) {
      return {
        date: `${startDayMonth}${startYear}`,
        timeRange: `${p.start.h12} till ${p.end.h12}`,
      };
    } else {
      return {
        start: { date: `${startDayMonth}${startYear}`, time: `${p.start.h12}` },
        end: { date: `${endDayMonth}${endYear}`, time: `${p.end.h12}` },
      };
    }
  },
};
