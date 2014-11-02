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
          },
          user: function($stateParams, Auth) {
            return Auth.getCurrentUser();
          }
        }
      })
      .state('hackathons.page.join', {
        url: '/join',
        templateUrl: 'app/hackathon/views/join.html',
        authenticate: true
      })
      .state('hackathons.page.teams', {
        url: '/teams',
        templateUrl: 'app/hackathon/views/teams.html'
      })
      .state('hackathons.page.teams.create', {
        url: '/create',
        templateUrl: 'app/hackathon/views/teams-create.html',
        authenticate: true
      })
      .state('hackathons.page.teams.profile', {
        url: '/:team_id',
        templateUrl: 'app/hackathon/views/team-profile.html',
        controller: 'HackathonTeamProfileCtrl',
        resolve: {
          team: function($stateParams, Hackathons) {
            return Hackathons.getTeam($stateParams.id, $stateParams.team_id);
          }
        }
      })
      .state('hackathons.page.notifications', {
        url: '/notifications',
        templateUrl: 'app/hackathon/views/notifications.html'
      })
      .state('hackathons.page.participants', {
        url: '/participants',
        templateUrl: 'app/hackathon/views/participants.html'
      })
      .state('hackathons.page.participants.profile', {
        url: '/:user_id',
        templateUrl: 'app/hackathon/views/participant-profile.html'
      });
  });