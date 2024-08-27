const getRdays = (date) => {
    const datenow = new Date();
    const travelDate = new Date(date);
    const timeDif = travelDate.getTime() - datenow.getTime();
    const Rdays = Math.ceil(timeDif / (1000 * 3600 * 24));
    return Rdays;
};


module.exports  ={getRdays};