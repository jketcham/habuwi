'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HackathonSchema = new Schema({
  name: String,
  info: String,
  url: String,
  date: Date,
  header_image_key: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);