const getDateEighteenYearsAgo = (): string => {
  const date = new Date();
  const currentYear = date.getFullYear();
  date.setFullYear(currentYear - 18);
  return date.toISOString().slice(0, 10);
};

export default getDateEighteenYearsAgo;
