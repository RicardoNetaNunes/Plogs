const { Schema, model } = require("mongoose");

require("./User.model")
require("./Places.model")

const reviewSchema = new Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    comment: {
        type: String,
        required: true,
  },
  userId: {
    ref: "user",
    type: Schema.Types.ObjectId
  }, 
  placesId : {
    ref: "places",
    type: Schema.Types.ObjectId
  }
  });

const Opinions = model("opinions", reviewSchema);

module.exports = Opinions;