const { error } = require("console");
const request = require("request");


const movieData = (query, callback) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "Unable to fetch data, please try again" + error);
    }
    callback(false, data?.body);
  });
};

module.exports = movieData;
