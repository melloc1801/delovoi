import moment from 'moment/moment';
import { formatWorkHours } from './formatWorkHours';

export const formatDateIntoMyTaskFormat = (
  date: string,
  timeStart: string,
  timeEnd: string
) => {
  const d = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
  const t = formatWorkHours(timeStart, timeEnd);

  return `${d} ${t}`;
};
