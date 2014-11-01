'use strict';

angular.module('habuwiApp')
.factory('Hackathons', ['Restangular', function(Restangular) {
  return {
    getIndex: function() {
      return Restangular.all('hackathons').getList();
    },
    getHackathon: function(id) {
      return Restangular.one('hackathons', id).get();
    },
    getParticipants: function(id) {
      return Restangular.one('hackathons', id).all('participants').getList();
    },
    getTeams: function(id) {
      return Restangular.one('hackathons', id).all('teams').getList();
    },
    getCurrentUser: function(id, user) {
      return Restangular.one('hackathons', id).one('users', user).get();
    },
    create: function(data) {
      return Restangular.all('hackathons').post(data);
    },
    addTeam: function(id, team) {
      return Restangular.one('hackathons', id).all('teams').post(team);
    },
    removeTeam: function(id, team) {
      return Restangular.one('hackathons', id).one('teams', team).remove();
    },
    addParticipant: function(id, participant) {
      return Restangular.one('hackathons', id).all('participants').post(participant);
    },
    removeParticipant: function(id, participant) {
      return Restangular.one('hackathons', id).one('participant', participant).remove();
    }
  }
}]);