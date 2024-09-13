import moment from 'moment-timezone';

const formatDateMoment = (dateString, formatTime = "yyyy-MM-DD") => {
  if (dateString === null || dateString === void 0 || dateString === "")
    return "";
  return moment(dateString).format(String(formatTime));
};
const formatDateMomentUTCTimeZone = (dateString, formatTime = "yyyy-MM-DD", timeZone = "GMT+07:00") => {
  try {
    if (dateString === null || dateString === void 0 || dateString === "")
      return "";
    if (timeZone !== "") {
      return moment(dateString).utcOffset(timeZone).format(formatTime);
    } else {
      return moment(dateString).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime);
    }
  } catch (error) {
    return "";
  }
};
const timeStamp2DateUTCTimeZone = (timestamp, formatTime = "yyyy-MM-DD", timeZone = "GMT+07:00") => {
  try {
    if (timestamp === null || timestamp === void 0 || timestamp === "")
      return "";
    const d = new Date(parseInt(timestamp) * 1e3);
    if (timeZone !== "") {
      return moment(d).utcOffset(timeZone).format(formatTime);
    } else {
      return moment(d).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime);
    }
  } catch (error) {
    return "";
  }
};

export { formatDateMoment as a, formatDateMomentUTCTimeZone as f, timeStamp2DateUTCTimeZone as t };
//# sourceMappingURL=moment_helper.mjs.map
