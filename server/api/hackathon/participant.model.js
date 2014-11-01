'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  info: String,
  interests: [{
    name: String
  }]
});

module.exports = mongoose.model('Participant', ParticipantSchema);