const request = require("postman-request");
const reverseGeoCode = (lat, long) => {
  const key = "97b60d6d07749dae5b4eba4be30d3c19";
  const url = `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${lat},${long}`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response) => {
      const variabel = response.body;
      if (error) {
        reject("Unable to connect to location services!");
      } else if (variabel.error) {
        reject("Unable to find location. Try another search.");
      } else {
        resolve(variabel.data);
      }
    });
  });
};

module.exports = reverseGeoCode;
