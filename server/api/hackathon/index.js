'use strict';

var express = require('express');
var controller = require('./hackathon.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

// ## Participant routes
router.post('/:id/participants', auth.isAuthenticated(), controller.addParticipant);
router.delete('/:id/participants/:participant_id', auth.isAuthenticated(), controller.removeParticipant);
router.get('/:id/participants', controller.getParticipants);
router.get('/:id/participants/:user_id', auth.isAuthenticated(), controller.isParticipant);
router.post('/:id/participants/:participant_id/prospects', auth.isAuthenticated(), controller.addProspect);
router.delete('/:id/participants/:participant_id/prospects/:user_id', auth.isAuthenticated(), controller.removeProspect);

// ## Team routes
router.post('/:id/teams', auth.isAuthenticated(), controller.addTeam);
router.delete('/:id/teams/:team_id', auth.isAuthenticated(), controller.removeTeam);
router.get('/:id/teams', controller.getTeams);

module.exports = router;