// Function to calculate the number of days remaining until the specified date
const getRdays = (date) => {
  const datenow = new Date();
  const travelDate = new Date(date);
  const timeDif = travelDate.getTime() - datenow.getTime();
  // Convert the time difference from milliseconds to days, rounding up to the nearest whole number

  const Rdays = Math.ceil(timeDif / (1000 * 3600 * 24));
  return Rdays;
};

module.exports = { getRdays };
