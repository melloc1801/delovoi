export const numberToMMSS = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % ((min || 1) * 60);
  const fmin = min < 10 ? `0${min}` : min;
  const fsec = sec < 10 ? `0${sec}` : sec;
  return `${fmin}:${fsec}`;
};
