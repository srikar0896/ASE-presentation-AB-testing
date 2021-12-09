const db = {};
var {
  Tracks,
  BadResponse2,
  ImprovedResults,
  ImprovedDesperadoResults,
} = require("./constants");

const search = (query) => {
  if (query == "desperado") {
    return Tracks;
  }
  if (query == "rihanna desperado") {
    return BadResponse2;
  }
};

const improved_search = (query) => {
  if (query == "desperado") {
    return ImprovedDesperadoResults;
  }
  if (query == "rihanna desperado") {
    return ImprovedDesperadoResults;
  }
};

exports.db = {
  tracks: {
    search,
    improved_search,
  },
};
