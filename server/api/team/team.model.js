'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var teamTypes = ['Web','Mobile','Hardware'];


var TeamSchema = new Schema({
  name: String,
  host: {type:Schema.Types.ObjectId, ref:'Participant'},
  description: String,
  hackathon: {type:Schema.Types.ObjectId, ref: 'Hackathon'},
  participants: [{type:Schema.Types.ObjectId, ref: 'Participant'}],
  skills: [String],
  maxSize: Number,
  full: Boolean,
  created_on: {type: Date, default: Date.now},
  github: {}
});

module.exports = mongoose.model('Team', TeamSchema);