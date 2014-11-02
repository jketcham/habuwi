'use strict';

angular.module('habuwiApp')
.factory('Users', ['Restangular', function(Restangular) {
	return {
		getIndex: function() {
			return Restangular.all('users').getList();
		},
		getUser: function(id){
			return Restangular.one('users', id).get();
		},
		getTeamForHackathon: function(id,participant) {
			return Restangular.one('hackathons', id).one('participants', participant).one('team').get();
		}
	};
}]);