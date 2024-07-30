export const getNowDateInFormate = () => {
  // Create a new Date object with the current date and time
  const currentDate = new Date();

  // Get the month name from the date object
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentDate.getMonth()];

  // Get the day and year from the date object
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Format the date string
  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};
