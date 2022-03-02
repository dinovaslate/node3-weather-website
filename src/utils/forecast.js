const request = require("postman-request");

const forecast = (address) => {
  const key = "8387616aa7c2f8957ba1181424862034";
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${address}&units=s`;
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response) => {
      if (error) {
        reject({ error });
      } else if (response.body.error) {
        const { code, info } = response.body.error;
        reject({ ...response.body.error, desc: `[ERROR-${code}]: ${info} ` });
      } else {
        const { weather_descriptions, temperature, feelslike } =
          response.body.current;
        resolve({
          ...response.body.current,
          desc: `it's ${weather_descriptions[0]}. It's currently ${temperature} K degress out. it feels like ${feelslike} K degress out`,
        });
      }
    });
  });
};

module.exports = forecast;
