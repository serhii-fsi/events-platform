export const dateTo = {
  hhmm(date: Date | null | undefined): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  },
};
