export const formatEventTime = (startTime: Date, endTime: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const formattedStartTime = startTime.toLocaleTimeString('en-GB', options);
  const formattedEndTime = endTime.toLocaleTimeString('en-GB', options);
  return `${formattedStartTime} til ${formattedEndTime}`;
};
