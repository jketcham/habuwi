'use strict';

var _ = require('lodash');
var async = require('async');
var Hackathon = require('./hackathon.model');
var Participant = require('./participant.model');
var Team = require('../team/team.model');
var User = require('../user/user.model');

// Get list of hackathons
exports.index = function(req, res) {
  Hackathon.find({}, '-participants -teams', function (err, hackathons) {
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
  Hackathon.findById(req.params.id, '-participants -teams', function (err, hackathon) {
    if(err) { return handleError(res, err); }
    if(!hackathon) { return res.send(404); }
    return res.json(200, hackathon);
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
  Hackathon.findByIdAndUpdate(req.params.id, { $push: { participants: req.user._id } },
    function(err, hackathon) {
      if(err) { return handleError(res, err); }
      if(!hackathon) { return res.send(404); }
      User.findByIdAndUpdate(req.user._id, { $push: { hackathons: { hackathon: hackathon._id, interests: req.body.interests, info: req.body.info } } },
        function(err, user) {
          if(err) { return handleError(res, err); }
          if(!user) { return res.send(404); }
          return res.json(200, user.hackathons);
        });
    });
};

// Remove participant from hackathon
exports.removeParticipant = function(req, res) {
  Hackathon.findByIdAndUpdate(req.params.id, { $pull: { participants: req.user._id } },
    function(err, hackathon) {
      if(err) { return handleError(res, err); }
      if(!hackathon) { return res.send(404); }
      User.findByIdAndUpdate(req.user._id, { $pull: { hackathons: { hackathon: hackathon._id } } },
        function(err, user) {
          if(err) { return handleError(res, err); }
          if(!user) { return res.send(404); }
          return res.json(200, hackathon.participants);
        });
    });
};

// Get participants
exports.getParticipants = function(req, res) {
  Hackathon.findById(req.params.id, 'participants')
    .populate('participants', '-hashedPassword -salt')
    .exec(function(err, hackathon) {
      if(err) { return handleError(res, err); }
      if(!hackathon) { return res.send(404); }
      return res.json(200, hackathon.participants);
    });
};

// Get a single participant
exports.isParticipant = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    console.log(user.hackathons.length);
    if(user.hackathons.length == 0) { return res.json({ "error": { "text": "User not a participant" } }); }
    _.find(user.hackathons, function(hackathon) {
      console.log(hackathon);
      if(hackathon._id == req.params.id) {
        return res.json(200, user);
      } else {
        return res.json({ "error": { "text": "User not a participant" } });
      }
    });
  });
};

// Add interest to work with another participant
exports.addProspect = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var hackathon = user.hackathons.id(req.params.id);
    if(!hackathon) { return res.send(404); }
    console.log(hackathon);
    hackathon.prospects.push( req.params.participant_id );
    User.findById(req.params.participant_id, function(err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
      var hackathon = user.hackathons.id(req.params.id);
      if(!hackathon) { return res.send(404); }
      console.log(hackathon);
      hackathon.notifications.push( req.body._id );
      return res.send(201);
    });
  });
};

exports.removeProspect = function(req, res) {

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
    if (err) { return handleError(res, err); }
    async.parallel([
      function(callback) {
        Hackathon.findByIdAndUpdate(req.params.id, { $push: { teams: team._id } },
          function(err, hackathon) {
            if (!hackathon) { return res.send(404); }
            callback(err, hackathon);
          });
      },
      function(callback) {
        User.findById(req.user._id, 'hackathons', function(err, user) {
          if (!user) { return res.send(404); }
          // :'(
          for(var i = 0; i <= user.hackathons.length; i++) {
            if(user.hackathons[i]._id == req.body.user_hackathon) {
              user.hackathons[i].team = team._id;
              user.save(function(err, result) {
                callback(err, result);
              });
              break;
            }
          }
        });
      }
    ], function(err, results) {
      if(err) { return handleError(res, err); }
      return res.json(201, team);
    });
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
      if (err) { return handleError(res, err); }
      if (!hackathon) { return res.send(404); }
      return res.json(200, hackathon.teams);
    });
};

// Search teams
exports.searchTeams = function(req, res) {

};

// Updates an existing hackathon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hackathon.findById(req.params.id, function (err, hackathon) {
    if (err) { return handleError(res, err); }
    if (!hackathon) { return res.send(404); }
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