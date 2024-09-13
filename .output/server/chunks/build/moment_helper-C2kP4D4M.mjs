import moment from 'moment-timezone';

const sortByTime = (arrObj, sort) => {
  if (arrObj === null || arrObj === void 0 || arrObj === "")
    return [];
  return arrObj.sort((a, b) => {
    if (sort) {
      return new Date(b.match_time).getTime() - new Date(a.match_time).getTime();
    } else
      return new Date(a.match_time).getTime() - new Date(b.match_time).getTime();
  }, sort);
};
const formatTimeSince = (dateString) => {
  if (dateString === null || dateString === void 0 || dateString === "")
    return "";
  return moment(dateString).fromNow();
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

export { formatTimeSince as a, formatDateMomentUTCTimeZone as f, sortByTime as s, timeStamp2DateUTCTimeZone as t };
//# sourceMappingURL=moment_helper-C2kP4D4M.mjs.map
