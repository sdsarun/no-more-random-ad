import pureDayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

pureDayjs.extend(relativeTime);

const dayjs = pureDayjs;

export default dayjs;