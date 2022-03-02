const request = require("postman-request");

const geocode = (address) => {
  const key =
    "pk.eyJ1IjoiaGFla2FsMTIzIiwiYSI6ImNsMDEzYzRqczBjejgzZG9kNzRxaDZrNXYifQ.ifG2opCcS1nyJG6eeNKmng";
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=${limit}`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response) => {
      const { features } = response.body;
      if (error) {
        reject("Unable to connect to location services!");
      } else if (features.length === 0) {
        reject("Unable to find location. Try another search.");
      } else {
        resolve({
          latitude: features[0].center[0],
          longitude: features[0].center[1],
          location: features[0].place_name,
        });
      }
    });
  });
};

module.exports = geocode;
