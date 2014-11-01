'use strict';

var _ = require('lodash');
var Team = require('./team.model');

// Get list of teams
exports.index = function(req, res) {
  Team.find(function (err, teams) {
    if(err) { return handleError(res, err); }
    return res.json(200, teams);
  });
};

// Get a single team
exports.show = function(req, res) {
  Team.findById(req.params.id, function (err, team) {
    if(err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    return res.json(team);
  });
};

// Creates a new team in the DB.
exports.create = function(req, res) {
  Team.create(req.body, function(err, team) {
    if(err) { return handleError(res, err); }
    return res.json(201, team);
  });
};

// Updates an existing team in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Team.findById(req.params.id, function (err, team) {
    if (err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    var updated = _.merge(team, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, team);
    });
  });
};

// Deletes a team from the DB.
exports.destroy = function(req, res) {
  Team.findById(req.params.id, function (err, team) {
    if(err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    team.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get team's Participants
exports.getParticipants = function(req, res) {
  Team.findById(req.params.id)
    .populate('participants')
    .exec(function(err, team) {
      if (err) return next(err);
      if (!team) return res.send(404);
      return res.json(user.participants);
    });
}

// Add participant
exports.addParticipant = function(req, res) {
  Hackathon.findById(req.params.participant_id, function(err, participant) {
    if (err) return handleError(res, err);

    Team.findByIdAndUpdate(req.params.id, {$push: {participants: participant}}, funciton (err, model) {
       if (err) {return handleError(res,err);}
      if (!team) return res.send(404);
      return res.send(200);
    });
}
// Removing participant

exports.removeParticipant = function(req,res) {
 Hackathon.findById(req.params.participant_id, function(err, participant) {
    if (err) return handleError(res, err);

    Team.findByIdAndUpdate(req.params.id, {$pull: {participants: participant}}, funciton (err, model) {
       if (err) {return handleError(res,err);}
      if (!team) return res.send(404);
      return res.send(200);
    });
}
}

function handleError(res, err) {
  return res.send(500, err);
}