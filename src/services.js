const forecast = require("./utils/forecast");
const reverseGeo = require("./utils/reverseGeocode");
const weather = async (data) => {
  try {
    let weather;
    if (data.town) {
      weather = await forecast(data.town);
    } else {
      const result = await reverseGeo(data.lat, data.long);
      weather = await forecast(result[0].name);
    }
    return weather;
  } catch (error) {
    return error;
  }
};

module.exports = weather;
