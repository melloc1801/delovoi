import moment from 'moment/moment';

export const formatWorkHours = (start: string, end: string) => {
  const s = moment(start, 'hh:mm:ss').format('HH:mm');
  const e = moment(end, 'hh:mm:ss').format('HH:mm');
  return `${s}-${e}`;
};
