'use strict';

angular.module('habuwiApp')
  .controller('HackathonExploreCtrl', function ($scope, $http, socket, Hackathons) {
    $scope.hackathons = Hackathons.getIndex().$object;

  });

angular.module('habuwiApp')
  .controller('HackathonPageCtrl', function ($scope, $http, socket, Hackathons, hackathon) {
    $scope.hackathon = hackathon;
    $scope.hackathon.participants = Hackathons.getParticipants().$object;
    $scope.hackathon.teams = Hackathons.getTeams().$object;
    $scope.currentParticipant = Hackathons.getCurrentUser().$object;
  });
