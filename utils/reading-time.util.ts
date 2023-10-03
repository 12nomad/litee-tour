import { readingTime } from "reading-time-estimator";

const getReadingTime = (text: string, lang: any) =>
  readingTime(text, undefined, lang).text;

export default getReadingTime;
