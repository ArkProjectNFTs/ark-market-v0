import moment from "moment";

export function formatTimeAgo(timestamp: number) {
  const currentTime = moment();
  const timestampMoment = moment.unix(timestamp);

  const duration = moment.duration(currentTime.diff(timestampMoment));

  if (duration.years() >= 1) {
    const years = duration.years();
    return years + (years === 1 ? " year" : " years") + " ago";
  } else if (duration.months() >= 1) {
    const months = duration.months();
    return months + (months === 1 ? " month" : " months") + " ago";
  } else if (duration.days() >= 1) {
    const days = duration.days();
    return days + (days === 1 ? " day" : " days") + " ago";
  } else if (duration.hours() >= 1) {
    const hours = duration.hours();
    return hours + (hours === 1 ? " hour" : " hours") + " ago";
  } else if (duration.minutes() >= 1) {
    const minutes = duration.minutes();
    return minutes + (minutes === 1 ? " minute" : " minutes") + " ago";
  }

  const seconds = duration.seconds();
  return seconds + (seconds === 1 ? " second" : " seconds") + " ago";
}
