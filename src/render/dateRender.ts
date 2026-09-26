export const renderDate = () => {
  const currentDay =
    document.querySelector<HTMLParagraphElement>("#current-day");
  const currentDate =
    document.querySelector<HTMLParagraphElement>("#current-date");

  if (!currentDay || !currentDate) {
    throw new Error("Date elements not found");
  }

  currentDay.innerHTML = "";
  currentDate.innerHTML = "";

  const date = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
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

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${monthName} ${dayNumber}, ${year}`;

  currentDay.textContent = dayName;
  currentDate.textContent = formattedDate;
};
