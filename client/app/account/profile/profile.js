'use strict';

angular.module('habuwiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/profiles/views/explore.html',
        controller: 'PeopleExploreCtrl'
      })
      .state('people.profile', {
        url: '/:id',
        templateUrl: 'app/profiles/views/profile.html',
        controller: 'ProfilePageCtrl',
        resolve: {
          user: function($stateParams, Users) {
            return Users.getUser($stateParams.id);
          }
        }
      });
  });