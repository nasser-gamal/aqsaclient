export const formattedDate = (dateValue) => {
  const date = new Date(dateValue);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const formattedTime = (value) => {
  const dateTime = new Date(value);
  const hours = dateTime.getHours() - 1;
  const minutes = dateTime.getMinutes();
  const amPm = hours < 12 ? 'ص' : 'م';
  const formattedHours = (hours % 12) || 12;
  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  return formattedTime;
};


