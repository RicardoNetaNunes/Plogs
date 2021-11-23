const { Schema, model } = require("mongoose");

require("./Places.model")

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false /* (had to make it false, bc if true the user has to enter the email when logging in and we just ask for the username and password) */
  },

  placesAdded: [{ type: Schema.Types.ObjectId, ref: 'places' }],
  placesVisited: [{ type: Schema.Types.ObjectId, ref: 'places' }]
}, 
{
  timestamps: {
    createdAt: "createdAt", 
    updatedAt: "updatedAt" 
  }
});
  

const User = model("User", userSchema);

module.exports = User;
