const { Schema, model } = require("mongoose");

require("./User.model")
require("./Opinions.model")

const placeSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rate: {
        type: Number,
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

const Places = model("places", placeSchema);

module.exports = Places;