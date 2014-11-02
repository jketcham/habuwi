'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  host: {type:Schema.Types.ObjectId, ref:'User'},
  info: String,
  hackathon: {type:Schema.Types.ObjectId, ref: 'Hackathon'},
  members: [{type:Schema.Types.ObjectId, ref: 'User'}],
  interests: [ String ],
  maxSize: Number,
  full: Boolean,
  created_on: {type: Date, default: Date.now},
  github: {}
});

module.exports = mongoose.model('Team', TeamSchema);