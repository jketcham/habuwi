'use strict';

var _ = require('lodash');
var Hackathon = require('./hackathon.model');

// Get list of hackathons
exports.index = function(req, res) {
  Hackathon.find(function (err, hackathons) {
    if(err) { return handleError(res, err); }
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