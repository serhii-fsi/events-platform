export const formatTime = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return time.toLocaleTimeString('en-GB', options);
};

export const formatEventTime = (startTime: Date, endTime: Date) => {
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);
  return `${formattedStartTime} til ${formattedEndTime}`;
};
