const { Schema, model } = require("mongoose");

require("./User.model")
require("./Opinions.model")

const placeSchema = new Schema({
    lat: {
        type: Number,
        required: false
    },
    lon: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
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

const Places = model("places", placeSchema);

module.exports = Places;