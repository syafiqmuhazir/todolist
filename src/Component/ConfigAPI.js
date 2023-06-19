export const API_URL = "https://todo.api.devcode.gethired.id/";

export const formatDateDayEs = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
};
