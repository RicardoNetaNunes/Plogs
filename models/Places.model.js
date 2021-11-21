const { Schema, model } = require("mongoose");

require("./User.model")
require("./Opinions.model")

const placeSchema = new Schema({
    name: String,
    description: String,
    location: { type: { type: String }, coordinates: [Number] }
  });

const Places = model("places", placeSchema);


placeSchema.index({ location: '2dsphere' });

module.exports = Places;