'use strict';

var _ = require('lodash');
var async = require('async');
var Hackathon = require('./hackathon.model');
var Participant = require('./participant.model');
var Team = require('../team/team.model');
var User = require('../user/user.model');

// Get list of hackathons
exports.index = function(req, res) {
  Hackathon.find(function (err, hackathons) {
    if(err) { return handleError(res, err); }
    return res.json(200, hackathons);
  });
};

// Get a list of hackathons //filters
exports.search = function(req, res) {
  Hackathon.find(req.query, function(err, hackathons) {
    if(err) { return handleError(res, err); }
    if(!hackathons) { return res.send(404); }
    return res.json(200, hackathons);
  });
};

// Get a single hackathon
exports.show = function(req, res) {
  Hackathon.findById(req.params.id, function (err, hackathon) {
    if(err) { return handleError(res, err); }
    if(!hackathon) { return res.send(404); }
    return res.json(hackathon);
  });
};

// Creates a new hackathon in the DB.
exports.create = function(req, res) {
  Hackathon.create(req.body, function(err, hackathon) {
    if(err) { return handleError(res, err); }
    return res.json(201, hackathon);
  });
};

// Add participant to hackathon
exports.addParticipant = function(req, res) {
  req.body.user = req.user._id;
  Hackathon.findByIdAndUpdate(req.params.id, { $push: { participants: req.body } },
    function(err, hackathon) {
      if(err) { return handleError(res, err); }
      if(!hackathon) { return res.send(404); }
      User.findByIdAndUpdate(req.user._id, { $push: { hackathons: hackathon._id } },
        function(err, user) {
          if(err) { return handleError(res, err); }
          if(!user) { return res.send(404); }
          return res.json(201, hackathon.participants);
        });
    });
};

// Remove participant from hackathon
exports.removeParticipant = function(req, res) {
  Hackathon.findByIdAndUpdate(req.params.id, { $pull: { participants: req.params.participant_id } },
    function(err, hackathon) {
      if(err) { return handleError(res, err); }
      User.findByIdAndUpdate(req.user._id, { $pull: { hackathons: hackathon._id } },
        function(err, user) {
          if(err) { return handleError(res, err); }
          if(!user) { return res.send(404); }
          return res.send(200);
        });
    });
};

// Get participants
exports.getParticipants = function(req, res) {
  Hackathon.findById(req.params.id, 'participants')
    .exec(function(err, hackathon) {
      // handle errors
      async.each(hackathon.participants, function(participant, callback) {
        User.populate(participant, [{ path: 'user' }, { path: 'team'}], function(err, user) {
          if (err) { return handleError(res, err); }

          callback();
        });
      }, function(err) {
        res.json(200, hackathon.participants);
      });
    });
};

// Search paricipants
exports.searchParticipants = function(req, res) {
  Hackathon.find(req.query, 'participants')
    .exec(function(err, hackathon) {
      if(err) { return handleError(res, err); }
      if(!hackathon) { return res.send(404); }
      async.each(hackathon.participants, function(participant, callback) {
        User.populate(participant, [{ path: 'user' }, { path: 'team'}], function(err, user) {
          if (err) { return handleError(res, err); }

          callback();
        });
      }, function(err) {
        if(err) { return handleError(res, err); }
        res.json(200, hackathon.participants);
      });
    });
};

// Add team to hackathon
exports.addTeam = function(req, res) {
  Team.create(req.body, function(err, team) {
    if(err) { return handleError(res, err); }
    return res.json(201, team);
  });
};

// Remove team from hackathon
exports.removeTeam = function(req, res) {
  Team.findById(req.params.id, function(err, team) {
    if(err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    team.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  })
};

// Get teams
exports.getTeams = function(req, res) {
  Hackathon.findById(req.params.id, 'teams')
    .populate('teams')
    .exec(function(err, hackathon) {
      // handle errors
      return res.json(200, teams);
    })
};

// Search teams
exports.searchTeams = function(req, res) {

};

// Updates an existing hackathon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hackathon.findById(req.params.id, function (err, hackathon) {
    if (err) { return handleError(res, err); }
    if(!hackathon) { return res.send(404); }
    var updated = _.merge(hackathon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, hackathon);
    });
  });
};

// Deletes a hackathon from the DB.
exports.destroy = function(req, res) {
  Hackathon.findById(req.params.id, function (err, hackathon) {
    if(err) { return handleError(res, err); }
    if(!hackathon) { return res.send(404); }
    hackathon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}