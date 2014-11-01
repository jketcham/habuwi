'use strict';

var _ = require('lodash');
var Team = require('./team.model');
var Hackathon = require('../hackathon/hackathon.model');

// Get list of teams
exports.index = function(req, res) {
    Team.find(function(err, teams) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, teams);
    });
};

// Get a single team
exports.show = function(req, res) {
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        return res.json(team);
    });
};

// Creates a new team in the DB.
exports.create = function(req, res) {
    Team.create(req.body, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, team);
    });
};

// Updates an existing team in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        var updated = _.merge(team, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, team);
        });
    });
};

// Deletes a team from the DB.
exports.destroy = function(req, res) {
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            return handleError(res, err);
        }
        if (!team) {
            return res.send(404);
        }
        team.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

// Get team's Participants
exports.getParticipants = function(req, res) {
    Team.findById(req.params.id)
        .populate('participants')
        .exec(function(err, team) {
            if (err) handleError(res, err);
            if (!team) return res.send(404);
            return res.json(team.participants);
        });
};

// Add participant
exports.addParticipant = function(req, res) {
    Hackathon.findById(req.params.id, 'participants', function(err, hackathon) {
        if (err) {
            return handleError(res, err);
        }
        var participant = hackathon.participants.id(req.body.participant._id);
        if (!participant) {
            return res.send(404);
        }
        Team.findByIdAndUpdate(req.params.id, {
            $push: {
                participants: participant
            }
        }, function(err, team) {
            if (err) {
                return handleError(res, err);
            }
            if (!team) {
                return res.send(404);
            }
            return res.json(201, team.participants);
        });
    });
};



// Removing participant
exports.removeParticipant = function(req, res) {
    Hackathon.findById(req.params.id, 'participants', function(err, hackathon) {
        if (err) {
            return handleError(res, err);
        }
        var participant = hackathon.participants.id(req.body.participant._id);
        Team.findByIdAndUpdate(req.params.id, {
            $pull: {
                participants: participant
            }
        }, function(err, team) {
            if (err) {
                return handleError(res, err);
            }
            if (!team) return res.send(404);
            return res.send(200);
        });
    });

};

exports.addSkill = function(req, res) {
    Team.findByIdAndUpdate(req.params.id, {
        $push: {
            skills: req.body

        }
    }, function(err, team) {
        if (err) return handleError(res, err);
        if (!team) return res.send(404);
        return res.send(200);
    });
};


exports.removeSkill = function(req, res) {
    Team.findByIdAndUpdate(req.params.id, {
        $pull: {
            skills: req.body

        }
    }, function(err, team) {
        if (err) return handleError(res, err);
        if (!team) return res.send(404);
        return res.send(200);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
