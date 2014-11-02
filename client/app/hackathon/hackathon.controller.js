'use strict';

angular.module('habuwiApp')
  .controller('HackathonExploreCtrl', function ($scope, $http, socket, Hackathons) {
    $scope.hackathons = Hackathons.getIndex().$object;

  });

angular.module('habuwiApp')
  .controller('HackathonPageCtrl', function ($scope, $http, $state, socket, Hackathons, User, Auth, hackathon, user) {
    $scope.hackathon = hackathon;
    $scope.currentUser = user;
    $scope.currentUser.isParticipant = false;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.hackathon.participants = Hackathons.getParticipants(hackathon._id).$object;
    $scope.hackathon.teams = Hackathons.getTeams(hackathon._id).$object;

    var user_hackathon = {};

    // Check if the user is logged in and a participant in
    // this hackathon
    if(Auth.isLoggedIn()) {
      user.hackathons.forEach(function(result) {
        if(result.hackathon == hackathon._id) {
          console.log(result);
          user_hackathon = result._id;
          $scope.currentUser.isParticipant = true;
          $scope.currentUser.team = result.team;
          $scope.currentUser.hackathon = result;
          return;
        }
      });
    }

    /**
     * Function to allow user to join a hackathon
     * @param  {Object} data User form submitted to join group
     */
    $scope.joinHackathon = function(data) {
      Hackathons.addParticipant(hackathon._id, data).then(function(res) {
        if(res && !res.error) {
          console.log(res);
          $scope.hackathon.participating = true;
          $scope.hackathon.btn.class = 'btn-success';
          $scope.hackathon.btn.text = 'Participating';
          $scope.hackathon.participants.push(res);
          $scope.currentUser.hackathon = {};
          $scope.currentUser.hackathon.hackathon = hackathon;
          $scope.currentUser.hackathon.prospects = [];
          $state.go('hackathons.page', { id: hackathon._id }, { reload: true });
        }
      });
    }

    /**
     * Function to allow user to create a team
     * @param  {Object} data User form submitted with team info
     */
    $scope.createTeam = function(data) {
      data.host = user._id;
      data.members = [];
      data.members.push(user._id);
      data.hackathon = hackathon._id;
      data.user_hackathon = user_hackathon;
      Hackathons.addTeam(hackathon._id, data).then(function(res) {
        if(res && !res.error) {
          $scope.hackathon.teams.push(data);
          $scope.currentUser.hackathon.team = data;
          $state.go('hackathons.page.teams.profile', { id: hackathon._id, team_id: res._id });
        }
      });
    }
  });

angular.module('habuwiApp')
  .controller('HackathonTeamProfileCtrl', function ($scope, $http, socket, Hackathons, team) {
    $scope.team = team;

  });