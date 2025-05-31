import pureDayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import isLeapYear from "dayjs/plugin/isLeapYear";
import buddhistEra from 'dayjs/plugin/buddhistEra'
import advancedFormat from "dayjs/plugin/advancedFormat"
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/th';

pureDayjs.extend(relativeTime);
pureDayjs.locale("th");
pureDayjs.extend(utc);
pureDayjs.extend(isBetween);
pureDayjs.extend(isLeapYear);
pureDayjs.extend(buddhistEra);
pureDayjs.extend(advancedFormat);
pureDayjs.extend(localizedFormat)

const dayjs = pureDayjs;

export default dayjs;