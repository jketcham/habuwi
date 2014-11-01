'use strict';

angular.module('habuwiApp')
  .controller('PeopleExploreCtrl', function ($scope, $http, socket, Users) {
  		$scope.users= Users.getIndex().$object;

  });

  angular.module('habuwiApp')
  .controller('ProfilePageCtrl', function ($scope, $http, socket, Users, user, hackathon) {
  		$scope.user = user;
  		$scope.userTeam = Users.getTeamForHackathon(hackathon,user._id).$object; 
  });