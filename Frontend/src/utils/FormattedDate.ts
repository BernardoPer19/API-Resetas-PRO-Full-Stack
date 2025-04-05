export const formattedDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("es-ES");
  return formattedDate;
};
