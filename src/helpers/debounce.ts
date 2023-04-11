export const debounce = (fn: any, ms: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(args);
    }, ms);
  };
};
