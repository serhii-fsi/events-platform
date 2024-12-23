export const formatEventTime = (startTime: string, endTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const formattedStartTime = new Date(startTime).toLocaleTimeString(
    'en-GB',
    options
  );
  const formattedEndTime = new Date(endTime).toLocaleTimeString(
    'en-GB',
    options
  );
  return `${formattedStartTime} til ${formattedEndTime}`;
};
