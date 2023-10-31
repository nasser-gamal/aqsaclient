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
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const amPm = hours < 12 ? 'ص' : 'م';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;
  return formattedTime;
};

export const DateInput = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return getCurrentDateTime();
};


// function DateTimeInput() {
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = `${now.getMonth() + 1}`.padStart(2, '0');
//     const day = `${now.getDate()}`.padStart(2, '0');
//     const hours = `${now.getHours()}`.padStart(2, '0');
//     const minutes = `${now.getMinutes()}`.padStart(2, '0');

//     return `${year}-${month}-${day}T${hours}:${minutes}`;
//   };
//   return getCurrentDateTime();
// }