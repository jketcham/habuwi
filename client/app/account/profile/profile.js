'use strict';

angular.module('habuwiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/account/profile/views/explore.html',
        controller: 'PeopleExploreCtrl'
      })
      .state('people.profile', {
        url: '/:id',
        templateUrl: 'app/account/profile/views/profile.html',
        controller: 'ProfilePageCtrl',
        resolve: {
          user: function($stateParams, Users) {
            return Users.getUser($stateParams.id);
          }
        }
      });
  });