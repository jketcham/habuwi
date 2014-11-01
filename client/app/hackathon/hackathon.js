'use strict';

angular.module('habuwiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('hackathons', {
        url: '/hackathons',
        templateUrl: 'app/hackathon/views/explore.html',
        controller: 'HackathonExploreCtrl'
      })
      .state('hackathons.page', {
        url: '/:id',
        templateUrl: 'app/hackathon/views/main-page.html',
        controller: 'HackathonPageCtrl',
        resolve: {
          hackathon: function($stateParams, Hackathons) {
            return Hackathons.getHackathon($stateParams.id);
          }
        }
      })
      .state('hackathons.page.teams', {
        url: '/teams',
        templateUrl: 'app/hackathon/views/teams.html'
      })
      .state('hackathons.page.teams.profile', {
        url: '/:team_id',
        templateUrl: 'app/hackathon/views/team-profile.html'
      })
      .state('hackathons.page.participants', {
        url: '/participants',
        templateUrl: 'app/hackathon/views/participants.html'
      })
      .state('hackathons.page.participants.profile', {
        url: '/:participant_id',
        templateUrl: 'app/hackathon/views/participant-profile.html'
      });
  });