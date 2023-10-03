// FIXME: moment not working
import { DateTime } from "luxon";

const getRelativeTime = (date: string, lang: string) =>
  DateTime.fromISO(date).setLocale(lang).toRelative();

export default getRelativeTime;
