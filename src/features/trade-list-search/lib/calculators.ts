export const calculateYearMonth = (year: number, month: number): string => {
  return year + month.toString().padStart(2, "0");
};
