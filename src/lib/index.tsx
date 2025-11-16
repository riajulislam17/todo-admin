export const getDayName = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return new Date().toLocaleDateString("en-US", options);
};

export const getDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
};
