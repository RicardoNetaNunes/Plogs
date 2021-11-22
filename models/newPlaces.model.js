const { Schema, model } = require("mongoose");

require("./User.model")
require("./Opinions.model")

const newplaceSchema = new Schema({
    name: String,
    description: String,
    location: { type: { type: String }, coordinates: [Number] },
    place: {
      type: String,
      required: false
  },
  description: {
      type: String,
      required: false
  },
  authorId: {
      ref: "User",
      type: Schema.Types.ObjectId
  },
  image: {
     type: String,
      default: '/public/images/default-image-150x150.jpg'
  },
  opinions: [{ 
      type: Schema.Types.ObjectId, 
      ref: "opinions" 
  }]


  });

const NewPlaces = model("newPlaces", newplaceSchema);


newplaceSchema.index({ location: '2dsphere' });

module.exports = NewPlaces;