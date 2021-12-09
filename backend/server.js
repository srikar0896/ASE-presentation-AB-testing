var express = require("express");
var cookieParser = require("cookie-parser");
var ab = require("express-ab");

var { db } = require("./db");
var { Tracks } = require("./constants");

const experimentLabels = {
  1: "Variant A",
  2: "Variant B",
};

var app = express();
var cors = require("cors");
app.use(cors());
app.use(cookieParser());

var searchExperiment = ab.test("search-experiment", { cookie: false });

app.get("/", searchExperiment(null, 0.5), function (req, res) {
  console.log("req1", req.query);
  const response = db.tracks.search(req.query.q);
  console.log("response", response);
  res.send({
    tracks: response,
    expererimentId: 1,
    experimentLabel: experimentLabels[1],
  });
});

app.get("/", searchExperiment(null, 0.5), function (req, res) {
  console.log("req2", req.query);
  const response = db.tracks.improved_search(req.query.q);
  console.log("response", response);
  res.send({
    tracks: response,
    expererimentId: 2,
    experimentLabel: experimentLabels[2],
  });
});

app.listen(8080);
