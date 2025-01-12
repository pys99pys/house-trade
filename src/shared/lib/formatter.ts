export const parseToNumberFormat = (number: number): string => {
  return new Intl.NumberFormat().format(number);
};
