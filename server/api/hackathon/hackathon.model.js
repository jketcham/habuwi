'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HackathonSchema = new Schema({
  name: String,
  info: String,
  url: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  participants: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    info: String,
    interests: [{
      name: String
    }],
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  }],
  date: Date,
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);