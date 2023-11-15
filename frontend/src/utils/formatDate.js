// Función para formatear la fecha en "yyyy-MM-dd"
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  // Agrega un cero delante si el mes o el día son menores a 10
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};
