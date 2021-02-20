const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  companyName: String,
  companyDesc: String,
  contactNumber: Number,
  contactEmail: String,
  logo: String,
  state: String,
  city: String,
  firstName: String,
  lastName: String,
  emailId:String
});

module.exports = mongoose.model("Listing", listingSchema);
