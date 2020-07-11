const Clarifai = require("clarifai");

// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "86599ec32c4a4034aa32c3b83e4568e7",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      // This part has been updated with the recent Clarifai changes. Used to be:
      // .predict(Clarifai.FACE_DETECT_MODEL, ....)
      "e15d0f873e66047e579f90cf82c9882z",
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users").where("id", "=", id).increment("entries", 1);
  returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
