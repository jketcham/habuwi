'use strict';

angular.module('habuwiApp')
  .controller('HackathonExploreCtrl', function ($scope, $http, socket, Hackathons) {
    $scope.hackathons = Hackathons.getIndex().$object;

  });

angular.module('habuwiApp')
  .controller('HackathonPageCtrl', function ($scope, $http, $state, socket, Hackathons, User, Auth, hackathon) {
    $scope.hackathon = hackathon;
    $scope.hackathon.participants = Hackathons.getParticipants().$object;
    $scope.hackathon.teams = Hackathons.getTeams().$object;
    $scope.currentParticipant = Hackathons.getCurrentUser().$object;
    $scope.currentUser = {};
    if(Auth.isLoggedIn()) {
      $scope.currentUser = User.get();
    }

    $scope.joinHackathon = function(data) {
      Hackathons.addParticipant(hackathon._id, data).then(function(res) {
        if(res && !res.error) {
          $scope.hackathon.participating = true;
          $scope.hackathon.btn.class = 'btn-success';
          $scope.hackathon.btn.text = 'Participating';
          $state.go('hackathons.page', { id: hackathon._id });
        }
      });
    }
  });
